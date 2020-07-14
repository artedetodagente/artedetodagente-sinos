//postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-node-sass'),
    require('autoprefixer')
  ],
};