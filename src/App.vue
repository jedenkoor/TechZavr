<template>
  <section class="catalog">
    <ProductList :products="products"/>

    <BasePagination :page.sync="page" :count="countProducts" :per-page="productsPerPage"/>
  </section>
</template>

<script>
import ProductList from './components/ProductList'
import BasePagination from './components/BasePagination'

import products from "./data/products"

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination
  },
  data() {
    return {
      page: 1,
      productsPerPage: 1
    }
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    }
  }
}
</script>
