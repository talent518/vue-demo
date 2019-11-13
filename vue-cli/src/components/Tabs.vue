<template>
<div class="m-tabs">
	<nav>
		<span v-for="tab in tabList" :title="tab.name" @click="switchTo(tab)" :class="{checked:tab.checked}">{{tab.title}}</span>
	</nav>
	<keep-alive><component :is="tabName" /></keep-alive>
	<span>{{tabTitle}}</span>
	<span>{{tabName}}</span>
	<a :href="img.url" target="_blank"><img :src="img.src" :alt="img.alt" /><span :title="img.alt">{{img.alt}}</span></a>
</div>
</template>

<script>
import LocalNews from './tabs/LocalNews';
import China from './tabs/China';
import World from './tabs/World';
import Entertainment from './tabs/Entertainment';
import Sports from './tabs/Sports';
import Finance from './tabs/Finance';
import Technology from './tabs/Technology';
import Military from './tabs/Military';
import Internet from './tabs/Internet';
import Discovery from './tabs/Discovery';
import Lady from './tabs/Lady';
import Health from './tabs/Health';

export default {
	name: 'Tabs',
	components: {
		LocalNews,
		China,
		World,
		Entertainment,
		Sports,
		Finance,
		Technology,
		Military,
		Internet,
		Discovery,
		Lady,
		Health
	},
	data() {
		let list = [LocalNews, China, World, Entertainment, Sports, Finance, Technology, Military, Internet, Discovery, Lady, Health];
		let tabList = [];
		let tabMap = {};

		list.forEach(function(v,k) {
			tabList.push({
				name: v.name,
				title: v.title,
				checked: false
			});
		});
		
		tabList.forEach(function(v) {
			tabMap[v.name] = v;
		});
		
		return {
			tabList,
			tabMap,
			tabName: '',
			tabTitle: '',
			img: {},
			imgs: {
				LocalNews: {
					url: "http://baijiahao.baidu.com/s?id=1650054639316287721",
					src: "https://t10.baidu.com/it/u=1093882146,724682466&fm=173&app=49&f=JPEG?w=218&h=146&s=592205D517A30F1B0240F12203002043",
					alt: "上海4万多台小区老电梯，多少维修难难难？"
				},
				China: {
					url: "http://baijiahao.baidu.com/s?id=1650010374239714172",
					src: "https://t11.baidu.com/it/u=2415144901,246679529&fm=173&app=49&f=JPEG?w=218&h=146&s=3A6048878F9637C212C4C92603003091",
					alt: "一年解决27万件群众“心头事”，济南“行走城管”理.."
				},
				World: {
					url: "http://baijiahao.baidu.com/s?id=1650055352833485367",
					src: "https://t11.baidu.com/it/u=1215514672,892431165&fm=173&app=49&f=JPEG?w=218&h=146&s=A5B65F9438AA2A0372252CD40300C0E0",
					alt: "澳大利亚的F-35A战机买错了？本地智库称当初就不.."
				},
				Entertainment: {
					url: "https://3w.huanqiu.com/a/bdb047/9CaKrnKnKBi?agt=8",
					src: "http://hiphotos.baidu.com/news/crop%3D3%2C0%2C994%2C667%3Bq%3D80%3B/sign=2b17177ea0c379316927dc69d6f79b75/730e0cf3d7ca7bcb59a11257b1096b63f724a8f4.jpg",
					alt: "刘惜君穿抹胸小礼服展现迷人锁骨"
				},
				Sports: {
					url: "http://baijiahao.baidu.com/s?id=1649516931297901667",
					src: "https://t11.baidu.com/it/u=100076533,3387794246&fm=173&app=49&f=JPEG?w=218&h=146&s=60D2708D0B07114342BDEA9F0300C084",
					alt: "申花外援沙拉维、金信煜20日归队，对阵国安状态难保.."
				},
				Finance: {
					url: "http://baijiahao.baidu.com/s?id=1650050100411361235",
					src: "https://t11.baidu.com/it/u=2641336822,4119150862&fm=173&app=49&f=JPEG?w=218&h=146&s=16145E8586724F98820DE8D90300C0B3",
					alt: "国企改革三年行动方案将推出，混改按下加速键"
				},
				Technology: {
					url: "http://baijiahao.baidu.com/s?id=1650056096854911003",
					src: "https://t10.baidu.com/it/u=406255560,111667343&fm=173&app=49&f=JPEG?w=218&h=146&s=F504D015586908013A19FCDF0300E0B7",
					alt: "“下一个阿里巴巴”等待拯救！孙正义的结局，进入90.."
				},
				Military: {
					url: "http://baijiahao.baidu.com/s?id=1649977149796838719",
					src: "https://t11.baidu.com/it/u=2718482209,1989751838&fm=173&app=49&f=JPEG?w=218&h=146&s=1C30C7154AF03482CE24050603007072",
					alt: "各国都有自己的代表枪械，美国有M24，德国有98K.."
				},
				Internet: {
					url: "http://baijiahao.baidu.com/s?id=1650048439981946583",
					src: "https://t12.baidu.com/it/u=1208505278,1132376435&fm=173&app=49&f=JPEG?w=218&h=146&s=E9871B760775652628A3546B0200B03A",
					alt: "阿里11月12日通过港交所聆讯 传定价区间于180.."
				},
				Discovery: {
					url: "http://baijiahao.baidu.com/s?id=1649893525225346142",
					src: "https://t11.baidu.com/it/u=2710141996,362064874&fm=173&app=49&f=JPEG?w=218&h=146&s=0310AB6EE6058115E3A5249A0100C091",
					alt: "为未来登月任务做准备 NASA打开尘封近50年月球.."
				},
				Lady: {
					url: "http://baijiahao.baidu.com/s?id=1649805171559673963",
					src: "https://t11.baidu.com/it/u=1154617954,4292517550&fm=173&app=49&f=JPEG?w=218&h=146&s=E76ABF579A9072D8491C457F0300E066",
					alt: "“美丽经济”搭上“科技护肤”化妆品行业趋向定制化"
				},
				Health: {
					url: "http://baijiahao.baidu.com/s?id=1650054222871442130",
					src: "https://t11.baidu.com/it/u=3308916616,1166763771&fm=173&app=49&f=JPEG?w=218&h=146&s=E626DD4F094719515444E03B030080C3",
					alt: "双11你忙着囤奶粉化妆品！杭州人忙着囤健身私教课！"
				}
			}
		};
	},
	methods: {
		switchTo(tab) {
			this.tabList.forEach(function(v) {
				v.checked = false;
			});
			
			this.tabName = tab.name;
			this.tabTitle = tab.title;
			this.img = this.imgs[this.tabName];
			
			window.location.hash = '#' + this.tabName;
			tab.checked = true;
		}
	},
	created() {
		let hash = window.location.hash.substr(1);
		if(hash in this.tabMap)
			this.switchTo(this.tabMap[hash]);
		else
			this.switchTo(this.tabList[0]);
	}
};
</script>

