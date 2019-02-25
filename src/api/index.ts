import API from '../utils/request'
import envmusicStore from '../store/envmusic'

export function getTopList() {
  return API.get(`/toplist/${envmusicStore.envMusic}`)
}

export function getTopListDetail(id: number) {
  return API.get(`/toplist/detail/${envmusicStore.envMusic}?id=${id}`)
}

export function getSongUrl(id: number | string, type: string) {
  return API.post({
    url: `/song/url/${type}`,
    data: {
      id: [id]
    }
  })
}
