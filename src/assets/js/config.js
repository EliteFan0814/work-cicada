export let url = window.location.href;

let nameUrl = "";
if (url.indexOf("zxripr.com") >= 0) {
  nameUrl = "https://kong.gbicom.com:8443/qiming";
} else {
  nameUrl = "http://kong.d.gbicom.com/qiming";
}

export { nameUrl };
