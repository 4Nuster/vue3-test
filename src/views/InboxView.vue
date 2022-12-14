<template>
  <Teleport to="#app">
    <div :class="('overlay '+overlay)" @click="slideOut">
      <div :class="('overlay__email-content '+overlayEmailContent)">
        <div class="overlay__email-content__tools">
          <div class="overlay__email-content__tools__close" @click="slideOut">
            <img class="overlay__email-content__tools__close__icon" src="../assets/icons/close.svg" />
            <span class="overlay__email-content__tools__close__text">Close (Esc)</span>
          </div>
          <div class="overlay__email-content__tools__read" @click="markCurrentAsRead">
            <img class="overlay__email-content__tools__read__icon" src="../assets/icons/read.svg" />
            <span class="overlay__email-content__tools__read__text">Mark as read (r)</span>
          </div>
          <div class="overlay__email-content__tools__archive" @click="moveCurrentToArchive">
            <img class="overlay__email-content__tools__archive__icon" src="../assets/icons/trash.svg" />
            <span class="overlay__email-content__tools__archive__text">Archive (a)</span>
          </div>
        </div>
        <h2 class="overlay__email-content__title">{{currentEmail.title}}</h2>
        <p class="overlay__email-content__paragraph">
          {{currentEmail.content}}
        </p>
      </div>
    </div>
  </Teleport>
  <div class="container">
    <h1 class="container__title">Inbox</h1>
    <div class="container__tools">
      <div class="container__tools__email-selected">
        <input class="container__tools__email-selected__checkbox" type="checkbox" @change="selectAll" v-model="allSelected">
        <span class="container__tools__email-selected__text">Email selected ({{selected.length}})</span>
      </div>
      <div v-if="selected.length != 0" class="container__tools__read" @click="markSelectedAsRead">
        <img class="container__tools__read__icon" src="../assets/icons/read.svg" />
        <span class="container__tools__read__text">Mark as read (r)</span>
      </div>
      <div v-if="selected.length != 0" class="container__tools__archive" @click="moveSelectedToArchive">
        <img class="container__tools__archive__icon" src="../assets/icons/trash.svg" />
        <span class="container__tools__archive__text">Archive (a)</span>
      </div>
    </div>
    <div class="container__email-list">
      <div v-for="item in inbox" :class="'container__email-list__email '+(item.read ? 'container__email-list__email--blue-background' : '')">
        <input class="container__email-list__email__checkbox" type="checkbox" v-model="selected" @change="select" :value="item.id">
        <span class="container__email-list__email__title" @click="displayEmail(item)">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useKeypress } from 'vue3-keypress';
  
  const store = useStore();
  const inbox = computed(() => store.getters.inbox);
  const currentEmail = ref({});

//checkboxes behavior
  let allSelected = ref(false);
  let selected = ref([]);
  const selectAll = () => {
    selected.value = [];
    if (allSelected.value) {
      store.getters.inbox.forEach(email => {
        selected.value.push(email.id.toString());
      });
    }
  }
  const select = () => {
    allSelected.value = false;
  }

//mark selected mails as read
  const markSelectedAsRead = () => {
    selected.value.forEach(element => {
      store.commit('read', element);
    });
    selected.value = [];
    select();
  }

//archive selected mails
  const moveSelectedToArchive = () => {
    selected.value.forEach(element => {
      store.commit('archive', element);
    });
    selected.value = [];
    select();
  }

//overlay
  const overlay = ref('');
  const overlayEmailContent = ref('');

//display email
  const displayEmail = (email) => {
    currentEmail.value = email;
    slideIn();
  }

//mark opened mail as read, else mark selected as read (when the keypress R is pressed outside of the overlay)
  const markCurrentAsRead = () => {
    if (!(Object.keys(currentEmail.value).length === 0 && Object.getPrototypeOf(currentEmail.value) === Object.prototype)) store.commit('read', currentEmail.value.id);
    else markSelectedAsRead();
  }

//move opened mail to archive, else move selected to archive (when the keypress R is pressed outside of the overlay)
  const moveCurrentToArchive = () => {
    if (!(Object.keys(currentEmail.value).length === 0 && Object.getPrototypeOf(currentEmail.value) === Object.prototype)) store.commit('archive', currentEmail.value.id);
    else moveSelectedToArchive();
  }

//overlay animation
  const slideIn = () => {
    overlay.value = 'overlay--slide-in';
    overlayEmailContent.value = 'overlay__email-content--slide-in';
  }

  const slideOut = () => {
    overlay.value = '';
    overlayEmailContent.value = '';
    currentEmail.value = {};
  }

//handling keypresses
  useKeypress({
    keyEvent: "keydown",
    keyBinds: [
      {
        keyCode: "esc",
        success: slideOut,
      },
      {
        keyCode: 82, //r key
        success: markCurrentAsRead,
      },
      {
        keyCode: 65, //a key
        success: moveCurrentToArchive,
      },
    ]
  });
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 260px);
  max-height: 100vh;
  overflow: hidden;
}
.container__title {
  margin-top: 24px;
  margin-left: 24px;
}
.container__tools {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 32px 24px 24px 24px;
}
.container__tools__email-selected, .container__tools__read, .container__tools__archive {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.container__tools__email-selected__checkbox, .container__email-list__email__checkbox {
  height: 20px;
  width: 20px;
}
.container__tools__email-selected__text, .container__tools__read__text, .container__tools__archive__text, .container__email-list__email__title {
  margin-left: 12px;
  font-size: 14px;
}
.container__tools__read {
  margin-left: auto;
  color: #4B5563;
}
.container__tools__archive {
  margin-left: 40px;
  color: #4B5563;
}
.container__email-list {
  overflow-y: scroll;
}
.container__email-list__email {
  padding-left: 24px;
  padding-top: 20px;
  padding-bottom: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-top: #E5E7EB 1px solid;
  transition: background-color 300ms ease-out;
}
.container__email-list__email--blue-background {
  background-color: #F3F6FB;
}
.container__email-list__email:hover, .container__email-list__email--blue-background:hover {
  background-color: #D1E2FF;
}
.overlay {
  position: fixed;
  height: 0;
  width: 0;
  background-color: #4C5764cc;
  z-index: 90;
  opacity: 0;
  transition: opacity 500ms ease-in-out;
}
.overlay--slide-in {
  height: 100vh;
  width: 100vw;
  opacity: 100%;
}
.overlay__email-content {
  position: fixed;
  right: -60vw;
  height: 100vh;
  width: 60vw;
  background-color: #fff;
  transition: right 500ms ease-in-out;
}
.overlay__email-content--slide-in {
  right: 0;
}
.overlay__email-content__tools {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 32px;
  color: #4B5563;
  font-size: 14px;
}
.overlay__email-content__tools__close, .overlay__email-content__tools__read, .overlay__email-content__tools__archive {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.overlay__email-content__tools__close__text, .overlay__email-content__tools__read__text, .overlay__email-content__tools__archive__text {
  margin-left: 12px;
}
.overlay__email-content__tools__read {
  margin-left: auto;
  color: #4B5563;
}
.overlay__email-content__tools__archive {
  margin-left: 40px;
  color: #4B5563;
}
.overlay__email-content__title, .overlay__email-content__paragraph {
  margin-left: 32px;
  margin-right: 32px;
}
.overlay__email-content__paragraph {
  margin-top: 20px;
  color: #4B5563;
}
</style>