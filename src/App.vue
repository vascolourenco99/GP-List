<template>
  <div class="flex justify-center mt-4">
    <div>
      <div class="flex">
        <div class="flex flex-col justify-center">
          <h3 class="text-2xl font-h3 mr-2 text-center">Sort by:</h3>
        </div>
        <button
          class="button-sort px-4 py-2 mr-2 rounded"
          @click="sort('Date')"
          :class="{ 'active-button': activeButton === 'Date' }"
        >
          Date
        </button>
        <button
          class="button-sort px-4 py-2 mr-2 rounded"
          @click="sort('State')"
          :class="{ 'active-button': activeButton === 'State' }"
        >
          State
        </button>
        <button
          class="button-sort px-4 py-2 mr-2 rounded"
          @click="sort('ProjectID')"
          :class="{ 'active-button': activeButton === 'ProjectID' }"
        >
          Project ID
        </button>
        <button
          class="button-sort px-4 py-2 mr-2 rounded"
          @click="sort('Amount')"
          :class="{ 'active-button': activeButton === 'Amount' }"
        >
          Amount
        </button>
        <button
          class="button-default px-4 py-2 rounded"
          @click="sort('Default')"
          :class="{ 'active-button': activeButton === 'Default' }"
        >
          None
        </button>
      </div>
      <t-table
        :headers="['Date', 'Hour', 'Project ID', 'State', 'Amount']"
        :data="tableData"
        :items-per-page="10"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TTable from "../src/components/TTable.vue";
import { amortizations } from "./db/amortizations.ts";
import { transformAmortizations } from "./helpers/transformAmortizations.ts";

export default {
  components: {
    TTable,
  },
  data() {
    return {
      tableData: transformAmortizations(amortizations),
      activeButton: "Default",
    };
  },
  methods: {
    sort(criteria: string) {
      switch (criteria) {
        case "Date":
          this.activeButton = criteria;
          for (let i = 0; i < this.$data.tableData.length; i++) {
            for (let j = 0; j < this.$data.tableData.length; j++) {
              const date1 = new Date(this.$data.tableData[i].day);
              const date2 = new Date(this.$data.tableData[j].day);

              if (date1 < date2) {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
          break;
        case "State":
          this.activeButton = criteria;
          for (let i = 0; i < this.$data.tableData.length; i++) {
            for (let j = 0; j < this.$data.tableData.length; j++) {
              if (
                this.$data.tableData[i].state < this.$data.tableData[j].state
              ) {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
          break;
        case "ProjectID":
          this.activeButton = criteria;
          for (let i = 0; i < this.$data.tableData.length; i++) {
            for (let j = 0; j < this.$data.tableData.length; j++) {
              if (
                this.$data.tableData[i].project <
                this.$data.tableData[j].project
              ) {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
          break;
        case "Amount":
          this.activeButton = criteria;
          for (let i = 0; i < this.$data.tableData.length; i++) {
            for (let j = 0; j < this.$data.tableData.length; j++) {
              if (
                this.$data.tableData[i].amount < this.$data.tableData[j].amount
              ) {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
          break;
        case "Default":
          this.activeButton = criteria;
          this.$data.tableData = transformAmortizations(amortizations);
          break;
      }
    },
  },
};
</script>

<style scoped>
.font-h3 {
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #154b64;
}
.button-sort,
.button-default {
  cursor: pointer;
  border: 1px solid  #154b64;
  background-color: white;
  color: #154b64;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.button-sort:hover,
.button-default:hover {
  background-color: #f8f8f8;
}

.button-sort.active-button,
.button-default.active-button,
.button-default:active,
.button-sort:active {
  transform: translateY(4px);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #ffc84b;
}
</style>
