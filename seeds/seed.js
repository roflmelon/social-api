const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.once('open', async () => {
  console.log('Connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  await User.create({
    username: 'firstUser',
    email: 'testasdv@test.com',
  });

  console.log('Database populated');
  process.exit(0);
});
