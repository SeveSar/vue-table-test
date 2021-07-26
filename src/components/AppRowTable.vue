<template>
  <tr>
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
  </tr>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },
};
</script>
<style lang="scss" scoped>
tr {
  cursor: pointer;
}
td {
  cursor: pointer;
}
</style>
