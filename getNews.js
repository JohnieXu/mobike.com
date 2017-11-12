console.log('starting...')
const path = require('path')
  , fs = require('fs')
  , jQuery = require('./bower_components/jquery/dist/jquery.min.js'),
  $ = require('jquery')
const { readFileSync, writeFileSync } = require('fs')
let articleList
let filePath = path.resolve(__dirname, 'src/assets/json/news.json')
let newsFile = readFileSync(filePath, (err, data) => {
  if (err) {
    throw err
  }
  console.log(data)
  console.log(jQuery)
})

console.log(jQuery)

$.getJSON('https://mobike.com/cn/wp-json/wp/v2/posts?categories=1&page=1&per_page=100', data => {
  articleList = data
  articleList.forEach((el, i) => {

  })
})