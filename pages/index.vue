<template>
  <div>
    <Bitcoin />
    <div>
      <div>LND</div>
      <div>{{ lndInfo }}</div>
      <div><button @click="faucetLnd()">Faucet</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const { $shellExec } = useNuxtApp();

    

    async function getLndInfo() {
      const result = await $shellExec(
        "nigiridev lnd --no-tty getinfo"
      );
      const parsed = JSON.parse(result);
      return {
        pubKey: parsed["identity_pubkey"],
        address: "localhost",
        grpc: 10009,
        blockHeight: parsed["block_height"],
      };
    }

    async function faucetLnd() {
      const result = await $shellExec("nigiri faucet lnd 0.01");
      console.log(result);
    }

    const lndInfo = await getLndInfo();

    return {
      lndInfo,
      faucetLnd,
    };
  },
});
</script>
