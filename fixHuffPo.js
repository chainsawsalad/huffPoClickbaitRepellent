(function() {
  if(typeof jQuery === 'undefined') {
    script = document.createElement('script');
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload = fixHuffPo;
    document.body.appendChild(script);
  } else {
    fixHuffPo();
  }

  function fixHuffPo() {
    var entries = document.querySelectorAll('#news_column div.entry');
    for(var i = entries.length - 1; i >= 0; i--) {
      var headerTitles = entries[i].querySelectorAll('h1, h2, h3, h4, h5, h6');
      //console.log(headerTitles,headerTitles.length);
      for(var j = headerTitles.length - 1; j >= 0; j--) {
        //console.log(headerTitles[j],j);
        if(headerTitles[j].className.indexOf('subhead') === -1) {
          var anchor = headerTitles[j].querySelector('a');

          if(anchor.innerText !== '' && anchor.href.indexOf('huffingtonpost.com') !== -1) {
            //console.log(anchor.innerText);
            (function(a) {
              jQuery.ajax({
                url: anchor.href,
                success: function(result) {
                  var title = result.match(/<h1 class="title(?:-news|-blog)?">\n?\s*(.*?)\n?\s*<\/h1>/);
                  if(title !== null) {
                    //console.log(title[1]);
                    a.innerHTML = title[1];
                  } else {
                    //console.log('no title found:',result);
                  }
                }
              });
            })(anchor);
          }
        }
      }
    }
  }
})();