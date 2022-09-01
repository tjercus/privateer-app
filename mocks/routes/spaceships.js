// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

const spaceships  = require("../fixtures/spaceship-data").spaceships;

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
          body: spaceships, // body to send
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
        type: "json", // variant handler id
        options: {
          status: 200,
          body: spaceships[0], // note that the :id is not used
        },
      },
      {
        id: "891-blk-356", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: spaceships[2], // body to send
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const spaceshipId = req.params.id;
            const spaceship = spaceships.find(
              (spaceshipsData) => spaceshipsData.id === spaceshipId
            );
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
        type: "status", // variant type
        options: {
          status: 200,
        }
      },
    ]
  },
  {
    id: "post-spaceship", // id of the route
    url: "/api/spaceships/", // url in path-to-regexp format
    method: ["POST"],
    variants: [
      {
        id: "success", // id of the variant
        type: "status", // variant type
        options: {
          status: 201,
        }
      },
    ]
  },
  {
    id: "delete-spaceship", // id of the route
    url: "/api/spaceships/:id", // url in path-to-regexp format
    method: ["DELETE"],
    variants: [
      {
        id: "success", // id of the variant
        type: "status", // variant type
        options: {
          status: 200,
        }
      },
    ]
  },
];
