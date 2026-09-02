export default function(pattern) {
  return {
    mounted: (el) => {
      const re = new RegExp(pattern.value, "ig");
      el.innerHTML = el.innerHTML.replaceAll(re, (match) => "<span class='PatternMatch'>" + match + "</span>" );
    }
  }
};

