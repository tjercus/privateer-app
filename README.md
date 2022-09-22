# Privateer App

Practise ground for react CRUD app with some common default components

## features

- two related and connected online slices which connect with a mocked REST back-end
  The slices are connected to the REST back-end with RTK-Query. They contain related data.
- Optimistic updates with rollback for better UX
- Visma UI look-and-feel
- Form validation with Zod
- i18n

## Run locally

Open two terminals and run respectively:

- npm run server
- npm start

This project was created with create-vite and has hot module reloading with fast refresh.
This means you can edit files and within 50 ms the relevant parts of you app will reload
in the browser while maintaining state.

## TODO

- EXPR: replace mocks-server with a static real express server?
- ui: http error handling in create and edit controller
- http: check incoming data for spaceships/planets with Zod

- add unit tests
- add Cypress tests
- ui: check html validity
- upgrade nc4 to vud (and fix icon buttons)
- put route strings in constants?
- storage model: add lastModifiedAt attributes for versioning
- WCAG 2.1 support
- ui: fix enter keyboard for cancel button

### nice to have

- domain model: check if a real domain can be implemented (real relationships)
- ui: use inline Visma form validation: https://ux.visma.com/weblibrary/latest/development/documentation/docs/validation.php
- ui: Add a required star next to form fields
- ui: add dirty check, and disable save button when formDataMap is clean
- ui: move from static button to animated one
- RBAC
- Zod: use Zod TypeScript types instead of own types
- Zod: perhaps use 'zorm' as Form lib to integrate better with Zod
- ui: try with generic table component as in the article below
- domain model: where to assemble the domain, on the app or the server?
- auto run the "import sorter plugin" for prettier?
- wrap validationResult in a ADT
- find out if the view layer can work with only Maybe's instead of nullable

### blocked by current react-nc4 version

- from input to NC4 Inputfield

## resources

- https://ux.visma.com/weblibrary/latest/development/documentation/docs/buttons.php
- https://www.robinwieruch.de/react-router-nested-routes/
- https://fernandoabolafio.medium.com/generic-table-component-with-react-and-typescript-d849ad9f4c48
- https://www.mocks-server.org/
- https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this?

### example domain

- http://privateer.sourceforge.net/downloads/privateer-1.03-manual.pdf
