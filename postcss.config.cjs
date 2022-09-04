const tailwindcss    = require('tailwindcss');
const autoprefixer   = require('autoprefixer');
const postcss_nested = require('postcss-nested');
const postcss_nested_ancestors = require('postcss-nested-ancestors');
const postcss_import = require('postcss-import');
const cssnano = require('cssnano')

const dev = process.env.NODE_ENV === 'development';

const config = {
  plugins: [
    tailwindcss(),
    // Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    postcss_import(),
    postcss_nested(),
    postcss_nested_ancestors(),
    // But others, like autoprefixer, need to run after,
    autoprefixer(),
    !dev && cssnano({ preset: 'default'})
  ]
};

module.exports = config;
