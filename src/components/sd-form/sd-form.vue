<template>
	<view>
		<form :report-submit="reportSubmit"  @submit="formSubmit" @reset="formReset">
			<slot />
		</form>
	</view>
</template>

<script>
	export default {
		name: 'SdForm',
		props: {
			form: {
				type: Object,
				default: function (){
					return {}
				}
			},
			rules: {
				type: Object,
				default: function (){
					return {}
				}
			},
			// 提示模式 1. out 弹框提提示 2.in item 页面内 item 文字提示 3 msg 消息框提示
			msgType: {
				type: String,
				default: 'out'
			},
			// block 独占一行 inlie与内容共一行
			labelType: {
				type: String,
				default: 'block'
			},
			labelWidth: {
				type: String,
				default: 'auto'
			},
			align: {
				type: String,
				default: 'left'
			},
			reportSubmit: {
				type: Boolean,
				default: false
			},
			submit: Function,
			reset: Function
		},
		methods: {
			formSubmit(e) {
				this.$emit('submit',e)
			},
			formReset(e) {
				this.$emit('reset',e)
			},
			// 规则校验 
			validate(callback) {
				let vb = true
				let item = this.getItem(this.$children)
				for(let i = 0; i < item.length; ++i) {
					// 对表单下的子组件 form-item 做数据校验
					let bol = item[i].validate ? item[i].validate() : true
					if(vb && !bol) {
						vb = false
					}
					if(this.msgType != 'in' && !bol) {
						break
					}
				}
				callback && callback(vb)
			},
			// 递归遍历子元素 筛选 form-item
			getItem(children,item) {
				item = item || []
				children.forEach(it => {
					if(it.$options.name && it.$options.name === 'SdFormItem' ||
					it.$options._componentTag && it.$options._componentTag === 'sd-form-item'){
						item.push(it)
					} else if(it.$children.length){
						item = this.getItem(it.$children,item)
					}
				})
				return item
			}
		},
	}
</script>

<style  lang="scss">
</style>
