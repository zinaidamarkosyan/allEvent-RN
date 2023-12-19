import React from 'react'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import InfinityList from '@/components/listItems/infinityList'
import APICalls from '@/apis/APICalls'

import styles from '../../shared/sharedStyles'
import Doc from '../../shared/doc'

const DocsScreen = () => {
  const [documents, setDocuments] = React.useState([])

  React.useEffect(() => {
    APICalls.getDocs().then((res) => {
      setDocuments(res.data.data)
    })
  }, [])

  return (
    <ScreenWrapperWithNavigation hasBack wrapperStyle={styles.docsWrapper}>
      <InfinityList
        data={documents}
        wrapperStyle={styles.docView}
        Component={(props) => <Doc {...props} />}
      />
    </ScreenWrapperWithNavigation>
  )
}

export default DocsScreen
