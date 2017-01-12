[![Stories in Ready](https://badge.waffle.io/digithun/clogii-mobile.png?label=ready&title=Ready)](https://waffle.io/digithun/clogii-mobile)
# Clogii

## Requirements

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
  - Xcode 8.1 +
2. [CocoaPods](http://cocoapods.org) (only for iOS)
  - Version 1.0+ recommended (`gem install cocoapods --pre`)
3. [Docker](https://www.docker.com)
4. [Docker Compose](https://docs.docker.com/compose/)

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

3. **Start Parse/GraphQL servers:**

  ```
  $ npm run dev
  ```

  Make sure everything works by visiting:

  * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
  * Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D)

  <img src=".github/screenshot-server@2x.png" width="800">


4. **Running on Android**:

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
  $ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server
  ```


5. **Running on iOS:**

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
