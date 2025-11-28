# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

## Cleaning local Expo state (optional but recommended)

Expo stores local state and history under the `.expo` folder which should not be tracked by Git.

Before pushing or creating PRs, run the following to untrack and remove any local `.expo` state:

```bash
# If `.expo` is already tracked by git, untrack it and remove it locally
git rm -r --cached .expo || true
rm -rf .expo || true
git commit -m "chore: remove local .expo and add to .gitignore" || true
```

You can also use the helper script in `scripts/remove_expo_from_git.sh`.

### Generating a square app icon

If your `app.json` references a non-square image for `icon` or the Adaptive Icon foreground image, use the helper script to auto-generate a squared icon and update `app.json`:

```bash
npm install --save-dev jimp # only required the first time
npm run fix-icon
```

### Otimizar imagens para builds (reduz tempo de carregamento inicial)

Para reduzir o tamanho do bundle e acelerar o carregamento inicial em builds, gere versões otimizadas das imagens com este comando:

```bash
npm run optimize-images
```

O script gera imagens em `assets/images/optimized` e o app está preparado para usar essas versões quando presentes.


This will crop the configured `icon` to a square and save it as `assets/images/icon-square.png`, then update `app.json` to point to that file.


This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
