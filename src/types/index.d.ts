/**
 * store 相关
 */

interface EnvMusicTypes {
  envMusic: string
  setEnvMusic: Function
}

interface CurrentSongTypes {
  src: string
  name: string
  singer: string
}

interface MusicTypes {
  // audioManager: any
  // setAudioManager: Function
  playlist: any[]
  currentIndex: number
  currentSong: CurrentSongTypes | any
  play: Function
  switch: Function
  setCurrentSong: Function
}

/**
 * pages 相关
 */

interface TopListProps extends EnvMusicTypes, MusicTypes {
  envmusicStore: EnvMusicTypes
}

interface TopListState {
  topList: any
  topListMap: object
  current: number
}

interface DetailsProps extends MusicTypes {
  musicStore: MusicTypes
}

interface DetailsState {
  data: any
  musicType: string
}

/**
 * conponents 相关
 */

interface PlayerProps extends MusicTypes {
  musicStore: MusicTypes
}
