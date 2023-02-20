# 使用拦截器的原因
  页面发送http请求，很多情况我们需要对请求和其响应进行特定处理。例如：如果每个请求都附带后端返回的token，我们需要在拿到response之前进行loading的加载动画展示。

# 拦截器的分类
  拦截器分为 请求(request)拦截器 和 响应(response)拦截器

# 拦截器的使用
  在请求 或者 响应 被then 或 catch 处理前拦截它们

  (1) 请求拦截器
    <script>
    // http request 拦截器
    axios.interceptors.request.use(
        config => {
          // 在请求发送之前做一些处理
            if (store.state.token) { 
            // 判断是否存在 token, 如果存在的话, 则每个 http header 都加上 token
                config.headers.Authorization = `token ${store.state.token}`;
            }
            return config;
        },
        // 对错误请求做处理
        err => {
            return Promise.reject(err);
        });
    </script>

    (2) 响应拦截器
  <script>
      // 添加响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除 token 信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)  
         // 返回接口返回的错误信息
    });

  </script>