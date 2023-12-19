import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import moment from 'moment-timezone'

import { BUTTON_OPACITY, getFileFromUrl, ORGANIZER } from '@/constants'
import { EVENT_TYPE } from '@/screens/Profile/shared/constants'
import { DARK_YELLOW, GRAY } from '@/theme/colors'
import APICalls from '@/apis/APICalls'
import { useAuth } from '@/hooks'

import BookmarkIcon from '@/assets/icons/Bookmark'
import WalkingIcon from '@/assets/icons/walking'
import HeartIcon from '@/assets/icons/Heart'
import EyeIcon from '@/assets/icons/eye'

import styles from './sharedStyles'

const SubEvent = ({ item, hideBorder, type = 0, refScreen = undefined }) => {
  const [isLiked, setIsLiked] = React.useState(false)
  const [likedCount, setLikedCount] = React.useState(0)
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [favoritesCount, setFavoritesCount] = React.useState(0)
  const navigation = useNavigation()
  const { name, params } = useRoute()
  const {
    me: { roles, _id: myId },
  } = useAuth()

  const { name: role } = roles || {}

  const _aboutEvent = React.useCallback(() => {
    if (!item?._id) return
    navigation.navigate('Главная', {
      screen: 'Detail',
      params: {
        refScreen,
        id: item?._id,
      },
    })
  }, [item, navigation, refScreen])

  const comeToEvent = React.useCallback(
    (inPlace = false) => {
      navigation.navigate('Уведомления', {
        screen: 'Users',
        params: {
          event_id: item?._id,
          data: inPlace ? item?.in_place : item?.visits,
          type: inPlace ? 1 : 0,
          parent: name === 'AllEvents' ? 'Профиль' : 'Главная',
          refScreen: {
            screen: name,
            params: {
              ...(params || {}),
            },
          },
        },
      })
    },
    [item, name, params, navigation],
  )

  React.useEffect(() => {
    setIsFavorite(item?.favorites?.some((favorite) => (favorite?._id || favorite) === myId))
    setIsLiked(item?.likes?.some((like) => (like?._id || like) === myId))
    setFavoritesCount(item?.favorites?.length)
    setLikedCount(item?.likes?.length)
  }, [item, myId])

  const like = React.useCallback(() => {
    setLikedCount((count) => count + (isLiked ? -1 : 1))
    setIsLiked(!isLiked)
    APICalls.likeEvent(item._id).then((res) => {
      if (res.success) {
        // TODO
      }
    })
  }, [item, isLiked])

  const favorite = React.useCallback(() => {
    setFavoritesCount((count) => count + (isFavorite ? -1 : 1))
    setIsFavorite(!isFavorite)
    APICalls.addRemoveFavorite(item._id).then((res) => {
      if (res.success) {
        // TODO
      }
    })
  }, [item, isFavorite])

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

  const isOrganizer = role === ORGANIZER
  return (
    <TouchableOpacity
      onPress={_aboutEvent}
      activeOpacity={BUTTON_OPACITY}
      style={[styles.subEvent, styles.row, hideBorder && { borderTopWidth: 0 }]}
    >
      <View>
        <Text style={styles.subEventTitle} numberOfLines={2} ellipsizeMode={'tail'}>
          {item?.name}
        </Text>
        <Text style={[styles.subEventInfo, styles.mb9]}>
          <Text style={{ fontWeight: 'bold' }}>Дата: </Text>
          {moment(item?.started_time).format('DD.MM.YYYY')}
        </Text>
        <Text
          style={[styles.subEventInfo, styles.mb5, styles.w40]}
          numberOfLines={2}
          ellipsizeMode={'tail'}
        >
          <Text style={{ fontWeight: 'bold' }}>Адрес:</Text> {item?.place_name}
        </Text>
        <View style={styles.row}>
          {isOrganizer && (
            <>
              <WalkingIcon
                size={25}
                onPress={() => comeToEvent()}
                color={isOrganizer && item?.visits?.length ? DARK_YELLOW : undefined}
              />
              <Text
                style={[
                  styles.subEventInfo,
                  styles.count,
                  isOrganizer && item?.visits?.length && { color: DARK_YELLOW },
                ]}
              >
                {item?.visits?.length}
              </Text>
            </>
          )}
          <BookmarkIcon
            disabled={isOrganizer}
            onPress={() => global.preventAction(favorite, successLogin)}
            color={
              isOrganizer
                ? GRAY
                : type === EVENT_TYPE.BOOKMARK || isFavorite
                ? DARK_YELLOW
                : undefined
            }
            fill={
              isOrganizer
                ? GRAY
                : type === EVENT_TYPE.BOOKMARK || isFavorite
                ? DARK_YELLOW
                : type === EVENT_TYPE.HISTORY
                ? GRAY
                : null
            }
          />
          <Text style={[styles.subEventInfo, styles.count]}>{favoritesCount}</Text>
          <HeartIcon
            disabled={isOrganizer}
            onPress={() => global.preventAction(like, successLogin)}
            color={
              isOrganizer ? GRAY : type === EVENT_TYPE.LIKED || isLiked ? DARK_YELLOW : undefined
            }
            fill={
              isOrganizer
                ? GRAY
                : type === EVENT_TYPE.LIKED || isLiked
                ? DARK_YELLOW
                : type === EVENT_TYPE.HISTORY
                ? GRAY
                : null
            }
          />
          <Text style={[styles.subEventInfo, styles.count]}>{likedCount}</Text>
          {isOrganizer && (
            <>
              <EyeIcon />
              <Text style={[styles.subEventInfo, styles.count]}>{item?.views?.length}</Text>
            </>
          )}
        </View>
        {isOrganizer && !!item?.in_place?.length && (
          <Text style={[styles.subEventInfo, styles.history]} onPress={() => comeToEvent(true)}>
            Пришли на событие: {item?.in_place?.length}
          </Text>
        )}
        {(!Boolean(item?.eventStatus) || typeof item?.eventStatus === 'string') && isOrganizer && (
          <Text style={styles.eventStatus}>
            {!Boolean(item?.eventStatus) ? 'На модерации' : 'Отклонено'}
          </Text>
        )}
      </View>
      {!!item?.images?.length && (
        <View>
          <FastImage
            source={{
              uri: getFileFromUrl(item.images?.[0]?.name),
            }}
            style={styles.subEventImg}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      )}
    </TouchableOpacity>
  )
}

export default SubEvent
