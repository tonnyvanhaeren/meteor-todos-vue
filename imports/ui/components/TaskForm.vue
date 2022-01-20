<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <input v-model="newTask" type="text" placeholder="Type to add new tasks" />
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
// import Vue from 'vue';
import { Meteor } from 'meteor/meteor';
export default {
  data() {
    return {
      newTask: '',
    };
  },
  methods: {
    handleSubmit() {
      if (this.newTask.length === 0) return;

      Meteor.call('tasks.insert', this.newTask.trim());

      // Clear form
      this.newTask = '';
    },
  },
};
</script>
