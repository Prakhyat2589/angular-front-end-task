The Psychometrics Centre - Front end developer task
---------------------------------------------------

Purpose
========

This task is typical of the kind of work that a front-end developer might need to do at the Psychometrics Centre. We will take your performance on this task into consideration as part of your application. There is no time limit but we expect that this task could be done in under a day.

Overview
========
In this repository there is a service that deals with basic operations on users. 
The goal is to design and implement a front-end app using the latest version of [Angular](https://angular.io/)

The requirements of the app are:

- allow browsing the list of users with pagination
- allow adding a new user
- allow deleting an user

Steps to follow
===============

1. On your computer create a local git repository with the code provided for this task. Do initial commit of this code. All your further commits should go to this local repository.

2. Run the service:
        
        cd ./service
        npm i
        npm run build
        npm start
        
3. Once started the service listens for requests on http://localhost:8080 and expects and returns `application/json` content type from 
its methods, which are:

    - `GET http://localhost:8080/users`
    To get [Users](./service/src/user/user.ts). This method supports the following optional query parameters:
        
        * page - page number
        * size - how many users per page
        * sort - comma separated sorting field and direction, e.g. id,desc or firstName,asc  

    - `POST http://localhost:8080/users`
    To create a new user. Expects [User](./service/src/user/user.ts) object in a request body.
        
    - `PUT http://localhost:8080/users/{userId}`
    To update a user, expects [User](./service/src/user/user.ts) object in a request body, returns updated User.        
        
    - `DELETE http://localhost:8080/users/{userId}`
    To delete a user, returns nothing.

4. Create your angular app in `./website` directory in the project 

5. After you are done publish the repository to GitHub and send us the link, or make a zip of your whole local repository (including .git folder for commit history) and send it to us.

6. You can report issues/questions on https://github.com/campsych/frontend-dev-task/issues

Evaluation criteria
===================

1. General
    - Application builds
    - Application fulfills (or surpasses) the requirements
    - Application passes lint checks
    - There are unit (karma) and e2e (protractor) tests in place, which actually test things and are passing

2. Use of Angular/TypeScript
    - [Style guide](https://angular.io/guide/styleguide) was followed and the code passes linting
    - Services are used for all not explicitly view-related logic
    - Things are named in a way that makes sense
    - Code adheres to [single responsibility principle](https://en.wikipedia.org/wiki/SOLID).
    - Forms are validated client-side
    - Rxjs is used correctly and no unnecessary requests are made to the backend
    - User module is used to group user-related things and is lazily loaded in the app (for future extensibility)
    - Application stores state in the url (e.g. to allow bookmarking specific users, page in the list, etc.)
    - Application handles errors well - broken connectivity to the service, unexpected errors coming from the service, 
    wrong user-typed urls etc.
   - Application updates page metadata (title and description) when performing actions

3. Use of HTML5
    - Conforms to HTML5 spec w/o using deprecated tags/attributes 
    - There are no unnecessary tags and nesting is not too deep
    - Is semantic and does not contain presentation elements
    - Is accessible (e.g. screen reader friendly)
    
4. Use of SCSS
    - There are no unnecessary rules and selectors
    - Selector names are semantic or just make common sense
    - No vendor prefixes, no [BEM](http://getbem.com/)   
    - Variables and other SCSS features used where needed
    
5. Use of GIT
    - Commits are descriptive of actual changes made
    - Commits are sufficiently granulated
    - Commit history makes common sense
    - There are no unneeded files committed - IDE files, system files, generated artifacts from build process
    
If you have indicated on your application that you have less prior experience with Angular and Material then we will take this into account. There are also plenty of tutorials and example code online which could help with learning or catching up. 
In the end we are looking to evaluate your programming skills and your ability to deliver a working solution. 

Disclaimer
==========
The user database that comes with the service is randomly generated and doesn't contain any personally identifiable information.
