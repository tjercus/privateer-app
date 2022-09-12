const FSDB = require("file-system-db");
const spaceships = require("./fixtures/spaceship-data").spaceships;
const planets = require("./fixtures/planet-data").planets;

const db = new FSDB("./database/privateer.json", false);

/* store fixtures in the database */
db.set("spaceships", spaceships);
db.set("planets", planets);

module.exports = db;
