// equivalent to $(document).ready()
// http://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready
(function(exports, d) {
  function domReady(fn, context) {

      function onReady(event) {
          d.removeEventListener("DOMContentLoaded", onReady);
          fn.call(context || exports, event);
      }

      function onReadyIe(event) {
          if (d.readyState === "complete") {
              d.detachEvent("onreadystatechange", onReadyIe);
              fn.call(context || exports, event);
          }
      }

      d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
      d.attachEvent      && d.attachEvent("onreadystatechange", onReadyIe);
  }

  exports.domReady = domReady;
})(window, document);

domReady(function() {
  console.log('DOM is ready :)');
  
  var connectionLinkArea = document.querySelector('#connectionLink');
  testUserStatus();

  function testUserStatus() {
      if(localStorage.getItem('token')) {
          displayLoggedInView();
      } else {
          displayLoggedOutView();
      }
  }

  function displayLoggedInView() {
      connectionLinkArea.innerHTML = '<a href="/login">déconnexion</a>';
  }

  function displayLoggedOutView() {
      connectionLinkArea.innerHTML = '<a href="/login">connexion</a>';            
  }
});
