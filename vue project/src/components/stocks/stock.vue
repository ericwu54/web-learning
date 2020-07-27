<template>
  <div class="col-sm-6 col-md-4">
    <div class="card" style="margin: 20px;">
      <div class="card-header text-white bg-info">
        {{ stock.name }}
        <small>(Price:{{ stock.price }})</small>
      </div>
      <div class="card-body">
        <div class="float-left">
          <input v-model="quantity" type="number" class="form-control" placeholder="Quantity" />
        </div>
        <div class="float-right">
          <button
            @click="buyStock"
            class="btn btn-secondary"
            :disabled="(quantity <= 0 || !Number.isInteger(parseInt(quantity,10)))"
          >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["stock"],
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
      };
      this.quantity = 0;
    },
  },
};
</script>
