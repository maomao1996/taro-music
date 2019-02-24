import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import Player from '../../components/player'
import { getTopListDetail, getSongUrl } from '../../api'
import { MusicTypes } from '../../store/music'

import './index.scss'

interface DetailsProps {
	musicStore: MusicTypes
}

export interface StateType {
	data: any
	musicType: string
}

@inject('musicStore')
@observer
export default class List extends Component<DetailsProps, StateType> {
	constructor(props: DetailsProps) {
		super(props)
		this.state = {
			data: null,
			musicType: ''
		}
	}

	config: Config = {
		navigationBarTitleText: '歌单详情'
	}

	componentDidMount() {
		const { id, title } = this.$router.params
		Taro.setNavigationBarTitle({ title })
		getTopListDetail(id).then(res => {
			const { data, musicType } = res
			this.setState({
				data,
				musicType
			})
		})
	}

	handleListClick(song) {
		const { musicStore } = this.props
		switch (song.musicType) {
			case '163':
				song.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
				musicStore.play({
					song
				})
				break
			case 'qq':
				getSongUrl(song.mid, 'qq').then(res => {
					const { data } = res
					const src = data[0].url
					if (src) {
						song.src = src
						musicStore.play({
							song
						})
					} else {
						Taro.showToast({
							title: '当前平台暂无版权无法播放',
							icon: 'none',
							duration: 2000
						})
					}
				})
				break
		}
	}

	render() {
		const { data } = this.state
		const { musicStore: { currentSong } } = this.props
		return (
			<View>
				<AtList>
					{data &&
						data.songList &&
						data.songList.map((item, index) => (
							<AtListItem
								title={item.name}
								note={item.singer.map(i => i.name).join('/')}
								extraText={item.album.name}
								arrow="right"
								onClick={this.handleListClick.bind(this, item, index)}
								key={item.id}
								className={item.id === currentSong.id ? 'active' : ''}
								thumb={item.id === currentSong.id ? item.album.picUrl : ''}
							/>
						))}
				</AtList>
				<Player />
			</View>
		)
	}
}
