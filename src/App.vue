<template>
  <app-loader></app-loader>
  <template v-if="!userLength">
    <div class="actions">
      <app-button color="btn-danger ms-3" :fetch="true"
        >Загрузить данные</app-button
      >
    </div>
  </template>
  <app-table :columns="gridColumns" v-else></app-table>
  <app-pagination v-if="userLength"></app-pagination>
</template>

<script>
import { mapGetters } from "vuex";
import AppTable from "@/components/AppTable";
import AppLoader from "@/components/AppLoader";
import AppPagination from "@/components/AppPagination";
import AppButton from "@/components/AppButton";
export default {
  name: "App",
  components: {
    AppTable,
    AppLoader,
    AppPagination,
    AppButton,
  },
  data() {
    return {
      gridColumns: ["id", "firstName", "lastName", "email", "phone"],
    };
  },
  computed: {
    ...mapGetters(["userSliced"]),
    userLength() {
      return this.userSliced.length;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 60px;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    padding: 15px;
  }
}

.actions {
  margin-bottom: 20px;
}
</style>
