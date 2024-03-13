# HIM-autograder-web-app


## UPDATES FOR DB API WILL BE POSTED HERE
## DO NOT MODIFY THIS README FILE.

-------------  20240312 - API Update - abstracts

1) Now /abstracts route returns abstracts in the format agreed, array of objects containing objects themselves.
2) Repeated data was eliminated from records.
3) Null fields eliminated too, if teacher never filled it, the field won't be returned.
4) Parametrized query for abstracts, can combine them to refine query.
5) Added /user route to get teachers names (queries.js)
6) Added /students route to get students name (queries.js)
7) Alternative connection config object added for those having problem to connect using windows authentication (conn.js)

   I commented everywhere I judged necessary. Read and try first. If something doesn't work let me know.

API is a Work-in-Progress, so far:

-------------   06 march 2024
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
