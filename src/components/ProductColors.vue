<template>
  <ul class="colors" :class="addClass">
    <li class="colors__item" v-for="(color, index) in colors" :key="index">
      <label class="colors__label">
        <input 
          class="colors__radio sr-only"
          type="radio"
          :value="color"
          :checked="currentColor == color"
          @change="setColor(color)"
        >
        <span class="colors__value" :style="`background-color: ${color}`"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'currentColor', 'addClass'],
  methods: {
    setColor(color) {
      this.$emit('update:currentColor', color);
    }
  },
}
</script>