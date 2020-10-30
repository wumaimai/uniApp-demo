import { isPhone } from "./validate";

export function UUID() {
  let s = [];
  let hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  let uuid = s.join("");
  return uuid;
}

//脱敏手机号
export function desensitizationPhone(phone){
  let pat=/(\d{3})\d*(\d{4})/
  return isPhone(phone) == true ? phone.replace(pat,'$1****$2') : '';
}