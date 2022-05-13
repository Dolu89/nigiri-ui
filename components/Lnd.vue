<template>
  <Card>
    <template #title>
      LND <Tag :value="`block: ${lndInfo.blockHeight}`" severity="info" />
    </template>
    <template #content>
      <LightningIdentity
        :pubKey="lndInfo.pubKey"
        address="localhost"
        :port="lndInfo.port"
      />
      <LightningOpenChannel :current="lndInfo.pubKey" :openChannel="openChannel" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useLightning } from "@/stores/lightning";
import { LNBackend } from "@/enums/lightning";

const { $shellExec } = useNuxtApp();
const lnStore = useLightning();

async function getLndInfo() {
  const result = await $shellExec("nigiridev lnd --no-tty getinfo");
  const parsed = JSON.parse(result);

  const pubKey = parsed["identity_pubkey"];
  const address = "lnd";
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

async function openChannel(peerUri: string, amount: number) {
  async function getBalance() {
    const listUnspent = JSON.parse(
      await $shellExec("nigiridev lnd --no-tty listunspent")
    );
    const confirmedOutput = listUnspent.utxos.filter(
      (o) => o.confirmations > 0
    );

    let availableBalance = 0;
    for (const output of confirmedOutput) {
      availableBalance += output.amount_sat;
    }
    return availableBalance;
  }
  const listPeers = JSON.parse(
    await $shellExec("nigiridev lnd --no-tty listpeers")
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
    await $shellExec(`nigiridev faucet lnd ${(amount / 1e8) * 2}`);
    while ((await getBalance()) < amount) {}
  }

  const peerPubKey = peerUri.split("@")[0];
  // `nigiridev cln --no-tty openchannel --node_key="${peerPubKey}" --local_amt=${amount}`
  await $shellExec(
    `nigiridev lnd --no-tty openchannel --node_key ${peerPubKey} --local_amt ${amount}`
  );

  for (let i = 0; i < 3; i++) {
    await $shellExec("nigiri rpc -generate 1");
  }
}

const lndInfo = await getLndInfo();
</script>