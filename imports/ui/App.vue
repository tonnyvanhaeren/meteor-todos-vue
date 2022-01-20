<template>
  <div v-if="currentUser">
    <div class="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              <span v-if="incompleteCount > 0">({{ incompleteCount }})</span>
            </h1>
          </div>
        </div>
      </header>
      <div class="main">
        <div class="user" @click="logout">
          {{ currentUser.username }}
        </div>
        <TaskForm />
        <div class="filter">
          <button @click="toggleHideCompleted">
            <span v-if="hideCompleted">Show All</span>
            <span v-else>Hide Completed Tasks</span>
          </button>
        </div>

        <ul class="tasks">
          <Task
            v-for="task in tasks"
            :key="task._id"
            class="task"
            :task="task"
          />
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <LoginForm />
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
// import Vue from 'vue';
import Task from './components/TaskComponent.vue';
import TaskForm from './components/TaskForm.vue';
import LoginForm from './components/LoginForm.vue';

import { TasksCollection } from '../api/TasksCollection';

export default {
  components: {
    Task,
    TaskForm,
    LoginForm,
  },
  data() {
    return {
      hideCompleted: false,
    };
  },
  methods: {
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    logout() {
      Meteor.logout();
    },
  },
  meteor: {
    tasks() {
      if (!this.currentUser) {
        return [];
      }

      const hideCompletedFilter = { isChecked: { $ne: true } };

      const userFilter = this.currentUser
        ? { userId: this.currentUser._id }
        : {};

      const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

      return TasksCollection.find(
        this.hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        },
      ).fetch();
    },
    incompleteCount() {
      if (this.currentUser) {
        return TasksCollection.find({
          isChecked: { $ne: true },
          userId: this.currentUser._id,
        }).count();
      } else {
        return 0;
      }
    },
    currentUser() {
      return Meteor.user();
    },
  },
};
</script>
<style scoped></style>
