import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid, AtSegmentedControl } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import Player from '../../components/player'
import { getTopList } from '../../api'
import { EnvMusicTypes } from '../../store/envmusic'
import { ENV_MUSIC_DATA } from '../../config'

interface TopListProps {
	envmusicStore: EnvMusicTypes
}

interface StateTypes {
	topList: any
	topListMap: object
	current: number
}

@inject('envmusicStore')
@observer
export default class TopList extends Component<TopListProps, StateTypes> {
	constructor(props: TopListProps) {
		super(props)
		const { envMusic } = this.props.envmusicStore
		const current = ENV_MUSIC_DATA.findIndex(item => item === envMusic)
		this.state = {
			topList: [],
			topListMap: {},
			current
		}
	}

	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		navigationBarTitleText: '排行榜'
	}

	componentWillMount() {
		this._getTopList()
	}

	_getTopList() {
		getTopList().then(res => {
			const { data } = res
			const { topListMap } = this.state
			const { envMusic } = this.props.envmusicStore
			topListMap[envMusic] = data
			this.setState({
				topList: data,
				topListMap
			})
		})
	}

	componentDidMount() {}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	handleClick = index => {
		if (index !== this.state.current) {
			this.setState({
				current: index
			})
			const { topListMap } = this.state
			const envMusic = ENV_MUSIC_DATA[index]
			this.props.envmusicStore.setEnvMusic(envMusic)
			if (topListMap[envMusic]) {
				this.setState({
					topList: topListMap[envMusic]
				})
			} else {
				this._getTopList()
			}
		}
	}

	handleGridClick = item => {
		Taro.navigateTo({
			url: `/pages/details/index?id=${item.id}&title=${item.name}`
		})
	}

	render() {
		const data = this.state.topList.map(item => ({
			image: item.picUrl,
			value: item.name,
			...item
		}))
		return (
			<View className="index">
				<AtSegmentedControl
					values={['网易云音乐', 'QQ 音乐']}
					onClick={this.handleClick}
					current={this.state.current}
				/>
				<AtGrid data={data} onClick={this.handleGridClick} />
				<Player />
			</View>
		)
	}
}
