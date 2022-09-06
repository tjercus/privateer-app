# Privateer App

Practise ground for react CRUD app with some common default components

## TODO

- use Visma form validation: https://ux.visma.com/weblibrary/latest/development/documentation/docs/validation.php
- tweak mock-routes to remove from server collection on delete etc.
- upgrade to create-vite
- i18n
- upgrade nc4 to vud (and fix icon buttons)
- add Cypress tests
- check html validity

- extract EnumSelect jsx fn
- extract Select React component
- Ramda cond for view loading
- put route strings in constants?
- replace lastUrlSegment with router hook
- check incoming list of spaceships with Zod
- add lastModifiedAt attributes
- from static button to animated one
- WCAG 2.1
- custom useBoolean hook when needed
- fix enter keyboard for cancel button

### nice to have

- try with generic table component as in the article below
- RBAC
- where to assemble the domain, on the app or the server?
- import sorter plugin for prettier?
- find out if the view layer can work with only Maybe's instead of nullable

### blocked by current react-nc4 version

- from input to NC4 Inputfield

## resources

- https://ux.visma.com/weblibrary/latest/development/documentation/docs/buttons.php
- https://www.robinwieruch.de/react-router-nested-routes/
- https://fernandoabolafio.medium.com/generic-table-component-with-react-and-typescript-d849ad9f4c48
- https://www.mocks-server.org/

### example domain

- http://privateer.sourceforge.net/downloads/privateer-1.03-manual.pdf
