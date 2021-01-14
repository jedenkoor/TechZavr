import Vue from 'vue'
import App from './App.vue'

import {firstString, secondString} from './variables.js'
import {showAlert} from './function.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

/*showAlert(firstString);
showAlert(secondString);*/