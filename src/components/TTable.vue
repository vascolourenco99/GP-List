<!--
  This component defines a dynamic table with pagination functionality. 
  It takes data, headers, and itemsPerPage as props to display a table 
  with specified headers and paginates the data based on the itemsPerPage property. 
-->

<template>
  <div class="mt-6">
    <table :class="classes.table">
      <thead :class="classes.thead">
        <tr :class="classes.theadTr">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="[classes.theadTh, 'text-center', 'custom-th']"
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
            :class="[
              classes.td,
              'text-center',
              changeColor(item),
              item === 'pending' || item === 'paid' ? 'uppercase' : '',
            ]"
          >
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex row justify-between t-4">
      <div>
        <button
          class="px-4 py-2 rounded text-custom-color font-bold"
          :class="{
            'bg-gray-300': currentPage === 1,
            'button-color': currentPage !== 1,
            'text-deactivated-color': currentPage === 1,
          }"
          :disabled="currentPage === 1"
          @click="() => prevPage()"
        >
          Previous
        </button>
      </div>
      <div class="flex flex-col justify-center">
        <div class="mx-4 text-custom-color">
          {{ currentPage }} / {{ totalPages }}
        </div>
      </div>
      <div>
        <button
          class="px-4 py-2 rounded text-custom-color font-bold"
          :class="{
            'button-color': currentPage !== totalPages,
            'bg-gray-300': currentPage === totalPages,
            'text-deactivated-color': currentPage === totalPages,
          }"
          :disabled="currentPage === totalPages"
          @click="() => nextPage()"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
    headers: {
      type: Array,
      default: [],
    },
    itemsPerPage: {
      type: Number,
      default: 3,
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
          "min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border mb-4 rounded",
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
    /**
     * function to determine the subset of data to display on the current page.
     * Calculates the start and end indices based on the current page and items per page,
     * then returns a sliced array containing the data for the current page.
     */
    paginatedData() {
      // starting index of the current page
      const start = (this.currentPage - 1) * this.itemsPerPage;
      // ending index of the current page
      const end = start + this.itemsPerPage;
      // return a slice of the current page
      return this.data.slice(start, end);
    },
    /**
     * funtion to get the total number of pages
     */
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
.custom-th {
  background-color: #154b64;
  color: white;
}
.button-color {
  background-color: #ffc84b;
}

.button-color:hover {
  transition: all 0.2s ease-in-out;
  background-color: #fcdc99;
}
.text-custom-color {
  color: #154b64;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.text-deactivated-color {
  color: #727272;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.uppercase {
  text-transform: uppercase;
}
</style>
