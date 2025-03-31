const articleNode = document.getElementsByClassName('page-break')[0]
const listNode = document.getElementById('ArticleList-Container')
const articleData = document.getElementById('Article-Data')
const dataAmount = parseInt(articleData.getAttribute('amount'))

let titleData = document.getElementById('Title-Data').innerText
let gtinData = document.getElementById('GTIN-Data').innerText.split(';')
let articleNrData = document
  .getElementById('ArticleNr-Data')
  .innerText.split(';')
let nameData = document.getElementById('Name-Data').innerText.split(';')
let priceData = document.getElementById('Price-Data').innerText.split(';')
let sourceData = document.getElementById('Source-Data').innerText.split(';')

document.getElementsByTagName('title')[0].innerText = titleData
document.getElementById('Article-Title').innerHTML = titleData

for (let index = 0; index < dataAmount; index++) {
  let toAppend = articleNode.cloneNode(true)
  let currentName = nameData[index].replace(/[\"]/g, '').replace(/[,]/g, '<br>')

  let barcode = []
  let width = [112]
  new C128(barcode, width, gtinData[index])
  var svgDiv = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgDiv.setAttribute('id', 'Barcode-Code128')
  svgDiv.setAttribute('width', '100%')
  svgDiv.setAttribute('height', '100%')
  svgDiv.setAttribute('viewBox', `0 0 ${width[0]} 100`)
  svgDiv.setAttribute('preserveAspectRatio', 'none')
  //   svgDiv.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  toAppend
    .querySelector('#Barcode-Container')
    .insertBefore(
      svgDiv,
      toAppend.querySelector('#Barcode-Container').firstChild
    )

  barcode.forEach(character => {
    toAppend.querySelector('#Barcode-Code128').innerHTML += character
  })

  var uvp = ''
  var attribute = ''
  var saved = 'clever gespart!'
  var value = articleDatabase['K' + articleNrData[index]]
  isDefined: if (value !== undefined) {
    attribute = value.attr
    var savedValue = value.uvp - parseFloat(priceData[index].replace(',', '.'))
    if (savedValue < 0.01) {
      break isDefined
    }
    uvp =
      '<p id="uvpTag">UVP</p><br><p id="uvpPrice">' +
      String(value.uvp).replace('.', ',') +
      '</p>'
    var savedText = `${value}`
    saved =
      savedValue.toFixed(2).replace('.', ',').replace('00', '-') + ' gespart!'
  }
  toAppend.querySelector('#ArticleNr').textContent = articleNrData[index]
  toAppend.querySelector('#Name').innerHTML = currentName
  toAppend.querySelector('#Price').textContent = priceData[index].replace(
    '00',
    '-'
  )
  toAppend.querySelector('#Source').textContent = sourceData[index]
  toAppend.querySelector('#GTIN').textContent = gtinData[index]
  toAppend.querySelector('#UVP-Container').innerHTML = uvp
  toAppend.querySelector('#Attr').innerHTML = attribute
  toAppend.querySelector('#Saved').textContent = saved
  listNode.appendChild(toAppend)
}

articleNode.remove()

function printList (h, r, l) {
  document.getElementById('print-style-h').disabled = !h
  document.getElementById('print-style-r').disabled = !r
  document.getElementById('print-style-l').disabled = !l
  window.print()
}
