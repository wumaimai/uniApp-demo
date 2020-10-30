import MinRequest from './MinRequest'

import store from '@/store'
import Setting from '@/Setting'
import $cache from '@/plugins/cache'


const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	Object.assign(request.header, {
		token: store.getters.token || ''
	})
	request.data = Object.assign({},{
		sourceCode: Setting.sourceCode
	}, request.data || {})

	request.loading && uni.showLoading({
		title: '加载中'
	});
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	response.loading && uni.hideLoading();
	response.data && response.data.serverTime && $cache.set('_serviceTime', response.data.serverTime)
	if (response.data && (response.data.message === '100102009' || response.data.desc == '登录已过期，请重新登录~')) {
		store.dispatch('user/logout').then(() => {
			//跳转到登录页面
			// uni.reLaunch({
			// 	url: '/pages/login/login?autoLogin=1',
			// });
		});
	}
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	let { environment, proxy } = Setting;
	config.baseURL = proxy[environment] || ''
	return config
})

export const request = minRequest.request.bind(minRequest)

// $minApi
export default {
	apis: {
		/**
		 * @param {Object} options
		 */
		request(options) {
			return minRequest.request(options);
		},
		/**
		 * @param { string } url
		 * @param {Object} data
		 * @param {Object} options
		 */
		get(url, data, options) {
			return minRequest.get(url, data, options)
		},
		/**
		 * @param { string } url
		 * @param {Object} data
		 * @param {Object} options
		 */
		post(url, data, options) {
			return minRequest.post(url, data, options)
		}
	}
}
