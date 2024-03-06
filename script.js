$(function () {
  const loader = $(".loader");
  const table = $("#myTable");
  const body = $("tBody");
  const postsUrl =
    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=2";
  $.get(postsUrl, function (posts) {
    posts.forEach(function (post) {
      const tr = $("<tr>");
      const td1 = $("<td>").text(post.id);
      const td2 = $("<td>").text(post.title);
      const td3 = $("<td>").text(truncateBodyString(post.body));
      const td4 = $("<td>");
      td4.html("<div class='loader' />");

      tr.append(td1, td2, td3, td4);
      body.append(tr);

      const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${post.id}&_limit=3`;
      $.get(commentsUrl).done(function (comments) {
        td4.empty();
        comments.forEach(function (comment) {
          td4.append("id:" + comment.id + "<br />" + comment.body + "<br>");
        });
      });
    });
  });
});

function truncateBodyString(str) {
  return str.length > 30 ? str.substring(0, 30) + "..." : str;
}

function fetchData(url) {
  return $.get(url);
}
