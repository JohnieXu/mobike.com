const fs = require('fs'),
  path = require('path'),
  authorMap = ['作者0', '作者1', '作者2', '作者3', 'Mobike']

console.log('start writing news files...')
/* 读取新闻文章模板 */
fs.readFile(path.resolve(__dirname, 'src/components/newsArticleTpl.html'), (err, data1) => {
  if (err) {
    throw err
  }
  let tpl = data1.toString()
  /* 读取新闻文章列表数据 */
  fs.readFile('src/assets/json/news.json', (err, data2) => {
    if (err) {
      throw err
    }
    JSON.parse(data2.toString()).forEach((el, i) => {
      let _date = new Date(el.date)
      let date = _date.getFullYear() + '年' + (_date.getMonth() + 1) + '月' + _date.getDate() + '日'
      let title = `<h2 class="title"><a class="title__link" href="@@webRoot/news/${el.id}.html">${el.title.rendered}</a></h2>`
      let meta = `<div class="meta"><span class="meta__author">作者：<a href="">${authorMap[el.author]}</a></span><span class="meta__date">发布时间：${date}</span></div>`
      let tpl2 = tpl.replace(tpl.match(/##[0-9a-zA-Z]*##/), title + meta + el.content.rendered)
        fs.writeFileSync(`src/pages/news/${el.id}.html`, tpl2, err => {
          if (err) {
            throw err
          }
        })
    })
    console.log('write files success to %s\\src\\pages\\news\\', __dirname)
  })
})

