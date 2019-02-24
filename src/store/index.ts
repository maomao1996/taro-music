import envmusicStore from './envmusic'
import musicStore from './music'

// 创建一个全局对象
const globalData = {}

export function setGlobalData(key: string, val: any) {
	globalData[key] = val
}

export function getGlobalData(key: string) {
	return globalData[key]
}

export default {
	musicStore,
	envmusicStore
}
