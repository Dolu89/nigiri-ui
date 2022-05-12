<template>
  <Card>
    <template #title>
      Core Lightning
      <Tag :value="`block: ${clnInfo.blockHeight}`" severity="info" />
    </template>
    <template #content>
      <LightningIdentity
        :pubKey="clnInfo.pubKey"
        :address="clnInfo.address"
        :port="clnInfo.port"
      />
      <LightningOpenChannel :current="clnInfo.pubKey" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useLightning } from "@/stores/lightning";
import { LNBackend } from "@/enums/lightning";

const { $shellExec } = useNuxtApp();
const lnStore = useLightning();

async function getInfo() {
  const result = await $shellExec("nigiridev cln --no-tty getinfo");
  const parsed = JSON.parse(result);

  const pubKey = parsed["id"];
  const address = "localhost";
  const port = 9935;

  lnStore.add(`${pubKey}@${address}:${port}`, LNBackend.CoreLightning);

  return {
    pubKey,
    address,
    port,
    blockHeight: parsed["blockheight"],
  };
}

const clnInfo = await getInfo();
</script>