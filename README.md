> 4-8作业 mockjs

## 演示图

![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/18.png)
![](https://qq507570355.oss-cn-beijing.aliyuncs.com/public/picture/github/19.png)

## 主要代码
api.js
```js
import Mock from 'mockjs'
const datas = Mock.mock({
  'users|50': [{
    'id|+1': 1,
    'name': '@cname',
    'city': '@city',
    'image': '@image'
  }],
  "listsize": 50
});
// 在这里编写你的逻辑代码
Mock.mock('http://your.domain.com/test', (options) => {
  const {
    page,
    num
  } = JSON.parse(options.body)
  return getDataByPage(page, num, datas, "users")
});

function getDataByPage(page, num, data, key) { //根据页码 页尺寸 来过滤数据
  const start = (page - 1) * num;
  const end = page * num > data[key].length ? data[key].length : page * num;
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(data[key][i]); // [{book_id},{}]
  }
  const ret = {};
  ret[key] = result;
  ret["listsize"] = data.listsize;
  return ret;
}
```
List.vue
```html
<template>
  <div>
    <h1>这里是返回结果</h1>
    <div>
      <!-- 这里已经完成了双向绑定 -->
      <!-- 用户输入的page与num，可以通过send方法传递HTTP请求 -->
      <label>
        <span>页码：</span>
        <input type="text" v-model="params.page" />
      </label>
      <label>
        <span>数量：</span>
        <input type="text" v-model="params.num" />
      </label>
      <!-- 这里有事件的绑定 -->
      <button type="button" @click="send()">提交</button>
    </div>
    <!-- 通过JSON.stringify格式化显示 -->
    <pre v-html="JSON.stringify(items, null, 2)"></pre>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      params:{
        page: 1,
        num: 10
      },
      // 这里是数据体
      items: []
    };
  },
  methods: {
    send () {
      const params={
        ...this.params
      }
      // 使用axios作为http客户端，发送HTTP的GET请求
      // 传递参数num和page
      axios.get('http://your.domain.com/test',{data:params})
        .then(res => this.items = res.data.users);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

```