const CSV_Element = document.getElementById('csv-data')
const ARTICLE_TEMPLATE =
  document.getElementsByClassName('article page-break')[0]
const ARTICLE_LIST_CONTAINER = document.getElementById('ArticleList-Container')

var parsedCSV = []

function parseCSV () {
  CSV_Element.innerHTML.split('\n').forEach(element => {
    parsedCSV.push(element.split(';'))
  })
  parsedCSV.shift()
  parsedCSV.pop()
}

function createArticles () {
  parsedCSV.forEach(element => {
    var articleElement = ARTICLE_TEMPLATE.cloneNode(true)
    appendField(articleElement, 'field barcode', element[0])
    appendField(articleElement, 'field articleNr', element[1])
    appendField(articleElement, 'field source', cleanSource(element[5]))
    appendField(articleElement, 'field name', element[2])
    appendField(articleElement, 'field price', element[3])

    appendAttributes(articleElement, element[1], element[3])

    ARTICLE_LIST_CONTAINER.appendChild(articleElement)
  })
}

/**
 *
 * @param {string} source
 * @returns
 */
function cleanSource (source) {
  return source
    .replace('Strecke ', '')
    .replace('Lager ', '')
    .replace('(MTS-Intertec)', '')
    .replace('GmbH & Co.KG', '')
    .replace('GmbH', '')
    .replace('Co.KG', '')
    .replace(' SE - Logistik Hof', '')
    .replace('Papierwaren und Konsumgüter', '')
}

function appendAttributes (parent, articleNr, price) {
  var uvp = ''
  var info = ''
  var saved = 'clever gespart!'
  var article = articleDatabase['K' + articleNr]

  isDefined: if (article !== undefined) {
    info = article.attr
    var savedValue = article.uvp - parseFloat(price.replace(',', '.'))
    if (savedValue < 0.01) break isDefined

    uvp = `<p id="uvpTag">UVP</p><br><p id="uvpPrice">${article.uvp
      .toFixed(2)
      .replace('.', ',')}</p>`
    saved =
      savedValue.toFixed(2).replace('.', ',').replace('00', '-') + ' gespart!'
  }

  parent.getElementsByClassName('field attributes hide')[0].innerHTML = info
  parent.getElementsByClassName('field uvp hide')[0].innerHTML = uvp
  parent.getElementsByClassName('field saved hide')[0].innerHTML = saved
}

function appendField (parent, className, value) {
  var field = parent.getElementsByClassName(className)[0]
  var fieldP = field.getElementsByTagName('p')[0]

  if (className == 'field barcode') {
    field.insertBefore(C128.createElement(value), fieldP)
  }
  fieldP.textContent = value
}

parseCSV()
createArticles()
ARTICLE_TEMPLATE.remove()
