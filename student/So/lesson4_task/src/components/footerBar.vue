<template>
  <footer class="page_footer">
	<p>© 2016 - So 的小站 </p>
	<p>Powered by So</p>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style>
.page_footer{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
	border-top: solid 1px #ddd;

	& p{
		padding: 5px 0;
	}
}
</style>
