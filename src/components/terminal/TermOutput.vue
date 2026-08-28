<template>
  <div v-for="line in lines" :key="line.id" class="out" :class="line.cls" v-html="line.html"></div>
</template>

<script setup lang="ts">
import type { OutputLine } from '../../composables/useTerminal'

defineProps<{ lines: OutputLine[] }>()
</script>
