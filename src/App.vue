<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <div class="w-full my-4"></div>
      <coin-add v-on:coin-added="handleAddCoin"></coin-add>
      <template v-if="coins.length">
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <coint-item
            v-for="(coin, idx) in coins"
            :key="idx"
            :coin="coin"
            v-on:coin-deleted="handleDeleteCoin(coin)"
            @click.stop="handleSelectedCoin(coin)"
            :class="{
              'border-4': selectedCoin === coin,
            }"
          ></coint-item>
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
      </template>
      <section class="relative">
        <coin-chart
          v-if="selectedCoin"
          :coin="selectedCoin"
          v-on:coin-deleted="handleDeleteCoin"
        ></coin-chart>
      </section>
    </div>
  </div>
</template>
<script>
import CoinAdd from "./components/CoinAdd.vue";
import CointItem from "./components/CointItem.vue";
import CurrencyService from "./api/coin/CurrencyService";
import CoinChart from "./components/CoinChart.vue";
const monitor = new CurrencyService();
export default {
  components: { CointItem, CoinAdd, CoinChart },
  name: "App",
  data() {
    return {
      selectedCoin: null,
      coins: [],
    };
  },
  methods: {
    handleSelectedCoin(coin) {
      this.selectedCoin = coin;
    },
    handleAddCoin(coinName) {
      this.coins.push({ name: coinName, price: "-", chart: [] });
      monitor.watch(this.coins[this.coins.length - 1]);
    },
    handleDeleteCoin(coin) {
      monitor.unwatch(coin);
      const index = this.coins.indexOf(coin);
      this.coins.splice(index, 1);
      this.selectedCoin = null;
    },
  },
};
</script>

<style src="./app.css"></style>
