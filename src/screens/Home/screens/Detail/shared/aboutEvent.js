import React from 'react'
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
import { Rating } from 'react-native-ratings'
import moment from 'moment-timezone'

import { BUTTON_OPACITY, getFileFromUrl, SCREEN_WIDTH } from '@/constants'
import InfinityList from '@/components/listItems/infinityList'
import { GREEN, WHITE, DARK_YELLOW } from '@/theme/colors'
import PrimaryButton from '@/components/buttons/primary'
import styles from '@/screens/Home/shared/sharedStyles'
import EventCard from '@/screens/Home/shared/card'
import Review from '@/screens/Home/shared/review'
import Map from '@/screens/Map/shared/map'
import { complain } from '@/helpers/misc'
import Avatar from '@/components/avatar'
import Row from '@/components/masks/Row'
import { useEvents } from '@/hooks'
import { RW } from '@/theme/utils'

import BookmarkIcon from '@/assets/icons/Bookmark'
import PolygonIcon from '@/assets/icons/Polygon'
import HeartIcon from '@/assets/icons/Heart'
import ShareIcon from '@/assets/icons/Share'
import Pencel from '@/assets/icons/Pencel'
import PinIcon from '@/assets/icons/Pin'
import AddIcon from '@/assets/icons/add'

import Statistics from './statistics'

