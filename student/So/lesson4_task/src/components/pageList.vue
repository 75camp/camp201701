<template>
  <div class="page page-list">
	<div class="page-list__item">
		<div class="post_header">
			<h1 class="_title">HTTPS 常见部署问题及解决方案</h1>
			<p class="_time">Dec 12, 2016</p>
		</div>
		<div class="post_content">
			<p class="_content">
				在最近几年里，我写了很多有关 HTTPS 和 HTTP/2 的文章，涵盖了证书申请、Nginx 编译及配置、性能优化等方方面面。在这些文章的评论中，不少读者提出了各种各样的问题，我的邮箱也经常收到类似的邮件。本文用来罗列其中有代表性、且我知道解决方案的问题。[...]
			</p>
		</div>
		<div class="post_more">
			<router-link class="page-link" to="/post">继续阅读 »</router-link>
		</div>
	</div>

	<div class="page-list__item">
		<div class="post_header">
			<h1 class="_title">开始使用 VeryNginx</h1>
			<p class="_time">Dec 12, 2016</p>
		</div>
		<div class="post_content">
			<p class="_content">
				VeryNginx 是一个功能强大而对人类友好的 Nginx 扩展程序，这是作者的原话。很久之前我就看到过这个项目，直到最近我才在本站试用了一把，确实好用，于是想通过本文把它介绍给更多人。 VeryNginx 主要由两部分组成：基于 lua-nginx-module 开发的 Lua 脚本，以及基于 HTML/CSS/JS 开发的 Web 控制面板 —— 用于生成和管理 Lua 脚本所需配置。[...]
			</p>
		</div>
		<div class="post_more">
			<router-link class="page-link" to="/post">继续阅读 »</router-link>
		</div>
	</div>

	<div class="page-list__item">
		<div class="post_header">
			<h1 class="_title">iOS 10 Safari 视频播放新政策</h1>
			<p class="_time">Dec 12, 2016</p>
		</div>
		<div class="post_content">
			<p class="_content">
				随着 iOS 10 的正式发布，Safari 也迎来了大量更新，例如新增了对 ES6、CSP2.0、Shadow DOM 等功能和特性的支持。本文为大家介绍 iOS10 自带 Safari 浏览器在视频播放政策上的最新变化。首先划出重点：1）iOS 10 Safari 支持特定视频自动播放；2）iOS 10 Safari 支持视频内联播放。想了解更多细节的同学请接着往下看。[...]
			</p>
		</div>
		<div class="post_more">
			<router-link class="page-link" to="/post">继续阅读 »</router-link>
		</div>

		<div class="page-bar">
			<span class="_prepage">上一页</span>
			<p class="_link">博客归档</p>
			<span class="_nextpage">下一页</span>
		</div>

		<footer-bar></footer-bar>
	</div>
  </div>
</template>

<script>
import footerBar from './footerBar'
export default {
  data () {
    return {
      
    }
  },
  components:{
  	footerBar
  }
}
</script>

<style>

.page-list{
	& .page-list__item{
		/*background-color: #999;*/

		font-size: 16px;
		& .post_header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 0;
			& ._time{
				color: #aaa;
			}
		}
		& .post_content{
			padding: 10px 0;
			& ._content{
				line-height: 1.5em;
			}
		}
		& .post_more{
			padding: 20px 0;
			border-bottom: solid 1px #ddd;
		}
	}

	& .page-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
	}


}
.page-link{
	color: #2479CC;
	text-decoration: none;
	/*transition: all 0.3s;*/
	&:hover{
		text-decoration: underline;
	}

}
</style>
