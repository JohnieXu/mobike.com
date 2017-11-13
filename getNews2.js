console.log('starting...')
const path = require('path')
  , fs = require('fs')
  , jsonp = require('jsonp')
const { readFileSync, writeFileSync } = require('fs')

let articleList
let filePath = path.resolve(__dirname, 'src/assets/json/news.json')
let newsFile = readFileSync(filePath, (err, data) => {
  if (err) {
    throw err
  }
  console.log(data)
  console.log(axios)
})
