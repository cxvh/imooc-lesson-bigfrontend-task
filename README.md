> 【作业第10周】2-9 作业

## 演示图

![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/20.gif)
---
## 主要代码

校验规则
```js
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
extend('diff_max_min', {
  validate: function (value, _a) {
    var _b = _a === void 0 ? {} : _a,
      min = +_b.min,
      max = +_b.max;
    return String(value).length <= max && String(value).length >= min;
  },
  params: [{
    name: 'min'

  }, {
    name: 'max'
  }]
});
extend('nonumber', {
  validate: function (value){
    // return isNaN(Number(value));
    // !(/^\d+/).test(value)
    return !(/^[0-9]*$/).test(value)
  }
});
localize('zh_CN',{
  messages:{
      ...zh.messages,
      "email": "请输入正确的邮箱格式",
      "length": "{_field_}长度要求{length}",
      "confirmed": "{_field_}不能和{target}匹配",
      "min": "请在{_field_}输入至少{length}个字符",
      "max": "{_field_}必须最多有{length}个字符",
      "diff_max_min":"{_field_}必须在{min}与{max}之间",
      "nonumber":"不能以纯数字为{_field_}",
      "required": "请输入{_field_}"
    },
    "names": {
        "nickname": "昵称",
        "password": "密码",
        "rpassword": "确认密码",
        "name": "账号",
        "email":"邮箱",
        "code": "验证码"
    },
    "fields": {
        "password": {
            "min": "不符合最小长度要求",
            "confirmed":"{_field_}不能和{_target_}匹配" //"{_field_}{_value_}{_rule_}{target}{_target_}"
        },
        "rpassword":{
            "confirmed":"两次密码不一致"
        }
    }
})
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
```
