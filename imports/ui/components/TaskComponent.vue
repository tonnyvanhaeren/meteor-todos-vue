<template>
  <li :class="taskClassName">
    <input
      type="checkbox"
      readOnly
      :checked="!!task.isChecked"
      @click="toggleChecked"
    />
    <span class="text">{{ task.text }}</span>
    <button class="delete" @click="deleteThisTask">×</button>
  </li>
</template>

<script>
import { TasksCollection } from '../../api/TasksCollection';
export default {
  props: { task: { type: Object, default: null } },
  data() {
    return {};
  },
  computed: {
    taskClassName: function () {
      return this.task.isChecked ? 'checked' : '';
    },
  },
  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      TasksCollection.update(this.task._id, {
        $set: { isChecked: !this.task.isChecked },
      });
    },
    deleteThisTask() {
      TasksCollection.remove(this.task._id);
    },
  },
};
</script>
