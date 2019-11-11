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
</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			title: 'Hello world!',
			users: [],
			usersLoaded: false
		}
	},
	methods: {
		mailto: function(name,email) {
			return (name === undefined || email === undefined) ? '&nbsp;' : '<a href="mailto:'+name+' &lt;'+email+'&gt;">'+email+'</a>';
		},
		refresh: function() {
			this.$http.get('http://jsonplaceholder.typicode.com/users').then((data) => {
				this.users = data.body;
				this.usersLoaded = true;
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
		
		this.refresh();
		console.log(this);
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
.hello {padding:10px;}
.hello h1{margin:-10px -10px 0;font-size:18px;line-height:50px;text-align:center;background:#ddd;}
.hello h3{margin:10px 0 5px;font-size:14px;}
.hello a{text-decoration:none;}
.hello a:hover{color:#F20;}
.hello table,.hello th,.hello td{border:1px #ccc solid;border-collapse:collapse;padding:5px;white-space:nowrap;}
</style>
