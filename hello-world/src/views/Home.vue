<template>
  <div class="home">
		wef
		<br>
		userList: {{userList}}
  </div>
</template>

<script lang="ts">
import {useUser} from '@/composables';
import HelloWorld from '@/components/HelloWorld.vue';

export const Home = {
	name: "Home",
	components: {
		HelloWorld
	},
	mounted() {
		const {loadUserList, userList} = useUser();

		loadUserList();
		return  {
			userList
		}
	}
};

export default Home;
</script>
