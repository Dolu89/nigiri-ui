<template>
  <Card>
    <template #title>
      LND <Tag :value="`block: ${lndInfo.blockHeight}`" severity="info" />
    </template>
    <template #content>
      <LightningIdentity
        :pubKey="lndInfo.pubKey"
        :address="lndInfo.address"
        :port="lndInfo.port"
      />
      <LightningOpenChannel :current="lndInfo.pubKey" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLightning } from "@/stores/lightning";
import { LNBackend } from "@/enums/lightning";

export default defineComponent({
  async setup() {
    const { $shellExec } = useNuxtApp();
    const lnStore = useLightning();

    async function getLndInfo() {
      const result = await $shellExec("nigiridev lnd --no-tty getinfo");
      const parsed = JSON.parse(result);

      const pubKey = parsed["identity_pubkey"];
      const address = "localhost";
      const port = 9735;

      lnStore.add(`${pubKey}@${address}:${port}`, LNBackend.LND);

      return {
        pubKey,
        address,
        port,
        blockHeight: parsed["block_height"],
      };
    }

    async function faucetLnd() {
      const result = await $shellExec("nigiri faucet lnd 0.01");
    }

    const lndInfo = await getLndInfo();

    return {
      lndInfo,
      faucetLnd,
    };
  },
});
</script>