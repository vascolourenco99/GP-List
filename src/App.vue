<template>
  <div class="flex justify-center mt-4">
    <div>
      <div class="flex">
        <div class="flex flex-col justify-center">
          <h3 class="text-2xl font-h3 mr-2 text-center">Sort by:</h3>
        </div>
        <button class="button-sort px-4 py-2 mr-2 rounded" @click="sort('Date') ">
          Date
        </button>
        <button class="button-sort px-4 py-2 mr-2 rounded" @click="sort('State')">
          State
        </button>
        <button class="button-sort px-4 py-2 rounded" @click="sort('ProjectID')">
          Project ID
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
    };
  },
  methods: {
    sort(criteria : string){
      switch (criteria) {
        case 'Date':
          for(let i = 0; i < this.$data.tableData.length; i++)
          {
            for(let j = 0; j < this.$data.tableData.length; j++)
            {
              const date1 = new Date(this.$data.tableData[i].day);
              const date2 = new Date(this.$data.tableData[j].day);

              if(date1 < date2)
              {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
          break;
        case 'State':
          for(let i = 0; i < this.$data.tableData.length; i++)
          {
            for(let j = 0; j < this.$data.tableData.length; j++)
            {
              if(this.$data.tableData[i].state < this.$data.tableData[j].state)
              {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
          break;
        case 'ProjectID':
          for(let i = 0; i < this.$data.tableData.length; i++)
          {
            for(let j = 0; j < this.$data.tableData.length; j++)
            {
              if(this.$data.tableData[i].project < this.$data.tableData[j].project)
              {
                const temp = this.$data.tableData[i];
                this.$data.tableData[i] = this.$data.tableData[j];
                this.$data.tableData[j] = temp;
              }
            }
          }
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
.button-sort {
  cursor: pointer;
  border: none;
  background-color: #ffc84b;
  color: #154b64;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 700;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.button-sort:hover {
  background-color: #ffc84b;
}

.button-sort:active {
  transform: translateY(4px);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
