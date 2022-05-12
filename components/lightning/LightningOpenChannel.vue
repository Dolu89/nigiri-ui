<template>
  <div>
    <h3>Open channel</h3>
    <div class="grid formgrid p-fluid">
      <div class="col-12 mb-2 lg:col-6 lg:mb-0">
        <Dropdown
          v-model="selectedPeer"
          :options="peers"
          option-label="pubKey"
          option-value="address"
          placeholder="Destination"
        />
      </div>
      <div class="col-12 mb-2 lg:col-4 lg:mb-0">
        <InputNumber
          v-model="amount"
          placeholder="Amount (satoshis)"
        ></InputNumber>
      </div>
      <div class="col-12 mb-2 lg:col-2 lg:mb-0">
        <Button class="p-button-sm">Open</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLightning } from "@/stores/lightning";
import { ref, defineProps } from "vue";

const props = defineProps({
  current: String,
});

const store = useLightning();

let amount = ref(500000);
let peers = ref(store.nodes.filter(n => n.pubKey !== props.current));
let selectedPeer = ref({});
</script>
