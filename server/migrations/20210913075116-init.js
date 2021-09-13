module.exports = {
  async up(db, client) {
    await db.createCollection('users');
    await db.createCollection('matches');
  },

  async down(db, client) {
    await db.dropCollection('users');
    await db.dropCollection('matches');
  }
};
