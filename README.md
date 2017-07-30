# NightPlus_ChatRobot
NIGHT+ | 带领年轻人探索新潮夜生活的互动体验平台

# Environment Setup

```
npm install
npm install -g typings
typings install

typings install dt~node --save --global
typings install dt~es6-shim --save --global
typings install dt~express --save 
typings install dt~serve-static --save 
typings install dt~express-serve-static-core --save 
typings install dt~mime --save 

```

# How to run

```
./node_modules/.bin/tsc
node src/index.js
```

# datebase schema

```
 userSchema = new Schema({
     name: String,
     region: String,
     info: {}
 })
```

```
 roomSchema = new Schema({
     name: String,
     region: String,
     userIds: []
 })
```

```
 msgSchema = new Schema({
     from: {
         userId: String
     },
     room: String,
     content: String
 })
```

```
 ruleSchema = new Schema({
     name: String,
     query: String,
     response: String
 })
```


