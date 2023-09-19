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

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                v-model="credentials.email"
                type="email"
                placeholder="email@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                v-model="credentials.password"
                type="password"
                placeholder="Enter a password"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                {{ loginRegisterTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useStoreAuth } from "@/stores/storeAuth.js";

const storeAuth = useStoreAuth();

const credentials = reactive({
  email: "",
  password: "",
});

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

const onSubmit = () => {
  //Basic Validation
  if (!credentials.email || !credentials.password) {
    alert("Please, enter an email and password");
    return;
  }
  //Register or Login user
  if (register.value) {
    storeAuth.registerUser(credentials);
  } else {
    storeAuth.loginUser(credentials);
  }
  credentials.email = "";
  credentials.password = "";
};
</script>

<style scoped>
.auth-form {
  max-width: 50%;
  margin: 0 auto;
}
</style>
