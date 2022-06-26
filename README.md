# Sugar Rush Mania: Rails and React Heroku App

This app uses a Rails API and React frontend that can be deployed to a single
domain. For ease of deployment, both projects are contained in the same
repository. All React code is in the `/client` directory during development.

When the application is deployed, the production version of the React application
will be generated on the server and placed in the `public` directory of the Rails
application, where we can use Rails to serve it.

## Setup

