<template>
  <div class="page page-topic">
    <h1 class="page_title">专题</h1>
    <nav class="sidebar">
    	<h3 class="sidebar_title">专题列表</h3>
    	<ul class="sidebar_ul">
    		<li class="sidebar_li">
    			<router-link class="page-link" to="/list">HTTP/2 相关</router-link>
    		</li>
    		<li class="sidebar_li">
    			<router-link class="page-link" to="/list">HTTP 相关</router-link>
    		</li>
    		<li class="sidebar_li">
    			<router-link class="page-link" to="/list">JavaScript 漫谈</router-link>
    		</li>
    		<li class="sidebar_li">
    			<router-link class="page-link" to="/list">浏览器</router-link>
    		</li>
    	</ul>
    </nav>
    <p class="page_introduce">
    	博客写了这么多年，数量一直没上去。大部分时候遇上有意思的东西，研究明白之后只是多了几篇收藏，或者是 Evernote 里多了几段零散的记录，又或者是电脑某个文件夹多了几个 Demo 文件。很难再有耐心和精力把整个过程记录一遍。这里把本站部分文章以专题的形式整理出来，一方面方便新同学阅读，另一方面也希望借此激励自己：能在这个浮躁的时代，坚持阅读和写作
    </p>
    <section class="section">
    	<h2 class="section_title">HTTP/2 相关</h2>
    	<p class="section_introduce">随着 2015 年 5 月 14 日 HTTP/2 协议正式版的发布，越来越多的网站和第三方 CDN 服务开始启用 HTTP/2。HTTP/2 是新一代的 HTTP，也是 HTTP 的未来。本专题记录我的 HTTP/2 研究与实践。</p>
    	<ul class="section_ul">
    		<li class="section_li">
    			<router-link class="page-link" to="/list">谈谈 Nginx 的 HTTP/2 POST Bug</router-link>
    			<span class="_time"> (Aug 20, 2016)</span>
    		</li>
    		<li class="section_li">
    			<router-link class="page-link" to="/list">为什么我们应该尽快支持 ALPN？</router-link>
    			<span class="_time"> (May 18, 2016)</span>
    		</li>
    		<li class="section_li">
    			<router-link class="page-link" to="/list">谈谈 HTTP/2 的协议协商机制</router-link>
    			<span class="_time"> (Apr 14, 2016)</span>
    		</li>
    	</ul>
    </section>

    <section class="section">
    	<h2 class="section_title">HTTP/2 相关</h2>
    	<p class="section_introduce">随着 2015 年 5 月 14 日 HTTP/2 协议正式版的发布，越来越多的网站和第三方 CDN 服务开始启用 HTTP/2。HTTP/2 是新一代的 HTTP，也是 HTTP 的未来。本专题记录我的 HTTP/2 研究与实践。</p>
    	<ul class="section_ul">
    		<li class="section_li">
    			<router-link class="page-link" to="/list">谈谈 Nginx 的 HTTP/2 POST Bug</router-link>
    			<span class="_time"> (Aug 20, 2016)</span>
    		</li>
    		<li class="section_li">
    			<router-link class="page-link" to="/list">为什么我们应该尽快支持 ALPN？</router-link>
    			<span class="_time"> (May 18, 2016)</span>
    		</li>
    		<li class="section_li">
    			<router-link class="page-link" to="/list">谈谈 HTTP/2 的协议协商机制</router-link>
    			<span class="_time"> (Apr 14, 2016)</span>
    		</li>
    	</ul>
    </section>

    <footer-bar></footer-bar>
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
.page-topic{
	& .page_title{
		padding: 20px 0;
	}
	& .page_introduce{
		padding: 10px 0;
	}
	& .sidebar{
		float: right;
		border: solid 1px #ddd;
		padding: 20px;
		margin-top: 10px;
		& .sidebar_title{
			border-bottom: solid 1px #ddd;
		}
		& .sidebar_ul{
			padding: 10px 15px;
		}
		& .sidebar_li{
			line-height: 1.6em;
		}
	}
	& .section{
		padding: 20px 0;
		& .section_title{
			padding: 10px 0;
		}
		& .section_introduce{
			padding: 10px 0;
		}
		& .section_ul{
			padding: 10px 15px;
			& .section_li{
				line-height: 1.5em;
			}
			& ._time{
				color: #aaa;
			}
		}

	}
}
</style>
