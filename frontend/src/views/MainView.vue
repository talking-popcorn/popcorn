<template>
	<div class="main-view">
		<h1>mainview</h1>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const kindB = ref(''); // case type
const kindC = ref(''); // '업무상사고', '업무상질병'
</script>

<style lang="scss" scoped>
.main-view {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
