# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
---------------------------
# LAB 5.2 -  Documentation
---------------------------

## What change you want(ed) to make in your application

The changes that I wanted to make in my application was to add a feature that when the page for the departments was first loaded it would get 
all of the departments and then show it on the app  using pagination so that it would only show 10 departments on the first page and the user would 
have to click next to see the next 10 departments and so on.

## What tool or tools you've made use of to make this change

The tools that I’ve made use of to make this change is the REST API pagination specifically using the offset pagination and applied that to the endpoint 
in the departmentRoutes file so that it would automatically go through the GET route when the user opened the page and then it would have a feature to navigate 
through the pages to see more data at the bottom of the page.

## How this change affects the user experience

This change affects the user experience because it means that if there are a lot of departments, they wouldn’t have to scroll a lot through the web page to see what 
departments are on the page so that they would have an easier time seeing and processing all the departments on the page. It would also make it easier for them to get to 
the bottom of the page faster.

## How this change affects your understanding, or conceptualization, of the app.

This change affects my understanding or conceptualization of the app by making it easier to parse the department information which makes the web page easier to parse the information 
about the departments so that if you were looking for a specific department or person working in that department the user would be able to find them easier or know for certain that a specific 
department making it easier for the user. This also make it so that the employees in the departments would stand out more then they do when you don’t have the pagination applied.
