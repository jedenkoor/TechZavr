<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">

      <ProductFilter 
        :price-from.sync="filterPriceFrom" 
        :price-to.sync="filterPriceTo" 
        :category-id.sync="filterCategoryId"
        :colors-checked.sync="filterColorsChecked"
      />
      
      <section class="catalog">
        <ProductList :products="products"/>

        <BasePagination :page.sync="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
      
    </div>
  </main>

  
</template>

<script>
import ProductList from './components/ProductList'
import BasePagination from './components/BasePagination'
import ProductFilter from './components/ProductFilter'

import productsData from "./data/products"

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
    ProductFilter
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorsChecked: [],

      page: 1,
      productsPerPage: 1,
      productsList: productsData,
    }
  },
  computed: {
    filteredProducts() {
      let filteredProducts = this.productsList;

      if(this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      }

      if(this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      }

      if(this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId);
      }

      if(this.filterColorsChecked.length) {
        filteredProducts = filteredProducts.filter(product => {
          return this.filterColorsChecked.some(color => product.colors.includes(color));
        });
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    }
  }
}
</script>
