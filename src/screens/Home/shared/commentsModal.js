import React from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import InfinityList from '@/components/listItems/infinityList'
import Comment from '@/screens/Notification/shared/comment'
import APICalls from '@/apis/APICalls'

import styles from './sharedStyles'
import Composer from './composer'

const CommentsModal = ({ onClose = () => null, event_id }) => {
  const [reply, onReply] = React.useState(null)
  const [localComments, setComments] = React.useState([])

  const renderComment = React.useMemo(
    () => (props) => {
      return <Comment {...props} onReply={onReply} />
    },
    [],
  )

  const getComments = React.useCallback(() => {
    APICalls.getComments({ event_id }).then((res) => {
      if (res.success) {
        setComments(res.data.data)
      }
    })
  }, [event_id])

  React.useEffect(() => {
    getComments()
  }, [getComments])

  const onSendedCallback = React.useCallback(
    (comment) => {
      setComments((prev) => {
        let _comments = prev
        if (reply) {
          _comments = _comments.map((_comment) => {
            if (_comment?._id === reply) {
              _comment.childs?.push(comment)
            }
            return _comment
          })
        } else {
          _comments = [..._comments, comment]
        }
        return _comments
      })
    },
    [reply],
  )

  return (
    <Modal
      isVisible
      style={styles.modal}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      children={
        <View style={styles.comments}>
          <View
            style={styles.line}
            onTouchMove={(e) => {
              const { locationY } = e.nativeEvent
              if (locationY >= 50) {
                onClose()
              }
            }}
          />
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{ flex: 1 }}
          >
            <InfinityList Component={renderComment} data={localComments} />
            <Composer
              event_id={event_id}
              replyTo={reply}
              onReply={onReply}
              sendCb={onSendedCallback}
            />
          </KeyboardAwareScrollView>
        </View>
      }
    />
  )
}

export default CommentsModal
