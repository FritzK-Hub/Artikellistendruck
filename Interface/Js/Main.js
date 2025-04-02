const Type = { HAENGEND: 0, REGAL: 1, PLAKAT: 2 }
const STYLESHEET_H = document.getElementById('print-style-h')
const STYLESHEET_R = document.getElementById('print-style-r')
const STYLESHEET_P = document.getElementById('print-style-p')
const FILE_NAME_Element = document.getElementById('file-name')

document.getElementById('Article-Title').textContent =
  FILE_NAME_Element.textContent
ARTICLE_TEMPLATE.remove()
/**
 * Switch between stylesheets to print the given type
 * @param {Type} type
 */
function printList (type) {
  STYLESHEET_H.disabled = type != Type.HAENGEND
  STYLESHEET_R.disabled = type != Type.REGAL
  STYLESHEET_P.disabled = type != Type.PLAKAT
  window.print()
}
