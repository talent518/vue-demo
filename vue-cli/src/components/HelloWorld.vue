<template>
<div class="hello">
	<h1>{{title}}</h1>
	<template v-if="users && users.length">
		<h3><a v-on:click.prevent="refresh" href="#" style="float:right;">Refresh</a>User list from jsonplaceholder.typicode.com</h3>
		<table>
			<thead>
				<tr>
					<th rowspan="2">ID</th>
					<th rowspan="2">Name</th>
					<th rowspan="2">User Name</th>
					<th rowspan="2">E-mail</th>
					<th colspan="4">Address</th>
					<th colspan="2">GEO</th>
					<th rowspan="2">Phone</th>
					<th rowspan="2">Website</th>
					<th colspan="3">Company</th>
				</tr>
				<tr>
					<!-- Address -->
					<th>Street</th>
					<th>Suite</th>
					<th>City</th>
					<th>Zipcode</th>
					<th>lat</th>
					<th>lng</th>
					
					<!-- Company -->
					<th>Name</th>
					<th>Catch Phrase</th>
					<th>BS</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users">
					<td>{{user.id}}</td>
					<td>{{user.name}}</td>
					<td>{{user.username}}</td>
					<td v-html="mailto(user.name,user.email)"></td>
					<template v-if="user.address">
						<td>{{user.address.street}}</td>
						<td>{{user.address.suite}}</td>
						<td>{{user.address.city}}</td>
						<td>{{user.address.zipcode}}</td>
						<td>{{user.address.geo.lat}}</td>
						<td>{{user.address.geo.lng}}</td>
					</template>
					<template v-else>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</template>
					<td>{{user.phone}}</td>
					<td>{{user.website}}</td>
					<template v-if="user.company">
						<td>{{user.company.name}}</td>
						<td>{{user.company.catchPhrase}}</td>
						<td>{{user.company.bs}}</td>
					</template>
					<template v-else>
						<td></td>
						<td></td>
						<td></td>
					</template>
				</tr>
			</tbody>
		</table>
	</template>
	<div :class="{load:true,loading:load.loading}"><span class="gradient">{{load.text}}</span><span class="shadow">{{load.text}}</span></div>
</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			title: 'Hello world!',
			users: window.users||[],
			usersLoaded: window.usersLoaded,
			load: {
				loading:false,
				texts: ['Loading .','Loading ..','Loading ...'],
				i: 0,
				text: 'Loading .',
				timer: 0
			}
		}
	},
	methods: {
		mailto: function(name,email) {
			return (name === undefined || email === undefined) ? '&nbsp;' : '<a href="mailto:'+name+' &lt;'+email+'&gt;">'+email+'</a>';
		},
		refresh: function() {
			this.load.loading = true;
			this.load.timer = window.setInterval(function(){
				if(++this.load.i == this.load.texts.length)
					this.load.i = 0;
				this.load.text = this.load.texts[this.load.i];
			}.bind(this), 300);
			this.$http.get('http://jsonplaceholder.typicode.com/users').then((data) => {
				// setTimeout(function(){
				window.clearInterval(this.load.timer);
				this.load.i = 0;
				this.load.text = 'Loading .';
				this.load.timer = 0;
				this.load.loading = false;
				// }.bind(this),10000);
				
				this.users = window.users = data.body;
				this.usersLoaded = window.usersLoaded = true;
			});
		}
	},
	watch: { // 监视数据的变更
		users: function(newval,oldval) {
			console.log('change - users');
			// console.log('newval='+JSON.stringify(newval)+'\noldval='+JSON.stringify(oldval));
			// console.log(newval,oldval);
		},
		usersLoaded: function(newval,oldval) {
			console.log('change - usersLoaded');
			// console.log('newval='+JSON.stringify(newval)+', oldval='+JSON.stringify(oldval));
			// console.log(newval,oldval);
		}
	},
	beforeCreate: function() {
		console.log('HelloWorld - beforeCreate');
	},
	created: function() {
		console.log('HelloWorld - created');
		
		if(!window.usersLoaded)
			this.refresh();
	},
	beforeMount: function() {
		console.log('HelloWorld - beforeMount');
	},
	mounted: function() {
		console.log('HelloWorld - mounted');
	},
	beforeUpdate: function() {
		console.log('HelloWorld - beforeUpdate');
	},
	updated: function() {
		console.log('HelloWorld - updated');
	},
	beforeDestroy: function() {
		console.log('HelloWorld - beforeDestroy');
	},
	destroyed: function() {
		console.log('HelloWorld - destroyed');
	}
}
</script>

<style>
.hello {padding:10px;position:relative;}
.hello h1{margin:-10px -10px 0;font-size:18px;line-height:50px;text-align:center;background:#ddd;}
.hello h3{margin:10px 0 5px;font-size:14px;}
.hello a{text-decoration:none;}
.hello a:hover{color:#F20;}
.hello table,.hello th,.hello td{border:1px #ccc solid;border-collapse:collapse;padding:5px;white-space:nowrap;}
.hello>.load{display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;overflow:hidden;background:rgba(0,0,0,0.5);}
.hello>.load>span{position:absolute;left:50%;top:50%;margin-left:-2em;margin-top:-0.5em;z-index:2;font-size:60px;font-weight:bold;-webkit-animation: rotateplane 2s infinite ease-in-out;animation: rotateplane 1.2s infinite ease-in-out;}
.hello>.load>span.shadow{z-index:1;padding:2px;color:#ddd;/* color:rgba(0,0,0,0.6); */}
.hello>.load>span.gradient{background: -webkit-gradient(linear,left top,right bottom,from(#FF0000),to(#0000FF));-webkit-background-clip: text;-webkit-text-fill-color: transparent;}
.hello>.loading{display:flex;}

@keyframes rotateplane {
	0% {
		transform: perspective(250px) rotateX(360deg) rotateY(0deg);
		-webkit-transform: perspective(250px) rotateX(360deg) rotateY(0deg);
	}
	50% {
		transform: perspective(250px) rotateX(0deg) rotateY(0deg);
		-webkit-transform: perspective(250px) rotateX(0deg) rotateY(0deg);
	}
	100% {
		transform: perspective(250px) rotateX(0deg) rotateY(-360deg);
		-webkit-transform: perspective(250px) rotateX(0deg) rotateY(-360deg);
	}
}
</style>