<style>
.m-tabs{padding:10px;}
.m-tabs>nav{height:30px;border-bottom:2px #ccc solid;margin-bottom:10px;}
.m-tabs>nav>span{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}
.m-tabs>nav>span{display:inline-block;line-height:30px;padding:0 10px;cursor:pointer;}
.m-tabs>nav>span.checked{border-bottom:2px #339 solid;color:#339;}
.m-tabs>nav>span:hover{border-bottom:2px #F60 solid;color:#F60}
.m-tabs>ul{margin:0 20px 0 0;padding:0;display:inline-block;}
.m-tabs>ul>li{list-style-type:none;line-height:26px;}
.m-tabs>ul>li:before{content:'▫';margin-right:5px;}
.m-tabs>ul>li.dot{font-weight:bold;}
.m-tabs>ul>li.dot:before{content:'▪';color:#F60;}
.m-tabs>ul>li.checked:after{content:'✓';font-weight:bold;margin-left:10px;color:red;}
.m-tabs>ul a{text-decoration:none;color:black;}
.m-tabs>ul a:visited{color:#339;}
.m-tabs>ul a:hover{color:#F60;}
.m-tabs>span{display:inline-block;writing-mode:tb-rl;vertical-align:top;text-align:center;font-size:40px;}
.m-tabs>a{display:inline-block;margin-left:20px;vertical-align:top;}
.m-tabs>a>img{width:240px;}
.m-tabs>a>span{display:block;width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
</style>
