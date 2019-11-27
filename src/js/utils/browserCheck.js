export default function BrowserCheck() {

  let ua = navigator.userAgent.toLowerCase();
  let ver = navigator.appVersion.toLowerCase();
  let device = '';
  let browser = '';
  if (ua.indexOf('iphone') !== -1) {
    device = 'iphone';
  } else if (ua.indexOf('ipad') !== -1) {
    device = 'ipad';
  } else if (ua.indexOf('android') !== -1) {
    device = 'android';
  } else if (ua.indexOf('win') !== -1) {
    device = 'windows';
  } else if (ua.indexOf('mac') !== -1) {
    device = 'mac';
  } else {
    device = 'unknown';
  }
  if (ua.indexOf('msie') !== -1) {
    if (ver.indexOf('msie 9.') !== -1) {
      browser = 'ie9';
    } else if (ver.indexOf('msie 10.') !== -1) {
      browser = 'ie10';
    } else {
      browser = 'ie';
    }
  } else if (ua.indexOf('trident/7') !== -1) {
    browser = 'ie11';
  } else if (ua.indexOf('edge') !== -1) {
    browser = 'edge';
  } else if (ua.indexOf('chrome') !== -1) {
    browser = 'chrome';
  } else if (ua.indexOf('safari') !== -1) {
    browser = 'safari';
  } else if (ua.indexOf('firefox') !== -1) {
    browser = 'firefox';
  } else {
    browser = 'unknown';
  }
  $('body').addClass([device, browser].join(' '));

}