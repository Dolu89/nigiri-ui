<template>
  <div class="p-inputgroup">
    <InputText type="text" :value="copyProps.value" />
    <Button :icon="icon" @click="copyInvoice()" />
  </div>
</template>

<script setup lang="ts">
const copyProps = defineProps({ value: String });
let icon = ref("pi pi-copy");

function copyInvoice() {
  navigator.clipboard.writeText(copyProps.value);
  this.icon = "pi pi-check";
  setTimeout(() => {
    this.icon = "pi pi-copy";
  }, 2500);
}
</script>
