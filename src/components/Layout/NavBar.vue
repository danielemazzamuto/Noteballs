<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">NoteBalls</div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          role="button"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="ignoreBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        :class="{ 'is-active': showMobileNav }"
        class="navbar-menu"
        ref="navbarMenuRef"
      >
        <div class="navbar-end">
          <RouterLink
            @click="showMobileNav = false"
            to="/"
            class="navbar-item"
            active-class="is-active"
          >
            Notes
          </RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            to="/stats"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </RouterLink>
          <div class="navbar-start">
            <button
              v-if="storeAuth.data.user.id"
              @click="logout"
              class="button is-small is-info mt-3 ml-3"
            >
              Log out {{ userEmail }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStoreAuth } from "@/stores/storeAuth.js";
import { onClickOutside } from "@vueuse/core";

const storeAuth = useStoreAuth();

const showMobileNav = ref(false);

// Close outside to close Modal
const navbarMenuRef = ref(null);
const ignoreBurgerRef = ref(null);

onClickOutside(navbarMenuRef, (event) => (showMobileNav.value = false), {
  ignore: [ignoreBurgerRef],
});

const logout = () => {
  storeAuth.logoutUser();
  showMobileNav.value = false;
};

const userEmail = computed(() => storeAuth.data.user.email);
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
