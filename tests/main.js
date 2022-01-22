/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import assert from 'assert';

describe('Package name', function () {
  it('package.json has correct name', async function () {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'simple-todos-vue');
  });

  if (Meteor.isClient) {
    it('client is not server', function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

import '/imports/api/tasksMethods.tests';
