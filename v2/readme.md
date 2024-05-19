# use React on GitHub Pages
[source](https://github.com/orgs/community/discussions/60881)

## Create and build a new React app
Open your terminal or command prompt and navigate to the directory where you want to create your React app. Run the following command to create a new React app:
```bash
npx create-react-app my-app
```
This will create a new directory called `my-app` with a basic React project structure.

Once the app is created, navigate into the project directory by running `cd my-app`. 
Then, run the following command to build your React app:
```bash
npm run build
```
This will create an optimized production build of your React app in the build directory.

## Deploy to GitHub Pages
Install the gh-pages package, which will help you deploy your React app to GitHub Pages. 
Run the following command:
```bash
npm install gh-pages --save-dev
```

Open the package.json file in your project directory and add the following properties at the top level:
```json
"homepage": "https://your-username.github.io/your-repo-name",
"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
}
```
Replace `your-username` with your GitHub username and `your-repo-name` with the name of your repository.

In your terminal or command prompt, run the following command to deploy your React app to GitHub Pages:
```bash
npm run deploy
```
This will create a new branch called gh-pages in your repository and push the built files from the build directory to that branch.

## Enable GitHub Pages
Go to your repository on GitHub and navigate to the "Settings" tab. Scroll down to the "GitHub Pages" section and select the gh-pages branch as the source for your GitHub Pages site.

Access your deployed app: After a few moments, your React app should be deployed and accessible at the URL mentioned in the "GitHub Pages" section of your repository settings.

That's it! Your React app is now deployed on GitHub Pages. Anytime you make changes to your app, repeat steps 4 and 7 to rebuild and redeploy your app.


## Notes

```bash
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd blackjack
  npm start

Happy hacking!
```

# TODO

Accurate score calculation (aces)
When in the beginning it's already 21?

stand.onclick:

- comparison (who won)

## Features next
- wagers, bets
- animation of cards
- WINNER label with animated text