import Vue from 'vue'
import {ValidationProvider,ValidationObserver,localize,extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules';
// import zh from 'vee-validate/dist/locale/zh_CN.json'
import zh from './local/index.json'
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
// localize({zh})
// localize('zh',zh)
localize('zh',zh);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);