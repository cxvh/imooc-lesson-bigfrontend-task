
## 演示图
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/1.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/2.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/3.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/4.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/5.png)

---
## 主要代码
### src/main.js
```js
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import "./vee-validate"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
---
### src/vee-validate.js
```js
import Vue from 'vue'
import {ValidationProvider,ValidationObserver,localize,extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules';
// import zh from 'vee-validate/dist/locale/zh_CN.json'
import zh from './local/index.json'
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
// localize({zh})
// localize('zh',zh)
localize('zh',zh);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
```
---
### src/local/index.json
```json
{
    "code":"zh",
    "messages": {
        "email": "请输入正确的邮箱格式",
        "length": "{_field_}长度要求{length}",
        "min": "{_field_}必须至少有{length}个字符",
        "required": "请输入{_field_}"
    },
    "names": {
        "email": "邮箱",
        "password": "密码",
        "name": "账号",
        "code": "验证码"
    },
    "fields": {
        "password": {
            "min": "不符合最小长度要求"
        }
    }
}
```
---
### src/App.vue
```js
<template>
  <div id="app">
    <div class="layui-container">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="layui-form layui-from-pane"
          @submit.prevent="handleSubmit(checkForm2)"
        >
          <!-- <div class="layui-form-item" :class="{'form-group--error':$v.params.name.$invalid}">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              v-model.trim="$v.params.$model.name"
              lay-verify="title"
              autocomplete="off"
              placeholder="请输入标题"
              class="layui-input"
            />
          </div>
          <div class="error layui-form-mid" v-if='!$v.params.name.required'>用户名不能为空</div>
          <div class="error layui-form-mid" v-if='!$v.params.name.email'>用户名输入格式错误</div>
        </div> -->
          <div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-inline">
              <ValidationProvider
                name="name"
                rules="required|email"
                v-slot="{ errors }"
              >
                <input
                  v-model="params.name"
                  autocomplete="off"
                  placeholder="请输入标题"
                  class="layui-input"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-inline">
              <ValidationProvider
                name="password"
                rules="required|min:6"
                v-slot="{ errors }"
              >
                <input
                  type="password"
                  name="title"
                  v-model="params.password"
                  lay-verify="title"
                  autocomplete="off"
                  placeholder="请输入标题"
                  class="layui-input"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">验证码</label>
            <div class="layui-input-inline">
              <ValidationProvider
                name="code"
                rules="required|length:4"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  name="title"
                  v-model="params.code"
                  lay-verify="title"
                  autocomplete="off"
                  placeholder="请输入标题"
                  class="layui-input"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div
              class="layui-form-mid svg"
              @click="getCaptcha"
              v-html="svg"
            ></div>
          </div>
          <button type="submit" class="layui-btn">点击登录</button>
          <a href="http://www.layui.com" class="change-pw">忘记密码?</a>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "App",
  data() {
    return {
      svg: "",
      params: {
        name: "",
        password: "",
        code: "",
      },
    };
  },
  validations: {
    params: {
      name: {
        required,
        email,
      },
      password: {
        required,
      },
      code: {
        required,
      },
    },
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      axios
        .get("//localhost:3000/getCaptcha")
        .then((response) => {
          const { data } = response.data;
          this.svg = data;
        })
        .catch();
    },
    checkForm1() {
      let errorMsg = [];
      let { name, password, code } = this.params;
      if (!name) {
        errorMsg.push("用户名不能为空");
      }
      if (!password) {
        errorMsg.push("密码不能为空");
      }
      if (!code) {
        errorMsg.push("验证码不能为空");
      }
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("表单填写正确");
      }
    },
    checkForm2() {
      alert("登录成功!");
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}
.layui-container {
  background-color: white;
}
.layui-from-pane{
  padding: 20px 0;
}
input {
  width: 190px;
}
.change-pw {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}
div.svg {
  padding: 0 !important;
  cursor: pointer;
}

.layui-input-inline .error {
  color: red;
}
</style>

```