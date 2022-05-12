<template>
  <Card>
    <template #title>
      Bitcoin <Tag :value="`block: ${bitcoinBlock}`" severity="info" />
    </template>
    <template #content>
      <h3>Generate address</h3>
      <div class="p-inputgroup">
        <Dropdown
          v-model="selectedAddressType"
          :options="addressTypes"
          optionLabel="name"
          placeholder="Select an address type"
        />
        <Button
          label="Generate"
          @click="getNewAddress(selectedAddressType.value)"
        />
      </div>
      <div class="p-inputgroup">
        <InputText type="text" v-model="newAddress" />
        <Button icon="pi pi-copy" />
      </div>
      <h3>Push TX</h3>
      <Textarea v-model="txHex" :autoResize="true" rows="5" cols="30" />
      <Button label="Push" @click="pushTx(txHex)" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const { $shellExec } = useNuxtApp();

    let newAddress = ref("");
    const addressTypes = ref([
      { name: "Legacy (P2PKH)", value: "legacy" },
      { name: "Segwit (P2SH)", value: "p2sh-segwit" },
      { name: "Native Segwit (P2WPKH)", value: "bech32" },
    ]);
    let selectedAddressType = ref(
      addressTypes.value.find((a) => a.value === "bech32")
    );
    let bitcoinBlock = ref(0);
    let txHex = ref("");

    async function getNewAddress(type: string) {
      newAddress.value = await $shellExec(
        `nigiridev rpc getnewaddress "" ${type}`
      );
    }

    async function getBitcoinLastBlock() {
      const blockHash = await $shellExec("nigiri rpc getbestblockhash");
      const latestBlock = await $shellExec(`nigiri rpc getblock ${blockHash}`);
      bitcoinBlock.value = JSON.parse(latestBlock).height;
    }
    await getBitcoinLastBlock();

    async function pushTx(txHex: string) {
      const result = await $shellExec(`nigiri push ${txHex}`);
    }

    return {
      addressTypes,
      selectedAddressType,
      newAddress,
      bitcoinBlock,
      getNewAddress,
      txHex,
      pushTx,
    };
  },
});
</script>