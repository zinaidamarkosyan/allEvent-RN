import React from 'react'
import { Text, View } from 'react-native'
import DateRangePicker from 'react-native-daterange-picker'
import Modal from 'react-native-modal'
import moment from 'moment-timezone'
import 'moment/locale/ru'

moment.locale('ru')

const DatePicker = ({ close = () => null, onChange = () => null }) => {
  const [range, setRange] = React.useState({
    startDate: null,
    endDate: null,
    displayedDate: moment(),
  })

  React.useEffect(() => {
    const { endDate, startDate } = range
    if (endDate && startDate) {
      onChange({ end: endDate, start: startDate })
      close()
    }
  }, [range, close, onChange])

  const { endDate, startDate, displayedDate } = range

  return (
    <Modal
      isVisible
      hasBackdrop
      style={{ margin: 0 }}
      onBackdropPress={() => close()}
      onBackButtonPress={() => close()}
      children={
        <View style={{ flex: 1 }}>
          <DateRangePicker
            open
            range
            moment={moment}
            endDate={endDate}
            startDate={startDate}
            displayedDate={displayedDate}
            onChange={(dates) => setRange((prevRange) => ({ ...prevRange, ...dates }))}
          >
            <Text></Text>
          </DateRangePicker>
        </View>
      }
    />
  )
}

export default DatePicker
