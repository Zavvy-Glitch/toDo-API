# toDo-API
Current Version: 1.0.0

- Backend application in the works for toDo.
- See: [toDo APP here](https://github.com/Zavvy-Glitch/todo)

## Needs:
  - To Have CRUD functionality
    - CREATES a toDo item
    - READS a toDo item/'s
    - UPDATES a toDo item
    - DELETES a toDo item

  - ACL filtering dependent upon type of user
  - Bearer Auth to verify a user has the proper capabilities according to ACL
  - Basic Auth to verify a user is who they say they are
  - Storage of two models users / toDo items

# Testing:
  - Should assert that CRUD functions are working properly
  - Should assert that BASIC/BEARER middleware is working as intended
  - Should assert that a user can Login/Logout
  - Should assert database Models are taking proper data
