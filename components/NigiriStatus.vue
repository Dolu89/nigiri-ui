<template>
  <Menubar :model="items">
    <template #start> <h3>🍣 Nigiri UI</h3> </template>
    <template #item="{ item }">
      <div class="status" :class="item.color">
        {{ item.label }} <i :class="item.icon" style="font-size: 14px"></i>
      </div>
    </template>
    <template #end>
      <ul class="p-menubar-root-list" role="menubar">
        <li role="none" class="p-menuitem">
          <a
            href="https://github.com/dolu89/nigiri-ui"
            target="_blank"
            class="p-menuitem-link"
            aria-haspopup="false"
            aria-expanded="false"
            role="menuitem"
            tabindex="0"
          >
            <span class="p-menuitem-icon pi pi-github"></span>
            <span class="p-menuitem-text">Github</span>
          </a>
        </li>
      </ul>
    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const { $shellExec } = useNuxtApp();
    async function getStatus() {
      function getIsRunning(source: string, regex: RegExp, keyword: string) {
        return regex.exec(source)[1] === keyword ? true : false;
      }
      const result = await $shellExec("nigiridev status");
      // Removing colors
      const sanatizedStatus = result
        .replaceAll("\x1B[31m", "")
        .replaceAll("\x1B[32m", "")
        .replaceAll("\x1B[0m", "");

      const isNigiriRunning = getIsRunning(
        sanatizedStatus,
        /nigiri is (not running|running)/gm,
        "running"
      );
      const isCIRunning = getIsRunning(
        sanatizedStatus,
        /CI (true|false)/gm,
        "true"
      );
      const isLiquidRunning = getIsRunning(
        sanatizedStatus,
        /Liquid (true|false)/gm,
        "true"
      );
      const isLNRunning = getIsRunning(
        sanatizedStatus,
        /LN (true|false)/gm,
        "true"
      );

      return { isNigiriRunning, isCIRunning, isLiquidRunning, isLNRunning };
    }

    const status = await getStatus();
    function getItem(label: string, status: boolean) {
      if (status) {
        return { label, icon: "pi pi-check", color: "success" };
      }
      return { label, icon: "pi pi-times", color: "danger" };
    }

    const items = [
      getItem("Nigiri", status.isNigiriRunning),
      getItem("LN", status.isLNRunning),
      getItem("Liquid", status.isLiquidRunning),
      getItem("CI", status.isCIRunning),
    ];
    
    return { items };
  },
});
</script>

<style lang="scss" scoped>
.status {
  padding: 3px 5px;
  border-radius: 3px;
  margin-left: 15px;
  &.success {
    background-color: #6095603f;
    border: 1px solid #609560;
  }
  &.danger {
    background-color: #9560603f;
    border: 1px solid #956060;
  }
}
</style>