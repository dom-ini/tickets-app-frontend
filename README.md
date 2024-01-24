# Tickts
## Project description

Tickts in an app for reserving tickets for various events. 

Users can download their tickets in a form of QR codes. 

Administrators can add content (events, ticket categories, speakers etc.) through a dedicated panel.

## Links
### Project website
https://tickets-app-frontend.vercel.app/

### Back-end repository
https://github.com/dom-ini/tickets-app-backend/

## Tech stack
- TypeScript
- NextJS 13

## Getting started
First, run the API from the [back-end repository](https://github.com/dom-ini/tickets-app-backend/).

In the project directory, create *.env* file and add the required values (you can see *.env.example* file for reference).

Run `yarn dev` to run the development server.

Open http://localhost:3000/ in your browser and see the results.

To run tests, run `npx cypress open`.
