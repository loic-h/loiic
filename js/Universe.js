import Ddder from "./Ddder.js";

class Universe {
  ddd;

  constructor() {
    this.ddd = new Ddder();
    this.ddd.setup(window.innerWidth, window.innerHeight);
  }

  build() {
    this.ddd.create();
  }

  clear() {
    this.ddd.clear();
  }
}

export default Universe;
