import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SheetManager } from 'react-native-actions-sheet'
import { useIsFocused } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import FastImage from 'react-native-fast-image'
import moment from 'moment-timezone'

import { useAuth, useEvents, useMapPlaceHelpers } from '@/hooks'
import { checkFileSize, selectImage, takeImage } from '@/helpers/misc'
import Loader from '@/components/FullScreenLoader/loading'
import { DATE_FORMAT, BUTTON_OPACITY } from '@/constants'
import PrimaryButton from '@/components/buttons/primary'
import TextInput from '@/components/inputs/input'
import { RED, WHITE } from '@/theme/colors'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'

import linkIcon from '@/assets/icons/ic_link_outline.png'
import downloadIcon from '@/assets/icons/ic_download.png'
import calendarIcon from '@/assets/icons/ic_calendar.png'
import clockIcon from '@/assets/icons/ic_clock.png'
import pinIcon from '@/assets/icons/ic_pin.png'

import MessageModal from '../../shared/createdEventModal'
import OtherCategory from '../../shared/otherCategoryModal'
import { INITIAL_STATE } from '../../shared/constants'
import ImagePreview from '../../shared/imagePreview'
import styles from '../../shared/sharedStyles'
import DateInput from '../../shared/dateInput'
import Dropdown from '../../shared/dropdown'

