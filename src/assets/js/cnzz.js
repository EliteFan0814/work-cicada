var cnzzFn = function(category, action, label) {
  // if (window._czc) {
  //   window._czc.push(["_trackEvent", category, action, label]);
  //   console.log(category, action, label);
  // }
  this.$pushCNZZ.event(category, action, label);
  console.log(category, action, label);
};
export default cnzzFn;
