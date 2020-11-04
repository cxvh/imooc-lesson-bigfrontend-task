import Vue from 'vue'
import Router from 'vue-router'
const Login=()=>import(/* webpackChunkName: 'login' */'./views/Login.vue')
const Reg=()=>import(/* webpackChunkName: 'reg' */'./views/Reg.vue')
const Forget=()=>import(/* webpackChunkName: 'forget' */'./views/Login.vue')
Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/login',
            name:'name',
            component:Login
        },
        {
            path:'/reg',
            name:'name',
            component:Reg
        },
        {
            path:'/forget',
            name:'forget',
            component:Forget
        }
    ]
})