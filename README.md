# Privateer App

Practise ground for react CRUD app with some common default components

## TODO

- i18n
- tweak mock-routes to remove from server collection on delete etc. (in-memory db?)

- upgrade to create-vite
- upgrade nc4 to vud (and fix icon buttons)
- add unit tests
- add Cypress tests
- check html validity

- Ramda cond for view loading
- put route strings in constants?
- replace lastUrlSegment with router hook
- check incoming data for spaceships/planets with Zod
- add lastModifiedAt attributes for versioning
- move from static button to animated one
- WCAG 2.1 support
- custom useBoolean hook when needed
- fix enter keyboard for cancel button

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
