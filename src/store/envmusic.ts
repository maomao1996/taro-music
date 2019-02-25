import { observable } from 'mobx'
import { ENV_MUSIC_DEFAULT } from '../config'

export default observable<EnvMusicTypes>({
  envMusic: ENV_MUSIC_DEFAULT,
  setEnvMusic(envMusic) {
    this.envMusic = envMusic
  }
})
