var html = function (globals) {
  var i18n = globals.i18n;
  var conf = globals.conf;
  var author = globals.author;
  var email = globals.email;
  var website = globals.website;
  var notify = conf["reply-notifications-default-enabled"] ? " checked" : '';

  var template = `
    <div class='isso-postbox'>
      <div class='isso-form-wrapper'>
        <div class='isso-auth-section'>
          <p class='isso-input-wrapper'>
            <input id='isso-postbox-author' type='text' name='author' placeholder='${i18n('postbox-author-placeholder')}' value='${author ? author : ''}' />
          </p>
          <div style="display: none;">
          <p class='isso-input-wrapper'>
            <input id='isso-postbox-email' type='email' name='email' placeholder='${i18n('postbox-email-placeholder')}' value='${email ? email : ''}' />
          </p>
          <p class='isso-input-wrapper'>
            <input id='isso-postbox-website' type='text' name='website' placeholder='${i18n('postbox-website-placeholder')}' value='${website ? website : ''}' />
          </p>
          </div>
        </div>
        <div class='isso-textarea-wrapper'>
          <textarea class='isso-textarea' rows='5' minlength='1' maxlength='65535' placeholder='${i18n('postbox-text')}'oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"></textarea>
          <div class='isso-preview'>
            <div class='isso-comment'>
              <div class='isso-text-wrapper'>
                <div class='isso-text'></div>
              </div>
            </div>
          </div>
        </div>
        <div class='isso-submit-wrapper'>
          <p class='isso-post-action'>
            <input type='submit' value='${i18n('postbox-submit')}' />
          </p>
          <p class='isso-post-action'>
            <input type='button' name='preview' value='${i18n('postbox-preview')}' />
          </p>
          <p class='isso-post-action'>
            <input type='button' name='edit' value='${i18n('postbox-edit')}' />
          </p>
        </div>
        <div class='isso-notification-section'>
          <label>
            <input type='checkbox' ${notify} name='notification' />${i18n('postbox-notification')}
          </label>
        </div>
      </div>
    </div>`;

  // DOMParser is used to parse the HTML string into a DOM element
  var parser = new DOMParser();
  var doc = parser.parseFromString(template, 'text/html');
  return doc.body.firstChild;
};

module.exports = html;
