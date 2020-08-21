# Product Gallery

> A micro-service that includes a carousel of all medias (videos and images). This service has a main media viewer that will render the current selected media. It also includes a fully functional carousel that will go through all medias in 'rotation,' meaning that when you've reached the last media of the product, it will start over to the first one regardless of which direction you are scrolling through (left or right arrows). It can also render the media when clicked by thumbnails (without clicking on arrows but the thumbnailes directly). This service uses React and Styled-Components for front end.

>This service includes API endpoints that will allow other services to grab medias related to the given product ID. The technologies used for the back end are NodeJS with Express for server, MongoDB for database and Mongoose for the ORM.

>All medias are hosted from Cloudinary for faster loading times and to minimize the workload from backend as this service will serve multitudes of requests from other services.

>Services that uses my service's API are linked below

## Related Projects

  - https://github.com/KichiUeda/price_and_promotion
  - https://github.com/KichiUeda/other_popular_games
  - https://github.com/KichiUeda/Chris-app-service-traits
  - https://github.com/KichiUeda/Rane-app-description-service
  - https://github.com/KichiUeda/Micko-proxy (my proxy)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

***IMPORTANT***
Make sure to have env variables ready!
> run `npm install`

> run `npm run seed`

> run `npm run build`

> run `npm start`

 ***Include the following in your proxy html***
  - `<div id='images'></div>`
  - `<div id='carousel'></div>`

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

- This service uses React, Styled-Components, MongoDB, Mongoose, NodeJS, Express as the main frameworks. As well as using Cloudinary as the cloud service to host all medias.

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

