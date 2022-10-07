# Privateer App

Practise ground for a React app with some common default components.

Can be used:
- as a reference to see how different libraries integrate
- as a starting point for a new React project
- to see how some common design patterns can be used
- to see how it works out if a certain directory structure is applied

## Disclaimer

This project was not meant to put in production as-is. 
Some features are not implemented to completeness but to demonstrate a certain concept.
You have the responsibility to implement and test a robust security strategy before putting things online.
You also have the responsibility to test, find bugs and fix them before putting things online.

## features

- Two related and connected online "slices" (Redux modules or "customer features") which connect 
  with a mocked HTTP API back-end.
  The slices are connected to the HTTP API back-end with RTK-Query. They contain related data.
- Optimistic updates with rollback for better UX
- Visma UI look-and-feel
- Form validation with Zod
- Custom middleware to sanitize incoming data with Zod
- i18n

## Run locally

We recommend installing node using NVM (Node Version Manager).

Open two terminals and run respectively:

- npm run server
- npm start

This project was created with create-vite and has hot module reloading with fast refresh.
This means you can edit files and within ~50 ms the relevant parts of you app will reload
in the browser while maintaining state.

## TODO

- ux: more WCAG 2.1 support
- ui: upgrade nc4 to vud (and fix icon buttons)
- storage model: add lastModifiedAt attributes for versioning
- ui: fix enter keyboard for cancel button

### nice to have

- expr: replace mocks-server with a static real express server?
- expr: try tRPC client/server
- expr: legend-state instead of Redux
- expr: perhaps use 'zorm' as Form lib to leverage Zod even more
- RBAC (role based access control)
- i18n: can and should bundles be split by package/feature?
- domain model: check if a more real domain can be implemented (real relationships)
- ui: add dirty check, and disable save button when formDataMap is clean
- ui: move from static button to animated one
- put route strings in constants?
- Zod: use Zod TypeScript types instead of own types
- ui: try with generic table component as in the article below
- code: auto run the "import sorter plugin" for prettier?
- code: wrap validation result in a Result/Either type
- ui: find out if the view layer can work with only Maybe's instead of nullable

### blocked by current react-nc4 version

- from input to NC4 Inputfield

## resources

- https://ux.visma.com/weblibrary/latest/development/documentation/docs/buttons.php
- https://www.robinwieruch.de/react-router-nested-routes/
- https://fernandoabolafio.medium.com/generic-table-component-with-react-and-typescript-d849ad9f4c48
- https://www.mocks-server.org/
- https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this?
- https://antman-does-software.com/functional-domain-driven-design-simplified

### example domain

- http://privateer.sourceforge.net/downloads/privateer-1.03-manual.pdf
