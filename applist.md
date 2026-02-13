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

POST /requset/ignored/:userID
POST /request/accepted/:userID
POST /request/interested/:requestID
POST /request/rejected/:requestID

## user route

GET /feed
GET /user/cnnection
get /user/requests
