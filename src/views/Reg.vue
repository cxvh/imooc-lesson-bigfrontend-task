<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver ref='aaa' v-slot="{ handleSubmit,validate }">
                <form method="post" @submit.prevent="handleSubmit(checkForm)">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">邮箱</label>
                    <ValidationProvider
                      name="email"
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
                      rules="required|nonumber|min:4"
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
                      rules="required|diff_max_min:6,16|confirmed:rpassword"
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
                      rules="required|confirmed:confirmation"
                      vid="rpassword"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          id="L_repass"
                          v-model="params.rpassword"
                          autocomplete="off"
                          class="layui-input"
                          @change="validate({name:'password'})"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { user } from "@/api";
import {v4 as uuid} from 'uuid'
export default {
  name: "reg",
  data() {
    return {
      svg: "",
      params: {
        name: "",
        nickname: "",
        password: "",
        rpassword:"",
        code: ""
      },
    };
  },
  mounted() {
    this.getCode();
    window.el=this
  },
  methods: {
    getCode() {
      let sid=''
      if(localStorage.getItem('sid')){
        sid=localStorage.getItem('sid')
      }else{
        sid=uuid()
        localStorage.setItem('sid',sid)
      }
      this.$store.commit('setSid',sid)
      user.getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data;
        }
      });
    },
    checkForm() {
      alert("登录成功!");
    },
  },
};
</script>
<style>
div.svg {
  padding: 0 !important;
}
div.svg span {
  height: 38px;
  cursor: pointer;
  display: block;
}
.layui-form-item .error {
  color: red;
  position: relative;
  top: 1px;
}
</style>