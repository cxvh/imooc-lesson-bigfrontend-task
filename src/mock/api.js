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
