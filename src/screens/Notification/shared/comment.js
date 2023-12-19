import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment-timezone'

import InfinityList from '@/components/listItems/infinityList'
import { getFileFromUrl, BUTTON_OPACITY } from '@/constants'
import { complain } from '@/helpers/misc'
import Avatar from '@/components/avatar'
import Row from '@/components/masks/Row'
import { GREEN } from '@/theme/colors'
import APICalls from '@/apis/APICalls'
import { useAuth } from '@/hooks'

import heartInactive from '@/assets/icons/ic_heart_outline.png'
import heartActive from '@/assets/icons/ic_heart.png'

import styles from './sharedStyles'

const Comment = ({ item, onReply, hasLeftPadding = false, userName = '' }) => {
  const {
    me: { _id: userId },
  } = useAuth()
  const [isLiked, setLiked] = React.useState(null)
  const {
    user: { name, surname, avatar, _id },
    text,
    likes,
    createdAt,
    _id: id,
  } = item || { user: {} }

  const likeComment = React.useCallback(() => {
    APICalls.setCommentLike(id).then((res) => {
      if (res.success) {
        setLiked(true)
      }
    })
  }, [id])

  const _onReply = React.useCallback(() => {
    onReply?.(id)
  }, [onReply, id])

  const icon =
    isLiked ?? likes?.some((like) => (like._id || like) === userId) ? heartActive : heartInactive
  return (
    <>
      <Row wrapperStyle={[styles.items, hasLeftPadding && styles.pl16]}>
        <Avatar avatarLink={getFileFromUrl(avatar)} placeholder={false} size={32} />
        <View style={[styles.ml10, hasLeftPadding && { width: '87.6%' }]}>
          <Row justifyContent={'space-between'}>
            <Text style={styles.commentUser}>{`${name || ''} ${surname || ''}`}</Text>
            <Row>
              <Text style={styles.commentLikes}>
                {likes.length + (isLiked ?? undefined ? 1 : 0)}
              </Text>
              <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={likeComment}>
                <FastImage source={icon} style={styles.heartIcon} />
              </TouchableOpacity>
            </Row>
          </Row>
          <Text style={styles.comment}>
            <Text style={{ color: GREEN }}>{userName ? userName + ' ' : ''}</Text>
            {text}
          </Text>
          <Row justifyContent={'space-between'}>
            {!hasLeftPadding ? (
              <Row>
                <Text style={styles.reply} onPress={_onReply}>
                  Ответить
                </Text>
                {_id !== userId && (
                  <Text style={styles.complain} onPress={() => complain('comment', id)}>
                    Пожаловаться
                  </Text>
                )}
              </Row>
            ) : (
              <View />
            )}
            {!!createdAt && <Text style={styles.comment}>{moment(createdAt).fromNow()}</Text>}
          </Row>
        </View>
      </Row>
      <InfinityList
        data={item.childs}
        Component={(props) => (
          <Comment {...props} hasLeftPadding userName={`@${name || ''} ${surname || ''}`} />
        )}
      />
    </>
  )
}

export default Comment
