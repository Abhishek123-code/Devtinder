# devtinder API

## Auth route

POST /signup
POST /login
POST /logout

## profile route

GET /profile
PATCH /profile/edit
PATCH /profile/password
DELETE /profile

## connection Requset route

POST /requset/send/:status/:userID

POST /request/review/:status/:requestID

## user route

GET /feed
GET /user/connection
get /user/requests
