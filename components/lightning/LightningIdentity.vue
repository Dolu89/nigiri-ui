<template>
  <h3>Identity</h3>
    <UtilsCopy :value="`${identityProps.pubKey}@${identityProps.address}:${identityProps.port}`" />
  <div></div>
</template>

<script setup lang="ts">
const identityProps = defineProps({ pubKey: String, address: String, port: Number });
</script>
