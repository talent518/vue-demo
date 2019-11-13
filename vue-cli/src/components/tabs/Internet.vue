<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: "Internet",
	title: "互联网",
	data() {
		return {
			items: [
				{
					title: "艾问x艾诚：我现在就三件事，访人、投人、全球创始人..",
					url: "http://baijiahao.baidu.com/s?id=1650054742228940039",
					checked: false,
					bold: true
				},
				{
					title: "「注意」七天无理由退货这四类商品不行",
					url: "http://baijiahao.baidu.com/s?id=1650056920601994621",
					checked: false,
					bold: false
				},
				{
					title: "“下一个阿里巴巴”等待拯救！孙正义的结局，进入90..",
					url: "http://baijiahao.baidu.com/s?id=1650056096854911003",
					checked: false,
					bold: false
				},
				{
					title: "让一部分人先爱上便利店",
					url: "http://baijiahao.baidu.com/s?id=1650055624686572356",
					checked: false,
					bold: false
				},
				{
					title: "从“双11”看新零售的进化之路",
					url: "http://baijiahao.baidu.com/s?id=1650052758582173667",
					checked: false,
					bold: false
				},
				{
					title: "济南“双十一”亮眼答卷：网络零售额达51.6亿元 ..",
					url: "http://baijiahao.baidu.com/s?id=1650051652878509454",
					checked: false,
					bold: false
				},
				{
					title: "百度发布双十一大数据报告：三至五线城市网民关注度提..",
					url: "http://baijiahao.baidu.com/s?id=1650054272631283520",
					checked: false,
					bold: true
				},
				{
					title: "天猫回应双11造假：造谣要付法律责任",
					url: "http://baijiahao.baidu.com/s?id=1650053207014996305",
					checked: false,
					bold: false
				},
				{
					title: "舞泡网：双十一中小卖家出路在何方？网店转让的价值有..",
					url: "http://baijiahao.baidu.com/s?id=1650052372737465772",
					checked: false,
					bold: false
				},
				{
					title: "花生日记2019双11总成交额42亿 相比去年增长..",
					url: "http://baijiahao.baidu.com/s?id=1650052319016060155",
					checked: false,
					bold: false
				},
				{
					title: "小鹏汽车获C轮4亿美元融资，小米集团成为新晋战略投..",
					url: "http://baijiahao.baidu.com/s?id=1650048981090959837",
					checked: false,
					bold: false
				},
				{
					title: "花呗、360借条深挖下沉市场 小镇青年成双11新高..",
					url: "http://baijiahao.baidu.com/s?id=1650050802462244574",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>