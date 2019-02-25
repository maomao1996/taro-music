import { observable, toJS } from 'mobx'
import events from '../utils/events'
import { findIndex } from '../utils'

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
    const playlist = toJS(this.playlist)
    // 查询当前播放列表是否有待插入的音乐，并返回其索引
    let currentIndex = findIndex(playlist, song)
    // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引
    if (currentIndex === -1) {
      currentIndex = playlist.push(song) - 1
      this.playlist = playlist
    }
    this.currentIndex = currentIndex
    this.currentSong = playlist[currentIndex]
    console.log(toJS(this.playlist))
    events.trigger('play')
  },
  switch() {},
  setCurrentSong(currentIndex) {
    this.currentIndex = currentIndex
    this.currentSong = toJS(this.playlist)[currentIndex]
    events.trigger('play')
  }
})
