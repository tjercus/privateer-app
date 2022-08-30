// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

const spaceships = [
  {
    armour: 2,
    id: "abc-123-def",
    landedOn: "Tatooine",
    name: "Millennium Falcon",
    type: "Demon",
    weapons: ["Neutron Gun", "Meson Blaster"],
  },
  {
    armour: 5,
    id: "891-blk-356",
    landedOn: "Kamino",
    name: "Old Ship",
    type: "Orion",
    weapons: ["Laser", "Tachyon Cannon"],
  },
];

const allSpaceships = [
  ...spaceships,
  {
    armour: 4,
    id: "dfghkj95-76fgjh",
    landedOn: "Kamino",
    name: "Old Ship",
    type: "Broadsword",
    weapons: ["Laser", "Mass Driver"],
  },
];

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
        id: "all", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: allSpaceships, // body to send
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
          status: 200, // status to send
          body: spaceships[0], // body to send
        },
      },
      {
        id: "891-blk-356", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: allSpaceships[2], // body to send
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const spaceshipId = req.params.id;
            const user = spaceships.find(
              (spaceshipsData) => spaceshipsData.id === Number(spaceshipId)
            );
            if (user) {
              res.status(200);
              res.send(user);
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
];
