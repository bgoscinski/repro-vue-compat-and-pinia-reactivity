1. Run `npm install`
1. Run `npm test`. Both tests fail
1. Kill vitest
1. Remove `'vue': '@vue/compat'` alias from `./vite.config.js`
1. Run `npm test` again. Both tests pass 🤯
