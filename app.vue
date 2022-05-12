<template>
  <div class="main">
    <div class="row">
      <Bitcoin class="w100" />
      <BitcoinConnect class="w100" />
    </div>
    <div class="row">
      <Lnd class="w100" />
      <Clightning class="w100" />
    </div>
  </div>
</template>

<style>
body {
  background-color: #18212e;
}
</style>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.w100 {
  width: 100%;
}

.row {
  display: inline-flex;
  gap: 20px;
}
</style>
