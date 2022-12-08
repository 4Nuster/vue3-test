import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

import './assets/main.css'

const app = createApp(App)

const store = createStore({
  state() {
    return {
      emails: [
        {
          id: 0,
          title: "Email 1",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 1,
          title: "Email 2",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquempus imperdiet nulla malesuada pellentesque elit.",
          archived: false,
          read: true,
        },
        {
          id: 2,
          title: "Email 3",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: true,
        },
        {
          id: 3,
          title: "Email 4",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 4,
          title: "Email 5",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 5,
          title: "Email 6",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 6,
          title: "Email 7",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 7,
          title: "Email 8",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 8,
          title: "Email 9",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 9,
          title: "Email 10",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 10,
          title: "Email 11",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 11,
          title: "Email 12",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 12,
          title: "Email 13",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 13,
          title: "Email 14",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 14,
          title: "Email 15",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 15,
          title: "Email 16",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
        {
          id: 16,
          title: "Email 17",
          content: "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          archived: false,
          read: false,
        },
      ],
    };
  },
  getters: {
    inbox: (state) => state.emails.filter(email => !email.archived),
    archive: (state) => state.emails.filter(email => email.archived),
    inboxCount: (state) => state.emails.filter(email => !email.archived).length,
    archiveCount: (state) => state.emails.filter(email => email.archived).length,
  },
  mutations: {
    archive: (state, id) => state.emails[id].archived = true,
    restore: (state, id) => state.emails[id].archived = false,
    read: (state, id) => state.emails[id].read = true,
  }
})

app.use(router)
app.use(store)

app.mount('#app')
