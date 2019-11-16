# paint-donor

An app for getting rid of your scrap paint.  I plan to add an email redirection part where users can communicate through munged email addresses like craigslist.  Right now there is no authorization around adding paint.


## Prerequisites
1. Download https://www.mongodb.com/download-center/community 
2. Clone the repo
3. `cd` into it and run yarn
4. `cd` into the server folder and run yarn



## Tests
- Client-side tests: run `yarn test`
- Server-side tests cd server, and run `yarn test`
- E2E tests
    1. In the root run the app locally
    2. In a separate shell run `./node_modules/.bin/cypress open`
    3. Click a link under "integration tests"

## Run the app locally
1. `cd` to the root of the application and run `yarn dev`
2. Click "give away paint"  (don't miss the color picker, click the icon next to "pick color)
