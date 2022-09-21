# Privateer App

Practise ground for react CRUD app with some common default components

## features

- two related and connected online slices which connect with a mocked REST back-end
  The slices are connected to the REST back-end with RTK-Query. They contain related data
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

- server: find out why the server is not hitting the db enough
- server: extract persistence logic from controller
- http-layer: optimistic updates on all mutating apiSlice functions
- ui: add dirty check
- add unit tests
- add Cypress tests
- ui: check html validity
- upgrade nc4 to vud (and fix icon buttons)
- put route strings in constants?
- replace lastUrlSegment with router hook
- check incoming data for spaceships/planets with Zod
- add lastModifiedAt attributes for versioning
- move from static button to animated one
- WCAG 2.1 support
- custom useBoolean hook when needed
- fix enter keyboard for cancel button
- use next() in mock-server express middleware
- make a custom hook for handling form input updates

### nice to have

- use inline Visma form validation: https://ux.visma.com/weblibrary/latest/development/documentation/docs/validation.php
- Add a required star next to form fields
- wrap validationResult in a ADT
- Zod: use Zod TypeScript types instead of own types
- Zod: perhaps use 'zorm' as Form lib to integrate better with Zod
- try with generic table component as in the article below
- RBAC
- where to assemble the domain, on the app or the server?
- auto run the "import sorter plugin" for prettier?
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