const AboutEvent = ({ isOrganizer, helpers, navigation }) => {
  const { allEvents } = useEvents()
  const {
    like,
    onRate,
    action,
    onShare,
    favorite,
    editable,
    impressions,
    setEditable,
    event: item,
    setImpression,
    setShowComments,
    setSelectedImpression,
    detail: { avg, rating, isLiked, onTheSpot, isFavorite, isVisiting, impressionByMe },
  } = helpers

  const openLink = React.useCallback((link = '') => {
    let _link = link
    if (!_link.match('^(http|https)://')) {
      _link = 'https://' + _link
    }
    Linking.openURL(_link)
  }, [])

  const canEdit = moment(item?.joinng_time).startOf('days').isAfter(moment().format())
  const recommendations = React.useMemo(() => {
    return allEvents.filter(
      (event) =>
        event._id !== item?._id &&
        event?.category?._id === item?.category?._id &&
        event?.situation !== 'passed',
    )
  }, [allEvents, item?.category?._id, item?._id])

  const renderImpression = React.useMemo(() => {
    const renderData = !impressionByMe && !isOrganizer ? [1, ...impressions] : impressions
    return (
      <InfinityList
        horizontal
        data={renderData}
        wrapperStyle={styles.pl27}
        Component={(props) => {
          const {
            item: { user, path, id },
            item,
          } = props
          const { avatar } = user || {}
          const _path = avatar && getFileFromUrl(avatar)
          if (!_path && Object.keys(item).length) return null
          const avatarProps = {
            ...(isOrganizer
              ? {
                  placeholder: false,
                }
              : {
                  count: 3,
                  editable: !_path,
                  mediaType: 'mixed',
                  placeholder: !_path,
                  Icon: !_path && AddIcon,
                  setImage: setImpression,
                }),
            size: 56,
            avatarLink: _path,
          }
          return (
            <TouchableOpacity
              disabled={!_path}
              onPress={() =>
                SheetManager.show('complain', {
                  payload: {
                    id,
                    onView: () => {
                      SheetManager.hide('complain').then(() => {
                        setSelectedImpression({
                          path,
                          user,
                        })
                      })
                    },
                  },
                })
              }
              style={styles.mr11}
              activeOpacity={BUTTON_OPACITY}
            >
              <Avatar {...avatarProps} />
            </TouchableOpacity>
          )
        }}
      />
    )
  }, [impressionByMe, impressions, isOrganizer, setImpression, setSelectedImpression])

  const isSameOrAfter = moment().isSameOrAfter(moment(item?.started_time).format())
  const isSameOrBefore = moment().isSameOrBefore(moment(item?.started_time).format())

  const successLogin = React.useCallback(() => {
    navigation.navigate('TabNavigator', {
      screen: 'Главная',
      params: {
        screen: 'Detail',
        params: {
          id: item?._id,
        },
      },
    })
  }, [item._id, navigation])

  return (
    <>
      <Carousel
        data={item.images}
        renderItem={({ item, index }) => {
          return (
            <FastImage
              style={styles.cover}
              key={index.toString()}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: getFileFromUrl(item.name) }}
            />
          )
        }}
        itemWidth={SCREEN_WIDTH}
        sliderWidth={SCREEN_WIDTH}
      />
      <View style={[styles.detailTitleWrapper, styles.row]}>
        <Text style={[styles.detailTitle, !isOrganizer && styles.maxWidth]}>{item?.name}</Text>
        {!isOrganizer && (
          <View style={styles.row}>
            <BookmarkIcon
              onPress={() => global.preventAction(favorite, successLogin)}
              fill={isFavorite ? DARK_YELLOW : undefined}
              color={isFavorite ? DARK_YELLOW : undefined}
            />
            <HeartIcon
              onPress={() => global.preventAction(like, successLogin)}
              fill={isLiked ? DARK_YELLOW : undefined}
              color={isLiked ? DARK_YELLOW : undefined}
              wrapperStyle={styles.mh8}
            />
            <ShareIcon color={GREEN} onPress={() => global.preventAction(onShare, successLogin)} />
          </View>
        )}
        {isOrganizer && !editable && (
          <View style={styles.row}>
            {canEdit && <Pencel color={GREEN} onPress={() => setEditable(true)} />}
            <View style={styles.mh8} />
            <ShareIcon color={GREEN} onPress={onShare} />
          </View>
        )}
      </View>
      {isSameOrAfter && (
        <>
          {isOrganizer && (
            <View style={[{ alignItems: 'flex-start' }, styles.pl27, styles.row, styles.mb9]}>
              <Rating readonly ratingCount={5} imageSize={RW(20)} startingValue={avg} />
              <Text style={styles.rating}>{avg.toFixed(1)}</Text>
            </View>
          )}
          {(isOrganizer || (isVisiting && onTheSpot)) && (
            <View style={{ alignItems: 'flex-end' }}>{renderImpression}</View>
          )}
          {!isOrganizer && isVisiting && onTheSpot && isSameOrAfter && (
            <View style={styles.ph27}>
              <Review wrapperStyle={styles.mv15} onRate={onRate} rating={rating} />
            </View>
          )}
        </>
      )}
      <View style={styles.ph27}>
        {isOrganizer && (
          <Text style={[styles.detailDescription, styles.mb22]}>
            <Text style={{ fontWeight: '600' }}>Категория: </Text> {item?.category.name}
          </Text>
        )}
        <Text style={[styles.detailDescription, styles.mb22]}>
          <Text style={{ fontWeight: '600' }}>Описание:</Text> {item?.description}
        </Text>
        <Text style={[styles.detailHeader, styles.mb9]}>Обзор</Text>
        <Text style={styles.detailDescription}>
          <Text style={{ fontWeight: '600' }}>Дата: </Text>
          {moment(item?.started_time).format('DD.MM.YYYY')}
        </Text>
        <Text style={[styles.detailDescription, styles.mt16]}>
          <Text style={{ fontWeight: '600' }}>Время: </Text>
          {moment(item?.started_time).format('HH:mm')}
        </Text>
        <Text style={[styles.detailDescription, styles.mt16]}>
          <Text style={{ fontWeight: '600' }}>Телефон: </Text>+{item?.owner?.phone_number}
        </Text>
        <Text style={[styles.detailDescription, styles.mt16]}>
          <Text style={{ fontWeight: '600' }}>Вебсайт: </Text>
          <Text
            style={[item?.tickets_link_active && styles.link]}
            disabled={!item?.tickets_link_active}
            onPress={() => openLink(item?.tickets_link)}
          >
            {item?.tickets_link}
          </Text>
        </Text>
        <Text style={[styles.detailDescription, styles.mt16]}>
          <Text style={{ fontWeight: '600' }}>Ссылка на билеты: </Text>
          <Text
            style={[item?.tickets_link_active && styles.link]}
            disabled={!item?.tickets_link_active}
            onPress={() => openLink(item?.tickets_link)}
          >
            {item?.tickets_link}
          </Text>
        </Text>
        <Text style={[styles.detailDescription, styles.mt16]}>
          <Text style={{ fontWeight: '600' }}>Адрес: </Text>
          {item?.place_name}
        </Text>
        <Text style={[styles.detailHeader, styles.mt32]}>Место прохождения</Text>
        <TouchableOpacity
          activeOpacity={BUTTON_OPACITY}
          style={[styles.map, styles.mt16]}
          onPress={() =>
            global.preventAction(
              () =>
                navigation.navigate('Карта', {
                  disabled: true,
                  refScreen: 'Detail',
                  selectedId: item._id,
                  coords: [parseFloat(item.longit), parseFloat(item.latit)],
                }),
              successLogin,
            )
          }
        >
          <Map disabled />
          <View style={styles.bgMask}>
            <PinIcon />
            <Text style={[styles.eventTitle, { color: WHITE }, styles.mt16]}>
              Посмотреть на карте
            </Text>
          </View>
        </TouchableOpacity>
        {isSameOrAfter && (
          <Row
            touchable
            wrapperStyle={styles.mt32}
            justifyContent={'space-between'}
            onPress={() => global.preventAction(() => setShowComments(true), successLogin)}
          >
            <Text style={styles.detailHeader}>Коментарий</Text>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <PolygonIcon />
            </View>
          </Row>
        )}
        {isOrganizer && (
          <Statistics
            viewsCount={item?.views?.length}
            likesCount={item?.likes?.length}
            visitsCount={item?.visits?.length}
            inPlaceCount={item?.in_place?.length}
            favoritesCount={item?.favorites?.length}
          />
        )}
        {!isOrganizer && (
          <>
            <Text style={[styles.detailHeader, styles.mt32, styles.mb22]}>
              Почему я должен посетить?
            </Text>
            <Text style={[styles.detailDescription, styles.lh25]}>
              {(item?.description_visit || '').trim()}
            </Text>
          </>
        )}
      </View>
      {!isOrganizer && (
        <>
          {!!(recommendations || []).length && (
            <View style={styles.ph27}>
              <Text style={[styles.detailHeader, styles.mt32]}>Больше предложений</Text>
            </View>
          )}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.slider, styles.mt16]}
          >
            {(recommendations || []).map((_, index, arr) => {
              const image = _.images?.[0]
              if (!image) return null
              return (
                <EventCard
                  id={_._id}
                  title={_.name}
                  key={index.toString()}
                  navigation={navigation}
                  image={getFileFromUrl(image.name)}
                  wrapperStyle={[arr[index + 1] ? styles.mr16 : styles.mr43]}
                />
              )
            })}
          </ScrollView>
          {((!onTheSpot && isSameOrAfter && item?.situation !== 'passed') ||
            (!isVisiting && isSameOrBefore)) && (
            <View style={[styles.ph27, styles.mt20]}>
              <PrimaryButton
                label={!isVisiting ? 'Я пойду' : 'Я на месте'}
                onPress={() => global.preventAction(action, successLogin)}
              />
            </View>
          )}
          <View style={[styles.ph27, styles.mt20]}>
            <PrimaryButton
              withOutOldStyles
              wrapperStyle={styles.complain}
              labelStyle={styles.complainLabel}
              label={'Пожаловаться на событие'}
              onPress={() => complain('event', item?._id)}
            />
          </View>
        </>
      )}
    </>
  )
}

export default AboutEvent
