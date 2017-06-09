import $ from 'jquery'
import DragBox from './DragBox'
import BindedField from './BindedField'

/** Dragable box holding double binded parameters for live development */
export default class ParamBox extends DragBox {
  constructor(boxElement = null) {
    // call super constructor
    super(boxElement)

    // constants
    this.DEFAULT_ROW_HTML = '<div class="col-md-12 dragbox-row paramboxtmprow"></div>'

    this.PARAMBOX_EMPTY_SUBTITLE_ROW_HTML = '<div class="col-md-12 dragbox-row paramboxtmprow"><a class="parambox-subtitle">Subtitle</a></div>'

    this.PARAMBOX_EMPTY_ROW_HTML = '<div class="col-md-12 dragbox-row parambox-empty"><center>No parameters binded.</center></div>'

    this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row parambox-buttonrow"></div>'
    this.DEFAULT_BUTTON_HTML = {
      savebutton: '<button type="button" class="btn btn-secondary btn-block dragbox-button parambox-savebutton">Save</button>',
      importbutton: '<button type="button" class="btn btn-secondary  btn-block dragbox-button parambox-importbutton">Import</button>',
      reloadbutton: '<button type="button" class="btn btn-secondary btn-block dragbox-button parambox-reloadbutton">Reload</button>',
    }

    // setup the buttons
    this.append(this.DEFAULT_BUTTON_ROW_HTML, '.dragbox-footer')
    this.append(
      this.DEFAULT_BUTTON_HTML.savebutton,
      '.parambox-buttonrow',
      'col-xs-4',
    )
    this.append(
      this.DEFAULT_BUTTON_HTML.importbutton,
      '.parambox-buttonrow',
      'col-xs-4',
    )
    this.append(
      this.DEFAULT_BUTTON_HTML.reloadbutton,
      '.parambox-buttonrow',
      'col-xs-4',
    )

    const thisObject = this
    this.boxElement[0].getElementsByClassName(
      'parambox-savebutton',
    )[0].addEventListener('click', (e) => {
      thisObject.save(e)
    })
    this.boxElement[0].getElementsByClassName(
      'parambox-importbutton',
    )[0].addEventListener('click', (e) => {
      thisObject.import(e)
    })
    this.boxElement[0].getElementsByClassName(
      'parambox-reloadbutton',
    )[0].addEventListener('click', (e) => {
      thisObject.reloadAndImport(e)
    })

    $(document).on('click', '.parambox-subtitle', function clicked() {
      const id = $(this).attr('subtitle-id')
      $(`[parambox-belong-to='${id}']`).slideToggle(250)
    })

    // ui
    this.rowHtml = this.DEFAULT_ROW_HTML
    this.subtitleHtml = this.PARAMBOX_EMPTY_SUBTITLE_ROW_HTML

    // row hold the row object in dom as well as the bindedField object {rowDom: row, bindedField: bindedField}
    this.rows = []

    this.subtitleRows = {}

    // set dragbox title
    this.title = '<h4><i class="fa fa-cog fa-1x"></i> Parameter Box</h4>'

    // set overflow
    this.overflow = 'scroll'

    // Prevent freeHeight
    this.freeHeight = false

    // set prefix for exports TODO: IMPLEMENT IT IN EXPORTS
    if (typeof window.paramPrefixIncrement === 'undefined') {
      window.paramPrefixIncrement = 0
    } else {
      window.paramPrefixIncrement += 1
    }

    this.prefix = `paramBox${window.paramPrefixIncrement}`

    // update size and refreshView
    this.updateSize()

    this.refreshView()
  }

