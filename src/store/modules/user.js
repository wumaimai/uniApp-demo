import $cache from '@/plugins/cache';
import { request } from "@/plugins/request";
import { desensitizationPhone } from "@/utils"

// initial state
const state = {
	token: $cache.get('_token', '')
}

// actions
const actions = {
	login({
		state,
		commit
	}, params) {
		return request({
			url: 'xxx/login',
			method: 'post',
			data: params,
			loading: true
		}).then(res => {
			if (res.code != 'SUCCESS') {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return Promise.resolve(false);
			}
			commit('setToken', res.data);
			// console.log(desensitizationPhone());
			commit('setPhone', desensitizationPhone(params.phone));
			
			return Promise.resolve(true);
		}).catch(err => {
			return Promise.reject();
		})
	},
	logout({
		state,
		commit
	}) {
		commit('clearToken');
		// commit('clearUserDetail');
	}
}

// mutations
const mutations = {
	setToken(state, {
		token,
		refreshToken
	}) {
		if (token) {
			state.token = token;
			$cache.set('_token', token);
		}
		refreshToken && $cache.set('_refreshToken', refreshToken);
	},
	setPhone(state, phone){
		if (phone) {
			state.phone = phone;
			$cache.set('_phone', phone);
		}
	},
	clearToken(state) {
		state.token = '';
		state.phone = '';
		$cache.set('_token', '');
		$cache.set('_phone', '');
		uni.reLaunch({
			url: '/pages/login/index'
		});
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
