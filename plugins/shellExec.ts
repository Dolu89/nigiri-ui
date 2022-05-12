export default defineNuxtPlugin(() => {
  return {
    provide: {
      shellExec: async (cmd: string) => {
        const result = await $fetch("/api/shell-exec", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cmd })
        });
        return result;
      }
    }
  }
})