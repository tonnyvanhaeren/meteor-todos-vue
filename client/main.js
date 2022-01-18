import { Meteor } from 'meteor/meteor';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vue from 'vue';

import App from '../imports/ui/App.vue';

Vue.use(VueMeteorTracker);

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
