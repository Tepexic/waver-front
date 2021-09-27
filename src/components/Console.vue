<template>
  <section class="text-left mt-6 font-mono text-sm">
    <p class="mb-2">Transaction console</p>
    <div class="h-40">
      <div
        class="bg-gradient-to-r from-green-800 to-green-900 text-green-100 p-2"
        v-for="(l, i) in log"
        :key="`log${i}`"
      >
        <span>{{ l }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Console",
  props: {
    log: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>
