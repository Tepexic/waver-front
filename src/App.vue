<template>
  <div
    id="app"
    class="text-center bg-gradient-to-l from-gray-900 to-gray-800 text-gray-200 text-xl w-full h-screen flex items-center justify-center"
  >
    <div class="max-w-screen-md">
      <header class="pt-20 text-3xl text-white">
        ¡Hola!👋
      </header>
      <section class="my-16  mx-4 md:mx-0">
        I'm
        <a
          href="https://github.com/Tepexic"
          target="_blank"
          class="text-white font-semibold hover:bg-purple-800"
          >Jesús Velázquez</a
        >
        , I've developed applications for the past 3+ years, mostly front end
        with Vue. Now I'm learning Web3.
      </section>

      <section
        class="bg-gradient-to-r from-green-400 to-blue-400 rounded py-6 my-4 text-black font-medium mx-4 md:mx-0 "
      >
        <p class="my-6">
          Connect your wallet and send me a wave
          <span class="text-3xl">👋</span>
        </p>
        <button
          class="bg-purple-800 rounded px-10 py-4 text-white font-medium text-3xl hover:bg-purple-700 shadow-lg  mx-4 md:mx-0"
        >
          Wave at Me 👋
        </button>
      </section>
    </div>
    <footer class="absolute bottom-2 text-xs w-full">
      Mexico 2021
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style></style>
