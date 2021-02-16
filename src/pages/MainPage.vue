<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>
    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-checked.sync="filterColorChecked"
        :page.sync="page"
      />
      <section class="catalog">
        <div class="preloader" v-if="productsLoading">
          <img src="/img/loader.gif" alt="Preloader" />
        </div>
        <div class="preloader" v-if="productsLoadingError">
          Произошла ошибка<br />
          при загрузке
          <button @click="loadProducts">Попробовать еще раз</button>
        </div>
        <ProductList :products="products" />
        <BasePagination
          :page.sync="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config.js";

import BasePagination from "@/components/Base/BasePagination";
import ProductList from "@/components/Product/ProductList";
import ProductFilter from "@/components/Product/ProductFilter";

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorChecked: "",

      page: 1,
      productsPerPage: 2,
      productsData: null,

      productsLoading: false,
      productsLoadingError: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingError = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorChecked,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingError = true))
          .then(() => (this.productsLoading = false));
      }, 0);
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorChecked() {
      this.loadProducts();
    },
  },
};
</script>