> 第五周，3-15作业

## 演示图
### 登录

![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/6.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/7.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/8.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/9.png)

### 注册
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/10.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/11.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/12.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/13.png)

### 忘记密码
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/14.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/15.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/16.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/17.png)
---

## 主要代码

main.js

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./vee-validate";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://aaa.cxvh.com";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

vee-validate.js

```js
import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import zh from "./local/index.json";
rules.diff_max_min = {
  validate: function(value, _a) {
    var _b = _a === void 0 ? {} : _a,
      min = +_b.min,
      max = +_b.max;
    return String(value).length <= max && String(value).length >= min;
  },
  params: [
    {
      name: "min",
    },
    {
      name: "max",
    },
  ],
};
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// localize({zh})
// localize('zh',zh)
localize("zh", zh);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
```

local/index.json

```json
{
  "code": "zh",
  "messages": {
    "email": "请输入正确的邮箱格式",
    "length": "{_field_}长度要求{length}",
    "confirmed": "{_field_}不能和{target}匹配",
    "min": "{_field_}必须至少有{length}个字符",
    "max": "{_field_}必须最多有{length}个字符",
    "diff_max_min": "{_field_}必须在{min}与{max}之间",
    "required": "请输入{_field_}"
  },
  "names": {
    "nickname": "昵称",
    "password": "密码",
    "rpassword": "确认密码",
    "name": "账号",
    "code": "验证码"
  },
  "fields": {
    "password": {
      "min": "不符合最小长度要求"
    },
    "rpassword": {
      "confirmed": "两次密码不一致"
    }
  }
}
```

## 使用
注册
```js
<ValidationObserver v-slot="{ handleSubmit }">
  <form method="post" @submit.prevent="handleSubmit(checkForm)">
    <div class="layui-form-item">
      <label for="L_email" class="layui-form-label">邮箱</label>
      <ValidationProvider
        name="name"
        rules="required|email"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
          id='L_email'
            type="text"
            v-model="params.name"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid layui-word-aux">
          将会成为您唯一的登入名
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
        <label for="L_username" class="layui-form-label"
          >昵称</label
        >
      <ValidationProvider
        name="nickname"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
          id='L_username'
            type="text"
            v-model="params.nickname"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <label for="L_pass" class="layui-form-label">密码</label>
      <ValidationProvider
        name="password"
        rules="required|diff_max_min:6,16"
        vid="confirmation"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="password"
            id="L_pass"
            v-model="params.password"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid layui-word-aux">
          6到16个字符
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <label for="L_repass" class="layui-form-label"
        >确认密码</label
      >
      <ValidationProvider
        name="rpassword"
        rules="confirmed:confirmation"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="password"
            id="L_repass"
            v-model="params.rpassword"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <label for="L_vercode" class="layui-form-label"
        >人类验证</label
      >
      <ValidationProvider
        name="code"
        rules="required|length:4"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="text"
            id="L_vercode"
            v-model="params.code"
            placeholder="请回答后面的问题"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid svg">
          <span @click="getCode" v-html="svg"></span>
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <button class="layui-btn" lay-filter="*" lay-submit>
        立即注册
      </button>
    </div>
    <div class="layui-form-item fly-form-app">
      <span>或者直接使用社交账号快捷注册</span>
      <a
        href=""
        onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
        class="iconfont icon-qq"
        title="QQ登入"
      ></a>
      <a
        href=""
        onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
        class="iconfont icon-weibo"
        title="微博登入"
      ></a>
    </div>
  </form>
</ValidationObserver>
```
登录
```js
<ValidationObserver v-slot="{ handleSubmit }">
  <form method="post" @submit.prevent="handleSubmit(checkForm)">
    <div class="layui-form-item">
      <label for="L_email" class="layui-form-label">邮箱</label>
      <ValidationProvider
        name="name"
        rules="required|email"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="text"
            id="L_email"
            placeholder="请输入邮箱账号"
            v-model="params.name"
            lay-verify="required"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <label for="L_pass" class="layui-form-label">密码</label>
      <ValidationProvider
        name="password"
        rules="required|min:6"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="password"
            id="L_pass"
            name="pass"
            v-model="params.password"
            placeholder="请输入密码"
            lay-verify="required"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <label for="L_vercode" class="layui-form-label"
        >人类验证</label
      >
      <ValidationProvider
        name="code"
        rules="required|length:4"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="text"
            id="L_vercode"
            v-model="params.code"
            placeholder="请回答后面的问题"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid svg">
          <span @click="getCode" v-html="svg"></span>
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <button
        class="layui-btn"
        lay-filter="*"
        lay-submit
        type="submmit"
      >
        立即登录
      </button>
      <span style="padding-left: 20px">
        <router-link :to="{ name: 'forget' }"
          >忘记密码？</router-link
        >
      </span>
    </div>
    <div class="layui-form-item fly-form-app">
      <span>或者使用社交账号登入</span>
      <a
        href=""
        onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
        class="iconfont icon-qq"
        title="QQ登入"
      ></a>
      <a
        href=""
        onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
        class="iconfont icon-weibo"
        title="微博登入"
      ></a>
    </div>
  </form>
</ValidationObserver>
```
忘记密码
```js
<ValidationObserver v-slot="{ handleSubmit }">
  <form method="post" @submit.prevent="handleSubmit(checkForm)">
    <div class="layui-form-item">
      <label for="L_email" class="layui-form-label">邮箱</label>
      <ValidationProvider
        name="name"
        rules="required|email"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="text"
            id="L_email"
            v-model="params.email"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <label for="L_vercode" class="layui-form-label"
        >人类验证</label
      >
      <ValidationProvider
        name="code"
        rules="required|length:4"
        v-slot="{ errors }"
      >
        <div class="layui-input-inline">
          <input
            type="text"
            id="L_vercode"
            v-model="params.code"
            placeholder="请回答后面的问题"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid svg">
          <span @click="getCode" v-html="svg"></span>
        </div>
        <span class="layui-form-mid error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="layui-form-item">
      <button
        class="layui-btn"
        alert="1"
        lay-filter="*"
        lay-submit
      >
        提交
      </button>
    </div>
  </form>
</ValidationObserver>
```
