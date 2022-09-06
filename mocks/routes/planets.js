// For a detailed explanation regarding each route property, visit:
// https://mocks-server.org/docs/usage/routes

const planets = require("../fixtures/planet-data").planets;

module.exports = [
  {
    id: "get-planets", // route id
    url: "/api/planets", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: planets, // body to send
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
            const planet = planets.find(
              (planetsData) => planetsData.id === planetId
            );
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
            if (planet.id) {
              const storageIndex = planets.findIndex(
                (sp) => sp.id === req.params.id
              );
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
        type: "status", // variant type
        options: {
          status: 201,
        }, // Express middleware to execute
        middleware: (req, res) => {
          const planet = req.body;
          planets.push(planet);
          res.status(201);
          res.send(planet);
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
        type: "status", // variant type
        options: {
          status: 200,
        },
      },
    ],
  },
];
