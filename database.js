const Datastore = require("nedb");
const path = require("path");

const tasks = new Datastore({
  filename: path.join(__dirname, "data", "tasks.db"),
  autoload: true,
  timestampData: true, // auto-adds createdAt & updatedAt
});

module.exports = { tasks };