'use strict';

$(document).ready(function ($) {
  var articleArr = [];
  var $articleList = $('#article-list'
  // $.getJSON('https://mobike.com/cn/wp-json/wp/v2/posts?categories=1&page=1&per_page=100', function (data)  {

  // })
  );$.get('../static/assets/json/news.json', function (news) {
    /* 临时DOM */
    var $tmpArticleList = $('<div class="article-list"></div>');
    articleArr = news;
    articleArr.forEach(function (element, index) {
      /* 格式化数据 */
      var date = formatDate(element.date);
      var dataObj = {
        id: element.id,
        title: element.title.rendered,
        date: date,
        meta: date.year + date.month + ',' + date.time,
        text: element.excerpt.rendered
      };
      var year = date.year;
      var month = date.month;
      var yearPrev = articleArr[index - 1] ? formatDate(articleArr[index - 1].date).year : '';
      var monthPrev = articleArr[index - 1] ? formatDate(articleArr[index - 1].date).month : '';
      var dateShow = 'block';
      /* 判断日期是否显示 */
      dateShow = month === monthPrev ? 'none' : 'block';
      /* 插入临时DOM */
      $tmpArticleList.append('<section class="intro-article"><div class="container-md"><div class="intro-article__inner"><div class="intro-article__inner__date"><div class="date" style="display: ' + dateShow + '"><div class="year">' + dataObj.date.year + '</div><div class="month">' + dataObj.date.month + '</div></div></div><div class="intro-article__inner__intro"><div class="intro"><div class="title"><a href="./' + dataObj.id + '.html">' + dataObj.title + '</a></div><div class="meta">' + dataObj.meta + '</div><div class="text">' + dataObj.text + '</div></div></div></div></div></section>');
    }
    /* 插入DOM */
    );$articleList.html($tmpArticleList);
  }
  /**
   * 格式化日期
   * @param  {String} str date example: "2017-10-18T16:58:05"
   * @return {Object}     object of formatted date example: {year: '2017年', month: '1月'}
   */
  );function formatDate(str) {
    var _date = {};
    var d = new Date(str);
    var year = d.getFullYear() + '年';
    var month = d.getMonth() + 1 + '月';
    var date = d.getDate() + '日';
    var time = d.getHours() + ':' + d.getMinutes();
    _date.year = year;
    _date.month = month;
    _date.date = date;
    _date.time = time;
    return _date;
  }
  /*
    dataObj: {
      id: element.id,
      title: element.title.rendered,
      date: date,
      meta: date.year + date.month + ',' + date.time,
      text: element.excerpt.rendered
    }
   */
  /**
   * 替换模板数据
   * @param  {Object} $dom    $dom
   * @param  {Object} dataObj obj of data
   * @return {Object}         $dom
   */
  // function insertData($dom, dataObj) {
  //   $dom.find('.intro-article__inner__date').text(dataObj.date.year + dataObj.date.month)
  //   $dom.find('.intro-article__inner .title a').text(dataObj.title).attr('href', './' + dataObj.id + '.html')
  //   $dom.find('.intro-article__inner .meta').text(dataObj.meta)
  //   $dom.find('.intro-article__inner .text').html(dataObj.text)
  //   return $dom
  // }
});