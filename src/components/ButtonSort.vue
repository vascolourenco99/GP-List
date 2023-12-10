<template>
  <button
    class="button-sort px-4 py-2 mr-2 rounded"
    @click="handleClick"
    :class="{
      'active-button': isActive,
      noClick: isActive,
    }"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    label: String,
    isActive: Boolean,
    handleClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
  },
});
</script>