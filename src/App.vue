<template>
  <div>
    <t-table :headers="['Name', 'Email', 'Age', 'Sales']" :data="tableData"></t-table>
  </div>
</template>

<script lang="ts">
import TTable from '../src/components/TTable.vue';

export default {
  components: {
    TTable,
  },
  data() {
    return {
      tableData: [
        ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
        ['Saida Redondo', 'saida@gmail.com', '27', '$124.00'],
      ],
    };
  },
};
</script>

<style scoped>
/* Add Tailwind CSS styles here if needed */
</style>