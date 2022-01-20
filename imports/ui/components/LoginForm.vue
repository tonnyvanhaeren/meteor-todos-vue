<template>
  <form class="login-form" @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input
        id="username"
        v-model="username"
        name="username"
        type="text"
        placeholder="Username"
        required
      />
    </div>

    <div>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
    </div>

    <div>
      <button type="submit">Log In</button>
    </div>
  </form>
</template>

<script>
import { Meteor } from 'meteor/meteor';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      Meteor.loginWithPassword(
        this.username,
        this.password,
        function (error, result) {
          if (error) {
            console.log(error);
          } else {
            console.log('Resultaat : ', result);
          }
        },
      );
    },
  },
};
</script>
