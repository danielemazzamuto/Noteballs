<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="loginActiveClass">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="registerActiveClass">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ loginRegisterTitle }}</div>
        <div class="content">
          Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros.
          Donec id elit non mi porta gravida at eget metus. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Cras mattis consectetur purus sit amet fermentum.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const register = ref(false);

const loginActiveClass = () => {
  register.value = false;
};
const registerActiveClass = () => {
  register.value = true;
};

const loginRegisterTitle = computed(() =>
  !register.value ? "Login" : "Register"
);
</script>

<style scoped>
.auth-form {
  max-width: 50%;
  margin: 0 auto;
}
</style>
