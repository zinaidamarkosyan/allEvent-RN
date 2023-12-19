import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { getFileFromUrl } from '@/constants'
import Avatar from '@/components/avatar'
import Row from '@/components/masks/Row'

import styles from './sharedStyles'

const UserCard = ({ item, event_id }) => {
  const navigation = useNavigation()

  const _openProfile = React.useCallback(() => {
    navigation.push('Profile', { user: item, event_id })
  }, [item, event_id, navigation])

  return (
    <Row touchable onPress={_openProfile} wrapperStyle={styles.mt18}>
      <Avatar placeholder={false} avatarLink={getFileFromUrl(item?.avatar)} size={38} />
      <Text style={[styles.pageTitle, styles.ml25]}>{`${item?.name || ''} ${
        item?.surname || ''
      }`}</Text>
    </Row>
  )
}

export default UserCard
