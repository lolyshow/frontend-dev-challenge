
# Solution to Frontend Code Challenge 



How to start the project:
* Copy .env.exampel into .env
* Run `yarn db:reset`, `npm run db:reset` or `pnpm db:reset`
* Start the project with `yarn dev`, `npm run dev` or `pnpm dev`

The Swagger documentation for the Mock API for this solution is available at:
[http://localhost:3000/api-doc](http://localhost:3000/api-doc)


During the assessment, I made some enhancements and modifications to the project. Here's a brief overview:

- Integrated the `react-hook-form` library to streamline form input handling, ensuring a smoother user experience.
- Utilized `cmdk` in conjunction with `ui.shadcn` to enhance dropdown selection functionality, offering users a searchable field and improving usability.
- Abstracted the `getVoyage` function as a custom hook to improve code organization and facilitate potential future reusability across components or pages.
- Added `JSON.parse(req.body)` to the API responsible for creating voyages. This was necessary to address an error encountered while processing requests, ensuring proper parsing of request data.


# Implemetation Brief

## Task 1 - Create New Voyage:

Implemented a "Create" button at the top left of the list of mock voyages.
Configured the button to open a sheet with a form for creating a voyage inside.
Implemented form validations:
-All fields are required.
-Departure date and time should be before arrival date and time.
Implemented logic to refresh the list of voyages once a voyage has been successfully created.
Displayed a toast with a success message upon successful creation of a voyage.
## Task 2 - Introduce UnitType Relation to Voyage:

Enabled adding at least 5 UnitTypes to a voyage.
Ensured selection of a minimum of 5 UnitTypes.

## Task 3 - Modify the List:

Added a "unittypes" column to the voyages table.
Displayed unit type count for each voyage.
Implemented functionality to open a PopOver showing selected UnitTypes upon clicking on the unit type count.
PopOver includes:
-Name
-Default length

## Task 4 - Handling Voyage Deletion Error:

Implemented error handling to inform the user when deleting a voyage fails.
Displayed a toast with the appropriate error message upon deletion failure.