import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import PrimaryButton from '@/components/buttons/primary'
import TextInput from '@/components/inputs/input'
import SupportIcon from '@/assets/icons/support'
import APICalls from '@/apis/APICalls'

import styles from '../../shared/sharedStyles'

const SupportScreen = ({ navigation }) => {
  const [topic, setTopic] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const sendFeedBack = React.useCallback(() => {
    if (isLoading || !topic.trim() || !message.trim()) return
    setLoading(true)
    APICalls.supportCall({ topic, message }).then((res) => {
      setLoading(false)
      if (res.success) {
        navigation.goBack()
      }
    })
  }, [topic, message, navigation, isLoading])

  return (
    <ScreenWrapperWithNavigation hasBack hideBell loading={isLoading}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        enableResetScrollToCoords
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.supportWrapper}
      >
        <SupportIcon />
        <TextInput
          value={topic}
          onChange={setTopic}
          placeholder={'Тема'}
          wrapperStyle={styles.mt50}
        />
        <TextInput
          lines={5}
          value={message}
          onChange={setMessage}
          placeholder={'Сообщение'}
          wrapperStyle={[styles.mt17, styles.br20]}
        />
        <PrimaryButton onPress={sendFeedBack} label={'Отправить'} wrapperStyle={styles.mt27} />
      </KeyboardAwareScrollView>
    </ScreenWrapperWithNavigation>
  )
}

export default SupportScreen
