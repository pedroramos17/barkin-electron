# Barkin Desktop

A parking management system

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/pedroramos17/barkin-electron.git
cd barkin-electron
npm install
```

## Starting Development

To configure the [Barkin API](https://github.com/pedroramos17/barkin-laravel-api) or with your API URL change the `./src/config/api.ts` file.

Start the app in the dev environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```
