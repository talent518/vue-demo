<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: 'China',
	title: '国内',
	data() {
		return {
			items: [
				{
					title: "国台办：3名台湾居民涉危害国家安全在大陆被审查",
					url: "https://3w.huanqiu.com/a/c36dc8/7Rz2HxbOEM0?agt=8",
					checked: false,
					bold: true
				},
				{
					title: "不满“太阳花”赔偿判决 台退休警察：下架蔡当局",
					url: "https://3w.huanqiu.com/a/c36dc8/9CaKrnKnKWe?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "双11特供强冷空气已发货 超详细到货时间表出炉",
					url: "https://3w.huanqiu.com/a/a7835f/9CaKrnKnKXO?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "文旅融合成为甘肃“新名片”",
					url: "http://baijiahao.baidu.com/s?id=1650050392335647604",
					checked: false,
					bold: false
				},
				{
					title: "安徽：4月以来66名涉腐涉“伞”涉“网”公职人员投..",
					url: "http://baijiahao.baidu.com/s?id=1650040052039444726",
					checked: false,
					bold: false
				},
				{
					title: "甘肃将打造精致唯美“样板工程”，提升改造黄河风情线",
					url: "http://baijiahao.baidu.com/s?id=1650024514498178462",
					checked: false,
					bold: false
				},
				{
					title: "宋楚瑜宣布第5次参选台湾地区领导人",
					url: "https://3w.huanqiu.com/a/de583b/9CaKrnKnLdb?agt=8",
					checked: false,
					bold: true
				},
				{
					title: "想转就转？携号转网前你需要了解这些问题",
					url: "https://3w.huanqiu.com/a/26ef70/9CaKrnKnL1w?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "喝能量液能逆转青春？合肥破获传销大案 销售额近5亿元",
					url: "https://3w.huanqiu.com/a/df051c/9CaKrnKnKWb?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "又一明星外援将迎CBA首秀！福建官宣换外援 小斯或..",
					url: "http://baijiahao.baidu.com/s?id=1649987517949016785",
					checked: false,
					bold: false
				},
				{
					title: "官宣！福建队正式激活姚明昔日死敌 王哲林将联手前N..",
					url: "http://baijiahao.baidu.com/s?id=1649987217988329278",
					checked: false,
					bold: false
				},
				{
					title: "形势明确，江苏安徽抗旱喜雨越来越近！权威预测：或从..",
					url: "http://baijiahao.baidu.com/s?id=1649972038995820956",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>