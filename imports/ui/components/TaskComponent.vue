<template>
  <div>
    <li>{{ task.text }}</li>
  </div>
</template>

<script>
export default {
  props: { task: { type: Object, default: null } },
  data() {
    return {};
  },
};
</script>
