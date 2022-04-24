<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: "Military",
	title: "军事",
	data() {
		return {
			items: [
				{
					title: "针对谁显而易见？世界最大海上军演展开，56国舰队浩..",
					url: "http://baijiahao.baidu.com/s?id=1649961601381225337",
					checked: false,
					bold: true
				},
				{
					title: "中日女兵阅兵对比：无论气质、身高还是整齐度，中国女..",
					url: "http://baijiahao.baidu.com/s?id=1649961856271533352",
					checked: false,
					bold: false
				},
				{
					title: "照片曝光！关键部位现8毫米裂纹 韩国停飞13架波音..",
					url: "http://baijiahao.baidu.com/s?id=1649976423064068448",
					checked: false,
					bold: false
				},
				{
					title: "美媒：F-4“鬼怪”战机即将在全球范围退出现役",
					url: "http://baijiahao.baidu.com/s?id=1649978261259483896",
					checked: false,
					bold: false
				},
				{
					title: "新航母竟无法使用F-35 美海军重大失误令国会恼火",
					url: "http://baijiahao.baidu.com/s?id=1649979204937715203",
					checked: false,
					bold: false
				},
				{
					title: "靠它来拦截反舰导弹？美军驱逐舰疑似加装激光炮",
					url: "http://baijiahao.baidu.com/s?id=1649981686992054431",
					checked: false,
					bold: false
				},
				{
					title: "帅！他们来自火箭军骑兵分队",
					url: "http://baijiahao.baidu.com/s?id=1649982058381610183",
					checked: false,
					bold: true
				},
				{
					title: "韩日军情协定最后期限将至 美军高官挨个访问韩国",
					url: "http://baijiahao.baidu.com/s?id=1649984603325037801",
					checked: false,
					bold: false
				},
				{
					title: "嫁给爱情有多幸福？这场集体婚礼给你答案！",
					url: "http://baijiahao.baidu.com/s?id=1649994493159547213",
					checked: false,
					bold: false
				},
				{
					title: "当“光棍节”遇上集体婚礼，会碰撞出怎样的火花？一大..",
					url: "http://baijiahao.baidu.com/s?id=1649993830419514718",
					checked: false,
					bold: false
				},
				{
					title: "聚焦！多国维和指挥官到访中国维和步兵营",
					url: "http://baijiahao.baidu.com/s?id=1649993903244866287",
					checked: false,
					bold: false
				},
				{
					title: "江西省九江军分区组织官兵寻根悟初心践使命",
					url: "http://baijiahao.baidu.com/s?id=1649999014038655919",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>