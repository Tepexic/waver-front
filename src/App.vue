<template>
  <div
    id="app"
    class="text-center bg-gradient-to-l from-gray-900 to-gray-800 text-gray-200 text-xl w-full h-screen flex items-center justify-center"
  >
    <div class="max-w-screen-md mx-4">
      <header class="pt-20 text-3xl text-white">
        ¡Hola!👋
      </header>

      <section class="my-16 md:mx-0">
        I'm
        <a
          href="https://github.com/Tepexic"
          target="_blank"
          class="text-white font-semibold hover:bg-purple-800"
          >Jesús Velázquez</a
        >
        , I've developed applications for the past 3+ years. Mostly front end
        with Vue. Now I'm learning Web3.
      </section>

      <section
        class="bg-gradient-to-r from-yellow-300 to-pink-300 rounded py-6 text-purple-900 font-medium md:mx-0 px-4"
      >
        <p class="my-6">
          Connect your wallet and send me a wave
          <span class="text-3xl">👋</span>
        </p>
        <button
          class="bg-purple-800 rounded px-10 py-4 text-white font-medium text-2xl hover:bg-purple-700 shadow-lg md:mx-0 w-full my-4"
        >
          Wave at Me 👋
        </button>
        <button
          class="bg-purple-800 rounded px-10 py-4 text-white font-medium text-2xl hover:bg-purple-700 shadow-lg md:mx-0 w-full"
          @click="connectWallet"
          v-if="!account"
        >
          Connect Wallet
        </button>
      </section>

      <section class="text-left mt-6 font-mono text-sm">
        <p>Transaction console</p>
        <div
          class="bg-gradient-to-r from-green-800 to-green-900 rounded my-4 text-green-300 p-2"
          v-for="(l, i) in log"
          :key="`log${i}`"
        >
          <p>{{ l }}</p>
        </div>
      </section>

      <div class="text-xs md:mt-20">
        Special thanks to
        <a href="https://buildspace.so/" target="_blank" class="font-semibold"
          >Buildspace</a
        >. Mexico 2021.
      </div>
    </div>
  </div>
</template>

<script>
//import { ethers } from "ethers";

export default {
  name: "App",
  data() {
    return {
      ethereum: null,
      accounts: [],
      account: null,
      log: [],
    };
  },
  methods: {
    checkIfWalletIsConnected() {
      /*
       * First make sure we have access to window.ethereum
       */
      try {
        const { ethereum } = window;
        if (!ethereum) {
          const message = "No Metamask detected!";
          alert(message);
          console.log(message);
          return;
        } else {
          this.ethereum = ethereum;
          console.log("We have the ethereum object", ethereum);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async connectWallet() {
      /**
       * Check if we're authorized to access wallet
       */
      if (this.ethereum) {
        this.accounts = await this.ethereum.request({
          method: "eth_requestAccounts",
        });
        let log;
        if (this.accounts.length) {
          this.account = this.accounts[0];
          log = `Found an authorized account: {this.account}`;
          console.log(log);
          this.log.push(log);
        } else {
          log = "No accounts found";
          this.log.push(log);
          console.log("No accounts found");
        }
      } else {
        alert("Please get metamask");
      }
    },
  },
  created() {
    document.title = "Ethereum Waver";
    this.checkIfWalletIsConnected();
  },
};
</script>

<style></style>
