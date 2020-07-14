//postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-node-sass'),
    require('autoprefixer'),
    require('cssnano')
  ],
};