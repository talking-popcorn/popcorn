<template>
	<app-header></app-header>
	<router-view></router-view>
	<app-footer></app-footer>
</template>

<script setup>
import { ref } from 'vue';

import AppHeader from '@/layouts/AppHeader.vue';
import AppFooter from '@/layouts/AppFooter.vue';
</script>

<style lang="scss" scoped></style>
