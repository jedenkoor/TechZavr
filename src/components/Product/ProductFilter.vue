<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>

        <ProductColors
          :colors="filterColors"
          :currentColor.sync="currentColorChecked"
        />
      </fieldset>
      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config.js";

import ProductColors from "@/components/Product/ProductColors";

export default {
  props: ["priceFrom", "priceTo", "categoryId", "colorChecked", "page"],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorChecked: "",

      categoriesData: null,
      colorsData: null,
    };
  },
  components: {
    ProductColors,
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    filterColors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  methods: {
    submit() {
      console.log();
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:colorChecked", this.currentColorChecked);
      this.$emit("update:page", 1);
    },
    reset() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:colorChecked", "");
    },
    loadCategories() {
      axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => (this.categoriesData = response.data));
    },
    loadColors() {
      axios
        .get(`${API_BASE_URL}/api/colors`)
        .then((response) => (this.colorsData = response.data));
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorChecked(value) {
      this.currentColorChecked = value;
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>