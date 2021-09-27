<template>
  <div
    class="absolute top-2 md:top-4 right-2 md:right-4 py-2 px-4 bg-pink-100 text-purple-900 rounded transition duration-500 ease-in-out flex items-center"
  >
    <span class="mr-4">{{ message }}</span>
    <button
      class="rounded bg-purple-800 text-white p-1 hover:bg-purple-700 shadow-lg"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "Console",
  props: {
    message: {
      type: String,
      required: false,
      default: () => "Hello",
    },
  },
};
</script>
