<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: 'Finance',
	title: '财经',
	data() {
		return {
			items: [
				{
					title: "1.48万亿！央行首次发布双十一“剁手”数据：人均..",
					url: "http://baijiahao.baidu.com/s?id=1650054680929780218",
					checked: false,
					bold: true
				},
				{
					title: "以往没上市就被抢空，今年低价都卖不动，口碑价格双扑..",
					url: "http://baijiahao.baidu.com/s?id=1649985918278914607",
					checked: false,
					bold: false
				},
				{
					title: "港股异动｜理文、玖纸齐涨 机构指中国纸品及包装业最..",
					url: "http://baijiahao.baidu.com/s?id=1649960310913246781",
					checked: false,
					bold: false
				},
				{
					title: "华为员工亲自讲诉：真实的伊拉克比你想象的还要危险",
					url: "http://baijiahao.baidu.com/s?id=1649961990438992899",
					checked: false,
					bold: false
				},
				{
					title: "重磅！北京营商环境改革升级3.0，推出204项措施",
					url: "http://baijiahao.baidu.com/s?id=1649960860583544521",
					checked: false,
					bold: false
				},
				{
					title: "市场论克卖，一斤近10万元，却还供不应求，农民：真..",
					url: "http://baijiahao.baidu.com/s?id=1649961092961717394",
					checked: false,
					bold: false
				},
				{
					title: "身价60亿却因1000万食言？兰州巨贾旗下公司卖“..",
					url: "http://baijiahao.baidu.com/s?id=1649960713200707063",
					checked: false,
					bold: true
				},
				{
					title: "纸涨猪飞，快消行业掀起新一轮涨价潮",
					url: "http://baijiahao.baidu.com/s?id=1649960922780912653",
					checked: false,
					bold: false
				},
				{
					title: "中关村上市公司竞争力报告：数量占比超6成的民企拥有..",
					url: "http://baijiahao.baidu.com/s?id=1649960320363920956",
					checked: false,
					bold: false
				},
				{
					title: "在汉央企研发极端装备，助力川藏铁路建设",
					url: "http://baijiahao.baidu.com/s?id=1649984253125583032",
					checked: false,
					bold: false
				},
				{
					title: "40037吨！前10个月，中国稀土出口下滑7.1%..",
					url: "http://baijiahao.baidu.com/s?id=1649961280632363947",
					checked: false,
					bold: false
				},
				{
					title: "为了吃肉，他们到底有多拼",
					url: "http://baijiahao.baidu.com/s?id=1649961736098180329",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>