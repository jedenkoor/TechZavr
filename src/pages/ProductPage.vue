<template>
  <main class="content container">
    <div class="preloader" v-if="productsLoading || productAddSending">
      <img src="img/loader.gif" alt="Preloader" />
    </div>

    <div class="preloader" v-if="productsLoadingError">
      Произошла ошибка<br />
      при загрузке
      <button @click="loadProduct">Попробовать еще раз</button>
    </div>

    <div v-if="productData">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }"
              >Каталог</router-link
            >
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">{{
              category.title
            }}</router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">{{ product.title }}</a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570"
              :src="product.image"
              :alt="product.title"
            />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form
              class="form"
              action="#"
              method="POST"
              @submit.prevent="addToCart"
            >
              <b class="item__price">{{ product.price | numberFormat }} ₽</b>
              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>

                <ProductColors
                  :colors="product.colors"
                  :currentColor.sync="currentColor"
                />
              </fieldset>

              <div class="item__row">
                <ProductQuantity :product-amount.sync="productAmount" />

                <button class="button button--primery" type="submit">
                  В корзину
                </button>
              </div>
              <div v-if="productAdded">Товар добавлен в корзину</div>
              <div v-if="productAddSendingError">
                Произошла ошибка при добавлении товара в корзину
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config.js";
import { mapActions } from "vuex";

import numberFormat from "@/functions/numberFormat";

import ProductColors from "@/components/Product/ProductColors";
import ProductQuantity from "@/components/Product/ProductQuantity";

export default {
  data() {
    return {
      currentColor: null,
      productAmount: 1,

      productData: null,
      productsLoading: false,
      productsLoadingError: false,

      productAdded: false,
      productAddSending: false,
      productAddSendingError: false,
    };
  },
  components: {
    ProductColors,
    ProductQuantity,
  },
  computed: {
    product() {
      return this.productData
        ? (this.productData = {
            ...this.productData,
            image: this.productData.image.file.url,
          })
        : [];
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
      })
        .then(() => (this.productAdded = true))
        .catch(() => (this.productAddSendingError = true))
        .then(() => (this.productAddSending = false));
    },
    loadProduct() {
      this.productsLoading = true;
      this.productsLoadingError = false;
      axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => {
          this.productData = response.data;
          this.currentColor = this.productData.colors[0].id;
        })
        .catch(() => (this.productsLoadingError = true))
        .then(() => (this.productsLoading = false));
    },
  },
  created() {
    this.loadProduct();
  },
  watch: {
    "$route.params.id"() {
      if (!this.product) {
        this.$router.replace({ name: "notFound" });
      } else {
        this.loadProduct();
      }
    },
  },
  filters: {
    numberFormat,
  },
};
</script>