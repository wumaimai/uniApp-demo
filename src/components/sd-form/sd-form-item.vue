<template>
	<view class="sd-form-item" :style="{width: theWidth}">
		<view :class="'label-' + theLabelType" :style="{alignItems: theVerticalAlign}">
			<view class="item-label" :style="theLabelStyle">
				<!-- <text class="item-required" v-show="theRequired">*</text> -->
				<view class="label-con">
					<slot name="label" >
						<text class="label-text">{{label}}</text>
						<text class="right" v-if="theLabelType=='block'&&labelRight">{{labelRight}}</text>
					</slot>
				</view>
			</view>
			<view class="item-con">
				<slot />
			</view>
		</view>
		<view class="item-msg" v-if="theForm.msgType=='in'">
			{{msg}}
		</view>
	</view>
</template>

<script>
	import {fromCheck} from './sd-validate.js'
	let fontUnit = 'upx'
	// #ifdef MP-WEIXIN
	fontUnit = 'rpx'
	// #endif
	export default {
		name: 'SdFormItem',
		props: {
			label: {
				type: String,
				default: '' // 字段名称
			},
			prop: {
				type: String,
				default: '' // 表单字段
			},
			width: {
				type: String,
				default: 'auto'
			},
			labelWidth: {
				type: String,
				default: ''
			},
			labelType: {
				type: String,
				default: '' // block 独占一行 inlie与内容共一行
			},
			align: {
				type: String,
				default: '' // label 文本水平对齐方式
			},
			labelRight: {
				type: String,
				default: '' // 当labelType 为 block 时 label 右侧显示文字
			}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ,
			required: {
				type: Boolean,
				default: false // 字段名左侧* 是否显示  默认由 校验规则 中的 required 控制
			},
			verticalAlign: {
				type: String,
				default: 'center' // label 文本垂直对齐方式
			}
		},
		data() {
			return {
				fontUnit: fontUnit,
				formField: ['labelType', 'labelWidth', 'align', 'msgType','form','rules'],
				msg: '',
			}
		},
		computed: {
			theRequired() {
				if(this.required || this.theForm.rules && this.theForm.rules[this.prop] && this.theForm.rules[this.prop].required) {
					return true
				}
				return false
			},
			theForm() {
				let parent = this.$parent;
				let parentName = parent.$options.name;
				while (parentName !== null && parentName !== 'SdForm') {
				  parent = parent ? parent.$parent : null;
				  parentName = parent ? parent.$options.name : null;
				}
				let theForm = {}
				if(parent) {
					this.formField.forEach(key => {
						theForm[key] = parent[key]
					})
				}
				return theForm;
			},
			theWidth() {
				return !isNaN(Number(this.width)) ? this.width + fontUnit : this.width
			},
			theLabelWidth(){
				let width = 'auto'
				if(!this.$slots.label) {
					width = this.labelWidth || this.theForm.labelWidth
					if(!isNaN(Number(width))) {
						width += fontUnit
					}
				}
				return width
			},
			theLabelType() {
				let labelType = this.labelType || this.theForm.labelType
				return labelType
			},
			theLabelStyle() {
				let width = this.theLabelType!='block' ? this.theLabelWidth : 'auto'
				let aligns = {left: 'flex-start', right: 'flex-end', center: 'center',between: 'space-between'}
				let align = this.align || this.theForm.align
				return `width: ${width}; justify-content: ${aligns[align]}; vertical-align: ${this.verticalAlign};`
			},
			theVerticalAlign() {
				let type = {top: 'flex-start', bottom: 'flex-end', center: 'center'}
				return type[this.verticalAlign]
			},
			value() {
				let form = this.theForm.form
				let value =  form ? form[this.prop] : ''
				// if(this.msg) {
				// 	this.validate()
				// }
				return value
			}
		},
		methods: {
			// 规则校验
			validate() {
				if(!this.theForm.rules) return
				let rule = this.theForm.rules[this.prop]
				this.msg = ''
				if(rule) {
					if(rule.required && (this.value == null || this.value == '')) {
						// 是否必填
						this.msg = rule.msg || this.label + '不能为空'
					}else if(rule.validator) {
						// 自定义规则校验函数
						let bol = rule.validator(this.value,rule)
						if(typeof bol == 'string') {
							this.msg = bol
						}else if(!bol) {
							this.msg = rule.message || this.label + '不符合规则'
						}
					}else if(rule.rule && this.value != null && this.value != '') {
						// 默认校验规则
						let bol = fromCheck(this.value, rule.rule, this.theForm.form)
						if(bol !== true) {
							this.msg = rule.message || this.label + bol
						}
					}
				}
				if(this.msg != '') {
					if(this.theForm.msgType == 'out') {
						// 弹框
						uni.showModal({ content: this.msg })
					}else if(this.theForm.msgType == 'msg'){
						// 消息框
						uni.showToast({
							icon: 'none',
							title: this.msg
						})
					}
				}
				return !this.msg
			}
		},
	}
</script>

<style  lang="scss" scoped>
	$color: #F56C6C; // 提示文字颜色
	.sd-form-item {
		// margin-bottom: 10upx;
		.label-block{
			.item-label {
				display:flex;
				margin-bottom: 2px;
				.label-con{
					flex:1;
				}
				.right {
					float: right;
				}
			}
		}
		.label-inline{
			display:flex;
			 align-items: flex-start;
			.item-label {
				display:flex;
				margin-right: 10upx;
			}
			.item-con {
				flex:1;
			}
		}
		.item-msg {
			margin:2px;font-size: 28upx;color: $color;min-height: 40upx;
		}
		.item-required{
			color: $color;
		}
	}
</style>
