<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li><router-link :to="{ name: 'register' }">注册</router-link></li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <ValidationObserver v-slot="{ handleSubmit }">
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
  name: "login",
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
  mounted() {
    this.getCode();
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
      const params={...this.params}
      params.sid=this.$store.state.sid
      user.login(params).then(res=>{
        if(res.code===200){
          console.log(res,'login')
        }
      })
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