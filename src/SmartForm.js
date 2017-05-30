import $ from 'jquery'
import DragBox from './DragBox'
import BindedField from './BindedField'
import { mandatory, debuglog, extend, delay } from './utilities'

// TODO: Class generating a form based on preset fields and managing */
export default class SmartForm extends DragBox {
  /**
   * Smart form receives two parameters SmartForm({options}, boxElement)
   * @method constructor
   * options = {
   * @param  {Object}       [fields=mandatory()]     type = null : input, select, textaera, slider, radio
   *                                                 constraints =  null : list of constraints that will be automatically verified: mandatory; alpha; numeric; lenght:XX; contains:a,b,@,.;
   *                                                 authorizedValues: '': authorized values TODO maybe merge it with constraints
   *                                                 value: '': field value / initial value
   * @param  {String}       [format='overlay']       [description]
   * @param  {Numeric}      [height=null]           [description]
   * @param  {Numeric}      [width=null]            [description]
   * @param  {Function}     [callback=null]        [description]
   * @param  {String}       [url=null]               [description]
   * @param  {Function}     [verificationFunction=() => true }] [description]
   * }
   * @param  {Object}       [boxElement=null]        [description]
   * @return {SmartForm}                             [description]
   */
  constructor({
    fields = mandatory(),
    title = 'Form',
    format = 'overlay',
    height = null,
    width = null,
    callback = null,
    url = null,
    target = '_blank',
    verificationFunction = () => true,
    freeHeight = true,
    noPageScroll = true, // if set to true the height is free until reaching the limit of the page in heigh, then it is set not to go beyond it -20px
  }, boxElement = null) {
    if (fields.constructor !== Object) {
      throw new Error('SmartForm: fields is not an object.')
    }
    /* --- Create the DragBox for the form --- */
    super(boxElement)

    // constants
    this.DEFAULT_ROW_HTML = '<div class="col-md-12 dragbox-row smartformtmprow"></div>'

    this.EMPTY_SUBTITLE_ROW_HTML = '<div class="col-md-12 dragbox-row smartformtmprow"><a class="smartform-subtitle">Subtitle</a></div>'

    this.smartform_EMPTY_ROW_HTML = '<div class="col-md-12 dragbox-row smartform-empty"><center>No parameters binded.</center></div>'
    this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row smartform-buttonrow"></div>'
    this.DEFAULT_BUTTON_HTML = {
      sendbutton: '<button type="button" class="btn btn-secondary dragbox-button smartform-sendbutton">Send</button>',
    }
    this.DEFAULT_FORMAT_TYPES = {
      // format type desribe the topOffset, width, and height of the modal in proportion
      // updatePosition is called when the window is resized
      centralSmall: [0.2, 0.4, 0.3],
      centralLarge: [0.2, 0.7, 0.6],
      across: [0.3, 1, 0.4],
      overlay: [0.1, 0.8, 0.8],
      topCentralSmall: [0.1, 0.4, 0.3],
      topCentralLarge: [0.1, 0.7, 0.6],
    }

    // ui
    this.rowHtml = this.DEFAULT_ROW_HTML
    this.subtitleHtml = this.EMPTY_SUBTITLE_ROW_HTML


    // TODO Create the form element IF url !== null, else only use the callback to handle data.
    // constraints can be functions like checkPassword(x) { return (bool) }
    // There is constraint function by default
    this.formElement = null
    this.formId = null
    if (url !== null) {
      this.formId = `smartform-${this.boxId}`
      this.append(`<form id='${this.formId}' action="${url}" method="post" target="${target}">`)
      this.formElement = this.boxElement.find(`#${this.formId}`).get()
    }

    /**
     * Holds a reference to the fields by key
     * @type {Object}
     */
    this.fields = {}
    const keys = Object.keys(fields)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // fields needs to have a name and type property
      if (typeof fields[key].type === 'undefined') {
        throw new Error(`SmartForm: field[${i}].type is undefinned`)
      }
      const baseField = {
        type: null,
        constraints: null, // list of constraints that will be automatically verified: mandatory; alpha; numeric; lenght:XX; contains:a,b,@,.;
        authorizedValues: '', // athorized values
        bindedField: null,
        parent: null,
        value: '',
        row: null,
        title: key,
      }
      fields[key] = extend(baseField, fields[key]) // TODO Either migrate to lodash or rewrite an extend function as well a a keys function
      this.fields[key] = fields[key]
      // TODO Create a form row
      this.fields[key].row = this.newRowInDom(this.fields[key].parent)
      this.fields[key].bindedField = new BindedField(this.fields[key], 'value', this.fields[key].row, this.fields[key].type, this.fields[key].authorizedValues, null,
      { constraints: this.fields[key].constraints, title: this.fields[key].title }) // TODO transform the call to an option object with parameters
    }
    if (url !== null) {
      this.append('</form>')
    }


