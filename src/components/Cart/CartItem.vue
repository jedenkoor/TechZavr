<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        width="120"
        height="120"
        :src="item.product.image"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <ProductQuantity :product-amount.sync="amount" class="product__counter" />

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>
    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteCartProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import numberFormat from "@/functions/numberFormat";

import ProductQuantity from "@/components/Product/ProductQuantity";

export default {
  props: ["item"],
  components: {
    ProductQuantity,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    /*...mapMutations({
      deleteProduct: "deleteCartProduct",
    }),*/
    ...mapActions(["updateCartProductAmount", "deleteCartProduct"]),
  },
  filters: {
    numberFormat,
  },
};
</script>