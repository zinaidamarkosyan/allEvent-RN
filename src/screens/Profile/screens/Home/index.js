import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import Toast from 'react-native-toast-message'

import { BUTTON_OPACITY, getFileFromUrl, MAIL_VALIDATOR, ORGANIZER } from '@/constants'
import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import PrimaryButton from '@/components/buttons/primary'
import TextInput from '@/components/inputs/input'
import Row from '@/components/masks/Row'
import Avatar from '@/components/avatar'
import APICalls from '@/apis/APICalls'
import { useAuth } from '@/hooks'

import bookmarkIcon from '@/assets/icons/ic_bookmark_profile.png'
import settingsIcon from '@/assets/icons/ic_settings_profile.png'
import supportIcon from '@/assets/icons/ic_support_profile.png'
import deleteIcon from '@/assets/icons/ic_delete_profile.png'
import eventsIcon from '@/assets/icons/ic_events_profile.png'
import historyIcon from '@/assets/icons/ic_menu_profile.png'
import heartIcon from '@/assets/icons/ic_heart_profile.png'
import docsIcon from '@/assets/icons/ic_docs_profile.png'
import logoutIcon from '@/assets/icons/ic_logout.png'
import editIcon from '@/assets/icons/ic_edit.png'

import { EVENT_TYPE } from '../../shared/constants'
import styles from '../../shared/sharedStyles'
import ProfileModal from '../../shared/modal'

const ProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [image, setImage] = useState(null)
  const {
    me: { roles },
    me,
    getMe,
    uploadFiles,
  } = useAuth()
  const [email, setEmail] = useState(me?.email)
  const [isLoading, setLoading] = useState(false)
  const [editable, setEditable] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [name, setName] = useState(`${me?.name || ''} ${me?.surname || ''}`)

  const { name: role } = roles || {}

  const isOrganizer = role === ORGANIZER
  const Profile = [
    ...(isOrganizer
      ? [
          {
            label: 'Организованные события ',
            icon: eventsIcon,
            action: () => navigation.push('AllEvents', { type: EVENT_TYPE.IS_MY }),
          },
        ]
      : []),
    ...(!isOrganizer
      ? [
          {
            label: 'История событий',
            icon: historyIcon,
            action: () => navigation.push('AllEvents', { type: EVENT_TYPE.HISTORY }),
          },
          {
            label: 'Избранные события',
            icon: bookmarkIcon,
            action: () => navigation.navigate('Избранное'),
          },
          {
            label: 'Понравившиеся события',
            icon: heartIcon,
            action: () => navigation.push('AllEvents', { type: EVENT_TYPE.LIKED }),
          },
        ]
      : []),

    {
      label: 'Служба поддержки',
      icon: supportIcon,
      action: () => navigation.push('Support'),
    },
    {
      label: 'Документы',
      icon: docsIcon,
      action: () => navigation.push('Docs'),
    },
    {
      label: 'Настройки',
      icon: settingsIcon,
      action: () => navigation.push('Settings'),
    },
    {
      label: 'Выход',
      icon: logoutIcon,
      action: () => setShowLogout(true),
    },
    {
      label: 'Удалить аккаунт',
      icon: deleteIcon,
      action: () => setShowDelete(true),
    },
  ]

  React.useEffect(() => {
    if (!isFocused && editable) {
      setEditable(false)
    }
  }, [isFocused, editable])

  React.useEffect(() => {
    setEmail(me?.email)
    setName(`${me?.name || ''} ${me?.surname || ''}`)
  }, [me])

  const deleteAccount = React.useCallback(() => {
    if (isLoading) return
    setLoading(true)
    APICalls.deleteAccount().then((res) => {
      if (res.success) {
        global.signOut?.()
      }
    })
  }, [isLoading])

  const _save = React.useCallback(async () => {
    if (email && !email.match(MAIL_VALIDATOR)) {
      return Toast.show({ type: 'error', text1: 'Неверный формат адреса почты' })
    }
    setEditable(false)
    const [_name, _surname] = name.trim().split(' ')
    const data = {}
    if (_name !== me?.name) {
      data.name = _name || ''
    }
    if (_surname !== me?.surname) {
      data.surname = _surname || ''
    }
    if (email !== me?.email) {
      data.email = email?.trim?.()
    }
    if (image) {
      setLoading(true)
      await uploadFiles([image]).then(async (res) => {
        const _data = await res.json()
        data.avatar = _data.path
      })
    }
    if (Object.keys(data).length) {
      setLoading(true)
      APICalls.updateUser(data).then((res) => {
        setLoading(false)
        if (res.success) {
          getMe()
          setName('')
          setEmail('')
          setImage(null)
        }
      })
    } else {
      setImage(null)
      setEmail(me?.email)
      setName(`${me?.name || ''} ${me?.surname || ''}`)
    }
  }, [name, email, getMe, image, uploadFiles, me])

  return (
    <ScreenWrapperWithNavigation hasBack loading={isLoading} wrapperStyle={styles.profileWrapper}>
      <Row wrapperStyle={{ alignItems: 'flex-start' }} justifyContent={'space-between'}>
        <Row wrapperStyle={{ alignItems: 'flex-start' }}>
          <Avatar
            resizeMode={'cover'}
            editable={editable}
            setImage={setImage}
            avatarLink={image?.uri || (me?.avatar && getFileFromUrl(me?.avatar))}
          />
          <View style={[styles.ml22, editable && styles.maxWidth]}>
            {editable ? (
              <>
                <TextInput value={name} onChange={setName} placeholder={'Имя Фамилия'} />
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder={'E-mail'}
                  wrapperStyle={styles.mt12}
                  validateError={email && !email.trim().match(MAIL_VALIDATOR)}
                />
                <PrimaryButton
                  onPress={_save}
                  label={'Сохранить'}
                  wrapperStyle={[styles.save, styles.mt12]}
                />
              </>
            ) : (
              <>
                <Text style={styles.fullName}>{`${me?.name || 'Имя'} ${
                  me?.surname || (me?.name ? '' : 'Фамилия')
                }`}</Text>
                <Text style={styles.account}>+{me?.phone_number}</Text>
                <Text style={styles.account}>{me?.email}</Text>
              </>
            )}
          </View>
        </Row>
        {!editable && (
          <TouchableOpacity
            onPress={() => {
              setEditable(true)
            }}
          >
            <FastImage source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
        )}
      </Row>
      {editable && <Text style={[styles.account, styles.mvBM7T30]}>+{me?.phone_number}</Text>}
      <View style={styles.container}>
        {Profile.map((_value, idx) => {
          const Icon = _value.icon
          return (
            <TouchableOpacity
              onPress={() => _value.action?.()}
              key={idx.toString()}
              style={[styles.row, styles.item]}
              activeOpacity={BUTTON_OPACITY}
            >
              <FastImage source={Icon} style={styles.profileIcons} />
              <Text style={styles.title}>{_value.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      {showLogout && (
        <ProfileModal
          onConfirm={global?.signOut}
          onClose={() => setShowLogout(false)}
          title={`Вы действительно хотите\nвыйти из “Alleven”?`}
        />
      )}
      {showDelete && (
        <ProfileModal
          onConfirm={deleteAccount}
          onClose={() => setShowDelete(false)}
          title={`Вы действительно хотите\nудалить аккаунт?`}
        />
      )}
    </ScreenWrapperWithNavigation>
  )
}

export default ProfileScreen
