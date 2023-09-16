// 阿里-饿了么 春招实习
const phoneNumber = '13712345678';
const hiddenNumber = phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
console.log(hiddenNumber); // 输出 137****5678
