<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: "Lady",
	title: "女人",
	data() {
		return {
			items: [
				{
					title: "35岁前交过4个女友，初恋怀孕4个月不辞而别，如今..",
					url: "http://baijiahao.baidu.com/s?id=1650055715347645440",
					checked: false,
					bold: true
				},
				{
					title: "「是日美好事物」三宅一生限定包袋如糖纸般缤纷，To..",
					url: "http://baijiahao.baidu.com/s?id=1650048982340018542",
					checked: false,
					bold: false
				},
				{
					title: "马拉松冠军怀孕7个月坚持训练！跑步+举杠铃 她比小..",
					url: "http://baijiahao.baidu.com/s?id=1650049125345253370",
					checked: false,
					bold: false
				},
				{
					title: "中国女孩在印度当“星探”，教会这些女性如何用短视频..",
					url: "http://baijiahao.baidu.com/s?id=1650043697145940268",
					checked: false,
					bold: false
				},
				{
					title: "有房有车都过时了？看看女性择偶全新的“三不嫁”，生..",
					url: "http://baijiahao.baidu.com/s?id=1649989546544834043",
					checked: false,
					bold: false
				},
				{
					title: "唐嫣怀孕数月风彩依旧，疯狂工作为娃赚奶粉钱，两部新..",
					url: "http://baijiahao.baidu.com/s?id=1649911244340573610",
					checked: false,
					bold: false
				},
				{
					title: "唐嫣挺孕肚拍杂志！四肢纤细衣着宽松遮肚子，鼻子怪异..",
					url: "http://baijiahao.baidu.com/s?id=1649901713349571606",
					checked: false,
					bold: true
				},
				{
					title: "UNINE成员陈宥维、何昶希与粉丝分享护肤秘籍",
					url: "http://baijiahao.baidu.com/s?id=1649902010039955310",
					checked: false,
					bold: false
				},
				{
					title: "孕妇怀孕后期，发现肚子竟然越来越小，去医院检查后医..",
					url: "http://baijiahao.baidu.com/s?id=1649899409520729583",
					checked: false,
					bold: false
				},
				{
					title: "痛心！长春女子怀孕18周，因为这事儿被迫引产……「..",
					url: "http://baijiahao.baidu.com/s?id=1649863009659327339",
					checked: false,
					bold: false
				},
				{
					title: "上班戴眼镜丑，来大姨妈脏？日本女性怒了！",
					url: "http://baijiahao.baidu.com/s?id=1649877090799113839",
					checked: false,
					bold: false
				},
				{
					title: "瑜伽可以提高女性气质，那么对于孩子来说，练习它会有..",
					url: "http://baijiahao.baidu.com/s?id=1649875866149780081",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>