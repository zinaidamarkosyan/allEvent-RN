import React from 'react'
import { Text } from 'react-native'
import * as mime from 'react-native-mime-types'
import { Rating } from 'react-native-ratings'
import FastImage from 'react-native-fast-image'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import InfinityList from '@/components/listItems/infinityList'
import CommentsModal from '@/screens/Home/shared/commentsModal'
import { getFileFromUrl } from '@/constants'
import Avatar from '@/components/avatar'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'
import { RW } from '@/theme/utils'

import styles from '../../shared/sharedStyles'

const ProfileScreen = ({ route: { params } }) => {
  const {
    event_id,
    user: { _id: user_id, avatar, name, surname },
  } = params || {}
  const [isLoading, setLoading] = React.useState(false)
  const [impression, setImpression] = React.useState({})
  const [showComments, setShowComments] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    APICalls.getSingleReview({ event_id, user_id }).then((res) => {
      setLoading(false)
      if (res.success) {
        setImpression(res.data.data)
      }
    })
  }, [event_id, user_id])

  const { impression_images, eventCommentArithMean: avg } = impression || {}

  const renderImages = React.useMemo(() => {
    const imgs = []
    impression_images?.forEach((imp) => {
      imp?.path?.forEach((i) => {
        imgs.push(i)
      })
    })
    return (
      <InfinityList
        data={imgs}
        horizontal
        Component={(props) => {
          const _type = mime.lookup(props.item)
          if (!_type || !_type?.includes('image')) return null
          return <FastImage style={styles.img} source={{ uri: getFileFromUrl(props.item) }} />
        }}
      />
    )
  }, [impression_images])

  return (
    <ScreenWrapperWithNavigation
      loading={isLoading}
      hasBack
      wrapperStyle={styles.profileWrapper}
      hideBell
    >
      <Row>
        <Avatar placeholder={false} avatarLink={getFileFromUrl(avatar)} size={70} />
        <Text style={styles.fullName}>{`${name || ''} ${surname || ''}`}</Text>
      </Row>
      {!!impression_images?.length && (
        <Text style={[styles.title, styles.mt60, styles.mb25]}>Впечатления о событии</Text>
      )}
      {renderImages}
      <Text style={[styles.title, styles.mt35, styles.mb16]}>Баллы</Text>
      <Row>
        <Rating ratingCount={5} startingValue={avg || 0} readonly imageSize={RW(20)} />
        <Text style={styles.rate}>{(avg || 0).toFixed(1)}</Text>
      </Row>
      <Text style={[styles.title, styles.mt35, styles.mb16]} onPress={() => setShowComments(true)}>
        Комментарии
      </Text>
      {showComments && <CommentsModal event_id={event_id} onClose={() => setShowComments(false)} />}
    </ScreenWrapperWithNavigation>
  )
}

export default ProfileScreen
