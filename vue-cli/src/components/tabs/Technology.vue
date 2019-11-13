<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: "Technology",
	title: "科技",
	data() {
		return {
			items: [
				{
					title: "最前线｜iOS14概念设计曝光，iPhone12也..",
					url: "http://baijiahao.baidu.com/s?id=1650057119616113696",
					checked: false,
					bold: true
				},
				{
					title: "学生选购轻薄本应该注意哪些点？讲真！好产品其实没那..",
					url: "http://baijiahao.baidu.com/s?id=1649959808285530270",
					checked: false,
					bold: false
				},
				{
					title: "中情局投资机构In-Q-Tel成立20年，做了这样..",
					url: "http://baijiahao.baidu.com/s?id=1649957821392810559",
					checked: false,
					bold: false
				},
				{
					title: "对便携性的终极追求，GPD P2 MAX迷你轻薄本",
					url: "http://baijiahao.baidu.com/s?id=1649961427660681908",
					checked: false,
					bold: false
				},
				{
					title: "罗永浩或将进军工具软件行业，12月发布会见",
					url: "http://baijiahao.baidu.com/s?id=1649963179433523720",
					checked: false,
					bold: false
				},
				{
					title: "三星又一折叠屏手机将登陆中国，是5G版Galaxy..",
					url: "http://baijiahao.baidu.com/s?id=1649964347352981326",
					checked: false,
					bold: false
				},
				{
					title: "11月26日发！荣耀新机官宣：打孔屏+全系标配5G..",
					url: "http://baijiahao.baidu.com/s?id=1649965167288356305",
					checked: false,
					bold: true
				},
				{
					title: "双十一结束了，亚马逊海外购购物狂欢还会远吗？",
					url: "http://baijiahao.baidu.com/s?id=1649965822730586641",
					checked: false,
					bold: false
				},
				{
					title: "坐等！16英寸的MacBook Pro或于本周发布",
					url: "http://baijiahao.baidu.com/s?id=1649964991311063349",
					checked: false,
					bold: false
				},
				{
					title: "90Hz屏幕是什么？我们找了一万人来告诉你",
					url: "http://baijiahao.baidu.com/s?id=1649966870333466391",
					checked: false,
					bold: false
				},
				{
					title: "腾讯音乐Q3季报图解：净利10.3亿 同比增长6%",
					url: "http://baijiahao.baidu.com/s?id=1649966961660578199",
					checked: false,
					bold: false
				},
				{
					title: "华为发放20亿元奖金，抗击美国断供，奖励员工加班奋..",
					url: "http://baijiahao.baidu.com/s?id=1649969319417945409",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>