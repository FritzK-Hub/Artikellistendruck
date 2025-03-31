var navbar = document.getElementsByClassName("category-nav nav navbar-nav")[0];
var dropdownLinks = navbar.getElementsByClassName("dropdown-link");
var hrefs = [];
for (const i of dropdownLinks) {
  var href = i.getAttribute("href");
  var role = i.getAttribute("role");
  var parentClasses = i.parentNode.getAttribute("class");
  if (parentClasses === "dropdown-item") {
    hrefs.push("https://www.sonderpreis-baumarkt.de" + href + "?sz=2000\n");
  }
}
var myBlob = new Blob(hrefs, { type: "text/html" });
var blobUrl = URL.createObjectURL(myBlob);
var link = document.createElement("a");
link.href = blobUrl;
link.download = "aDefaultFileName.txt";
link.innerText = "Click here to download the file";
document.body.appendChild(link);