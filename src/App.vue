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
        class="bg-gradient-to-r from-yellow-300 to-pink-300 rounded py-6 text-purple-900 font-medium md:mx-0 px-4 my-4"
      >
        <div class="text-5xl font-extrabold ">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-l from-yellow-700 to-pink-700 "
          >
            Total waves: {{ count }}
          </span>
        </div>
        <p class="my-6">
          Connect your wallet and send me a wave
          <span class="text-3xl">👋</span>
        </p>
        <form
          @submit.prevent="wave"
          class="flex items-center text-2xl"
          v-if="account && !mining"
        >
          <input
            type="text"
            placeholder="hey there!"
            maxlength="140"
            class="p-4 rounded text-purple-700 w-4/5 mr-2 md:mr-4"
            :class="currentWave ? 'border-solid border-red-600' : 'border-none'"
            v-model="currentWave"
          />
          <button
            class="bg-purple-800 rounded p-4 text-white font-medium hover:bg-purple-700 w-1/5 h-full"
            @click="wave"
            type="submit"
          >
            👋
          </button>
        </form>
        <p v-if="account && !currentWave" class="text-xs text-left mt-1">
          Please provide a message
        </p>
        <div
          class="bg-purple-800 rounded px-10 py-4 text-white font-medium text-2xl hover:bg-purple-700 shadow-lg md:mx-0 w-full my-4"
          v-if="mining"
        >
          <svg viewBox="0 0 24 24" class="animate-bounce h-10 w-10 mx-auto">
            <path
              fill="currentColor"
              d="M14.79,10.62L3.5,21.9L2.1,20.5L13.38,9.21L14.79,10.62M19.27,7.73L19.86,7.14L19.07,6.35L19.71,5.71L18.29,4.29L17.65,4.93L16.86,4.14L16.27,4.73C14.53,3.31 12.57,2.17 10.47,1.37L9.64,3.16C11.39,4.08 13,5.19 14.5,6.5L14,7L17,10L17.5,9.5C18.81,11 19.92,12.61 20.84,14.36L22.63,13.53C21.83,11.43 20.69,9.47 19.27,7.73Z"
            />
          </svg>
        </div>
        <button
          v-if="!account"
          class="bg-purple-800 rounded px-10 py-4 text-white font-medium text-2xl hover:bg-purple-700 shadow-lg md:mx-0 w-full"
          @click="connectWallet"
        >
          Connect Wallet
        </button>
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
import { ethers } from "ethers";
import waveportal from "./utils/WavePortal.json";

export default {
  name: "App",
  data() {
    return {
      ethereum: null,
      accounts: [],
      account: null,
      log: [],
      provider: null,
      signer: null,
      waveportalContract: null,
      count: 0,
      contractAdress: "0xA0950fc84c0E52f474Df100908e2E7f26E9bC500",
      mining: false,
      waveTxn: null,
      currentWave: "",
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
          this.getMetamask();
          return;
        } else {
          this.ethereum = ethereum;
          const log = "We have the ethereum object";
          this.log.push(log);
          console.log(log, ethereum);
        }
      } catch (e) {
        this.log.push(e);
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
          log = `Found an authorized account: ${this.account}`;
          console.log(log);
          this.log.push(log);
          if (!this.waveportalContract) {
            this.connectContract();
          }
        } else {
          log = "No accounts found";
          this.log.push(log);
          console.log("No accounts found");
        }
      } else {
        this.getMetamask();
      }
    },
    async connectContract() {
      try {
        if (this.ethereum && this.account) {
          this.provider = new ethers.providers.Web3Provider(this.ethereum);
          this.signer = this.provider.getSigner();
          this.waveportalContract = new ethers.Contract(
            this.contractAdress,
            waveportal.abi,
            this.signer
          );
          this.getTotalWaves();
        }
      } catch (e) {
        this.log.push(e);
        console.error(e);
      }
    },
    async getTotalWaves() {
      const count = await this.waveportalContract.functions.getTotalWaves();
      this.count = count.toString();
    },
    async wave() {
      if (this.currentWave) {
        const waveTxn = await this.waveportalContract.functions.wave(
          this.currentWave
        );
        this.mining = true;
        this.log.push("Mining...", waveTxn.hash);
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        this.log.push("Mined -- ", waveTxn.hash);
        this.mining = false;
        this.getTotalWaves();
      }
    },
    getMetamask() {
      alert("Please get metamask");
    },
  },
  async created() {
    document.title = "Ethereum Waver";
    this.checkIfWalletIsConnected();
    await this.connectContract();
  },
};
</script>

<style></style>
