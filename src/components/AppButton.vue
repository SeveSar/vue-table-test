<template>
  <button class="btn" :class="color" @click="clickButton">
    <slot></slot>
  </button>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["color", "fetch"],
  methods: {
    ...mapActions(["fetchUsers"]),
    clickButton() {
      if (this.fetch) {
        this.fetchUsers(this.size);
      }
    },
  },
};
</script>
<style lang="scss">
.btn {
  white-space: nowrap;
}
</style>
