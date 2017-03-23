<template>
  <div class="page pagePost">
    <div class="post_header">
		<h1 class="_title">HTTPS 常见部署问题及解决方案</h1>
		<p class="_time">Dec 12, 2016</p>
	</div>
	<div class="post_content">
		在最近几年里，我写了很多有关 HTTPS 和 HTTP/2 的文章，涵盖了证书申请、Nginx 编译及配置、性能优化等方方面面。在这些文章的评论中，不少读者提出了各种各样的问题，我的邮箱也经常收到类似的邮件。本文用来罗列其中有代表性、且我知道解决方案的问题。
		为了控制篇幅，本文尽量只给出结论和引用链接，不展开讨论，如有疑问或不同意见，欢迎留言讨论。本文会持续更新，欢迎大家贡献自己遇到的问题和解决方案。
		实际上，遇到任何有关部署 HTTPS 或 HTTP/2 的问题，都推荐先用 Qualys SSL Labs's SSL Server Test 跑个测试，大部分问题都能被诊断出来。
		申请 Let's Encrypt 证书时，一直无法验证通过
		这类问题一般是因为 Let's Encrypt 无法访问你的服务器，推荐尝试 acme.sh 的 DNS 验证模式，一般都能解决。
		网站无法访问，提示 ERR_CERTIFICATE_TRANSPARENCY_REQUIRED
		使用 Chrome 53 访问使用 Symantec 证书的网站，很可能会出现这个错误提示。这个问题由 Chrome 的某个 Bug 引起，目前最好的解决方案是升级到 Chrome 最新版。相关链接：
		Out of date Chrome results in ERR_CERTIFICATE_TRANSPARENCY_REQUIRED for Symantec operated sites；
		Warning | Certificate Transparency error with Chrome 53；
		浏览器提示证书有错误
		检查证书链是否完整
		首先确保网站使用的是合法 CA 签发的有效证书，其次检查 Web Server 配置中证书的完整性（一定要包含站点证书及所有中间证书）。如果缺失了中间证书，部分浏览器能够自动获取但严重影响 TLS 握手性能；部分浏览器直接报证书错误。
	</div>

	<section class="same_topic">
		<h2 class="_title">专题「Web 服务器」的其他文章 »</h2>
		<ul class="topic_ul">
			<li class="topic_li">
				<router-link class="page-link" to="/list">谈谈 HTTP/2 的协议协商机制</router-link>
    			<span class="_time"> (Apr 14, 2016)</span>
			</li>
			<li class="topic_li">
				<router-link class="page-link" to="/list">谈谈 HTTP/2 的协议协商机制</router-link>
    			<span class="_time"> (Apr 14, 2016)</span>
			</li>
			<li class="topic_li">
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
.pagePost{
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
		line-height: 1.5;
		text-align: justify;
	}
	& .same_topic{
		padding: 20px 0;
		& .topic_ul{
			padding: 10px 15px;
		}
		& .topic_li{
			line-height: 1.5em;
		}
		& ._time{
			color: #aaa;
		}
	}
}
</style>
