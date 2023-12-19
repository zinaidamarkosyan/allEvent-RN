import React from 'react'
import { StackActions } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import { useEventHelpers, useAuth, useMapPlaceHelpers } from '@/hooks'
import Loader from '@/components/FullScreenLoader/loading'
import ProfileModal from '@/screens/Profile/shared/modal'
import { ORGANIZER } from '@/constants'

import ImpressionModal from '../../shared/impressionModal'
import CommentsModal from '../../shared/commentsModal'
import styles from '../../shared/sharedStyles'
import AboutEvent from './shared/aboutEvent'
import Edit from './shared/edit'

const DetailScreen = ({
  navigation,
  route: {
    params: { id, geometry, refScreen },
  },
}) => {
  const {
    me: { roles },
    isAuthenticated,
  } = useAuth()
  const eventHelpers = useEventHelpers({ id })
  const {
    editable,
    isLoading,
    setEditable,
    updateEvent,
    event: item,
    showComments,
    setImpression,
    setShowComments,
    selectedImpression,
    setSelectedImpression,
    detail: { showVisiting },
    updateDetails,
  } = eventHelpers
  const { name: role } = roles || {}
  const { scrollEnabled } = useMapPlaceHelpers()

  const goBack = React.useCallback(() => {
    if (!refScreen) {
      return navigation?.goBack?.()
    }
    navigation.dispatch(StackActions.popToTop())
    navigation.navigate('TabNavigator', {
      screen: refScreen,
    })
  }, [refScreen, navigation])

  if ((!role && isAuthenticated) || !Object.keys(item).length || isLoading) return <Loader />

  const isOrganizer = role === ORGANIZER

  return (
    <ScreenWrapperWithNavigation goBack={goBack} hasBack loading={isLoading}>
      <KeyboardAwareScrollView
        enableOnAndroid
        style={styles.detailWrapper}
        contentContainerStyle={styles.pb36}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!showComments && scrollEnabled}
      >
        {!editable && (
          <AboutEvent navigation={navigation} helpers={eventHelpers} isOrganizer={isOrganizer} />
        )}
        {editable && isOrganizer && (
          <Edit
            currentState={item}
            onSave={updateEvent}
            navigation={navigation}
            geometry={geometry?.coordinates}
            cancel={() => setEditable(false)}
          />
        )}
        {showVisiting && (
          <ProfileModal
            withButtons={false}
            title={'Вы подтвердили свое\nучастие'}
            onClose={() => updateDetails({ showVisiting: false })}
          />
        )}
        {showComments && <CommentsModal event_id={id} onClose={() => setShowComments(false)} />}
        {!!Object.keys(selectedImpression || {}).length && (
          <ImpressionModal
            setImage={setImpression}
            path={selectedImpression?.path}
            user={selectedImpression?.user}
            onClose={() => setSelectedImpression(null)}
          />
        )}
      </KeyboardAwareScrollView>
    </ScreenWrapperWithNavigation>
  )
}

export default DetailScreen
