<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: 'LocalNews',
	title: '上海新闻',
	data() {
		return {
			items: [
				{
					title: "最强冷空气今天到货！赠品是大风降水；建成后直达...",
					url: "http://baijiahao.baidu.com/s?id=1650039809842410810",
					checked: false,
					bold: true
				},
				{
					title: "从打桩到封顶，听78岁“爬楼爷叔”讲讲他跟拍上...",
					url: "http://baijiahao.baidu.com/s?id=1650056768355951388",
					checked: false,
					bold: false
				},
				{
					title: "上海迪士尼安检依旧在“翻包” 声称符合规定",
					url: "http://baijiahao.baidu.com/s?id=1650053294193385230",
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
					title: "黄浦江畔有了便民“驿站”（四中全会看落实·基层...",
					url: "http://baijiahao.baidu.com/s?id=1650046231927108139",
					checked: false,
					bold: false
				},
				{
					title: "「交通」进博会国家馆明起延展，交通出行这样最方...",
					url: "http://baijiahao.baidu.com/s?id=1650025019056859343",
					checked: false,
					bold: false
				},
				{
					title: "惨败暴露关键缺陷！没有靠谱后卫，上海队前场再强...",
					url: "http://baijiahao.baidu.com/s?id=1650052507925783528",
					checked: false,
					bold: false
				},
				{
					title: "上海男篮87比106惨败！李秋平这番话说出了关...",
					url: "http://baijiahao.baidu.com/s?id=1650052679530835089",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>