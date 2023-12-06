<template>
  <div class="flex items-center justify-center mt-10">
    <t-table :headers="['Date', 'State', 'Amout', 'Project ID']" :data="amortizations">
    
    </t-table>
  </div>
</template>

<script lang="ts">
import TTable from '../src/components/TTable.vue';
import { amortizations } from '../db/amortizations.ts';

export default {
  components: {
    TTable,
  },
  data() {
    return {
      amortizations: amortizations
    };
  },
};
</script>

<style scoped>
</style>