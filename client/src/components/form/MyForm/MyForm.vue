<template>
	<v-form
		:data-vv-scope="scope"
		@keydown.enter.native.prevent="onSubmit"
	>
		<slot name="default" />
	</v-form>
</template>

<script src="./MyForm.ts" lang="ts" />
