JSON.stringify($('#local_news,.civilnews,.InternationalNews,.EnterNews,.SportNews,.FinanceNews,.TechNews,.MilitaryNews,.InternetNews,.DiscoveryNews,.LadyNews,.HealthNews').map(function(){
	let names = $('.column-title-border>h2>*', this).map(function(){return $(this).text();});
	let img = $('.l-middle-col .imagearea-top>img:first', this).get(0);
	return {
		name: names[1],
		title: names[0],
		items: $('.l-left-col>ul>*',this).map(function() {
			let a = $('a',this).get(0);
			return {
				title: a.innerText,
				url: a.href,
				bold: $('span.dot',this).size()>0
			}
		}).toArray()
	};
}).toArray());

// 浏览器控制台执行以上JS代码

JSON.stringify((function(){
	let imgs = {};
	$('#local_news,.civilnews,.InternationalNews,.EnterNews,.SportNews,.FinanceNews,.TechNews,.MilitaryNews,.InternetNews,.DiscoveryNews,.LadyNews,.HealthNews').map(function(){
		let names = $('.column-title-border>h2>*', this).map(function(){return $(this).text();});
		let $a = $('.l-middle-col .imagearea:visible .imagearea-top a.item-title', this);
		let $img = $a.prev().children('img').first();
		console.log($a,$img);
		imgs[names[1]] = {
			url: $a.prop('href'),
			src: $img.prop('src'),
			alt: $a.text()
		};
	});
	return imgs;
})());

// 