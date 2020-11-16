import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules';

import zh from 'vee-validate/dist/locale/zh_CN.json'
/**
  alpha                   | 验证中的字段只能包含字母字符。
  alpha_dash              | 验证中的字段可能包含字母字符，数字，破折号或下划线。
  alpha_num               | 验证中的字段可能包含字母字符或数字。
  alpha_spaces            | 验证中的字段可能包含字母字符或空格。
  between                 | 验证中的字段必须具有一个以最小值和最大值为边界的数值。
  confirmed               | 验证中的字段必须与确认字段具有相同的值。
  digits                  | 验证中的字段必须是数字，并且具有指定的数字位数。
  dimensions              | 验证中添加到字段中的文件必须是具有指定尺寸的图像（jpg，svg，jpeg，png，bmp，gif）。
  email                   | 验证下的字段必须是有效的电子邮件。
  excluded                | 验证中的字段必须具有不在指定列表中的值。使用双等于进行检查。
  ext                     | 添加到验证字段中的文件必须具有指定的扩展名之一。
  image                   | 添加到验证项下字段的文件必须具有image mime类型(image/*)。
  oneOf                   | 验证下的字段必须具有指定列表中的值。使用双等号进行检查。
  integer                 | 验证下的字段必须是一个有效的整数值。不接受指数符号。
  is                      | 验证下的字段必须匹配给定的值，使用严格相等。
  is_not                  | 验证下的字段必须与给定值不匹配，使用严格相等。
  length                  | 验证下的字段必须精确地具有指定数量的项，只对迭代有效。
允许的可迭代值是:字符串、数组和任何可与Array.from一起使用的对象。
  max                     | 验证长度下的字段不能超过指定的长度。
  max_value               | 验证下的字段必须是数值，且不能大于指定的值。
  mimes                   | 添加到验证项下字段的文件类型应该具有指定的mime类型之一。
  min                     | 验证长度下的字段不应小于指定的长度。
  min_value               | 验证下的字段必须是数值，并且不能小于指定的值。
  numeric                 | 验证的字段必须仅由数字组成。
  regex                   | 验证中的字段必须与指定的正则表达式匹配。
  required                | 验证下的字段必须具有非空值。默认情况下，除非是必需的，否则所有验证器如果具有“空值”，都将通过验证。这些空值是:空字符串，未定义，null，空数组。
  required_if             | 只有当目标字段(第一个参数)被设置为指定值之一(其他参数)时，验证中的字段必须具有非空值。
  size                    | 添加到验证项下字段的文件大小不得超过指定的大小(单位为千字节)。
 **/

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