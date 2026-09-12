console.log("hello from gtag.js");
//alert("hello from gtag.js");
//console.log(window.dataLayer);
window.dataLayer = [];
if (window.dataLayer == null) {
  window.dataLayer = [];
}
window.dataLayer = window.dataLayer ?? [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9GH7X9N0XK');
