<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: 'Sports',
	title: '体育',
	data() {
		return {
			items: [
				{
					title: "大马一州取消女子体操，全员被禁赛，原因竟是服装暴露..",
					url: "http://baijiahao.baidu.com/s?id=1649982962029573281",
					checked: false,
					bold: true
				},
				{
					title: "ATP总决赛战报：纳达尔首秀落败 西西帕斯迎开门红",
					url: "http://baijiahao.baidu.com/s?id=1649960164083681646",
					checked: false,
					bold: false
				},
				{
					title: "轰33+6+5，连续五场25+！枸杞哥蜕变威震天，..",
					url: "http://baijiahao.baidu.com/s?id=1649963621120932439",
					checked: false,
					bold: false
				},
				{
					title: "双翼齐飞！国足两边后卫有进球有助攻，客战叙利亚或联..",
					url: "http://baijiahao.baidu.com/s?id=1649959992375573738",
					checked: false,
					bold: false
				},
				{
					title: "难怪里皮坚持带他！39岁郑智再次客串中卫表现完美，..",
					url: "http://baijiahao.baidu.com/s?id=1649962568728929704",
					checked: false,
					bold: false
				},
				{
					title: "从德甲保级队登陆英超后一年，他成为8700万先生的..",
					url: "http://baijiahao.baidu.com/s?id=1649960161706019798",
					checked: false,
					bold: false
				},
				{
					title: "帕克正式退役！9号球衣高挂，法国人眼眶含泪，跟GD..",
					url: "http://baijiahao.baidu.com/s?id=1649968364917728039",
					checked: false,
					bold: true
				},
				{
					title: "神似2016欧洲杯！U17世界杯小组第三杀进决赛",
					url: "http://baijiahao.baidu.com/s?id=1649960383856099215",
					checked: false,
					bold: false
				},
				{
					title: "枸杞少年怒砸保温杯，维金斯告诉你啥是真正SUPER..",
					url: "http://baijiahao.baidu.com/s?id=1649967198134169174",
					checked: false,
					bold: false
				},
				{
					title: "巴西女排能连拿两个奥运冠军 除了全队都能打 还自带..",
					url: "http://baijiahao.baidu.com/s?id=1649960547946133986",
					checked: false,
					bold: false
				},
				{
					title: "狂轰58+14+11！打翻枸杞保温杯，威金斯彻底打..",
					url: "http://baijiahao.baidu.com/s?id=1649963146928906636",
					checked: false,
					bold: false
				},
				{
					title: "粤媒评国青出局：管理混乱 积弱已久",
					url: "http://baijiahao.baidu.com/s?id=1649960653966437997",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>