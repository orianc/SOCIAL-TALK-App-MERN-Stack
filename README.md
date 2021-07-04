# Social Talk Project

This is a `SPA application` project build with a full JS environnement. Server build on Node.js with **Express.js**, client front powered with **React.js** and **Material.js** library, completely `builded for mobile devise`. Database cloud on **MongoDB Atlas**.

## Please, put your` browser in mobile size to get the right experience.`

Social network with different essential functionality builded from scratch.

## Actual state

- Create account
- Login
- Profile editing
- Add profile picture
- Write a post
- Write a comment

Take a look on this gif demo :

<img src="demo-socialtalk.gif" alt="demogif" height="500"/>

## Next update in progress :

Follow and comment the project and tasks achievement on https://trello.com/b/YY6E8afN.
**When the `react build` will be valid, only server bash will be required and it's will be wrapped in a cordova application.**

## Current issue :

_Currently stuck on react build deployment. React router doesn't work in prod._

- [1. Install](#1-install)
  - [1.1. Client](#11-client)
  - [1.2. Server](#12-server)

# 1. Install

## 1.1. Client

From bash `socialtalk-complete` :

```bash
cd client
npm i
npm start
```

**If react-script error :**

```bash
npm install react-scripts --save
```

## 1.2. Server

open a a new bash in `socialtalk-complete` and run :

```bash
cd server
npm i
npm start
```

After install complete and working you can run the project from original path `socialtalk-complete` with :

in one bash

```bash
npm run start-client
```

in a second bash

```bash
npm run start-client
```

**When the `react build` will be valid, only server bash will be required and it's will be wrapped in a cordova application.**
