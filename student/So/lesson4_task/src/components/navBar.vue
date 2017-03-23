<template>
  <div class="nav-bar">
    <div class="head-block">
    	<div class="_img"></div>
    	<div class="_info">
    		<h2 class="_name">So</h2>
    		<p class="_motto">专注前端开发</p>
    	</div>
    </div>
    <ul class="menu">
    	<li class="_item">
    		<router-link class="base-link" to="/list">首页</router-link>
    	</li>
    	<li class="_item">
    		<router-link class="base-link" to="/topic">专题</router-link></li>
    	<li class="_item">
    		<router-link class="base-link" to="/list">归档</router-link></li>
    </ul>
    <ul class="links">
    	<li class="_item">
    		<router-link class="icon-link iconfont icon-weichat" to="/list"></router-link>
    	</li>
    	<li class="_item">
    		<router-link class="icon-link iconfont icon-iconfontweibowukuang" to="/list"></router-link>
    	</li>
    	<li class="_item">
    		<router-link class="icon-link iconfont icon-search" to="/list"></router-link>
    	</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
:root{
  --primary-bg-color:#fff;
  --secondary-bg-color:#999;
};
.nav-bar{
	/*background-color: var(--secondary-bg-color);*/
	background: url('../assets/bg.jpg') no-repeat;
	background-size: cover;
	height: 100%;
	width: 25%;
	flex-shrink: 0;
	min-width: 220px;
	max-width: 400px;

	& .head-block{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px 0;
		& ._img{
			background: url(../assets/head.jpeg) no-repeat;
			background-size: contain;
			width: 150px;
			height: 150px;
			border-radius: 100%;
		}
		& ._info{
			display: flex;
			flex-direction: column;
			align-items: center;
			& ._name{
				margin: 10px 0;
			}
		}
	}

	& .menu{
		padding: 20px 25%;
		list-style: none;
		& ._item{
			padding: 10px 0;
		}
	}

	& .links{
		display: flex;
		justify-content: space-between;
		list-style: none;
		padding: 30px 25%;
		& ._item{
			display: block;
			height: 40px;
			width: 40px;
			background-color: #fff;
			border-radius: 50%;
			display: hidden;
			opacity: 0.6;
			transition: all 0.3s;
		}
		& ._item:hover{
			opacity: 1;
		}
		& ._item:nth-of-type(1){
			background-color: #0c0;
		}
		& ._item:nth-of-type(2){
			background-color: #ff8400;
		}
		& ._item:nth-of-type(3){
			background-color: #afb6ca;
		}
	}
}
.base-link{
	color: #fff;
	opacity: 0.6;
	text-decoration: none;
	transition: all 0.3s;
	&:hover{
		opacity:1;
	}
}

.icon-link{
	display: flex;
	justify-content: center;
	height: 100%;
	font-size: 30px;
	align-items: center;
	color: #eee;
	text-decoration: none;
}

</style>
