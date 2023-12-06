<template>
  <div>
    <table :class="classes.table">
      <thead :class="classes.thead">
        <tr :class="classes.theadTr">
          <th v-for="(header, index) in headers" :key="index" :class="classes.theadTh">{{ header }}</th>
        </tr>
      </thead>
      <tbody :class="classes.tbody">
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="classes.tr">
          <td v-for="(item, colIndex) in row" :key="colIndex" :class="classes.td">{{ item }}</td>
        </tr>
      </tbody>
      <tfoot v-if="footerData.length" :class="classes.tfoot">
        <tr :class="classes.tfootTr">
          <td v-for="(footerItem, index) in footerData" :key="index" :class="classes.tfootTd">{{ footerItem }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    footerData: {
      type: Array,
      default: () => [],
    },
    responsive: {
      type: Boolean,
      default: false,
    },
    responsiveBreakpoint: {
      type: Number,
      default: 768,
    },
  },
  computed: {
    classes() {
      return {
        table: 'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
        thead: '',
        theadTr: '',
        theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
        tbody: 'bg-white divide-y divide-gray-100',
        tr: '',
        td: 'px-3 py-2 whitespace-no-wrap',
        tfoot: '',
        tfootTr: '',
        tfootTd: '',
      };
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS styles here if needed */
</style>