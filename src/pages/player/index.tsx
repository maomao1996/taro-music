import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>播放器页面</Text>
      </View>
    )
  }
}
