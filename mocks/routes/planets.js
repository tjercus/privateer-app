// For a detailed explanation regarding each route property, visit:
// https://mocks-server.org/docs/usage/routes
const { byId, byNotId } = require("../utils");
const db = require("../db");

module.exports = [
  {
    id: "get-planets", // route id
    url: "/api/planets", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant type
        options: {
          middleware: (_req, res) => {
            res.status(200);
            res.send(db.get("planets"));
          },
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
    id: "get-planet", // route id
    url: "/api/planets/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const planetId = req.params.id;
            const planets = db.get("planets");
            const planet = planets.find(byId(planetId));
            if (planet) {
              res.status(200);
              res.send(planet);
            } else {
              res.status(404);
              res.send({
                message: "planet not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "put-planet", // id of the route
    url: "/api/planets/:id", // url in path-to-regexp format
    method: ["PATCH", "PUT"],
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const planet = req.body;
            const planets = db.get("planets");
            const storageIndex = planets.findIndex(byId(req.params.id));
            if (storageIndex > -1) {
              planets[storageIndex] = planet;
              res.status(200);
              res.send(planet);
            } else {
              res.status(404);
              res.send({
                message: "planet not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "post-planet", // id of the route
    url: "/api/planets/", // url in path-to-regexp format
    method: ["POST"],
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant type
        options: {
          middleware: (req, res) => {
            const planet = req.body;
            const planets = db.get("planets");
            planets.push(planet);
            res.status(201);
            res.send(planet);
          },
        },
      },
    ],
  },
  {
    id: "delete-planet", // id of the route
    url: "/api/planets/:id", // url in path-to-regexp format
    method: ["DELETE"],
    variants: [
      {
        id: "success", // id of the variant
        type: "middleware", // variant type
        options: {
          middleware: (req, res) => {
            const planets = db.get("planets");
            db.set("planets", planets.filter(byNotId(req.params.id)));
            res.status(201);
          },
        },
      },
    ],
  },
];
