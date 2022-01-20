import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/db/TasksCollection';

import '../imports/api/tasksMethods';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const admin_username = Meteor.settings.userAdmin.username;
const admin_email = Meteor.settings.userAdmin.email;
const admin_password = Meteor.settings.userAdmin.password;

Meteor.startup(() => {
  // create default admin user
  if (!Accounts.findUserByUsername(admin_username)) {
    Accounts.createUser({
      email: admin_email,
      username: admin_username,
      password: admin_password,
    });
  }

  const user = Accounts.findUserByUsername(admin_username);

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach((taskText) => insertTask(taskText, user));
  }
});
