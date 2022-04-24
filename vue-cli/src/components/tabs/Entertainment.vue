<template>
	<ul>
		<li v-for="item in items" :class="{dot:item.bold,checked:item.checked}"><a :href="item.url" target="_blank" @click="item.checked=true">{{item.title}}</a></li>
	</ul>
</template>

<script>
export default {
	name: 'Entertainment',
	title: '娱乐',
	data() {
		return {
			items: [
				{
					title: "王心凌晒自拍稍显脸肿 坚持健身却被教练赶回家",
					url: "https://3w.huanqiu.com/a/64d6f1/9CaKrnKnKBb?agt=8",
					checked: false,
					bold: true
				},
				{
					title: "陈意涵生日晒瑜伽照感谢祝福 元气少女感依旧满分",
					url: "https://3w.huanqiu.com/a/64d6f1/9CaKrnKnKBh?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "林允晒戴花自拍粉嫩灿笑 收到双十一快递心情超好",
					url: "https://3w.huanqiu.com/a/bdb047/9CaKrnKnKBm?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "“杀妻骗保”的实操难点剖析",
					url: "http://baijiahao.baidu.com/s?id=1649962299980280166",
					checked: false,
					bold: false
				},
				{
					title: "这么多年过去，终于有人拍出了真正的杭州",
					url: "http://baijiahao.baidu.com/s?id=1649960491599678043",
					checked: false,
					bold: false
				},
				{
					title: "赌王家长得很像利智的女儿，为情伤单身6年，30岁恋..",
					url: "http://baijiahao.baidu.com/s?id=1649968691250413917",
					checked: false,
					bold: false
				},
				{
					title: "胡军晒儿子庆生照感谢祝福 康康愈发帅气闭眼许愿",
					url: "https://3w.huanqiu.com/a/bdb047/9CaKrnKnKDh?agt=8",
					checked: false,
					bold: true
				},
				{
					title: "张亮晒照为儿子庆祝生日 天天长腿吸睛阳光帅气",
					url: "https://3w.huanqiu.com/a/64d6f1/9CaKrnKnKCW?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "杨超越穿渔网袜又美又飒 吴宣仪手拿饮料甜笑可人",
					url: "https://3w.huanqiu.com/a/64d6f1/9CaKrnKnKCZ?agt=8",
					checked: false,
					bold: false
				},
				{
					title: "大实话！葛优回应“不用拦着”：为了明星拦路人是“纯..",
					url: "http://baijiahao.baidu.com/s?id=1649955552685364971",
					checked: false,
					bold: false
				},
				{
					title: "赌王“最不像富家子”的儿子何猷龙：从底层做起，与初..",
					url: "http://baijiahao.baidu.com/s?id=1649981773093463012",
					checked: false,
					bold: false
				},
				{
					title: "《妻子3》谢娜霍思燕下厨手艺娴熟 李娜绿色指甲超吸..",
					url: "http://baijiahao.baidu.com/s?id=1649961141043053532",
					checked: false,
					bold: false
				}
			]
		};
	}
};
</script>