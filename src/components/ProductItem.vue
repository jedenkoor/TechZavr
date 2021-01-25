<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>
    <span class="catalog__price">{{ product.price }}</span>

    <ProductColors :colors="product.colors" :currentColor.sync="product.currentColor" :add-class="'colors--black'"/>

  </li>
</template>

<script>
import ProductColors from "./ProductColors"

export default {
  props: [
    'product'
  ],
  components: {
    ProductColors
  }
}
</script>