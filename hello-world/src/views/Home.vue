<template>
	<div class="home">
		Home

		<Form />
	</div>
</template>

<script lang="ts">
import Form from '../../src/form/Form/Form.vue';

export const Home = {
	name: 'Home',
	components: {
		Form
	}
}
export default Home;

</script>
