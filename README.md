# HIM-autograder-web-app


## UPDATES FOR DB API WILL BE POSTED HERE

API is a Work in Progress, so far:

06 march 2024
Right now you can use it to get a very basic login process withouth password validation.
working on validating hashed passwords and use cookies to handle sessions.
to use it:
- install sql server developer version.
- mount slcv3 db provided by client
- run usercred.sql script to create DEVELOPMENT_USERCRED db, we'll use this one to store
user passwords and validate their login to App.
To test it, I added a /login route to frontend app and a plain text landing page to be redirected
after successful logins.

## DO NOT MODIFY THIS README FILE.
