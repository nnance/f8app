[![Stories in Ready](https://badge.waffle.io/digithun/clogii-mobile.png?label=ready&title=Ready)](https://waffle.io/digithun/clogii-mobile)
# Clogii

<img src=".github/screenshot-app@2x.png" width="800">

## Requirements

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
  - Xcode 8.1 +
2. [CocoaPods](http://cocoapods.org) (only for iOS)
  - Version 1.0+ recommended (`gem install cocoapods --pre`)
3. [MongoDB](https://www.mongodb.org/downloads) (needed to run Parse Server locally)

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/digithun/clogii-mobile.git
  $ cd clogii-mobile
  ```

2. **Install dependencies** (npm v3+):

  ```
  $ npm install
  $ (cd ios; pod install)        # only for iOS version
  ```

3. **Make sure MongoDB is running:**

  ```
  $ lsof -iTCP:27017 -sTCP:LISTEN
  ```

  NOTE: if installed with [Homebrew](http://brew.sh/) run `brew info mongo` and
  check out the Caveats section.

4. **Setup Environment:**
  
  1. copy file .env.exmaple to a .env
  2. edit .env with your configuration

5. **Start Parse/GraphQL servers:**

  ```
  $ npm start
  ```

6. **Import sample data** (the local Parse Server should be running):

  ```
  $ npm run import-data
  ```

  Make sure everything works by visiting:

  * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
  * Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D)

  <img src=".github/screenshot-server@2x.png" width="800">


6. **Running on Android**:

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
  $ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server
  ```


7. **Running on iOS:**

  ```
  $ react-native run-ios
  ```

## Troubleshooting
* Could not connect to development server
  > In a separate terminal window run:
  ```
  $ react-native start
  ```
* Alert invalid session token
  >  Delete the app from the simulator or your phone, then rebuild and re-run the app. Sometimes an old token gets cached.
