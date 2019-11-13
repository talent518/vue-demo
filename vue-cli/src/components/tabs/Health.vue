<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: "Health",
	title: "健康",
	data() {
		return {
			items: [
				{
					title: "「警惕」进入十一月，两位名人离世，这些病冬季高发，..",
					url: "http://baijiahao.baidu.com/s?id=1650051667772287256",
					checked: false,
					bold: true
				},
				{
					title: "得了胃癌能活多久？从胃癌高发地区的饮食嗜好，看胃癌..",
					url: "http://baijiahao.baidu.com/s?id=1650051480814357612",
					checked: false,
					bold: false
				},
				{
					title: "一天到晚总是手脚冰凉，是体质问题吗？小心是身体发来..",
					url: "http://baijiahao.baidu.com/s?id=1650051359430260575",
					checked: false,
					bold: false
				},
				{
					title: "初冬季节吃山药，身体可获得什么好处？需注意哪些事项..",
					url: "http://baijiahao.baidu.com/s?id=1650052935323442647",
					checked: false,
					bold: false
				},
				{
					title: "吃面包竟会查出酒驾？难道面包内含有酒精？",
					url: "http://baijiahao.baidu.com/s?id=1650050811001131529",
					checked: false,
					bold: false
				},
				{
					title: "大家都说“桃保人杏伤人李子树下埋死人”，真的假的？",
					url: "http://baijiahao.baidu.com/s?id=1650052954584493100",
					checked: false,
					bold: false
				},
				{
					title: "50岁后5个习惯要远离，别看不起眼，每个都是伤肝高..",
					url: "http://baijiahao.baidu.com/s?id=1650052013075204279",
					checked: false,
					bold: true
				},
				{
					title: "“秃”如其来 双十一90后狂买育发产品 专家细说防..",
					url: "http://baijiahao.baidu.com/s?id=1650046788987111311",
					checked: false,
					bold: false
				},
				{
					title: "银屑病反复发作苦不堪言，应做到这4点来预防复发？",
					url: "http://baijiahao.baidu.com/s?id=1650049241931226531",
					checked: false,
					bold: false
				},
				{
					title: "快收好！10个科室的医生从来不做这些事，想不到危害..",
					url: "http://baijiahao.baidu.com/s?id=1650048627719314027",
					checked: false,
					bold: false
				},
				{
					title: "肺好不好，看准4个地方就知道，不妨了解",
					url: "http://baijiahao.baidu.com/s?id=1650046688682705434",
					checked: false,
					bold: false
				},
				{
					title: "重视下肢血管健康，防止严重症状产生",
					url: "http://baijiahao.baidu.com/s?id=1650048050575138552",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>