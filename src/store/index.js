import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import { API_BASE_URL } from "@/config.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],

    orderInfo: null,

    cartLoading: false,
    cartLoadingError: false,

    orderInfoLoading: false,
    orderInfoLoadingError: false,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (item) => item.productId === productId
      );
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.productId !== productId
      );
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        ).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
    cartLength(state) {
      return state.cartProducts.reduce((acc, item) => item.amount + acc, 0);
    },
    cartLoading(state) {
      return state.cartLoading;
    },
    cartLoadingError(state) {
      return state.cartLoadingError;
    },
    orderInfo(state) {
      return state.orderInfo;
    },
    orderInfoLoading(state) {
      return state.orderInfoLoading;
    },
    orderInfoLoadingError(state) {
      return state.orderInfoLoadingError;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      context.state.orderInfoLoading = true;
      context.state.orderInfoLoadingError = false;
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit("updateOrderInfo", response.data);
        })
        .catch(() => (context.state.orderInfoLoadingError = true))
        .then(() => (context.state.orderInfoLoading = false));
    },
    loadCart(context) {
      context.state.cartLoading = true;
      context.state.cartLoadingError = false;
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem("userAccessKey", response.data.user.accessKey);
            context.commit("updateUserAccessKey", response.data.user.accessKey);
          }
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        })
        .catch(() => (context.state.cartLoadingError = true))
        .then(() => (context.state.cartLoading = false));
    },
    addProductToCart(context, { productId, amount }) {
      return axios
        .post(
          `${API_BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit("updateCartProductAmount", { productId, amount });
      return axios
        .put(
          `${API_BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((response) =>
          context.commit("updateCartProductsData", response.data.items)
        )
        .catch(() => context.commit("syncCartProducts"));
    },
    deleteCartProduct(context, productId) {
      return axios
        .delete(`${API_BASE_URL}/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId,
          },
        })
        .then((response) => {
          context.commit("updateCartProductsData", response.data.items);
          context.commit("syncCartProducts");
        });
    },
  },
});
