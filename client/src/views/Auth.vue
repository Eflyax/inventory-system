<template>
	<div class="auth">
		<my-form>
			<my-input
				type="text"
				v-model="token"
			/>

			<v-btn
				class="btn-save"
				color="green"
				@click="submit"
			>
				Přihlásit se
			</v-btn>
		</my-form>
	</div>
</template>

<script lang="ts">
import {useUser, useApi} from '../composables';

export const Home = {
	name: "Home",
	data() {
		return {
			token: ''
		}
	},
	setup() {
		const
			{setToken} = useApi(),
			{loadUserList, loading} = useUser();

		return {
			loadUserList,
			setToken,
			loading
		}
	},
	methods: {
		async submit() {
			if (await this.$validator.validate()) {
				this.setToken(this.token);
				await this.loadUserList();

				this.$router.push('Login');
			}
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
