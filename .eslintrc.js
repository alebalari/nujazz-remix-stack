/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["tailwindcss", "prettier"],
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node", "prettier"],
};
