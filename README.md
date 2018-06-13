# Elm-Typescript-Electron boilerplate

to run app
```
npm build
npm start
```

**development with webpack**
mainプロセス側はmac環境でelectronをkillする方法を実装するまでreloadできない

renderer側webpack-dev-serverの起動
```
npm run dev-server
```

electronの起動
```
npm build && npm run start-with-wds # wds -> webpack-dev-server
```
