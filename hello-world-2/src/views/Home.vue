<template>
  <div class="home">
		<Input
			v-model="foo"
			v-validate="'required'"
			label="Current password"
			type="text"
		/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
});

</script>
