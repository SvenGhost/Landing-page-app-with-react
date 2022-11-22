# landing-page-app
React landing page for DHIS2 instances

## Setup

```
$ yarn install
```

## Development

Start development server:

```
$ yarn start
```

## Build

```
$ yarn build-webapp
```

## i18n

### Update an existing language

```
$ yarn update-po
# ... add/edit translations in po files ...
$ yarn localize
```

### Create a new language

```
$ cp i18n/en.pot i18n/es.po
# ... add translations to i18n/es.po ...
$ yarn localize
```
