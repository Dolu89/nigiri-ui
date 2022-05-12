<template>
  <div>
    <h3>Open channel</h3>
    <div class="grid formgrid p-fluid">
      <div class="col-12 mb-2 lg:col-6 lg:mb-0">
        <Dropdown
          v-model="selectedPeer"
          :options="peers"
          optionLabel="pubKey"
          optionValue="address"
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

<script lang="ts">
import { defineComponent } from "vue";
import { useLightning } from "@/stores/lightning";

export default defineComponent({
  props: { current: String },
  setup(props) {
    const store = useLightning();

    let amount = ref(500000);
    let peers = ref([]);
    let selectedPeer = ref({});

    store.$subscribe((mutation, state) => {
      console.log(state)
    });

    return { amount, peers, selectedPeer };
  },
});
</script>
