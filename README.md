# Privateer App

Practise ground for react CRUD app with some common default components

## TODO

- rename planets actions to events, past tense
- make the offline an online feature/slice
- where to assemble the domain, on the app or the server?
- make a less deep (more flat) directory structure?
- put route strings in constants?
- replace lastUrlSegment with router hook
- flesh out rest of the Spaceshipform
- implement dynamic planets select instead of hardcoded (iaw: create a SelectView component)
- tweak mock-routes to remove from server collection on delete etc.
- think about minimal ID length in Zod schema
- move spaceshipApi.ts to common/apiSlice.ts
- check incoming list of spaceships with Zod
- add lastModifiedAt attributes
- use Visma form validation: https://ux.visma.com/weblibrary/latest/development/documentation/docs/validation.php
- add Cypress tests
- from static button to animated one
- WCAG 2.1
- fix icon buttons
- upgrade nc4 to vud
- custom useBoolean hook when needed
- fix enter keyboard for cancel button
- i18n
- find out if the view layer can work with only Maybe's instead of nullable
- upgrade to create-vite
- import sorter plugin for prettier?

### nice to have

- try with generic table component as in the article below
- RBAC

### blocked by current react-nc4 version

- from input to NC4 Inputfield

## resources

- https://ux.visma.com/weblibrary/latest/development/documentation/docs/buttons.php
- https://www.robinwieruch.de/react-router-nested-routes/
- https://fernandoabolafio.medium.com/generic-table-component-with-react-and-typescript-d849ad9f4c48
- https://www.mocks-server.org/

### example domain

- http://privateer.sourceforge.net/downloads/privateer-1.03-manual.pdf
