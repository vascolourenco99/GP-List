<template>
  <div class="flex justify-between">
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l text-custom-color"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Prev
    </button>
    {{ currentPage }}
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r text-custom-color"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { amortizations } from '../../db/amortizations.ts';

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: amortizations.length,
    },
  },
  created() {
    console.log('currentPage:', this.currentPage);
    console.log('totalPages:', this.totalPages);
  },
  methods: {
    prevPage() {
      if (this.currentPage && this.currentPage > 1) {
        console.log("prev page");
        this.$emit("input", this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage && this.currentPage < this.totalPages) {
        console.log("next page");
        this.$emit("input", this.currentPage + 1);
      }
    },
  },
};
</script>

<style scoped>
.text-custom-color {
  color: #154b64;
  font-family: "Poppins", sans-serif;
}
</style>