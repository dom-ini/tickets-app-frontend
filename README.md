# Tickts

## Project description

Tickts is an app for reserving tickets for various events.

Users can download their tickets in a form of QR codes.

Administrators can add content (events, ticket categories, speakers etc.) through a dedicated panel.

## Links

### Project website

https://tickets-app-frontend.vercel.app/

### Back-end repository

https://github.com/dom-ini/tickets-app-backend/

### Tickets decoding mobile app

https://github.com/dom-ini/tickets-app-decoder/

## Tech stack

- TypeScript
- NextJS 13

## Getting started

First, run the API from the [back-end repository](https://github.com/dom-ini/tickets-app-backend/). You can use demo API (url is given in .env.example file), but the **API is deployed on a free tier and it may take some time to boot the instance**.

In the project directory, create _.env_ file and add the required values (you can see _.env.example_ file for reference).

Run `yarn dev` to run the development server.

Open http://localhost:3000/ in your browser and see the results.

To run tests, run `npx cypress open`.
