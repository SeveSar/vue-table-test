<template>
  <el-pagination
    background
    :layout="layout"
    v-model:currentPage="currentPageModel"
    :total="totalUsers"
    :page-size="usersPerPage"
  >
  </el-pagination>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      layout: "prev, pager, next",
    };
  },
  methods: {
    ...mapActions(["changeCurrentPage"]),
  },
  computed: {
    ...mapGetters(["totalUsers", "usersPerPage", "currentPage"]),
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(page) {
        this.changeCurrentPage(page);
      },
    },
    isSmallWindow() {
      return window.innerWidth <= 500;
    },
  },
  mounted() {
    if (this.isSmallWindow) {
      this.layout = "prev, next";
    }
  },
};
</script>
<style lang="scss">
.el-pagination {
  margin-top: 100px;
  overflow-x: auto;
}
</style>
