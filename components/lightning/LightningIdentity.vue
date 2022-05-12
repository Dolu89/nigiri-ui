<template>
  <h3>Identity</h3>
  <div>{{ props.pubKey }}</div>
  <div>{{ props.address }}:{{ props.port }}</div>
</template>

<script setup lang="ts">
const props = defineProps({ pubKey: String, address: String, port: Number });
</script>
