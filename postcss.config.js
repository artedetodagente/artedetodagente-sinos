//postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./src/tailwind.config.js'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')
  ],
};