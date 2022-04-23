<template>
  <app-notification></app-notification>
  <app-form></app-form>
  <input
    class="form-control"
    list="datalistOptions"
    id="exampleDataList"
    placeholder="Type First name or Last name"
    v-model="inputSearch"
  />
  <div class="table-responsive">
    <table class="table table-light table-hover">
      <thead>
        <tr>
          <th
            scope="col"
            v-for="(key, index) in columns"
            :key="key"
            @click="sortBy(key)"
            :class="{ active: sortKey === key }"
          >
            <span>
              {{ colText[index] }}
            </span>
            <i
              class="el-icon-top"
              :class="sortOrders[key] < 0 ? 'dsc' : 'asc'"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <app-row-table
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          @click="clickUser(user)"
        ></app-row-table>
      </tbody>
    </table>
  </div>
  <app-user-info :user="user" @close-user-info="user = null"></app-user-info>
</template>
<script>
import { mapGetters } from "vuex";
import AppRowTable from "@/components/AppRowTable";
import AppUserInfo from "@/components/AppUserInfo";
import AppForm from "@/components/AppForm";
import AppNotification from "@/components/AppNotification";

export default {
  components: {
    AppRowTable,
    AppUserInfo,
    AppForm,
    AppNotification,
  },
  props: ["columns"],
  data() {
    const sortOrders = {};
    this.columns.forEach((key) => {
      sortOrders[key] = 1;
    });
    return {
      // sortParam: "all",
      sortOrders: sortOrders,
      sortKey: "",
      inputSearch: "",
      user: null,
      isActiveForm: false,
      colText: ["id", "First name", "Last name", "email", "phone"],
    };
  },
  methods: {

    clickUser(user) {
      this.user = user;
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
  },
  computed: {
    ...mapGetters(["userSliced", "users"]),

    filteredUsers() {
      let sortKey = this.sortKey;
      let filterKey = this.inputSearch && this.inputSearch.toLowerCase();
      let order = this.sortOrders[this.sortKey] || 1;
      let users = this.userSliced;
      if (filterKey) {
        users = this.users.filter((user) => {
          return Object.keys(user).some((key) => {
            return String(user[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      if (sortKey) {
        users = users.slice().sort((a, b) => {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return users;
    },
    changeSortIcon() {
      return this.order !== 1 ? true : false;
    },
  },
};
</script>
<style lang="scss">
.table-responsive {
  height: 500px;
}
.el-icon-top {
  &--transform {
    transform: rotate(-180deg);
  }
}
.table {
  thead {
    th {
      cursor: pointer;
      position: sticky;
      top: 0;
      min-width: 200px;
      transition: color 0.2s linear;
      &.active {
        color: #1473e9;
      }
    }
    i {
      transition: all 0.2s linear;
      &.asc {
        transform: rotate(-180deg);
      }
      &.dsc {
        transform: rotate(0deg);
      }
    }
  }
  tbody {
    th,
    td {
      min-width: 200px;
    }
  }
}
.form-control {
  margin-bottom: 20px;
}
</style>
