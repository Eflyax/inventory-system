<template>
	<v-app>
		<v-app-bar app>
			<router-link to="/">
				<v-app-bar-title>
					Usmívejte se
				</v-app-bar-title>
			</router-link>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">

export default {
	name: 'App'
};
</script>

<style>
.btn-save {
	float: right;
}
.btn-remove {
	float: right;
}

</style>
