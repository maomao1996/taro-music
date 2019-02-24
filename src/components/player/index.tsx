import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import events from '../../utils/events'
import { getGlobalData } from '../../store'
import { MusicTypes } from '../../store/music'

import './index.scss'

interface PlayerProps {
	musicStore: MusicTypes
}

@inject('musicStore')
@observer
export default class Player extends Component<PlayerProps> {
	private audio = getGlobalData('backgroundAudioManager')
	constructor(props: PlayerProps) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		this.initAudio()
		this.bindEvents()
	}

	componentWillUnmount() {
		this.unbindEvents()
	}

	bindEvents() {
		events.on('play', this.play)
	}

	unbindEvents() {
		events.off('play', this.play)
	}

	initAudio() {
		// 结束事件
		this.audio.onEnded(() => {
			this.next()
		})
	}

	prev() {}

	play = () => {
		// console.log('initEvents:play', this.props.musicStore)
		const { currentSong } = this.props.musicStore
		this.audio.src = currentSong.src
		this.audio.title = currentSong.name
		// setTimeout(() => {
		// 	this.audio.seek(currentSong.duration * 0.98)
		// })
	}

	next() {
		const { currentIndex, playlist } = this.props.musicStore
		let index = currentIndex + 1
		if (index === playlist.length) {
			index = 0
		}
		this.props.musicStore.setCurrentSong(index)
	}
	render() {
		return <View />
	}
	// render() {
	// 	const { currentSong } = this.props.musicStore
	// 	console.log('currentSong', currentSong)
	// 	return (
	// 		currentSong &&
	// 		currentSong.id && (
	// 			<View className="player">
	// 				<View className="player-fill" />
	// 				<View className="player-min">
	// 					<Image className="player-min-img" mode="scaleToFill" src={currentSong.album.picUrl} />
	// 					<View className="player-min-info">
	// 						<View className="player-min-name">{currentSong.name}</View>
	// 						<View className="player-min-singer">{currentSong.singer.map(i => i.name).join('/')}</View>
	// 					</View>
	// 					{/* <View className="playe-btn-play mm-icon">
	// 						<Text className="icon-prev" />
	// 					</View>
	// 					<View className="playe-btn-play mm-icon">
	// 						<Text className="icon-prev">假按揭</Text>
	// 					</View> */}
	// 				</View>
	// 				<View className="player-full" />
	// 			</View>
	// 		)
	// 	)
	// }
}
