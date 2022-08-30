// For a detailed explanation about using middlewares, visit:
// https://mocks-server.org/docs/usage/variants/middlewares

module.exports = [
  {
    id: "add-headers", //route id
    url: "*", // url in express format
    method: ["GET", "POST", "PUT", "PATCH"], // HTTP methods
    variants: [
      {
        id: "enabled", // variant id
        handler: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (_req, res, next, core) => {
            res.set("Access-Control-Allow-Origin", "*");
            core.logger.info("Custom header added by route variant middleware");
            next();
          },
        },
      },
      {
        id: "disabled", // variant id
        disabled: true,
      },
    ],
  },
];
