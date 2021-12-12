<template>
  <div class="home">
		<!-- <Input
			v-model="foo"
			v-validate="'required'"
			label="Current password"
			type="text"
		/> -->
  </div>
</template>

<script lang="ts">
// import Input from './../components/form/Input/Input.vue';

export const Home = {
	name: 'Home',
	components: {
		// Input
	},
	data() {
		return {
			foo: 'bar'
		};
	},
	mounted()  {
		this.$emit('wef');
	}
};

export default Home;
</script>
