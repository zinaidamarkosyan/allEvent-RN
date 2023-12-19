import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import Share from 'react-native-share'

import APICalls from '@/apis/APICalls'
import config from '@/apis/config'
import { useAuth } from '@/hooks'

export const useEventHelpers = ({ id }) => {
  const { me, uploadFiles } = useAuth()
  const { _id: userId } = me

  const isFocused = useIsFocused()

  const [eventState, setEventState] = React.useState({})

  const [editable, setEditable] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [impressions, setImpressions] = React.useState([])
  const [showComments, setShowComments] = React.useState(false)
  const [selectedImpression, setSelectedImpression] = React.useState(null)

  const [detail, setDetails] = React.useState({
    avg: 0,
    rating: 0,
    isLiked: false,
    onTheSpot: false,
    isVisiting: false,
    isFavorite: false,
    showVisiting: false,
    impressionByMe: false,
  })

  const updateDetails = React.useCallback((data = {}) => {
    setDetails((prev) => ({ ...(prev || {}), ...data }))
  }, [])

  const successCallback = React.useCallback(
    (response) => {
      if (response.success) {
        const {
          data,
          data: { favorites, likes, visits, ratings, in_place, impression_images },
        } = response.data
        let sum = 0,
          rating = 0
        ratings?.forEach((r) => {
          sum += r?.rating
          if (r?.user === userId && !rating) {
            rating = r?.rating || 0
          }
        })
        setImpressions(
          (impression_images || []).map((impression) => {
            const { event, path, user, _id } = impression
            return {
              user,
              id: _id,
              path: path,
              event_id: event,
            }
          }),
        )
        setEditable(false)
        setDetails((prev) => ({
          ...(prev || {}),
          rating,
          avg: sum / (ratings?.length || 1),
          isLiked: (likes || []).some((like) => (like?._id || like) === userId),
          onTheSpot: (in_place || []).some((user) => user?._id === userId),
          isVisiting: (visits || []).some((visit) => visit?._id === userId),
          isFavorite: (favorites || []).some((favorite) => favorite?._id === userId),
          impressionByMe: (impression_images || []).some(
            (impression) => impression?.user?._id === userId,
          ),
        }))
        setEventState(data)
      }
      setLoading(false)
    },
    [userId],
  )

  const errorCallback = React.useCallback((error) => {
    console.log(JSON.stringify(error, null, 4))
    setLoading(false)
  }, [])

  const getEvent = React.useCallback(() => {
    if (id === undefined) return
    setLoading(true)
    APICalls.getEventById(id).then(successCallback, errorCallback)
  }, [id, errorCallback, successCallback])

  const updateEvent = React.useCallback(
    (state) => {
      if (state?.images?.length < 3) return
      const callback = (images = []) => {
        APICalls.updateEvent({ ...state, id, [images.length ? 'images' : null]: images }).then(
          (res) => {
            if (res.success) {
              getEvent()
            }
          },
          errorCallback,
        )
      }
      setLoading(true)
      const images = state?.images?.filter((image) => image?.uri)
      const uploadedImages = state?.images
        ?.filter((images) => images?.name)
        .map((image) => image?.name)
      if (images?.length) {
        uploadFiles(images).then(async (res) => {
          const _data = await res.json()
          callback([...(_data?.paths || [_data?.path]), ...uploadedImages])
        })
      } else {
        callback()
      }
    },
    [id, getEvent, errorCallback, uploadFiles],
  )

  const onShare = React.useCallback(() => {
    const title = eventState?.name
    const url = config.shareURL + id
    Share.open({
      url,
      title,
    }).then(
      (res) => {},
      (err) => {},
    )
  }, [id, eventState])

  const onRate = React.useCallback(
    (rating) => {
      APICalls.rateEvent({ rating, event_id: id }).then((res) => {
        if (res.success) {
          updateDetails({ rating })
        }
      }, errorCallback)
    },
    [id, updateDetails, errorCallback],
  )

  const setImpression = React.useCallback(
    (file) => {
      uploadFiles([...(file?.length ? file : [file])]).then(async (res) => {
        const _data = await res.json()
        APICalls.setEventReviewImage({
          event_id: id,
          files: [...(_data?.paths || [_data?.path])],
        }).then((res) => {
          if (res.success) {
            const { avatar, email, phone_number, surname } = me
            const { data } = res.data
            const { path, event } = data || {}
            updateDetails({ impressionByMe: true })
            setImpressions((prev) => {
              const _impressions = prev
              const nImpression = {
                path,
                user: {
                  email,
                  avatar,
                  surname,
                  _id: userId,
                  phone_number,
                },
                event_id: event,
              }
              const impressionByMeExists = _impressions.some((_imp) => _imp?.user?._id === userId)
              return impressionByMeExists
                ? _impressions.map((_imp) => {
                    if (_imp?.user?._id === userId) {
                      return nImpression
                    }
                  })
                : [nImpression, ..._impressions]
            })
          }
        })
      }, errorCallback)
    },
    [uploadFiles, id, userId, me, updateDetails, errorCallback],
  )

  const like = React.useCallback(() => {
    APICalls.likeEvent(id).then((res) => {
      if (res.success) {
        updateDetails({ isLiked: !detail.isLiked })
      }
    }, errorCallback)
  }, [id, updateDetails, detail.isLiked, errorCallback])

  const favorite = React.useCallback(() => {
    APICalls.addRemoveFavorite(id).then((res) => {
      if (res.success) {
        updateDetails({ isFavorite: !detail.isFavorite })
      }
    }, errorCallback)
  }, [id, updateDetails, detail.isFavorite, errorCallback])

  const action = React.useCallback(() => {
    const request = detail.isVisiting ? APICalls.setInPlace : APICalls.setVisit
    request(id).then((res) => {
      if (res.success) {
        updateDetails({
          [!detail.isVisiting && 'isVisiting']: true,
          [!detail.isVisiting && 'showVisiting']: true,
          [!detail.onTheSpot && detail.isVisiting && 'onTheSpot']: true,
        })
      }
    }, errorCallback)
  }, [id, detail, updateDetails, errorCallback])

  React.useEffect(() => {
    if (!Object.keys(eventState).length || (eventState?._id !== id && id)) {
      getEvent()
    }
  }, [getEvent, eventState, id, isFocused])

  React.useEffect(() => {
    APICalls.viewEvent(id).then((res) => {})
  }, [id])

  return {
    like,
    onRate,
    action,
    detail,
    onShare,
    favorite,
    updateEvent,
    updateDetails,
    setImpression,
    editable,
    setEditable,
    isLoading,
    impressions,
    showComments,
    setShowComments,
    selectedImpression,
    setSelectedImpression,
    event: eventState,
  }
}
