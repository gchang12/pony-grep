export default function(pattern) {
  return {
    mounted: (el) => {
      const re = new RegExp(pattern.value, "ig");
      //console.log("vHighlight: el", el);
      //console.log(el.innerHTML);
      //console.log("vHighlight: re", re);
      //console.log("vHighlight: el.innerHTML", el.innerHTML);
      el.innerHTML = el.innerHTML.replaceAll(re, (match) => "<span class='PatternMatch'>" + match + "</span>" );
    }
  }
};

