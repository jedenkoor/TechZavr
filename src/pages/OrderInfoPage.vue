<template>
  <main class="content container">
    <div class="preloader" v-if="orderInfoLoading">
      <img src="img/loader.gif" alt="Preloader" />
    </div>

    <div class="preloader" v-if="orderInfoLoadingError">
      Произошла ошибка<br />
      при загрузке
      <button @click="loadOrderInfo">Попробовать еще раз</button>
    </div>

    <div v-if="orderLength">
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

        <h1 class="content__title">
          Заказ оформлен <span>№ {{ orderInfo.id }}</span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту
              придет письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся
              с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key"> Получатель </span>
                <span class="dictionary__value">{{ orderInfo.name }}</span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Адрес доставки </span>
                <span class="dictionary__value">{{ orderInfo.address }}</span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Телефон </span>
                <span class="dictionary__value">{{ orderInfo.phone }}</span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Email </span>
                <span class="dictionary__value">{{ orderInfo.email }}</span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Способ оплаты </span>
                <span class="dictionary__value"> картой при получении </span>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li
                class="cart__order"
                v-for="item in orderInfo.basket.items"
                :key="item.product.id"
              >
                <h3>{{ item.product.title }}</h3>
                <b>{{ (item.price * item.quantity) | numberFormat }} ₽</b>
                <span>Артикул: {{ item.product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>
                Итого: {{ orderLength }}
                {{ orderLength | declOfNum(["товар", "товара", "товаров"]) }}
                на сумму <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b>
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import numberFormat from "@/functions/numberFormat";
import declOfNum from "@/functions/declOfNum";

export default {
  computed: {
    ...mapGetters(["orderInfo", "orderInfoLoading", "orderInfoLoadingError"]),
    orderLength() {
      return this.orderInfo
        ? this.orderInfo.basket.items.reduce(
            (acc, item) => item.quantity + acc,
            0
          )
        : 0;
    },
  },
  methods: {
    ...mapActions(["loadOrderInfo"]),
  },
  created() {
    if (
      this.$store.state.orderInfo &&
      this.$store.state.orderInfo.id === this.$route.params.id
    ) {
      return;
    }
    this.loadOrderInfo(this.$route.params.id);
  },
  watch: {
    "$route.params.id"() {
      if (this.$route.params.id !== this.$store.state.orderInfo.id) {
        this.$router.replace({ name: "notFound" });
      }
    },
  },
  filters: {
    numberFormat,
    declOfNum,
  },
};
</script>