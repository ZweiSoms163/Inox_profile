import $ from 'jquery'
global.jQuery = $
global.$ = $

// import twitterIcon from '../assets/twitter.svg';

require('../../assets/css/index.scss')
require('../../assets/js/main.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-index')
})
