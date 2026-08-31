export default {
  mounted: (el) => {
    const re = new RegExp(dialoguePattern.value, "ig");
    //console.log("vHighlight: el", el);
    //console.log(el.innerHTML);
    //console.log("vHighlight: re", re);
    //console.log("vHighlight: el.innerHTML", el.innerHTML);
    el.innerHTML = el.innerHTML.replaceAll(re, (match) => "<span class='PatternMatch'>" + match + "</span>" );
  }
}

