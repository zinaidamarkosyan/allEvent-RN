import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import FastImage from 'react-native-fast-image'
import moment from 'moment-timezone'

// import ImagePreview from '@/screens/Create/shared/imagePreview'
import { getFileFromUrl, BUTTON_OPACITY } from '@/constants'
import DateInput from '@/screens/Create/shared/dateInput'
import PrimaryButton from '@/components/buttons/primary'
import Dropdown from '@/screens/Create/shared/dropdown'
import { useEvents, useMapPlaceHelpers } from '@/hooks'
import styles from '@/screens/Home/shared/sharedStyles'
import TextInput from '@/components/inputs/input'
import Row from '@/components/masks/Row'

import linkIcon from '@/assets/icons/ic_link_outline.png'
import calendarIcon from '@/assets/icons/ic_calendar.png'
import clockIcon from '@/assets/icons/ic_clock.png'
import pinIcon from '@/assets/icons/ic_pin.png'

const Edit = ({
  currentState,
  cancel = () => undefined,
  onSave = () => undefined,
  navigation,
  geometry,
}) => {
  const { categories } = useEvents()
  const [showPicker, setShowPicker] = React.useState(null)
  const [state, setState] = React.useState(currentState || {})
  const [images, setImages] = React.useState(currentState?.images || [])
  const { place_name, coords, setCoords, AutoComplete, results } = useMapPlaceHelpers({
    name: currentState.place_name,
  })

  const handleInput = React.useCallback((name, value) => {
    setState((prev) => ({ ...(prev || {}), [name]: value }))
  }, [])

  React.useEffect(() => {
    handleInput('place_name', place_name)
  }, [place_name, handleInput])

  React.useEffect(() => {
    setState((prev) => ({ ...(prev || {}), ...(coords || {}) }))
  }, [coords])

  React.useEffect(() => {
    if (geometry?.length) {
      setCoords({
        latit: geometry[0],
        longit: geometry[1],
      })
    }
  }, [geometry, setCoords])

  const handleConfirm = React.useCallback(
    (value) => {
      if (showPicker === 'eventDate' || showPicker === 'eventTime') {
        handleInput('started_time', new Date(moment(value)))
      } else {
        handleInput('started_time', new Date(moment(value).add(1, 'days')))
      }
      setShowPicker(null)
    },
    [showPicker, handleInput],
  )
  const editedEvent = React.useMemo(() => {
    const data = {}
    Object.keys(state).forEach((key) => {
      if (typeof state[key] !== 'object' && state[key] !== currentState[key]) {
        data[key] = state[key]
      } else if (typeof state[key] === 'object' && ['category'].includes(key)) {
        if (state[key]?.name !== currentState[key]?.name && key === 'category') {
          data[key] = state[key]
        }
      }
    })
    if (images?.some((image) => !!image?.uri) || images?.length !== currentState?.images?.length) {
      data['images'] = images
    }
    return data
  }, [state, currentState, images])

  return (
    <View style={styles.ph27}>
      {/* <Row wrapperStyle={styles.mt16}>
        {images.map((image, idx) => {
          const _img = { uri: image?.uri || getFileFromUrl(image?.name) }
          return (
            <ImagePreview
              index={idx}
              image={_img}
              key={idx.toString()}
              setImages={setImages}
              wrapperStyle={styles.mr16}
            />
          )
        })}
        {images?.length < 3 && <ImagePreview setImages={setImages} wrapperStyle={styles.mr16} />}
      </Row> */}
      <TextInput
        value={state?.name}
        wrapperStyle={styles.mt20}
        placeholder={'Название события'}
        onChange={(value) => handleInput('name', value)}
      />
      <Dropdown
        items={categories}
        wrapperStyle={styles.mt16}
        selectedValue={state?.category?.name}
        onSelect={(value) => handleInput('category', value)}
      />
      <DatePicker
        modal
        locale={'ru'}
        mode={showPicker === 'eventTime' ? 'time' : 'date'}
        open={!!showPicker}
        date={
          showPicker === 'eventDate' || showPicker === 'eventTime'
            ? new Date(state?.started_time)
            : new Date(moment(state?.started_time).subtract(1, 'days'))
        }
        cancelText={'Отменить'}
        confirmText={'Сохранить'}
        is24hourSource={'locale'}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(null)}
        minimumDate={new Date(moment().add(1, 'days').startOf('days'))}
        title={showPicker === 'eventTime' ? 'Выберите Время' : 'Выберите Дату'}
      />
      <TextInput
        lines={3}
        wrapperStyle={styles.mt16}
        value={state?.description}
        placeholder={'Описание события'}
        onChange={(value) => handleInput('description', value)}
      />
      <Text style={[styles.detailHeader, styles.mt32]}>Дата и время начала события</Text>
      <Row justifyContent={'space-between'} wrapperStyle={styles.mt16}>
        <DateInput
          onPress={() => setShowPicker('eventDate')}
          Icon={calendarIcon}
          value={moment(state?.started_time).format('DD/MM/YYYY')}
        />
        <DateInput
          Icon={clockIcon}
          placeholder={'HH:MM'}
          onPress={() => setShowPicker('eventTime')}
          mask={[[/\d/], [/\d/], ':', [/\d/], [/\d/]]}
          value={moment(state?.started_time).format('HH:mm')}
        />
      </Row>
      {/* <Text style={[styles.detailHeader, styles.mt32]}>Дата присоединения к событию</Text>
      <Row justifyContent={'flex-start'}>
        <DateInput
          wrapperStyle={styles.mt16}
          onPress={() => setShowPicker('joinDate')}
          Icon={calendarIcon}
          value={moment(state?.started_time).subtract(1, 'days').format('DD/MM/YYYY')}
        />
      </Row> */}
      <Row justifyContent={'space-between'} wrapperStyle={[styles.mt32]}>
        <Text style={styles.detailHeader}>Адрес события</Text>
        <TouchableOpacity
          activeOpacity={BUTTON_OPACITY}
          onPress={() => {
            navigation.navigate('Карта', {
              refScreen: 'Detail',
            })
          }}
        >
          <FastImage source={pinIcon} style={styles.pinIcon} />
        </TouchableOpacity>
      </Row>
      <AutoComplete results={results} value={place_name} wrapperStyle={styles.mt16} />
      <Text style={[styles.detailHeader, styles.mt32]}>Вебсайт</Text>
      <TextInput
        Icon={linkIcon}
        wrapperStyle={styles.mt16}
        value={state?.website_link}
        placeholder={'Вставьте ссылку'}
        onChange={(value) => handleInput('website_link', value)}
      />
      <Text style={[styles.detailHeader, styles.mt32]}>Ссылка на билеты</Text>
      <TextInput
        Icon={linkIcon}
        wrapperStyle={styles.mt16}
        value={state?.tickets_link}
        placeholder={'Вставьте ссылку'}
        onChange={(value) => handleInput('tickets_link', value)}
      />
      <TextInput
        lines={3}
        wrapperStyle={styles.mt32}
        value={state?.description_visit}
        onChange={(value) => handleInput('description_visit', value)}
        placeholder={'Укажите преимущество организованного события (необезательно)'}
      />
      <Row wrapperStyle={styles.mt32} justifyContent={'space-between'}>
        <PrimaryButton
          label={'Сохранить'}
          wrapperStyle={styles.button}
          onPress={() => (Object.keys(editedEvent) ? onSave(editedEvent) : cancel())}
        />
        <PrimaryButton
          onPress={cancel}
          label={'Отменить'}
          labelStyle={styles.green}
          wrapperStyle={[styles.button, styles.inactive]}
        />
      </Row>
    </View>
  )
}

export default Edit
