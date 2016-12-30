<template>
  <div id="app" class="blog-layout">
    <nav-bar></nav-bar>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import navBar from './components/navBar'

export default {
  name: 'app',
  components: {
    navBar
  }
}
</script>

<style>
/*这里应该在 ./main.css 中定义，但是cssloader配置有问题，只有vue里面的有效了，上课请教*/
/*@import './main.css';*/
:root{
  --primary-bg-color:#fff;
  --secondary-bg-color:#999;
  height: 100%;
};
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #333;
}
:link{
  cursor: pointer;
}
.page{
  height: 100%;
  overflow-y: scroll;
  flex-grow: 1;
  padding: 20px 40px;
}
body{
  background-color: var(--primary-bg-color);
  height: 100%;
}
.blog-layout{
  display: flex;
  height: 100%;
  align-items: stretch;
}

</style>
