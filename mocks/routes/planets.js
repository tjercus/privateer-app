// For a detailed explanation regarding each routes property, visit:
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
        type: "json", // variant handler id
        options: {
          status: 200,
          body: planets[0], // note that the :id is not used
        },
      },
      {
        id: "b080187c-ec6a-48b8-88fd-1cf8b80a92b7", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: planets[2], // body to send
        },
      },
      {
        id: "real", // variant id
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
