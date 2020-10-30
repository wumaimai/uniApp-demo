<template>
  <view>
    <!-- <slot /> -->
    <slot v-bind:time="time | change">
      <!-- <h1>后备内容</h1> -->
    </slot>
  </view>
</template>

<script>

let flag = false
export default {
  filters: {
    change(value) {
      if (!value) return "";
      if (!isNaN(value)) {
        if (flag == true) {
          return `重新发送${value}S`;
        }
        return value + "S";
      } else {
        return value;
      }
    }
  },
  props: {
    start: {
      type: Boolean,
      default: false
    },
    countdownTime: {
      type: Number,
      default: 30
    }
  },
  watch: {
    start(value, oldvalue) {
      if (value) {
        this.countDown();
      }
    }
  },
  data() {
    return {
      time: '发送验证码'
    };
  },
  methods: {
    countDown(){
      this.time = this.countdownTime;
      let time = setInterval(() => {
        this.time--;
        //storage.set("countDownTime", this.time);
        this.$cache.set("_countDownTime", this.time);
        if (this.time == 0) {
          this.$emit("countDown");
          this.time = "重新获取验证码";
          flag = true;
          this.$cache.delete("_countDownTime");
          clearInterval(time);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>