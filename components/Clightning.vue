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
      <LightningOpenChannel
        :current="clnInfo.pubKey"
        :openChannel="openChannel"
      />
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
  const address = "cln";
  const port = 9935;

  lnStore.add(`${pubKey}@${address}:${port}`, LNBackend.CoreLightning);

  return {
    pubKey,
    address,
    port,
    blockHeight: parsed["blockheight"],
  };
}

async function openChannel(peerUri: string, amount: number) {
  async function getBalance() {
    const listFunds = JSON.parse(
      await $shellExec("nigiridev cln --no-tty listfunds")
    );
    const confirmedOutput = listFunds.outputs.filter(
      (o) => o.status === "confirmed"
    );

    let availableBalance = 0;
    for (const output of confirmedOutput) {
      availableBalance += output.value;
    }
    return availableBalance;
  }
  const listPeers = JSON.parse(
    await $shellExec("nigiridev cln --no-tty listpeers")
  );

  if (listPeers.peers && listPeers.peers.length == 0) {
    const listPeers = JSON.parse(
      await $shellExec(`nigiridev cln --no-tty connect ${peerUri}`)
    );
    if (listPeers.code) {
      // TODO Display error
      console.error(listPeers);
      return;
    }
  }

  const balance = await getBalance();
  if (balance < amount) {
    await $shellExec(`nigiridev faucet cln ${(amount / 1e8) * 2}`);
    while ((await getBalance()) < amount) {}
  }

  const peerPubKey = peerUri.split("@")[0];
  // `nigiridev cln --no-tty openchannel --node_key="${peerPubKey}" --local_amt=${amount}`
  await $shellExec(
    `nigiridev cln --no-tty fundchannel id=${peerPubKey} amount=${amount}`
  );

  for (let i = 0; i < 3; i++) {
    await $shellExec("nigiri rpc -generate 1");
  }
}

const clnInfo = await getInfo();
</script>