<template>
  <div class="wrapper">
    <TheHeader/>

    <router-view/>

    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if(userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
}
</script>