  // binding methods
  bind(object, properties, options = null) {
    if (typeof object === 'undefined') {
      throw new Error('object is undefined')
    }

    let objectHierarchy = null

    if (properties.constructor !== Array) {
      properties = [properties]
    }

    for (let i = 0; i < properties.length; i++) {
      objectHierarchy = this.getDescendantProp(object, properties[i])
      // TODO use lodash ?
      const objectTemp = objectHierarchy[0]
      const property = objectHierarchy[1]

      const underscoredHierarchy = properties[i].replace(/\./g, '')
      const subtitle = properties[i].substring(0, properties[i].lastIndexOf('.'))

      const rowDom = this.newRowInDom(subtitle)
      let bindedField = null

      /* --- look for a value in the query string for this property --- */
      let initialValue = null
      if (typeof this.queryString[underscoredHierarchy] !== 'undefined') {
        initialValue = this.queryString[underscoredHierarchy]
      }

      // look for a constrained field
      if ((options !== null) && (typeof options[properties[i]] !== 'undefined')) {
        let type = options[properties[i]].type || 'input'
        let constraintValues = null
        if (options[properties[i]].constructor === Array) {
          constraintValues = options[properties[i]]
          type = options[properties[i]].type || 'select'
        } else if (typeof options[properties[i]].values !== 'undefined') {
          constraintValues = options[properties[i]].values
          type = options[properties[i]].type || 'select'
        }


        if (initialValue !== null) {
          if ((constraintValues !== null) && (type !== 'slider') && (constraintValues.indexOf(initialValue) === -1)) {
            throw new Error(`ParamBox.bind: cannot set initial value to query string value of ${initialValue} because it is not in the options array.`)
          }

          objectTemp[property] = objectTemp[property].constructor(initialValue)
        }

        bindedField = new BindedField(
            objectTemp,
            property,
            rowDom,
            type,
            constraintValues,
            properties[i],
          )
      }


      // if no constrained field found, create the most relevant type of field
      if (bindedField === null) {
        if (initialValue !== null) {
          objectTemp[property] = objectTemp[property].constructor(initialValue)
        }

        if (objectTemp[property].constructor === Boolean) {
          bindedField = new BindedField(
            objectTemp,
            property,
            rowDom,
            'select', ['TRUE', 'FALSE'],
            properties[i],
          )
        } else {
          bindedField = new BindedField(
            objectTemp,
            property,
            rowDom,
            'input',
            null,
            properties[i],
          )
        }
      }

      this.rows.push(this.getBindedRow(rowDom, bindedField))
    }

    this.refreshView()
  }

  unbind(object, property) {
    for (let i = 0; i < this.rows.length; i++) {
      const bindedField = this.rows[i].bindedField

      if (bindedField.object === object && bindedField.property === property) {
        this.rows.splice(i, 1)
        bindedField.delete()
      }
    }

    this.refreshView()
  }

  // ui methods
  newRowInDom(subtitle = '') {
    if (subtitle !== '') {
      if (!(subtitle in this.subtitleRows)) {
        let subtitleRow = null
        $(this.boxElement).find('.dragbox-content').append(this.subtitleHtml)
        subtitleRow = this.boxElement.find('.paramboxtmprow')
        $(subtitleRow)
          .removeClass('paramboxtmprow')
          .find('a')
          .attr('subtitle-id', subtitle)
          .text(subtitle)
        this.subtitleRows[subtitle] = $(subtitleRow)
      }
    }

    let row = null
    $(this.boxElement).find('.dragbox-content').append(this.rowHtml)
    row = this.boxElement.find('.paramboxtmprow')
    $(row).removeClass('paramboxtmprow').attr('parambox-belong-to', subtitle)

    return row
  }

  getBindedRow(rowDom, bindedField) { // eslint-disable-line
    return {
      rowDom,
      bindedField,
    }
  }

  refreshView() {
    // TODO: maybe check if all binded field are displayed in the paramBox. if not add them. get rid of unbinded field
    /* --- Add an export button if there is at least one binded property --- */
    if (this.rows.length) {
      this.boxElement[0].getElementsByClassName(
        'parambox-buttonrow',
      )[0].style.visibility = 'visible'
    } else {
      this.boxElement[0].getElementsByClassName(
        'parambox-buttonrow',
      )[0].style.visibility = 'hidden'
      // TODO: add empty message
    }

    /* --- Adapt the box's height to the number of parameters --- */
    let height = 80 + (this.rows.length * 75)
    if (height > 600) {
      height = 600
    }

    this.height = height
  }

  keyfunction(e) {
    // check if shift + P hotkeys were stroke and toggle visibility if so
    this.map[e.keyCode] = e.type === 'keydown'

    // hide and show parameter box
    if (this.map[16] && this.map[80]) {
      // 16 == Shift - 80 == P
      // make sure to reset value in case keyup event is ignored (keep shift true for rapid toggle)
      this.map[80] = false

      // toggle box visibility
      this.toggle()

      // prevent default action if any
      e.preventDefault()
    }
  }

