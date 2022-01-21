module.exports = {
  './**/*.{js,jsx,ts,tsx}': ['eslint --config ./.eslintrc --ext .js,.jsx,.ts,.tsx --fix'],
  '*.{css,sass,scss}': ['stylelint --config .stylelintrc --fix'],
};
