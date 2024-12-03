const c128 = [
	[2,1,2,2,2,2],
	[2,2,2,1,2,2],
	[2,2,2,2,2,1],
	[1,2,1,2,2,3],
	[1,2,1,3,2,2],
	[1,3,1,2,2,2],
	[1,2,2,2,1,3],
	[1,2,2,3,1,2],
	[1,3,2,2,1,2],
	[2,2,1,2,1,3],
	[2,2,1,3,1,2],
	[2,3,1,2,1,2],
	[1,1,2,2,3,2],
	[1,2,2,1,3,2],
	[1,2,2,2,3,1],
	[1,1,3,2,2,2],
	[1,2,3,1,2,2],
	[1,2,3,2,2,1],
	[2,2,3,2,1,1],
	[2,2,1,1,3,2],
	[2,2,1,2,3,1],
	[2,1,3,2,1,2],
	[2,2,3,1,1,2],
	[3,1,2,1,3,1],
	[3,1,1,2,2,2],
	[3,2,1,1,2,2],
	[3,2,1,2,2,1],
	[3,1,2,2,1,2],
	[3,2,2,1,1,2],
	[3,2,2,2,1,1],
	[2,1,2,1,2,3],
	[2,1,2,3,2,1],
	[2,3,2,1,2,1],
	[1,1,1,3,2,3],
	[1,3,1,1,2,3],
	[1,3,1,3,2,1],
	[1,1,2,3,1,3],
	[1,3,2,1,1,3],
	[1,3,2,3,1,1],
	[2,1,1,3,1,3],
	[2,3,1,1,1,3],
	[2,3,1,3,1,1],
	[1,1,2,1,3,3],
	[1,1,2,3,3,1],
	[1,3,2,1,3,1],
	[1,1,3,1,2,3],
	[1,1,3,3,2,1],
	[1,3,3,1,2,1],
	[3,1,3,1,2,1],
	[2,1,1,3,3,1],
	[2,3,1,1,3,1],
	[2,1,3,1,1,3],
	[2,1,3,3,1,1],
	[2,1,3,1,3,1],
	[3,1,1,1,2,3],
	[3,1,1,3,2,1],
	[3,3,1,1,2,1],
	[3,1,2,1,1,3],
	[3,1,2,3,1,1],
	[3,3,2,1,1,1],
	[3,1,4,1,1,1],
	[2,2,1,4,1,1],
	[4,3,1,1,1,1],
	[1,1,1,2,2,4],
	[1,1,1,4,2,2],
	[1,2,1,1,2,4],
	[1,2,1,4,2,1],
	[1,4,1,1,2,2],
	[1,4,1,2,2,1],
	[1,1,2,2,1,4],
	[1,1,2,4,1,2],
	[1,2,2,1,1,4],
	[1,2,2,4,1,1],
	[1,4,2,1,1,2],
	[1,4,2,2,1,1],
	[2,4,1,2,1,1],
	[2,2,1,1,1,4],
	[4,1,3,1,1,1],
	[2,4,1,1,1,2],
	[1,3,4,1,1,1],
	[1,1,1,2,4,2],
	[1,2,1,1,4,2],
	[1,2,1,2,4,1],
	[1,1,4,2,1,2],
	[1,2,4,1,1,2],
	[1,2,4,2,1,1],
	[4,1,1,2,1,2],
	[4,2,1,1,1,2],
	[4,2,1,2,1,1],
	[2,1,2,1,4,1],
	[2,1,4,1,2,1],
	[4,1,2,1,2,1],
	[1,1,1,1,4,3],
	[1,1,1,3,4,1],
	[1,3,1,1,4,1],
	[1,1,4,1,1,3],
	[1,1,4,3,1,1],
	[4,1,1,1,1,3],
	[4,1,1,3,1,1],
	[1,1,3,1,4,1],
	[1,1,4,1,3,1],
	[3,1,1,1,4,1],
	[4,1,1,1,3,1],
	[2,1,1,4,1,2],
	[2,1,1,2,1,4],
	[2,1,1,2,3,2],
	[2,3,3,1,1,1]
];

class C128 {
    characterWidth = 11;
    c128CStart = 105;
    c128ToB = 100;
    c128stop = 106;
    checksum = 0;
    checkmultiplier = 1;

    constructor (codeArr, gtin) {
        this.generateBarcode_C128(codeArr, gtin)
        console.log("___________")
    }

    generateCharacter_C128(codeArr, value, pos) {
        console.log(value + " " + (this.checksum + value * this.checkmultiplier))
        let offset = pos;
        for (let i = 0; i < 6; i += 2) {
            let width = c128[value][i];
            let rect = `<rect width="${width}" height="100" x="${offset}" y="0" fill="black" />`;
            codeArr.push(rect);
            offset += c128[value][i] + c128[value][i + 1]
        }
        this.checksum += value * this.checkmultiplier;
        this.checkmultiplier += 1;
        return value;
    }

    generateBarcode_C128(codeArr, gtin) {
        gtin = String(gtin).trim()
        this.generateCharacter_C128(codeArr, this.c128CStart, 0);
        this.checkmultiplier = 1;

        for (let i = 0; i <= 5; i++) {
            let currentValue = parseInt(gtin.substring(i*2, (i*2)+2));
            let offset = (i * this.characterWidth) + this.characterWidth;
            this.generateCharacter_C128(codeArr, currentValue, offset);
        }

        this.generateCharacter_C128(codeArr, this.c128ToB, 77);
        let lastDigit = parseInt(gtin[12]) + 16;
        this.generateCharacter_C128(codeArr, lastDigit, 88);
        console.log(String(gtin) + " " + this.checksum % 103)
        this.generateCharacter_C128(codeArr, this.checksum % 103, 99);
        this.generateCharacter_C128(codeArr, this.c128stop, 110);
        codeArr.push(`<rect width="2" height="100" x="121" y="0" fill="black" />`);
    }
}





const articleNode = document.getElementsByClassName("page-break")[0];
const listNode = document.getElementById("ArticleList-Container");
const articleData = document.getElementById("Article-Data");
const dataAmount = parseInt(articleData.getAttribute("amount"));

let titleData       = document.getElementById("Title-Data").innerText;
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

    let barcode = [];
    new C128(barcode, gtinData[index]);
    barcode.forEach(character => {
        toAppend.querySelector('#Barcode-Code128').innerHTML += character;
    });

    toAppend.querySelector('#ArticleNr').textContent     = articleNrData[index];
    toAppend.querySelector('#Name').innerHTML            = currentName;
    toAppend.querySelector('#Price').textContent         = priceData[index];
    toAppend.querySelector('#Source').textContent        = sourceData[index];
    toAppend.querySelector('#GTIN').textContent          = gtinData[index];
    
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