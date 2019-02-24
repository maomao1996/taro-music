import { observable } from 'mobx'
import events from '../utils/events'
import { findIndex } from '../utils'

export interface CurrentSongTypes {
	src: string
	name: string
	singer: string
}

export interface MusicTypes {
	// audioManager: any
	// setAudioManager: Function
	playlist: any[]
	currentIndex: number
	currentSong: object | CurrentSongTypes
	play: Function
	switch: Function
	setCurrentSong: Function
}

export default observable<MusicTypes>({
	// audioManager: null,
	// setAudioManager(audioManager) {
	// 	this.audioManager = audioManager
	// },
	playlist: [],
	currentIndex: -1,
	currentSong: {},
	play({ song }) {
		if (song.id === this.currentSong.id) {
			return
		}
		const playlist = [...this.playlist]
		// 查询当前播放列表是否有待插入的音乐，并返回其索引
		let currentIndex = findIndex(playlist, song)
		// 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引
		if (currentIndex === -1) {
			currentIndex = playlist.push(song) - 1
			this.playlist = playlist
		}
		this.currentIndex = currentIndex
		this.currentSong = [...this.playlist][currentIndex]
		console.log(this.playlist)
		events.trigger('play')
	},
	switch() {},
	setCurrentSong(currentIndex) {
		this.currentIndex = currentIndex
		this.currentSong = [...this.playlist][currentIndex]
		events.trigger('play')
	}
})
