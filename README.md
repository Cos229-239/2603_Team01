# 2603 Team01
- Zachary P Nash

Teaching repo for Team 01. This repository currently contains two app areas, so be careful to work in the correct directory before installing dependencies or starting a dev server.

## Repo Layout

- Root app: React Native project used for the main mobile app
- `my-app/`: separate Next.js web app or prototype
- `Documents/`: team guides, Git instructions, and reference material

## Which App Should I Work In?

Use the root of the repo if you are working on the React Native mobile app:

```sh
npm install
npm start
npm run android
npm run ios
```

Use `my-app/` only if you are intentionally working on the separate Next.js app:

```sh
cd my-app
npm install
npm run dev
```

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
