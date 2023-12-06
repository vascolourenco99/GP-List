<template>
  <div>
    <table :class="classes.table">
      <thead :class="classes.thead">
        <tr :class="classes.theadTr">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="[classes.theadTh, 'text-center', 'text-custom-color']"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody :class="classes.tbody">
        <tr
          v-for="(row, rowIndex) in paginatedData"
          :key="rowIndex"
          :class="[
            classes.tr,
            rowIndex % 2 === 0 ? 'bg-gray-100' : '',
            'text-custom-color',
          ]"
        >
          <td
            v-for="(item, colIndex) in row"
            :key="colIndex"
            :class="[classes.td, 'text-center', changeColor(item)]"
          >
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
    <t-pagination
      :v-model="currentPage"
      :total-items="totalItems"
      :per-page="perPage"
      @input="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import TPagination from "../components/TPagination.vue";
import { amortizations } from '../../db/amortizations.ts';

export default {
  components: {
    TPagination,
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      amortizations: amortizations,
    };
  },
  computed: {
    totalItems() {
      return this.amortizations.length;
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.amortizations.slice(startIndex, endIndex);
    },
    classes() {
      return {
        table:
          "min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border mb-4",
        thead: "",
        theadTr: "",
        theadTh: "px-3 py-2 font-semibold text-left bg-gray-100 border-b",
        tbody: "bg-white divide-y divide-gray-100",
        tr: "",
        td: "px-3 py-2 whitespace-no-wrap",
        tfoot: "",
        tfootTr: "",
        tfootTd: "",
      };
    },
  },
  methods: {
    changeColor(content: string) {
      if (content === "pending") {
        return "font-bold text-yellow-500";
      } else if (content === "paid") {
        return "font-bold text-green-500";
      } else {
        return "";
      }
    },
    handlePageChange(pageNumber : any) {
      this.currentPage = pageNumber;
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