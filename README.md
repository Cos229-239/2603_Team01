# 2603 Team01

Teaching repo for Team 01. The current repository layout contains one app at the root: a React Native mobile application.

## Repo Layout

- Root app: React Native project used for the main mobile app
- `Documents/`: team guides, Git instructions, and reference material

## Working In This Repo

Use the root of the repo for app development:

```sh
npm install
npm start
npm run android
npm run ios
```

Main app code lives in:

- `App.tsx`
- `src/`
- `android/`
- `ios/`

## Prerequisites

Before running the app, install these dependencies:

- Node.js 22 or newer
- npm
- Java 17 for Android builds
- Android Studio
- Android SDK and an emulator
- Android platform-tools / `adb`

For iOS development on macOS only:

- Xcode
- CocoaPods

## macOS Setup

Recommended tools:

- `nvm` for managing Node versions
- Temurin Java 17
- Homebrew

Typical setup flow:

1. Install Homebrew if it is not already installed.
2. Install `nvm`.
3. Install and use Node 22.
4. Install Java 17.
5. Install Android Studio.
6. Install Android platform-tools so `adb` is available.
7. Create and start an Android emulator in Android Studio.
8. For iOS, install full Xcode, select it with `xcode-select`, and install CocoaPods.

## Windows Setup

Recommended tools:

- PowerShell
- `nvm-windows` for managing Node versions
- Java 17
- Android Studio

Typical setup flow:

1. Install `nvm-windows`.
2. Install and use Node 22.
3. Install Java 17.
4. Install Android Studio.
5. Install the Android SDK and platform-tools.
6. Make sure the Android SDK and `adb` are available on your `PATH`.
7. Create and start an Android emulator in Android Studio.

## Running The App

### Android

1. Start an Android emulator.
2. Open a terminal in the repo root.
3. Make sure Java 17 is active.
4. Make sure Node 22 is active.
5. Start the Metro dev server.
6. Open a second terminal in the repo root.
7. Make sure Java 17 is active there too.
8. Make sure Node 22 is active there too.
9. Run the Android app build/install step.

### iOS

1. Install full Xcode.
2. Make sure Xcode is selected as the active developer directory.
3. Install CocoaPods.
4. Install iOS pods in the `ios/` directory.
5. Open a terminal in the repo root.
6. Make sure Node 22 is active.
7. Start the Metro dev server.
8. Open a second terminal in the repo root.
9. Run the iOS app build/install step.

## Common Issues

- Port `8081` already in use:
  Metro is probably already running. Reuse the existing Metro process or stop it before starting a new one.
- Android `gradlew` permission error:
  The Gradle wrapper may need execute permission on macOS.
- Android build fails with unsupported Java version:
  Make sure Java 17 is active before building.
- Android Gradle build runs out of memory:
  Increase Gradle JVM memory settings if needed.
- iOS tools like `xcodebuild` or `simctl` are missing:
  Full Xcode is not installed or not selected yet.
- `adb` is missing:
  Android platform-tools are not installed or not on your `PATH`.
- `npm run android` cannot start Metro automatically:
  Start Metro manually in a separate terminal first.

## Student Git Workflow

- Branch from `dev`
- Keep branches short-lived
- Merge `dev` into your branch often if the team is moving quickly
- Do not commit IDE settings, local build output, or generated machine files
- Open pull requests back into `dev`

## Ignore / Cleanup Notes

The root [`.gitignore`](./.gitignore) is set up to ignore common local-only files such as:

- IDE folders like `.idea/`, `.vscode/`, and `.vs/`
- dependency folders like `node_modules/`
- build output like `coverage/`, `.next/`, `dist/`, and Expo artifacts
- iOS/Xcode and CocoaPods local files

If Git shows a file that looks machine-generated, stop and double-check before committing it.

## Team Docs

Useful project docs live in [`Documents/`](./Documents).
