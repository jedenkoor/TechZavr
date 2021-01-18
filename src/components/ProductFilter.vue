<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model="currentCategoryId">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="(color, index) in filterColors" :key="index">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="checkbox" :value="color" :checked="currentColorsChecked.includes(color)" @change="checkColor(color)">
              <span class="colors__value" :style="`background-color: ${color}`">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8 
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button" @click="reset">Сбросить</button>
    </form>
  </aside>
</template>

<script>
import productsData from "../data/products"
import categories from "../data/categories"

export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'colorsChecked'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorsChecked: []
    }
  },
  computed: {
    filterColors() {
      let filterColors = [];
      for(const productKey in productsData) {
        for(const colorKey in productsData[productKey].colors){
          if(!filterColors.includes(productsData[productKey].colors[colorKey])) {
            filterColors.push(productsData[productKey].colors[colorKey]);
          }
        }
      }
      return filterColors;
    },
    categories() {
      return categories;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorsChecked', this.currentColorsChecked.slice());
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorsChecked', '');
      this.currentColorsChecked = [];
    },
    checkColor(color) {
      if(!this.currentColorsChecked.includes(color)) {
        this.currentColorsChecked.push(color);
      } else {
        const index = this.currentColorsChecked.indexOf(color);
        this.currentColorsChecked.splice(index, 1);
      }
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
    }
  },
}
</script>