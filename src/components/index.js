import sdForm from "./sd-form/sd-form";
import sdFormItem from "./sd-form/sd-form-item";

function plugins(Vue){
  Vue.component('sd-form', sdForm);
  Vue.component('sd-form-item', sdFormItem);
}

export default plugins;