import { observable } from 'mobx'
import { ENV_MUSIC_DEFAULT } from '../config'

export interface EnvMusicTypes {
	envMusic: string
	setEnvMusic: Function
	counterStore: Function
}

export default observable<EnvMusicTypes>({
	envMusic: ENV_MUSIC_DEFAULT,
	setEnvMusic(envMusic) {
		this.envMusic = envMusic
	},
	counterStore(envMusic) {
		this.envMusic = envMusic
	}
})
