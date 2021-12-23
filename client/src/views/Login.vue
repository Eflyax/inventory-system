<template>
	<div class="login">
		<div
			class="loader"
			v-if="loading"
		></div>
		<v-container v-else>
			<v-row no-gutters>
				<v-col
					cols="6"
					sm="1"
					md="3"
					v-for="(user, index) in userList" :key="index"
					@click="signInHandler(user.id)"
				>
					<v-card
						class="pa-2 navigation-card"
						outlined
						tile
					>
						<v-avatar
							color="blue"
							size="100"
						/>
						<p>{{ user.name }}</p>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import {useUser} from '../composables';

export const Home = {
	name: "Home",
	setup() {
		const
			{loadUserList, userList, signIn, user, loading} = useUser();

		return {
			signIn,
			loadUserList,
			userList,
			user,
			loading
		}
	},
	mounted() {
		this.loadUserList();
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
