<template>
  <div class="flex row justify-center">
    <t-table
      :headers="['Date', 'Hour' , 'Project ID', 'State', 'Amount']"
      :data="tableData"
      :items-per-page="10" 
    />
  </div>
</template>

<script lang="ts">
import TTable from '../src/components/TTable.vue';
import { amortizations } from './db/amortizations.ts'
import { transformAmortizations } from './helpers/transformAmortizations.ts';

export default {
  components: {
    TTable,
  },
  data() {
    return {
      tableData: transformAmortizations(amortizations),
    };
  },
};
</script>

<style scoped>
/* Add Tailwind CSS styles here if needed */
</style>./db/amortizations.ts