function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

// Write Cookie
function createCookie(name, value, days) {
  if (value) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  if (!readCookie(name)) {
    createCookie(name, 'na', days);
  }
}

// Read Cookie
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Days Array
function daysF() {
  var daysConfig = {
    'admitad': 90
  };
  days = daysConfig[source];
  if (!!!days) days = 30;
  return days;
}

//AddCookieParams
var source = '';
var adm_uid = '';

var queryObj = parseQuery(location.search);
//FirstCheckUTM
(queryObj.utm_source) ? source = queryObj.utm_source : '';
(queryObj.admitad_uid) ? adm_uid = queryObj.admitad_uid : '';
//SecondCheckClid
(queryObj.gclid) ? source = 'google' : 
(queryObj.yclid) ? source = 'yandex' : '';

//setAndCheckCookie
createCookie('checkSource', source, daysF());
createCookie('admitad_uid', adm_uid, daysF());


/*
Code in Google Tag Manager (without parseQuery())

<script>
//WriteCookie
function createCookie(name, value, days) {

  if (value) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";    
  }

  if (!readCookie(name)) {
    createCookie(name, 'na', days);
  }
}

//ReadCookie
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
  
//CookieDaysParams
function daysF() {
  var daysConfig = {
    'admitad': 90
  };
  days = daysConfig[source];
  if (!!!days) days = 30;
  return days;
}
  
//AddCookieParams
var source = '';
var adm_uid = '';

//FirstCheckUTM
({{utm_source}}) ? source = {{utm_source}} : '';
({{utm_admitad_uid}}) ? adm_uid = {{utm_admitad_uid}} : '';
  
//SecondCheckClid
({{utm_gclid}}) ? source = 'google' : 
({{utm_yclid}}) ? source = 'yandex' : '';

  
//setAndCheckCookie
createCookie('_MG_Source', source, daysF());
createCookie('_MG_cpaID', adm_uid, daysF());
  
</script>

*/

