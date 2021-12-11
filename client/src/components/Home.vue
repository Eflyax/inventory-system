<template>
	<div class="body">
		<div class="left-panel"></div>
		<div class="graph">
			<!-- <v-btn @click="load">Test</v-btn> -->

		</div>
		<div class="sidebar"></div>
	</div>
</template>

<script lang="ts">
// import {useGitLog} from '@composables';

export const Home = {
	name: "Home",
	setup() {
		// const {load, gitLog} = useGitLog();

		// return {
		// 	load,
		// 	gitLog
		// }
	},
	data() {
		return {
		};
	}
};

export default Home;
</script>
