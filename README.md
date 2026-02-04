
# Helpdesk Spring boot API + Angular frontend

<br>

## Preview
<placeholder>

<br>

## Introduction
This is a rewrite of my first project using these technologies

The goal was to mainly learn Spring security, JWT, authentication and authorization with them

while slowly progressing the features as i learn and try more, both in Spring and Angular


<br>

## Review
At the time of writing this, the application passes having the main requirements of:
- login, register and authentication
- jwt authorization with roles in the backend
- the main API endpoints for managing auth, users and tickets
- frontend enabling login, register, visualizing and managing tickets

Still not complete and many areas will be improved

I would love to get feedback from more experienced web developers, feel free

### Todo
- Overall:
  - [x] Working application with basic/core features
  - [ ] Finalize the core of the database schema. It's currently very simple cuz i was experimenting and still learning the technologies used 
  - [ ] Securing as much as possible in both ends
  - [ ] Reach a state that can qualify as production ready
  
- Spring boot backend:
  - [x] Spring security setup with manual JWT token management and JWT authorization
  - [ ] Validation everywhere: leave no endpoints/data without validation
  - [ ] Upgrade current security setup with an Oauth2 setup

- Angular frontend: 
  - [ ] Implement the rest of the features/pages
    - [ ] User profile/settings page: edit user information, password reset, account deletion, etc..
    - [ ] Dashboard
  - [ ] Better responsiveness in the UI
  - [ ] Use cookies instead of localStorage (vulnerable to XSS)

<br>

Not to mention fixing common bugs and correctly handling illegal actions that users can do currently..

The goals of this list will probably change as all todo lists do the more you advance in skills

<br>

## Requirements
- Java 17
- Maven > 3.8?
- Angular 21 CLI
