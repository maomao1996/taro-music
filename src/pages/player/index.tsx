import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { getTopListDetail } from '../../api'

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
