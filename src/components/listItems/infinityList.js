import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, FlatList } from 'react-native'

import { RH } from '@/theme/utils'

export default class InfinityList extends React.PureComponent {
  render() {
    const {
      data,
      Component,
      horizontal,
      wrapperStyle,
      ListEmptyComponent,
      ListFooterComponent,
      ListHeaderComponent,
      ItemSeparatorComponent,
    } = this.props
    return (
      <FlatList
        data={data}
        scrollEnabled
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[styles.wrapperStyle, wrapperStyle]}
        ListEmptyComponent={ListEmptyComponent && <ListEmptyComponent />}
        contentContainerStyle={[
          { paddingBottom: RH(30), flexGrow: 1 },
          horizontal && { justifyContent: 'flex-end' },
          !data.length && { justifyContent: 'center', flex: 1, alignItems: 'center' },
        ]}
        ListFooterComponent={ListFooterComponent && <ListFooterComponent />}
        ListHeaderComponent={ListHeaderComponent && <ListHeaderComponent />}
        renderItem={({ item, index }) => {
          return (
            <Component item={item} index={index} hideBorder={!!ListHeaderComponent && !index} />
          )
        }}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent ? <ItemSeparatorComponent /> : null}
      />
    )
  }
}

const styles = StyleSheet.create({
  wrapperStyle: { flex: 1 },
})

InfinityList.defaultProps = {
  data: [],
  Component: null,
  wrapperStyle: {},
  ListHeaderComponent: null,
  ItemSeparatorComponent: null,
}

InfinityList.propTypes = {
  wrapperStyle: PropTypes.object,
  data: PropTypes.array.isRequired,
  ListHeaderComponent: PropTypes.func,
  Component: PropTypes.func.isRequired,
  ItemSeparatorComponent: PropTypes.func,
}
