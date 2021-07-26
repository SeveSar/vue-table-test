<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    showNotice({ title, message, type }) {
      this.$notify[`${type}`]({
        title,
        message,
      });
    },
  },
  computed: {
    ...mapGetters(["notice"]),
  },
  watch: {
    notice(notice) {
      this.showNotice(notice);
    },
  },
};
</script>
<style lang="scss"></style>
