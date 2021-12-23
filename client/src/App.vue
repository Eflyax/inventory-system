<template>
	<v-app>
		<v-app-bar app>
			<router-link to="/">
				<v-app-bar-title>
					Usmívejte se
				</v-app-bar-title>
			</router-link>

			<v-divider vertical class="mx-4" />
			<user-menu v-if="user" />
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import {UserMenu} from './components/UserMenu.vue';
import {useUser} from './composables';

export default {
	name: 'App',
	components: {
		UserMenu
	},
	setup() {
		const {user, loadUserFromSession} = useUser();

		loadUserFromSession();

		return {
			user,
			loadUserFromSession
		};
	}
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
