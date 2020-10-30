let cacheMap = new Map()
let timeoutDefault = 0

function isTimeout(name) {
	const data = cacheMap.get(name)
	if (!data) return true
	if (data.timeout === 0) return false
	const currentTime = Date.now()
	const overTime = (currentTime - data.createTime) / 1000
	if (overTime > data.timeout) {
		cacheMap.delete(name)
		if (name.startsWith('_')) {
			try {
				uni.removeStorageSync(name)
			} catch (e) {
				console.log(e)
			}
		}
		return true
	}
	return false
}


class CacheCell {
	constructor(data, timeout) {
		this.data = data
		this.timeout = timeout
		this.createTime = Date.now()
	}
}

class MinCache {
	constructor(timeout) {
		try {
			const res = uni.getStorageInfoSync()
			res.keys.forEach(name => {
				try {
					const value = uni.getStorageSync(name)
					cacheMap.set(name, value)
				} catch (e) {
					console.log(e)
				}
			})
		} catch (e) {
			console.log(e)
		}
		timeoutDefault = timeout
	}
	set(name, data, timeout = timeoutDefault) {
		const cachecell = new CacheCell(data, timeout)
		let cache = null
		if (name.startsWith('_')) {
			try {
				uni.setStorageSync(name, cachecell)
				cache = cacheMap.set(name, cachecell)
			} catch (e) {
				console.log(e)
			}
		} else {
			cache = cacheMap.set(name, cachecell)
		}
		return cache
	}

	get(name, defaultValue = null) {
		return isTimeout(name) ? defaultValue : cacheMap.get(name).data
	}
	
	delete(name) {
		let value = false
		if (name.startsWith('_')) {
			try {
				uni.removeStorageSync(name)
				value = cacheMap.delete(name)
			} catch (e) {
				console.log(e)
			}
		} else {
			value = cacheMap.delete(name)
		}
		return value
	}
	has(name) {
		return !isTimeout(name)
	}
	clear() {
		let value = false
		try {
			uni.clearStorageSync()
			cacheMap.clear()
			value = true
		} catch (e) {
			console.log(e)
		}
		return value
	}
}

MinCache.install = function(Vue, {
	timeout = 0
} = {}) {
	Vue.prototype.$cache = new MinCache(timeout)
}

export default MinCache


/**
 *
 * // 'name'不是以下划线开头的表示会缓存到Map中，在程序生命周期内有并且在有效时间内有效
		// 注意：'test'并不是以下划线命名表示在程序生命周期永久缓存
		this.$cache.set('test', 'testdemo', 0);  //0表示不会过期  default为0  

		// 先检查有没有缓存
		// 没有缓存就发起请求
		// '_imgURL'是以下划线开头的表示会缓存到Storage
		// if (!this.$cache.has('_imgURL')) {
		// 	// 模拟请求1s后返回
		// 	setTimeout(() => {
		// 		// 模拟数据

		// 		// 过期时间设置为0表示不会过期
		// 		// 注意：'_imgURL'是以下划线命名表示永久缓存到Storage
		// 		this.$cache.set('_imgURL', data, 0);
		// 	}, 1000);
		// }

		// 给定缓存时间10s
		this.$cache.set('test_timeout', 'test_timeout', 10);
		console.log(this.$cache.get('test_timeout'));
		setTimeout(() => {
			console.log(this.$cache.get('test_timeout'));
		}, 11000);
 */
