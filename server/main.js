import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = (taskText) => TasksCollection.insert({ text: taskText });

const admin_username = Meteor.settings.userAdmin.username;
const admin_email = Meteor.settings.userAdmin.email;
const admin_password = Meteor.settings.userAdmin.password;

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(insertTask);
  }

  // create default admin user
  if (!Accounts.findUserByUsername(admin_username)) {
    Accounts.createUser({
      email: admin_email,
      username: admin_username,
      password: admin_password,
    });
  }
});
