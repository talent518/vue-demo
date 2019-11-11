<template>
<div class="m-users">
	<h1>{{title}}</h1>
	<ul>
		<li v-for="user in users">{{user}}</li>
	</ul>
	<table>
		<thead>
			<tr>
				<th>{{name}}</th>
				<th>{{age}}</th>
				<th>{{sex}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="user in userList">
				<td>{{user.name}}</td>
				<td>{{user.age}}</td>
				<td>{{sexs[user.sex]}}</td>
			</tr>
		</tbody>
	</table>
</div>
</template>

<script>
export default {
	name: 'users',
	props: {
		title: {
			type: String,
			default: 'User list:'
		},
		sexs: {
			type: Object & Array,
			default: () => {
				return ['Woman', 'Man'];
			}
		},
		name: {
			type: String,
			default: 'Name'
		},
		age: {
			type: String,
			default: 'Age'
		},
		sex: {
			type: String,
			default: 'Sex'
		}
	},
	data: () => {
		return {
			users:["Henry","Bucky","Emily"],
			userList:[
				{
					name:"Henry",
					age:20,
					sex:0,
				},
				{
					name:"Bucky",
					age:30,
					sex:1,
				},
				{
					name:"Emily",
					age:24,
					sex:0,
				}
			],
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.m-users{padding:10px;}
.m-users h1{font-size:14px;color:green;}
.m-users ul{margin:0;padding-left:2em;}
.m-users table{margin-top:10px;}
.m-users thead{border-bottom:2px #ccc solid;}
.m-users table,.m-users th,.m-users td{border:1px #ccc solid;border-collapse:collapse;padding:5px;}
</style>