  /* ======== Import/Export functions ======== */
  getSummaryArray() {
    const summaryArray = []
    for (let i = 0; i < this.rows.length; i++) {
      const bindedField = this.rows[i].bindedField
      summaryArray.push({
        property: bindedField.property,
        value: bindedField.value,
        hierarchy: bindedField.hierarchy,
        exportName: bindedField.exportName,
      })
    }

    return summaryArray
  }

  import() {
    // make it a smart form
    // but while smart forms are finished use a simple prompt
    const importedString = prompt('Enter a JSON string:')
    let importedJSON = null
    try {
      importedJSON = JSON.parse(importedString)
    } catch (e) {
      console.error('ParamBox.import: Invalid JSON string - Parsing error:', e)
    }

    if (importedJSON !== null) {
      if (importedJSON.constructor !== Array) {
        console.error(
          'ParamBox.import: Invalid JSON string - the parent object needs to be of the same structure as the summaryArray',
        )
      }

      for (let i = 0; i < importedJSON.length; i++) {
        if (typeof importedJSON[i].property === 'undefined') {
          console.error(
            `ParamBox.import: importedJSON[${i
            }].property is undefined. Invalid JSON string - the parent object needs to be of the same structure as the summaryArray.`,
          )
        }
        if (typeof importedJSON[i].value === 'undefined') {
          console.error(
            `ParamBox.import: importedJSON[${i
            }].value is undefined. Invalid JSON string - the parent object needs to be of the same structure as the summaryArray.`,
          )
        }

        this.setProperty(importedJSON[i].property, importedJSON[i].value)
      }
    }
  }

  save() {
    // get summary array
    const summaryArray = this.getSummaryArray()

    // stringify summary object
    const stringified = JSON.stringify(summaryArray, null, 2)

    // opens a new window with the stringified json
    let height = 30 + (summaryArray.length * 70)
    if (height > 500) {
      height = 500
    }
    window.open(
      `data:application/json;${
      window.btoa ? `base64,${btoa(stringified)}` : stringified}`,
      'ParamBox.save',
      `width=400,height=${height}`,
    )
  }

  reloadAndImport() {
    /* --- Serialize the parameters in URL format --- */
    const summaryArray = this.getSummaryArray()
    let str = ''
    for (let i = 0; i < summaryArray.length; i++) {
      if (str !== '') {
        str += '&'
      }
      str += `${summaryArray[i].exportName}=${
        encodeURIComponent(summaryArray[i].value)}`
    }

    /* --- Append the parameters and reload the page --- */
    let url = window.location.href
    const questionPosition = url.indexOf('?')
    if (questionPosition !== -1) {
      // delete arguments from the URL
      url = url.substring(0, questionPosition)
    }
    url += `?${str}`
    window.location.href = url
  }

  /**
   * Gets the last object and property from a string description of object hierachy
   * @param  {object} object      Top object from which the hierarchy starts
   * @param  {string} description String describing the object hierachy (e.g this.object.has.property )
   * @return {array}             [parentObject, lastProperty, propertyValue]
   */
  getDescendantProp(object, description) { // eslint-disable-line
    const arr = description.split('.')
    let parentObject = null
    let lastProperty = null

    while (arr.length) {
      parentObject = object
      lastProperty = arr.shift()

      if (typeof object[lastProperty] === 'undefined') {
        throw new Error(`object property ${lastProperty} is undefined`)
      }

      object = object[lastProperty]
    }

    /* the last object of the while is the value of the specified property */
    const propertyValue = object

    return [parentObject, lastProperty, propertyValue]
  }

  setProperty(property, value) {
    if (property.constructor !== String) {
      throw new Error('ParamBox.setProperty: property needs to be a string.')
    }

    let found = false
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].bindedField.property === property) {
        this.rows[i].bindedField.value = value
        found = true
      }
    }

    if (found === false) {
      console.warn(`ParamBox.setProperty: did not find property ${property}`)
    }
  }
}
