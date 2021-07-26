<template>
  <transition name="fade">
    <div class="user-info" v-if="user">
      <h2>
        Выбран пользователь <b>{{ user.firstName + " " + user.lastName }}</b>
      </h2>
      <div class="card m-auto" style="width: 25rem">
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-light">
            <h4>Описание:</h4>
            <div>{{ user.description ? user.description : "Undefinded" }}</div>
          </li>
          <li class="list-group-item bg-light">
            <h4>Адресс проживания:</h4>
            <div>
              <b>{{
                user.address ? user.address.streetAddress : "Undefined"
              }}</b>
            </div>
          </li>
          <li class="list-group-item bg-light">
            <h4>Город:</h4>
            <div>
              <b>{{ user.address ? user.address.city : "Undefined" }}</b>
            </div>
          </li>
          <li class="list-group-item bg-light">
            <h4>Провинция/штат:</h4>
            <div>
              <b>{{ user.address ? user.address.state : "Undefined" }}</b>
            </div>
          </li>
          <li class="list-group-item bg-light">
            <h4>Индекс:</h4>
            <div>
              <b>{{ user.address ? user.address.zip : "Undefined" }}</b>
            </div>
          </li>
          <li class="list-group-item bg-light">
            <button class="btn btn-primary" @click="$emit('close-user-info')">
              CLOSE
            </button>
          </li>
        </ul>
      </div>
    </div>
  </transition>
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
<style lang="scss">
.user-info {
  margin: 40px 0;
}
h4 {
  font-size: 15px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.card {
  @media (max-width: 500px) {
    width: 19rem !important;
  }
}
</style>
