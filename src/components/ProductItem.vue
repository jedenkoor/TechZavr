<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#" @click.prevent="$emit('goToPage', 'product', {id: product.id})">{{ product.title }}</a>
    </h3>
    <span class="catalog__price">{{ product.price | numberFormat }}</span>

    <ProductColors :colors="product.colors" :currentColor.sync="product.currentColor" :add-class="'colors--black'"/>

  </li>
</template>

<script>
import goToPage from "@/functions/goToPage"
import numberFormat from "@/functions/numberFormat"

import ProductColors from "@/components/ProductColors";

export default {
  props: [
    'product'
  ],
  components: {
    ProductColors
  },
  methods: {
    goToPage
  },
  filters: {
    numberFormat
  },
}
</script>