    // callback
    this.callback = typeof callback === 'function' ? callback : (fields) => { debuglog(fields) }
    this.verificationFunction = verificationFunction

    // ui
    this.draggable = false
    this.overflow = 'scroll'
    this.freeHeight = freeHeight
    this.initialFreeHeigth = freeHeight
    this.noPageScroll = noPageScroll
    this.formatType = format // TODO add height/width custom definition
    this.buttonRowHtml = this.DEFAULT_BUTTON_ROW_HTML

    this.buttonType = 'sendbutton'

    // set dragbox title
    this.title = `<center><h5>${title}</h5></center>`

    // setup the button
    this.append(this.buttonRowHtml, '.dragbox-footer')
    this.append(
      this.DEFAULT_BUTTON_HTML[this.buttonType],
      '.smartform-buttonrow',
    )

    this.button = $(this.boxElement).find(`.smartform-${this.buttonType}`)

    // update position to fit the screen adequatly and show
    this.callAfterConstructor()

    // event listener for window resize updates the size and position.
    $(window).resize(() => {
      this.updatePosition()
    })

    // event listener on the button
    $(this.button).click(() => {
      if (this.verify() && this.verificationFunction()) {
        this.callThenDestroy()
      }
    })

    $(document).on('click', '.smartform-subtitle', function clicked() {
      const id = $(this).attr('subtitle-id')
      $(`[smartform-belong-to='${id}']`).slideToggle(250)
    })
  }

  /* ======= Verification methods ======= */
  verify() {
    let returnValue = true
    for (const field in this.fields) {
      if (this.fields[field].hasOwnProperty('bindedField')) {
        const [valid, msg] = this.fields[field].bindedField.verify()
        if (!valid) {
          this.fields[field].bindedField.incorrect(msg)
          returnValue = false
        } else {
          this.fields[field].bindedField.correct()
        }
      }
    }
    return returnValue
  }

  // after setup life cycle function
  callAfterConstructor() {
    // update position to fit the screen adequatly and show
    this.updatePosition()
    this.updateSize()
    this.show()
  }

  // look for a callback then destroy
  callThenDestroy() {
    if (this.callback) {
      this.callback(this.fields)
    }

    if (this.formElement !== null) {
      this.formElement.submit()
    }

    this.destroy()
  }


  /* ======= UI Methods ======= */
  newRowInDom(subtitle = '') {
    if (subtitle) {
      if (!(subtitle in this.subtitleRows)) {
        let subtitleRow = null
        this.contentElement.append(this.subtitleHtml)
        subtitleRow = this.boxElement.find('.smartformtmprow')
        $(subtitleRow)
          .removeClass('smartformtmprow')
          .find('a')
          .attr('subtitle-id', subtitle)
          .text(subtitle)
        this.subtitleRows[subtitle] = $(subtitleRow)
      }
    }

    let row = null
    this.contentElement.append(this.rowHtml)
    row = this.boxElement.find('.smartformtmprow')
    $(row).removeClass('smartformtmprow').attr('smartform-belong-to', subtitle)


    return row
  }

  // position function
  updatePosition() {
    // var coordinates = Dragbox.getCoordinateInWindow(this.boxElement);
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth
    const format = this.DEFAULT_FORMAT_TYPES[this.formatType]
    const topPos = format[0] * innerHeight
    const leftPos = innerWidth * ((1 - format[1]) / 2)
    $(this.boxElement).css({
      left: leftPos,
      top: topPos,
    })
    delay(10).then(() => {
      const width = innerWidth * format[1]
      if (!this.initialFreeHeigth) {
        this.height = innerHeight * format[2]
      } else if ((this.initialFreeHeigth) && (this.noPageScroll) && (this.boxElement.height() + topPos > innerHeight - 20)) {
        this.freeHeight = false
        this.height = innerHeight - 20 - topPos
      }

      this.width = width
    })
    // $(this.boxElement).animate({
    //   left: leftPos,
    //   top: topPos,
    // }, 25, () => {})
    return false
  }
}
