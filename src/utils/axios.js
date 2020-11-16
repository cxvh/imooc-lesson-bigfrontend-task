// 封装 axios 的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
    constructor(baseUrl) {
        this.baseURL = baseUrl
    }
    // 获取 axios 配置
    getInsideConfig() {
        const config = {
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            // 跨域请求的时候是否把本地 cookie 带上
            withCredentials: false, // default
            timeout: 10000
        }
        return config
    }
    // 设定拦截器
    interceptors(instance) {

        // 请求拦截器
        instance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            errorHandle(error)
            return Promise.reject(error);
        });

        // 响应请求的拦截器
        instance.interceptors.response.use(function (response) {
            if (response.status === 200) {
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response)
            }
            // return response;
        }, function (error) {
            errorHandle(error)
            return Promise.reject(error);
        });
    }
    // 创建实例
    request(options) {
        const instance = axios.create()
        const newOptions = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance)
        return instance(newOptions)
    }
    get(url,config={}){
        const options=Object.assign({
            method: 'get',
            url:url
        },config)
        return this.request(options)
    }
    post(url,data={}){
        return this.request({
            method:'post',
            url:url,
            data:data
        })
    }
}



export default HttpRequest