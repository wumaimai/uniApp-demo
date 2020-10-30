import MinRouter from './MinRouter'

// 配置路由
// type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']
// 跳转方式(默认跳转方式)
const router = new MinRouter({
	routes: [
		{
			path: "pages/login/index",
			type: 'reLaunch',
			name: 'login'
		},
		{
			path: "pages/home/index",
			type: 'switchTab',
			name: 'home'
		},{
			path: "pages/personal/aboutUs",
			type: 'navigateTo',
			name: 'aboutUs'
		}]
})

export default router