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
  
4. **Generage Mock Data**

  ```
  $ npm run clean-db
  $ npm run gen-mock
  ```

  Make sure everything works by visiting:

  * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
  * Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080)


5. **Running on Android**:

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
  $ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server
  ```


6. **Running on iOS:**

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
