# Vite
  -- 响应迅速，开箱即用
  
  -- 默认集成度很高。对常见的web开发需求进行封装。
  <!-- ./assets/vite.png -->
  -- vite对框架做了优化，npm install的速度非常快

  -- 优化原理：
    1，基于ESM的import/export语句依赖关系，与运行时状态无关
    2，在构建阶段将未使用到的代码进行删除
        （Tree Shaking在Vite中无需配置，默认开启！）

    3，CommonJs 格式不能做到 Tree Shaking，因为require的部分可能依赖运行时计算的结果
