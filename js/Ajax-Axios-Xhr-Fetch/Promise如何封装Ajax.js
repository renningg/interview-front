// 用 Promise 封装 AJAX 请求
// way：请求方式；url：请求地址；params：请求参数
function queryData(way, url, params) {
    var p = new Promise(function (reject, reslove) {
      var xhr = new XMLHttpRequest();
      xhr.open(way, url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(params)
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        //当请求成功时，用reslove进行回调
        if (xhr.readyState == 4 && xhr.status == 200) {
          reslove(xhr.responseText);
        }
        //请求失败，用reject进行回调
        else {
          reject('服务器错误');
        }
      }
  })
  return p;//返回promise对象
}

//请求url，获得请求结果（then前一个函数表示输出reslove结果，后一个表示输出reject结果）
queryData('http://localhost:8080/url1').then(function (data) {
  console.log(data);//返回成功的结果
}, function (res) {
  console.log(res);//返回失败的结果
})


