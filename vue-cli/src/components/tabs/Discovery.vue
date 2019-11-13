<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: "Discovery",
	title: "探索",
	data() {
		return {
			items: [
				{
					title: "为何拥有如此多星星的宇宙依然很黑暗？",
					url: "http://baijiahao.baidu.com/s?id=1650055281139390066",
					checked: false,
					bold: true
				},
				{
					title: "以色列突然不宣而战，中东名将尸骨无存，发射200枚..",
					url: "http://baijiahao.baidu.com/s?id=1650051726781776042",
					checked: false,
					bold: false
				},
				{
					title: "行星环绕，甚至生命繁衍，但早期宇宙的恒星却并非如此",
					url: "http://baijiahao.baidu.com/s?id=1650004344465720809",
					checked: false,
					bold: false
				},
				{
					title: "寿命比肩宇宙，但进化之路已被锁死，人类出现在太阳系..",
					url: "http://baijiahao.baidu.com/s?id=1649983758822584892",
					checked: false,
					bold: false
				},
				{
					title: "俄成功试射一枚导弹，发射重量高达36.8吨，升级工..",
					url: "http://baijiahao.baidu.com/s?id=1649982626510031801",
					checked: false,
					bold: false
				},
				{
					title: "SpaceX发射第二批“星链”卫星 明年提供天基宽..",
					url: "http://baijiahao.baidu.com/s?id=1649982996956401134",
					checked: false,
					bold: false
				},
				{
					title: "美国国家航空航天局（NASA）如何探测数千光年以外..",
					url: "http://baijiahao.baidu.com/s?id=1649972497510911966",
					checked: false,
					bold: true
				},
				{
					title: "Space X再发60颗星链卫星 火箭自动回收成功",
					url: "http://baijiahao.baidu.com/s?id=1649964868630325170",
					checked: false,
					bold: false
				},
				{
					title: "马斯克：SpaceX发射火箭的费用仅为目前NASA..",
					url: "http://baijiahao.baidu.com/s?id=1649895842300504807",
					checked: false,
					bold: false
				},
				{
					title: "印军又闹大笑话，T90坦克实弹发射，一声炮响坦克兵..",
					url: "http://baijiahao.baidu.com/s?id=1649889674580265324",
					checked: false,
					bold: false
				},
				{
					title: "尖峰抗癌利器引领“AI抗癌”",
					url: "http://baijiahao.baidu.com/s?id=1649880993507894882",
					checked: false,
					bold: false
				},
				{
					title: "未击中目标狙击手也能再次发射，狙击点设置选择有什么..",
					url: "http://baijiahao.baidu.com/s?id=1649874674499679109",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>