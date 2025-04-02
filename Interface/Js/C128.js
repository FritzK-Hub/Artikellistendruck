class C128 {
  static #Character_Width = 11
  static #C_Start = 105
  static #C_To_B = 100
  static #B_Number_Offset = 16
  static #Stop = 106
  static #CheckDigitModulo = 103

  /**
   * @type {HTMLElement}
   */
  #svg = undefined
  #checksum = undefined
  #checkmultiplier = undefined
  #pos = undefined
  #gtin = undefined
  #width = undefined

  /**
   *
   * @param {string} gtin
   */
  constructor (gtin) {
    this.#gtin = gtin.trim()
    this.#checksum = 0
    this.#checkmultiplier = 1
    this.#pos = 0
    this.#width = 0
    this.#svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.#createBarcode()
    this.#setSvgAttributes()
  }

  #createCharacter (value) {
    var offset = this.#pos
    for (let i = 0; i < 6; i += 2) {
      var width = C128.#patterns[value][i]
      this.#appendRect(width, offset)
      offset += C128.#patterns[value][i] + C128.#patterns[value][i + 1]
    }
    this.#checksum += value * this.#checkmultiplier
    this.#checkmultiplier += 1
    this.#pos += C128.#Character_Width
    return value
  }

  /**
   *
   * @param {int} width
   * @param {int} offset
   * @returns {SVGRectElement}
   */
  #createRect (width, offset) {
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('width', `${width}`)
    rect.setAttribute('height', '100')
    rect.setAttribute('x', `${offset}`)
    rect.setAttribute('y', '0')
    rect.setAttribute('fill', 'black')
    return rect
  }

  #setSvgAttributes () {
    this.#svg.setAttribute('id', 'Barcode-Code128')
    this.#svg.setAttribute('width', '100%')
    this.#svg.setAttribute('height', '100%')
    this.#svg.setAttribute('viewBox', `0 0 ${this.#width} 100`)
    this.#svg.setAttribute('preserveAspectRatio', 'none')
  }

  /**
   *
   * @param {int} width
   * @param {int offset
   */
  #appendRect (width, offset) {
    this.#svg.appendChild(this.#createRect(width, offset))
  }

  #createBarcode () {
    this.#createCharacter(C128.#C_Start)
    this.#checkmultiplier = 1
    var _gtin = this.#gtin

    while (_gtin.length > 1) {
      this.#createCharacter(parseInt(_gtin.substring(0, 2)))
      _gtin = _gtin.substring(2)
    }

    if (_gtin.length > 0) {
      this.#createCharacter(C128.#C_To_B)
      this.#createCharacter(parseInt(_gtin) + C128.#B_Number_Offset)
    }

    this.#createCharacter(this.#checksum % C128.#CheckDigitModulo)
    this.#createCharacter(C128.#Stop)

    //Final two bars
    this.#appendRect(2, this.#pos)
    this.#width = this.#pos + 2
  }

  /**
   *
   * @param {string} gtin
   * @returns {SVGElement}
   */
  static createElement (gtin) {
    var _c128 = new C128(gtin)
    return _c128.#svg
  }

  static #patterns = [
    [2, 1, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2],
    [2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 3],
    [1, 2, 1, 3, 2, 2],
    [1, 3, 1, 2, 2, 2],
    [1, 2, 2, 2, 1, 3],
    [1, 2, 2, 3, 1, 2],
    [1, 3, 2, 2, 1, 2],
    [2, 2, 1, 2, 1, 3],
    [2, 2, 1, 3, 1, 2],
    [2, 3, 1, 2, 1, 2],
    [1, 1, 2, 2, 3, 2],
    [1, 2, 2, 1, 3, 2],
    [1, 2, 2, 2, 3, 1],
    [1, 1, 3, 2, 2, 2],
    [1, 2, 3, 1, 2, 2],
    [1, 2, 3, 2, 2, 1],
    [2, 2, 3, 2, 1, 1],
    [2, 2, 1, 1, 3, 2],
    [2, 2, 1, 2, 3, 1],
    [2, 1, 3, 2, 1, 2],
    [2, 2, 3, 1, 1, 2],
    [3, 1, 2, 1, 3, 1],
    [3, 1, 1, 2, 2, 2],
    [3, 2, 1, 1, 2, 2],
    [3, 2, 1, 2, 2, 1],
    [3, 1, 2, 2, 1, 2],
    [3, 2, 2, 1, 1, 2],
    [3, 2, 2, 2, 1, 1],
    [2, 1, 2, 1, 2, 3],
    [2, 1, 2, 3, 2, 1],
    [2, 3, 2, 1, 2, 1],
    [1, 1, 1, 3, 2, 3],
    [1, 3, 1, 1, 2, 3],
    [1, 3, 1, 3, 2, 1],
    [1, 1, 2, 3, 1, 3],
    [1, 3, 2, 1, 1, 3],
    [1, 3, 2, 3, 1, 1],
    [2, 1, 1, 3, 1, 3],
    [2, 3, 1, 1, 1, 3],
    [2, 3, 1, 3, 1, 1],
    [1, 1, 2, 1, 3, 3],
    [1, 1, 2, 3, 3, 1],
    [1, 3, 2, 1, 3, 1],
    [1, 1, 3, 1, 2, 3],
    [1, 1, 3, 3, 2, 1],
    [1, 3, 3, 1, 2, 1],
    [3, 1, 3, 1, 2, 1],
    [2, 1, 1, 3, 3, 1],
    [2, 3, 1, 1, 3, 1],
    [2, 1, 3, 1, 1, 3],
    [2, 1, 3, 3, 1, 1],
    [2, 1, 3, 1, 3, 1],
    [3, 1, 1, 1, 2, 3],
    [3, 1, 1, 3, 2, 1],
    [3, 3, 1, 1, 2, 1],
    [3, 1, 2, 1, 1, 3],
    [3, 1, 2, 3, 1, 1],
    [3, 3, 2, 1, 1, 1],
    [3, 1, 4, 1, 1, 1],
    [2, 2, 1, 4, 1, 1],
    [4, 3, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 4],
    [1, 1, 1, 4, 2, 2],
    [1, 2, 1, 1, 2, 4],
    [1, 2, 1, 4, 2, 1],
    [1, 4, 1, 1, 2, 2],
    [1, 4, 1, 2, 2, 1],
    [1, 1, 2, 2, 1, 4],
    [1, 1, 2, 4, 1, 2],
    [1, 2, 2, 1, 1, 4],
    [1, 2, 2, 4, 1, 1],
    [1, 4, 2, 1, 1, 2],
    [1, 4, 2, 2, 1, 1],
    [2, 4, 1, 2, 1, 1],
    [2, 2, 1, 1, 1, 4],
    [4, 1, 3, 1, 1, 1],
    [2, 4, 1, 1, 1, 2],
    [1, 3, 4, 1, 1, 1],
    [1, 1, 1, 2, 4, 2],
    [1, 2, 1, 1, 4, 2],
    [1, 2, 1, 2, 4, 1],
    [1, 1, 4, 2, 1, 2],
    [1, 2, 4, 1, 1, 2],
    [1, 2, 4, 2, 1, 1],
    [4, 1, 1, 2, 1, 2],
    [4, 2, 1, 1, 1, 2],
    [4, 2, 1, 2, 1, 1],
    [2, 1, 2, 1, 4, 1],
    [2, 1, 4, 1, 2, 1],
    [4, 1, 2, 1, 2, 1],
    [1, 1, 1, 1, 4, 3],
    [1, 1, 1, 3, 4, 1],
    [1, 3, 1, 1, 4, 1],
    [1, 1, 4, 1, 1, 3],
    [1, 1, 4, 3, 1, 1],
    [4, 1, 1, 1, 1, 3],
    [4, 1, 1, 3, 1, 1],
    [1, 1, 3, 1, 4, 1],
    [1, 1, 4, 1, 3, 1],
    [3, 1, 1, 1, 4, 1],
    [4, 1, 1, 1, 3, 1],
    [2, 1, 1, 4, 1, 2],
    [2, 1, 1, 2, 1, 4],
    [2, 1, 1, 2, 3, 2],
    [2, 3, 3, 1, 1, 1]
  ]
}
