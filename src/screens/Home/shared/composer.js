import React from 'react'

import TextInput from '@/components/inputs/input'
import { getFileFromUrl } from '@/constants'
import Avatar from '@/components/avatar'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'
import { useAuth } from '@/hooks'

import styles from './sharedStyles'

const Composer = ({ replyTo, onReply, event_id, sendCb }) => {
  const { me } = useAuth()
  const [text, setText] = React.useState('')

  const { avatar } = me || {}

  const _onSend = React.useCallback(() => {
    if (text.trim()) {
      APICalls.comment({ text, event_id, parent_id: replyTo }).then((res) => {
        onReply(null)
        setText('')
        if (res.success) {
          sendCb?.({
            ...res.data.data,
            user: me,
          })
        }
      })
    }
  }, [replyTo, text, event_id, sendCb, onReply, me])

  return (
    <Row justifyContent={'space-between'} wrapperStyle={styles.pt15}>
      <Avatar size={43} placeholder={false} avatarLink={getFileFromUrl(avatar)} />
      <TextInput
        withSend
        value={text}
        onSend={_onSend}
        onChange={setText}
        wrapperStyle={styles.composer}
        placeholder={'Добавить комментарий'}
      />
    </Row>
  )
}

export default Composer
