const articleNode = document.getElementsByClassName("page-break")[0];
const listNode = document.getElementById("ArticleList-Container");
const articleData = document.getElementById("Article-Data");
const dataAmount = parseInt(articleData.getAttribute("amount"));

let titleData       = document.getElementById("Title-Data").innerText;
// let barcodeData     = document.getElementById("Barcode-Data").innerHTML.split(";");
let gtinData        = document.getElementById("GTIN-Data").innerText.split(";");
let articleNrData   = document.getElementById("ArticleNr-Data").innerText.split(";");
let nameData        = document.getElementById("Name-Data").innerText.split(";");
let priceData       = document.getElementById("Price-Data").innerText.split(";");
let sourceData      = document.getElementById("Source-Data").innerText.split(";");

document.getElementsByTagName("title")[0].innerText = titleData;
document.getElementById("Article-Title").innerHTML = titleData;
for (let index = 0; index < dataAmount; index++) {
    let toAppend = articleNode.cloneNode(true);
    let currentName = nameData[index].replace(/[\"]/g, "").replace(/[,]/g, '<br>');
    // toAppend.querySelector('#Barcode-Code128').data     = barcodeData[index];
    toAppend.querySelector('#ArticleNr').textContent    = articleNrData[index];
    toAppend.querySelector('#Name').innerHTML           = currentName;
    toAppend.querySelector('#Price').textContent        = priceData[index];
    toAppend.querySelector('#Source').textContent       = sourceData[index];
    toAppend.querySelector('#GTIN').textContent         = gtinData[index];
    
    listNode.appendChild(toAppend);
}

articleNode.remove();

function printEtikett(isH) {
    var styleH = document.getElementById("print-style-h");
    var styleR = document.getElementById("print-style-r");
    
    if (isH) {
        styleH.disabled = false;
        styleR.disabled = true;
    } else {
        styleH.disabled = true;
        styleR.disabled = false;
    }
    window.print();
}