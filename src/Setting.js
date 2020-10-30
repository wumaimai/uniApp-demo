import $cache from '@/plugins/cache';
import { UUID } from '@/utils';

let deviceId = $cache.get('_deviceId', '')  || UUID();
deviceId && $cache.set('_deviceId', deviceId);

export default {
	deviceId: deviceId,
	appVersion: '0.0.1',
	environment: 'Dev',
	proxy: {
		"Dev": "",
	}
}