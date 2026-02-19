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

NOTES:

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

/feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)\*limit;
