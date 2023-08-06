实现九宫格的方式有很多种，以下列举几个比较常用的方法：

1. 使用 float 和宽度百分比
使用 float 把每个格子浮动到一侧，并设置宽度百分比来让它们平均分布。

2. 使用 display: inline-block 和宽度百分比
使用 display: inline-block 把每个格子设置为行内块元素，并用宽度百分比来平均分布。

3. 使用 flex 布局
使用 flex 布局可以轻松实现九宫格，只需要设置容器为 flex 容器，并设置子项的宽度和高度即可。

4. 使用 grid 布局
使用 grid 布局也可以实现九宫格，只需要设置容器为 grid 容器，并设置行列数和子项的位置即可。
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>
<style>
  .grid-container {
  display: grid;
  // grid-template-columns: 1fr 1fr 1fr; 应用于一个网格容器，那么每列的宽度将平均分配，每列将占据相等的宽度，并填充整个容器。
  grid-template-columns: repeat(3, 1fr); /* 将容器分为3列 */
  grid-template-rows: repeat(3, 1fr); /* 将容器分为3行 */
  gap: 10px; /* 设置网格项之间的间距 */
}

.grid-item {
  background-color: #ccc;
  padding: 20px;
}
</style>

5. 使用绝对定位
使用绝对定位可以将每个格子定位到相应的位置，但需要手动调整位置和大小，不太灵活。