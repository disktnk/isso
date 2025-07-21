var html = function (globals) {
  var i18n = globals.i18n;
  var comment = globals.comment;
  var conf = globals.conf;
  var datetime = globals.datetime;
  var humanize = globals.humanize;
  var svg = globals.svg;

  var author = comment.author ? comment.author : i18n('comment-anonymous');
  var isPageAuthor = conf["page-author-hashes"].indexOf(comment.hash) > -1;
  var pageAuthorClass = (isPageAuthor ? " isso-is-page-author" : '');

  const formatDate = (date) => {
    const commentDate = new Date(date * 1000);
    const tooltipDate = commentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const displayDate = commentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit'
    });

    return {
      tooltip: tooltipDate,
      display: displayDate,
    };
  };

  const dateFormats = formatDate(comment.created);

  var template = `
<div class='isso-comment${pageAuthorClass}' id='isso-${comment.id}' data-hash='${comment.hash}'>
  ${conf.gravatar ? `<div class='isso-avatar'><img src='${comment.gravatar_image}'></div>` : ''}
  ${conf.avatar ? `<div class='isso-avatar'><svg data-hash='${comment.hash}'></svg></div>` : ''}
  <div class='isso-text-wrapper'>
    <div class='isso-comment-header'>
      ${comment.website ? `<a class='isso-author' href='${comment.website}' rel='nofollow'>${author}</a>` : `<span class='isso-author'>${author}</span>`}
      ${isPageAuthor ? `<span class='isso-spacer'>&bull;</span><span class='isso-page-author-suffix'>${i18n('comment-page-author-suffix')}</span>` : ''}<br>
      <a class='isso-permalink' href='#isso-${comment.id}'>
        <time title='${dateFormats.tooltip}' datetime='${datetime(comment.created)}'>${dateFormats.display}</time>
      </a>
      <span class='isso-note'>
        ${comment.mode == 2 ? i18n('comment-queued') : (comment.mode == 4 ? i18n('comment-deleted') : '')}
      </span>
    </div>
    <div class='isso-text'>
      ${comment.mode == 4 ? '<p>&nbsp;</p>' : comment.text}
    </div>
    <div class='isso-comment-footer'>
      ${conf.vote ? `<a class='isso-upvote' href='#'>${svg['arrow-up']}</a><span class='isso-spacer'>|</span><a class='isso-downvote' href='#'>${svg['arrow-down']}</a>` : ''}
      <a class='isso-reply' href='#'>${i18n('comment-reply')}</a>
      <a class='isso-edit' href='#'>${i18n('comment-edit')}</a>
      <a class='isso-delete' href='#'>${i18n('comment-delete')}</a>
    </div>
  </div>
  <div class='isso-follow-up'></div>
</div>`;
  // DOMParser is used to parse the HTML string into a DOM element
  var parser = new DOMParser();
  var doc = parser.parseFromString(template, 'text/html');
  return doc.body.firstChild;
};
module.exports = html;
