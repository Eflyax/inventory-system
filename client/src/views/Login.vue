<template>
	<div class="login">
		<div
			class="loader"
			v-if="loading"
		></div>
		<div v-else>
			<div
				v-for="(user, index) in userList" :key="index"
				@click="signInHandler(user.id)"
				class="avatar"
			>
				<v-avatar
					color="blue"
					size="60"
				/>
				<p>{{ user.name }}</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {useUser} from '../composables';

export const Home = {
	name: "Home",
	setup() {
		const
			{loadUser, loadUserList, userList, signIn, user, loading} = useUser();

		loadUserList();

		return {
			signIn,
			loadUser,
			loadUserList,
			userList,
			user,
			loading
		}
	},
	methods: {
		signInHandler(id: number): void {
			this.signIn(id);
			this.$router.push('/');
		}
	}
};

export default Home;
</script>

<style>
.avatar {
	cursor: pointer;
}
</style>
