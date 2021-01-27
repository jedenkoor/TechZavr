<template>
  <ul class="catalog__list" v-if="products.length">
    <ProductItem v-for="product in products" :key="product.id" :product="product"/>
  </ul>
  <div class="catalog__empty" style="text-align: center; font-size: 24px; margin-top: 50px;" v-else>По выбранным параметрам ничего не найдено</div>
</template>

<script>
import ProductItem from '@/components/ProductItem'

export default {
  props: [
    'products'
  ],
  components: {
    ProductItem
  }
}
</script>