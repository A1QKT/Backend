## What is in this repository
* Rest API
* GraphQl API
* Hygen generating template
* Jest testing
* Login by Firebase
* Authorize by access token
## How to use this repository
To login by firebase you should create .env file in root folder
In .env file:
FIREBASE_SERVICE_ACCOUNT=<your firebase-service-account>
Some query in graphql is authorized by access token. First you should login by Firebase, then call the API loginByFireBase to get the jwt token, put it in the x-token in header to have authorization.
## Autoloader
Rest API and graphQL are auto loaded by autoloader when you put it in subfolder of modules folder with the extension
* .graphql.ts, .schema.ts, .resolvers.ts for graphQL
* .router.ts for RestFull API