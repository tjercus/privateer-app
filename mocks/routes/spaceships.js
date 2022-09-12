// For a detailed explanation regarding each route property, visit:
// https://mocks-server.org/docs/usage/routes
const { byId, byNotId } = require("../utils");
const db = require("../db");

module.exports = [
  {
    id: "get-spaceships", // route id
    url: "/api/spaceships", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: db.get("spaceships"), // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-spaceship", // route id
    url: "/api/spaceships/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const spaceshipId = req.params.id;
            const spaceships = db.get("spaceships");
            const spaceship = spaceships.find(byId(spaceshipId));
            if (spaceship) {
              res.status(200);
              res.send(spaceship);
            } else {
              res.status(404);
              res.send({
                message: "spaceship not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "put-spaceship", // id of the route
    url: "/api/spaceships/:id", // url in path-to-regexp format
    method: ["PATCH", "PUT"],
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const spaceship = req.body;
            const spaceships = db.get("spaceships");
            const storageIndex = spaceships.findIndex(byId(req.params.id));
            if (storageIndex > -1) {
              spaceships[storageIndex] = spaceship;
              db.set("spaceships", spaceships);
              res.status(200);
              res.send(spaceship);
            } else {
              res.status(404);
              res.send({
                message: "spaceship not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "post-spaceship", // id of the route
    url: "/api/spaceships/", // url in path-to-regexp format
    method: ["POST"],
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant type
        options: {
          middleware: (req, res) => {
            const spaceship = req.body;
            db.push("spaceships", spaceship);
            res.status(201);
            res.send(spaceship);
          },
        },
      },
    ],
  },
  {
    id: "delete-spaceship", // id of the route
    url: "/api/spaceships/:id", // url in path-to-regexp format
    method: ["DELETE"],
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant type
        options: {
          middleware: (req, res) => {
            const spaceships = db.get("spaceships");
            db.set("spaceships", spaceships.filter(byNotId(req.params.id)));
            res.status(201);
          },
        },
      },
    ],
  },
];
