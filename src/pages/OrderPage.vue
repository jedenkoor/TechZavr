<template>
  <main class="content container">
    <div class="preloader" v-if="cartLoading || orderLoading">
      <img src="/img/loader.gif" alt="Preloader" />
    </div>

    <div class="preloader" v-if="cartLoadingError">
      Произошла ошибка<br />
      при загрузке
      <button @click="loadCart">Попробовать еще раз</button>
    </div>

    <div>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Оформление заказа </a>
          </li>
        </ul>

        <h1 class="content__title">Корзина</h1>
        <span class="content__info">
          {{ cartLength }}
          {{ cartLength | declOfNum(["товар", "товара", "товаров"]) }}
        </span>
      </div>

      <section class="cart" v-if="cartLength">
        <form
          class="cart__form form"
          action="#"
          method="POST"
          @submit.prevent="order"
        >
          <div class="cart__field">
            <div class="cart__data">
              <BaseFormText
                title="ФИО"
                placeholder="Введите ваше полное имя"
                v-model="formData.name"
                :error="formErrors.name"
              />

              <BaseFormText
                title="Адрес доставки"
                placeholder="Введите ваш адрес"
                v-model="formData.address"
                :error="formErrors.address"
              />

              <BaseFormText
                title="Телефон"
                placeholder="Введите ваш телефон"
                v-model="formData.phone"
                :error="formErrors.phone"
              />

              <BaseFormText
                title="Email"
                placeholder="Введите ваш Email"
                v-model="formData.email"
                :error="formErrors.email"
              />

              <BaseFormTextarea
                title="Комментарий к заказу"
                placeholder="Ваши пожелания"
                v-model="formData.comment"
                :error="formErrors.comment"
              />
            </div>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li
                class="cart__order"
                v-for="item in products"
                :key="item.productId"
              >
                <h3>{{ item.product.title }}</h3>
                <b>{{ (item.product.price * item.amount) | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>
                Итого: {{ cartLength }}
                {{ cartLength | declOfNum(["товар", "товара", "товаров"]) }} на
                сумму <b>{{ totalPrice | numberFormat }} ₽</b>
              </p>
            </div>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block" v-if="formErrorMessage">
            <h4>Заявка не отправлена!</h4>
            <p>{{ formErrorMessage }}</p>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config.js";

import { mapGetters, mapActions } from "vuex";
import numberFormat from "@/functions/numberFormat";
import declOfNum from "@/functions/declOfNum";

import BaseFormText from "@/components/Base/BaseFormText";
import BaseFormTextarea from "@/components/Base/BaseFormTextarea";

export default {
  data() {
    return {
      formData: {},
      formErrors: {},
      formErrorMessage: "",

      orderLoading: false,
    };
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      cartLength: "cartLength",
      cartLoading: "cartLoading",
      cartLoadingError: "cartLoadingError",
    }),
  },
  methods: {
    ...mapActions(["loadCart"]),
    order() {
      this.formErrors = {};
      this.formErrorMessage = "";
      this.orderLoading = true;

      axios
        .post(
          `${API_BASE_URL}/api/orders`,
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          this.$store.commit("resetCart");
          this.$store.commit("updateOrderInfo", response.data);
          this.$router.push({
            name: "orderInfo",
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          this.formErrors = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.massage || "";
        })
        .then(() => {
          this.orderLoading = false;
        });
    },
  },
  filters: {
    numberFormat,
    declOfNum,
  },
};
</script>