<template>
  <div class="mt-12">
    <table :class="classes.table">
      <thead :class="classes.thead">
        <tr :class="classes.theadTr">
          <th v-for="(header, index) in headers" :key="index"
            :class="[classes.theadTh, 'text-center', 'text-custom-color']">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody :class="classes.tbody">
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" :class="[
          classes.tr,
          rowIndex % 2 === 0 ? 'bg-gray-100' : '',
          'text-custom-color',
        ]">
          <td v-for="(item, colIndex) in row" :key="colIndex" :class="[classes.td, 'text-center', changeColor(item)]">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between mt-4">
      <button
        class="px-4 py-2  rounded text-custom-color font-bold button-color"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <t-pagination
        :total-items="data.length"
        :current-page="currentPage"
        :items-per-page="itemsPerPage"
        @page-change="handlePageChange"
      />
      <button
        class="px-4 py-2 rounded text-custom-color font-bold button-color"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
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
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    classes() {
      return {
        table:
          "min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border mb-4",
        thead: "",
        theadTr: "",
        theadTh: "px-3 py-2 font-semibold text-left border-b",
        tbody: "bg-white divide-y divide-gray-100",
        tr: "",
        td: "px-3 py-2 whitespace-no-wrap",
        tfoot: "",
        tfootTr: "",
        tfootTd: "",
      };
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
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
    handlePageChange(page : number) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>

.button-color {
  background-color: #FFC84B;
}

.button-color:hover {
  transition: all 0.2s ease-in-out;
  background-color: #fcdc99;
}
.text-custom-color {
  color: #154b64;
  font-family: "Poppins", sans-serif;
}
</style>