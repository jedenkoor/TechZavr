<template>
  <BaseFormField :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      :placeholder="placeholder"
      v-model="dataValue"
    ></textarea>
  </BaseFormField>
</template>

<script>
import formFIeldMixin from "@/mixins/formFIeldMixin";

export default {
  mixins: [formFIeldMixin],
};
</script>