class C128 {
    characterWidth = 11;
    c128CStart = 105;
    c128ToB = 100;
    c128stop = 106;
    checksum = 0;
    checkmultiplier = 1;

    constructor (codeArr, gtin) {
        this.generateBarcode_C128(codeArr, gtin)
    }

    generateCharacter_C128(codeArr, value, pos) {
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
        this.generateCharacter_C128(codeArr, this.checksum % 103, 99);
        this.generateCharacter_C128(codeArr, this.c128stop, 110);
        codeArr.push(`<rect width="2" height="100" x="121" y="0" fill="black" />`);
    }
}

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

