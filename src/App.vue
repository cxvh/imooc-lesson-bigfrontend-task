<template>
  <div id="app">
    <div class="layui-container">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          class="layui-form layui-from-pane"
          @submit.prevent="handleSubmit(checkForm2)"
        >
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
