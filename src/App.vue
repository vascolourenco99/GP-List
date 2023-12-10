<!--
  This component represents a sortable table with various data columns. 
  It includes functionality to sort the table based on
  different criteria such as Date, State, Project ID, and Amount. 
  Users can click on buttons to sort the table by specific criteria, 
  and an additional option allows reversing the sorting order.
-->
<template>
  <div class="container-table">
    <div class="flex justify-center">
      <div>
        <div class="flex">
          <div class="flex flex-col justify-center">
            <h3 class="font-h3 mr-2 text-center">Sort by:</h3>
          </div>
          <button
            v-for="column in ['Date', 'State', 'ID', 'Amount']"
            :key="column"
            class="button-sort px-4 py-2 mr-2 rounded"
            @click="sort(column)"
            :class="{
              'active-button': activeButton === column,
              noClick: activeButton === column,
            }"
          >
            {{ column }}
          </button>
          <button
            class="button-default mr-2 px-4 py-2 rounded"
            @click="sort('Default')"
            :class="{ 'active-button': activeButton === 'Default' }"
          >
            None
          </button>
          <div>
            <div class="vl"></div>
          </div>
          <button
            class="button-option px-4 py-2 ml-2 rounded"
            @click="reverse('Active')"
            :class="{
              'active-button': activeButtonReverse === 'Active',
              noClick: activeButton === 'Default',
            }"
          >
            <font-awesome-icon :icon="['fas', 'arrow-right-arrow-left']" />
          </button>
        </div>
        <t-table
          :headers="['Date', 'Hour', 'Project ID', 'State', 'Amount']"
          :data="tableData"
          :items-per-page="10"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// external libraries
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// component
import TTable from "../src/components/TTable.vue";

// functions
import { amortizations } from "./db/amortizations.ts";
import { transformAmortizations } from "./helpers";
import { Amortization } from "./types";

library.add(fas);

export default {
  components: {
    TTable,
    FontAwesomeIcon,
  },
  data() {
    return {
      tableData: transformAmortizations(amortizations),
      activeButton: "Default",
      activeButtonReverse: "",
    };
  },
  methods: {
    sort(criteria: string) {
      if (criteria === "Default") {
        this.activeButton = criteria;
        this.activeButtonReverse = "";
        this.$data.tableData = transformAmortizations(amortizations);
      } else {
        this.activeButton = criteria;
        this.activeButtonReverse = "";
        this.$data.tableData = this.sortData(criteria, this.$data.tableData);
      }
    },

    sortData(criteria: string, data: Array<Amortization>) {
      return data.sort((a, b) => {
        if (criteria === "Date") {
          return new Date(a.day).getTime() - new Date(b.day).getTime();
        } else if (criteria === "State") {
          return b.state.localeCompare(a.state);
        } else if (criteria === "ID") {
          return a.project - b.project;
        } else if (criteria === "Amount") {
          return a.amount - b.amount;
        }
        return 0;
      });
    },
    reverse(active: string) {
      if (this.activeButton === "Default") return;

      if (this.activeButtonReverse === active) {
        this.activeButtonReverse = "";
        this.$data.tableData.reverse();
      } else {
        this.activeButtonReverse = active;
        this.$data.tableData.reverse();
      }
    },
  },
};
</script>

<style scoped>
.container-table {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.noClick {
  pointer-events: none;
}
.vl {
  border-left: 2px solid rgb(197, 197, 197);
  height: 43px;
}

.button-option {
  cursor: pointer;
  border: 1px solid #154b64;
  background-color: white;
  color: #154b64;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 700;
}

.font-h3 {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #154b64;
}
.button-sort,
.button-default {
  cursor: pointer;
  border: 1px solid #154b64;
  background-color: white;
  color: #154b64;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 700;
}

.button-sort:hover,
.button-option,
.button-default:hover {
  background-color: #f8f8f8;
}

.button-sort.active-button,
.button-option.active-button,
.button-default.active-button,
.button-default:active,
.button-sort:active {
  transform: translateY(1px);

  background-color: #ffc84b;
  border: none;
}
</style>
