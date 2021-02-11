<template>
  <ul class="catalog__list" v-if="products.length">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script>
import ProductItem from "@/components/Product/ProductItem";

export default {
  props: ["products"],
  components: {
    ProductItem,
  },
};
</script>