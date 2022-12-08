

<template>
  <header class="header">
    <img class="header__logo" src="@/assets/logo.svg" @click="fun"/>

    <nav class="header__nav">
      <RouterLink class="header__nav__link" to="/">
        <div class="header__nav__link__content">
          <img class="header__nav__link__content__icon" src="../src/assets/icons/inbox.svg" />
          <span class="header__nav__link__content__title">Inbox</span>
          <span class="header__nav__link__content__number">{{inboxCount}}</span>
        </div>
      </RouterLink>
      <RouterLink class="header__nav__link" to="/archive">
        <div class="header__nav__link__content">
          <img class="header__nav__link__content__icon" src="../src/assets/icons/archive.svg" />
          <span class="header__nav__link__content__title">Archive</span>
          <span class="header__nav__link__content__number">{{archiveCount}}</span>
        </div>
      </RouterLink>
    </nav>
    <div class="header__logout">
      <img class="header__logout__icon" src="../src/assets/icons/logout.svg" />
      <span class="header__logout__title">Logout</span>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const store = useStore();
const inboxCount = computed(() => store.getters.inboxCount);
const archiveCount = computed(() => store.getters.archiveCount);
</script>

<style scoped>
.header {
  width: 260px;
  height: 100vh;
  background-color: #F8FAFC;
  border-right: #E5E7EB 1px solid;
}
.header__logo {
  width: 40px;
  height: 20px;
  margin: 20px 0px 32px 24px;
}

.header__nav {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
}

.header__nav__link {
  height: 48px;
  border-radius: 54px;
  margin-bottom: 12px;
  color: #4B5563;
}

.router-link-active {
  background-color: #D6E2FB;
  color: #000;
}

.header__nav__link__content {
  display: flex;
  flex-direction: row;
  margin: 12px 24px;
}

.header__nav__link__content__icon {
  width: 20px;
}
.header__nav__link__content__title {
  margin-left: 12px;
}
.header__nav__link__content__number {
  margin-left: auto;
}
.header__logout {
  position: absolute;
  left: 24px;
  bottom: 32px;
  display: flex;
  flex-direction: row;
  color: #4B5563;
}
.header__logout__icon {
  width: 20px;
}
.header__logout__title {
  margin-left: 12px;
}
</style>
