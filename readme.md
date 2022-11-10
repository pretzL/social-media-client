# Workflow Course Assignment

[![Automated Unit Testing](https://github.com/pretzL/social-media-client/actions/workflows/unit-testing.yml/badge.svg?branch=main)](https://github.com/pretzL/social-media-client/actions/workflows/unit-testing.yml)
[![Automated E2E Testing](https://github.com/pretzL/social-media-client/actions/workflows/e2e-testing.yml/badge.svg?branch=main)](https://github.com/pretzL/social-media-client/actions/workflows/e2e-testing.yml)
[![Deploy static content to Pages](https://github.com/pretzL/social-media-client/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/pretzL/social-media-client/actions/workflows/pages.yml)

## Installation

Clone the repo and open in your IDE.
Initialize git
```
git init
```
Install dependencies
```
npm i
```
Build SASS
```
npm run build
```

## Tests

### Unit testing, Jest

Added the following test files;

- /auth/login.test.js
  - Tests successful login
  - Tests unsuccessful login
- /storage/localstorage.test.js
  - Test localStorage saving
  - Test logout function.
- /posts/create.test.js
  - Tests successful post creation
  - Tests bad request unsuccessful post creation

### End To End testing, Cypress

Added the following end to end test files for Cypress

- login.cy.js
  - Tests login with valid credentials
  - Tests login error handling with invalid email
  - Tests login error handling with invalid password length
  - Tests login error handling with invalid password
- logout.cy.js
  - Tests logout
- createPost.cy.js
  - Tests user can create a post
  - Tests form validates inputs on attempted submissions
  - Tests the handling for thrown errors

## Contributing

If you wish to contribute to this project, simply fork the repo and propose your changes in a pull request.
