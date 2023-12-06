<template>
  <div class="flex row justify-center">
    <t-table
      :headers="['Schedule Date', 'State', 'Amount', 'Project ID']"
      :data="tableData"
      :items-per-page="10" 
    />
  </div>
</template>

<script lang="ts">
import TTable from '../src/components/TTable.vue';
import { amortizations } from '../db/amortizations.ts'

export default {
  components: {
    TTable,
  },
  data() {
    return {
      tableData: amortizations,
    };
  },
};
</script>

<style scoped>
/* Add Tailwind CSS styles here if needed */
</style>