const CreationScreen = ({ navigation, route: { params } }) => {
  const scrollRef = useRef(null)
  const isFocused = useIsFocused()
  const [err, setError] = useState(false)
  const [images, setImages] = useState([])
  const { categories, getEvents } = useEvents()
  const [eventName, setEventName] = useState('')
  const { uploadFiles, setPermission } = useAuth()
  const [showErrorMessage, setShowMessage] = useState(false)
  const [state, dispatch] = React.useReducer((prevState, action) => {
    if (action.name === 'reset') {
      return {
        ...INITIAL_STATE,
      }
    }
    return {
      ...prevState,
      [action.name]: action.value,
    }
  }, INITIAL_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [showPicker, setShowPicker] = useState(null)
  const [createdEvent, setCreatedEvent] = useState(false)
  const [completeEvent, setCompleteEvent] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const { eventDate, ticketsLink, eventDescription, eventDescriptionVisit, websiteLink } = state
  const { setCoords, setPlaceName, coords, place_name, AutoComplete, results, scrollEnabled } =
    useMapPlaceHelpers()

  const { geometry } = params

  const handleInput = React.useCallback((name, value) => {
    dispatch({ name, value })
  }, [])

  React.useEffect(() => {
    if (geometry) {
      setCoords({
        latit: geometry?.coordinates?.[1],
        longit: geometry?.coordinates?.[0],
      })
    }
  }, [geometry, setCoords])

  React.useEffect(() => {
    if (!isFocused) {
      setError(false)
    }
  }, [isFocused])

  const handleConfirm = React.useCallback(
    (value) => {
      if (showPicker === 'eventDate' || showPicker === 'eventTime') {
        handleInput('eventDate', moment(value))
      } else {
        handleInput('eventDate', moment(value).add(1, 'days'))
      }
      setShowPicker(null)
    },
    [showPicker, handleInput],
  )

  const hideDatePicker = React.useCallback(() => {
    setShowPicker(null)
  }, [])

  const validEventData = React.useCallback(() => {
    let err = false
    if (
      !eventName ||
      images.length !== 3 ||
      !place_name ||
      !eventDescription ||
      !selectedCategory?._id
    ) {
      err = true
    }
    setError(err)
    setShowMessage(!!err)
    if (err) return
    setIsLoading(true)
    uploadFiles(images).then(async (res) => {
      try {
        const data = await res.json()
        const sendingEventData = {}
        sendingEventData.name = eventName
        sendingEventData.place_name = place_name
        sendingEventData.description = eventDescription
        sendingEventData.description_visit = eventDescriptionVisit
        sendingEventData.category = selectedCategory?._id
        sendingEventData.started_time = moment(eventDate).format(DATE_FORMAT)
        sendingEventData.joinng_time = moment(eventDate)
          .subtract(1, 'days')
          .endOf('days')
          .format(DATE_FORMAT)
        sendingEventData.tickets_link = ticketsLink
        sendingEventData.website_link = websiteLink
        sendingEventData.latit = coords.latit + ''
        sendingEventData.longit = coords.longit + ''
        sendingEventData.images = data.paths
        if (eventName && selectedCategory?._id && eventDate) {
          APICalls.createEvent(sendingEventData).then(
            (res) => {
              setIsLoading(false)
              if (res.success) {
                getEvents()
                setCoords({ latit: null, longit: null })
                setPlaceName('')
                setCreatedEvent(true)
                setSelectedCategory(undefined)
                dispatch({ name: 'reset' })
                setEventName('')
                setImages([])
                navigation.setParams({ geometry: undefined })
              }
            },
            (err) => {
              setIsLoading(false)
            },
          )
        }
      } catch (error) {
        setIsLoading(false)
      }
    })
  }, [
    images,
    coords,
    getEvents,
    eventDate,
    setCoords,
    eventName,
    place_name,
    navigation,
    uploadFiles,
    ticketsLink,
    websiteLink,
    setPlaceName,
    eventDescription,
    eventDescriptionVisit,
    selectedCategory?._id,
  ])

  const _onChange = React.useCallback(() => {
    navigation.navigate('Карта', {
      refScreen: 'Создать',
    })
  }, [navigation])

  const _addImages = React.useCallback(
    (imgs) => {
      setImages((prev) => [...prev, ...imgs])
    },
    [setImages],
  )

  const goHome = React.useCallback(() => {
    navigation.navigate('Главная', {
      screen: 'Home',
    })
    setCompleteEvent(false)
    setCreatedEvent(false)
  }, [navigation])

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      enableOnAndroid
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={!results.length}
      contentContainerStyle={styles.wrapper}
      style={{ flex: 1, backgroundColor: WHITE }}
    >
      {isLoading && <Loader />}
      {showErrorMessage && (
        <MessageModal
          title={
            !checkFileSize(images)
              ? 'Превышен лимит памяти изображения'
              : images.length !== 3
              ? 'Чтобы создать событие,\nзагрузите 3 изображения.'
              : 'Заполните все обязательные поля'
          }
          onOk={() => setShowMessage(false)}
          onClose={() => setShowMessage(false)}
        />
      )}
      {(createdEvent || completeEvent) && (
        <MessageModal
          title={
            completeEvent
              ? 'Добавленная категория\n находиться на рассмотрении.\nПосле принятия\nадминистратором данной\nкатегории, вы сможете\nдобавить событие.'
              : 'Событие находится на модерации.\nКогда оно будет одобрено,\nвы получите уведомление'
          }
          onOk={() => goHome()}
          onClose={() => (completeEvent ? setCompleteEvent(false) : setCreatedEvent(false))}
        />
      )}
      {openModal && (
        <OtherCategory cb={() => setCompleteEvent(true)} onClose={() => setOpenModal(false)} />
      )}
      <DatePicker
        modal
        locale={'ru'}
        mode={showPicker === 'eventTime' ? 'time' : 'date'}
        open={!!showPicker}
        date={
          showPicker === 'eventDate' || showPicker === 'eventTime'
            ? new Date(eventDate)
            : new Date(moment(eventDate).subtract(2, 'hours'))
        }
        cancelText={'Отменить'}
        confirmText={'Сохранить'}
        is24hourSource={'locale'}
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
        timeZoneOffsetInMinutes={moment().utcOffset()}
        minimumDate={new Date(moment().add(2, 'hours'))}
        title={showPicker === 'eventTime' ? 'Выберите Время' : 'Выберите Дату'}
      />
      <Text style={styles.title}>Создать событие</Text>
      <Dropdown
        items={categories}
        wrapperStyle={styles.mt16}
        setOpenModal={setOpenModal}
        otherVariant={'Другая категория'}
        err={err && !selectedCategory?._id}
        selectedValue={selectedCategory?.name}
        onSelect={(item) => setSelectedCategory(item)}
      />
      <TextInput
        value={eventName}
        onChange={setEventName}
        err={err && !eventName}
        wrapperStyle={styles.mt16}
        placeholder={'Название события'}
      />
      <TextInput
        lines={4}
        value={eventDescription}
        wrapperStyle={styles.mt16}
        err={err && !eventDescription}
        placeholder={'Описание события'}
        onChange={(value) => handleInput('eventDescription', value)}
      />
      <Text style={[styles.title, styles.mt33]}>Дата и время начала события</Text>
      <Row justifyContent={'space-between'} wrapperStyle={styles.mt16}>
        <DateInput
          Icon={calendarIcon}
          onPress={() => setShowPicker('eventDate')}
          value={moment(eventDate).format('DD/MM/YYYY')}
        />
        <DateInput
          size={20}
          Icon={clockIcon}
          placeholder={'HH:MM'}
          value={moment(eventDate).format('HH:mm')}
          onPress={() => setShowPicker('eventTime')}
          mask={[[/\d/], [/\d/], ':', [/\d/], [/\d/]]}
        />
      </Row>
      {/* <Text style={[styles.title, styles.mt25]}>Крайняя дата присоединения к событию</Text>
      <Row justifyContent={'flex-start'}>
        <DateInput
          Icon={calendarIcon}
          wrapperStyle={styles.mt16}
          onPress={() => setShowPicker('joinDate')}
          value={moment(eventDate).subtract(1, 'days').format('DD/MM/YYYY')}
        />
      </Row> */}
      <Row justifyContent={'space-between'} wrapperStyle={styles.mt25}>
        <Text style={styles.title}>Адрес события</Text>
        <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={_onChange}>
          <FastImage source={pinIcon} style={styles.calendarIcon} />
        </TouchableOpacity>
      </Row>
      <AutoComplete
        scrollRef={scrollRef}
        err={err && !place_name}
        results={results}
        wrapperStyle={styles.mt16}
        value={place_name}
      />
      <Row
        touchable={!images.length}
        wrapperStyle={styles.mt25}
        onPress={() =>
          SheetManager.show('selectMedia', {
            payload: {
              choose: () => selectImage(_addImages, 'photo', () => setPermission('Фото')),
              take: () => takeImage(_addImages, 'photo', () => setPermission('Камере')),
            },
          })
        }
      >
        {!images.length && (
          <>
            <FastImage source={downloadIcon} style={styles.icon} />
            <Text style={[styles.download, err && { color: RED }]}>
              {'Загрузите изображения события'}
            </Text>
          </>
        )}
        {images.map((_, idx) => {
          return (
            <ImagePreview
              index={idx}
              key={idx.toString()}
              image={images?.[idx]}
              setImages={setImages}
              wrapperStyle={styles.mr14}
            />
          )
        })}
        {!!images.length && images.length < 3 && (
          <ImagePreview err={err} setImages={setImages} wrapperStyle={styles.mr14} />
        )}
      </Row>
      <Text style={[styles.title, styles.mt33]}>Вебсайт</Text>
      <TextInput
        Icon={linkIcon}
        value={websiteLink}
        wrapperStyle={styles.mt16}
        placeholder={'Вставьте ссылку'}
        onChange={(value) => handleInput('websiteLink', value)}
      />
      <Text style={[styles.title, styles.mt33]}>Ссылка на билеты</Text>
      <TextInput
        Icon={linkIcon}
        value={ticketsLink}
        wrapperStyle={styles.mt16}
        placeholder={'Вставьте ссылку'}
        onChange={(value) => handleInput('ticketsLink', value)}
      />
      <TextInput
        lines={4}
        wrapperStyle={styles.mt33}
        value={eventDescriptionVisit}
        onChange={(value) => handleInput('eventDescriptionVisit', value)}
        placeholder={
          'Напишите преимущества создаваемого события. Это поможет привлечь посетителей.'
        }
      />
      <PrimaryButton onPress={validEventData} label={'Создать'} wrapperStyle={styles.mt25} />
    </KeyboardAwareScrollView>
  )
}

export default CreationScreen
