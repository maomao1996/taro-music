import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import TopList from './pages/toplist'

import store, { setGlobalData } from './store'

import './app.scss'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		pages: ['pages/toplist/index', 'pages/details/index', 'pages/player/index'],
		requiredBackgroundModes: ['audio'],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: 'WeChat',
			navigationBarTextStyle: 'black'
		}
	}

	componentDidMount() {
		// backgroundAudioManager 使用 mobx 存储后无法播放 改为全局变量存储
		const backgroundAudioManager = Taro.getBackgroundAudioManager()
		setGlobalData('backgroundAudioManager', backgroundAudioManager)
	}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return (
			<Provider store={store}>
				<TopList />
			</Provider>
		)
	}
}

Taro.render(<App />, document.getElementById('app'))
