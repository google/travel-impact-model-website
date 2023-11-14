# Travel Impact Model Website README

This is the code behind the domain [www.travelimpactmodel.org](https://www.travelimpactmodel.org). The methodology and API access for the Travel Impact Model can be found [here](https://github.com/google/travel-impact-model).

## How To Contribute

Clone the repository and then run:

```
npm install
```

```
npm start
```

From here, you can access the website locally by opening the browser on your
laptop and navigating to:

```
http://localhost:3000
```

### Run tests

You can run tests with:

```
npm test
```

The screenshot test results will appear in the /test-results folder. The snapshot tests will appear `src/tests/jest-tests/**/__snapshots__` folder.  If the changes are expected, you can
update the test using the following command:

```
npm run test-update
```

### Run linter and formatter

Before committing a change the EsLint linter and Prettier formatter are run automatically.
If you'd like to run them manually, you can use the following command:

```
npm run lint && npm run format
```

If you'd like to change the lint or formatter rules, you can do that in `.eslintrc.js` and
`.prettierrc` config files.
