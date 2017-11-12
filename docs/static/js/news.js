// $(document).ready(function($) {
//   let articleArr = []
//   let articleListObj = $('.article-list')
//   let html = '<div class="intro-article"><div class="container-md"><div class="intro-article__inner"><div class="intro-article__inner__date"></div><div class="intro-article__inner__intro"><div class="intro"><div class="title"><a href="" target="_blank"></a></div><div class="meta"></div><div class="text"></div></div></div></div></div></div>'
//   let htmlObj = $(html)
//   // $.getJSON('https://mobike.com/cn/wp-json/wp/v2/posts?categories=1&page=1&per_page=100', function (data)  {
//   //   // console.log(data)
//   //   articleArr = data
//   //   articleListObj.empty()
//   //   let article = $('.intro-article')
//   //   articleArr.forEach(function (element, index) {
//   //     let articleListObj = $('.article-list')
//   //     /* 插入数据 */
//   //     htmlObj.find('.intro-article__inner__date').text(element.date)
//   //     htmlObj.find('.intro-article__inner .title a').text(element.title.rendered).attr('href', './' + element.id)
//   //     htmlObj.find('.intro-article__inner .meta').text(element.date)
//   //     htmlObj.find('.intro-article__inner .text').html(element.excerpt.rendered)
//   //     /*  插入DOM */
//   //     articleListObj.append(htmlObj)
//   //     console.log(articleListObj)
//   //   })
//   // })
//   $.get('../static/assets/json/news.json', function(news) {
//     articleArr = data
//     articleListObj.empty()
//     let article = $('.intro-article')
//     articleArr.forEach(function (element, index) {
//       let articleListObj = $('.article-list')
//       /* 插入数据 */
//       htmlObj.find('.intro-article__inner__date').text(element.date)
//       htmlObj.find('.intro-article__inner .title a').text(element.title.rendered).attr('href', './' + element.id)
//       htmlObj.find('.intro-article__inner .meta').text(element.date)
//       htmlObj.find('.intro-article__inner .text').html(element.excerpt.rendered)
//       /*  插入DOM */
//       articleListObj.append(htmlObj)
//       console.log(articleListObj)
//   })
// })