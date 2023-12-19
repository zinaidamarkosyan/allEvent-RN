import React from 'react'
import { Image } from 'react-native'

const notification = require('@/assets/icons/ic_notification_outline.png')
const phone = require('@/assets/icons/ic_phone.png')

import styles from './sharedStyles'

export const EVENT_TYPE = { IS_MY: 1, HISTORY: 2, LIKED: 3, BOOKMARK: 4 }
export const SETTINGS = [
  {
    forCreator: true,
    key: 'notifications',
    styles: styles.flexStart,
    title: 'Список уведомлений',
    icon: () => <Image source={notification} style={styles.icon} />,
  },
  {
    forCreator: false,
    key: 'categories',
    styles: { ...styles.flexStart, ...styles.mt32 },
    title: 'Выбрать избранные категории',
    icon: () => <Image source={phone} style={styles.phoneIcon} />,
  },
]
export const NOTIFICATION_SETTINGS = []
