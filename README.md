# Hand Washer App

This Android and iOS app allows people to get reminded every 2 hours when on shift to wash their hands.

It also gives helpful advice and a timer to make sure users are washing their hands properly.

## Setup

After cloning the project, run `npm install` in the root directory.

To start the metro server, run `npm start`.

If you're building for iOS, run `pod install` in the `ios/` directory, then run `npm run ios` to compile and run the app.

If you're building for Android, run `npm run android` to compile and run the app.

## Running tests

To make sure everything still works as intended when making changes, this project utilizes unit and snapshot testing.

To run these tests, run `npm test` on your terminal.

To verify the coverage, run `npm test -- --coverage` and open `test-coverage/lcov-report/index.html` in your browser.  
