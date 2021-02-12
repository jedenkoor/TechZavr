<template>
  <BaseFormField :title="title" :error="error">
    <input
      class="form__input"
      type="text"
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </BaseFormField>
</template>

<script>
import formFIeldMixin from "@/mixins/formFIeldMixin";

export default {
  mixins: [formFIeldMixin],
};
</script>