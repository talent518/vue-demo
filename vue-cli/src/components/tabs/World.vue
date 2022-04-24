<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: 'World',
	title: '国际',
	data() {
		return {
			items: [
				{
					title: "美军高层接连访韩，意在“军情协定”？",
					url: "https://3w.huanqiu.com/a/de583b/9CaKrnKnKO9?agt=8",
					checked: false,
					bold: true
				},
				{
					title: "希拉里：很多很多人，要我考虑参加2020总统大选",
					url: "https://3w.huanqiu.com/a/c36dc8/9CaKrnKnLc3?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "宣布启动铀浓缩活动后，伊朗拟明年恢复国际武器交易",
					url: "https://3w.huanqiu.com/a/de583b/9CaKrnKnKO8?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "对接洽谈 专场推介！山东省经贸代表团访问阿联酋、阿..",
					url: "http://baijiahao.baidu.com/s?id=1650052487986946298",
					checked: false,
					bold: false
				},
				{
					title: "「城市早报」消失的法国面包店和西班牙三道菜，以及来..",
					url: "http://baijiahao.baidu.com/s?id=1650053961796794107",
					checked: false,
					bold: false
				},
				{
					title: "法国“毒品包裹”案扑朔迷离：已有逾千公斤可卡因包裹..",
					url: "http://baijiahao.baidu.com/s?id=1650052090159117285",
					checked: false,
					bold: false
				},
				{
					title: "莫拉莱斯赴墨西哥政治避难 宣称将以更强姿态归来",
					url: "https://3w.huanqiu.com/a/de583b/9CaKrnKnKO7?agt=8",
					checked: false,
					bold: true
				},
				{
					title: "土耳其截获偷运移民货车，车上82人来自阿富汗",
					url: "https://3w.huanqiu.com/a/c36dc8/9CaKrnKnL0P?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "韩国屠宰近5万头猪遏制非洲猪瘟，河流被猪血“染红”",
					url: "https://3w.huanqiu.com/a/c36dc8/9CaKrnKnL2I?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "加泰独立支持者堵塞公路，西班牙到法国的高速断了",
					url: "http://baijiahao.baidu.com/s?id=1650051904368184838",
					checked: false,
					bold: false
				},
				{
					title: "皇马巨星沉寂9年后走红，球迷力挺他罚点球，媒体呼吁..",
					url: "http://baijiahao.baidu.com/s?id=1650048096990753884",
					checked: false,
					bold: false
				},
				{
					title: "男孩将漂流瓶扔进大西洋 9年后收到来自法国的回信",
					url: "http://baijiahao.baidu.com/s?id=1650047608670170219",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>