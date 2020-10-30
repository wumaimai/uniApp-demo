import { isEmpty } from "@/utils/validate"

const checkLogin = function(){
  if(isEmpty(this.$store.getters.token)){
    this.$openPage('login');
  }
}

export default {
  onLoad(){
    checkLogin.call(this);
  }
}