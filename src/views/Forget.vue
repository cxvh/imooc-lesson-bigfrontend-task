<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">找回密码<!--重置密码--></li>
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
                          v-model="params.username"
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
                    <button class="layui-btn">提交</button>
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
  name: "forget",
  data() {
    return {
      svg: "",
      params: {
        username: "",
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
      const params=this.params
      user.forget(params).then(res=>{
        if(res.code===200){
          alert('邮件发送成功')
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