import config from "../../config/cfg";

class CurrencyService {
  constructor() {
    this.watchers = {};
    this.watcher = null;
  }
  unwatch(coin) {
      clearInterval(this.watchers[coin.name]);

  }
  async monitorHandle(coin) {
    const request = await fetch(`${config.url}&fsym=${coin.name}&tsyms=USD`);
    const json = await request.json();
    coin.price = json.USD;
    coin.chart.push(coin.price);
  }
  watch(coin) {
    let me = this;
    this.watchers[coin.name] = setInterval(() => {
      me.monitorHandle(coin);
    }, 3000);
  }
}

export default CurrencyService;
