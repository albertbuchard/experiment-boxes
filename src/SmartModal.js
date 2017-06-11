import $ from 'jquery'
import DragBox from './DragBox'
import { hasConstructor, delay } from './utilities'


/** Helper class creating modals */
export default class SmartModal extends DragBox {

  constructor(formatType = 'across', callback = null, buttonType = 'closebutton', boxElement = null,
    { stayInWindow = true,
    paddingTopBottom = 100,
    freeHeight = true } = { stayInWindow: true, paddingTopBottom: 100, freeHeight: true }) {
    // call super constructor
    super(boxElement)

    // constants
    this.DEFAULT_BUTTON_ROW_HTML = '<div class="col-xs-12 dragbox-row smartmodal-buttonrow"></div>'
    this.DEFAULT_BUTTON_HTML = {
      closebutton: '<button type="button" class="btn btn-secondary dragbox-button  smartmodal-closebutton">Close</button>',
      nextbutton: '<button type="button" class="btn btn-secondary dragbox-button smartmodal-nextbutton">Next</button>',
      blankbutton: '<button type="button" class="btn btn-secondary dragbox-button smartmodal-blankbutton"></button>',
      sendbutton: '<button type="button" class="btn btn-secondary dragbox-button smartmodal-sendbutton">Send</button>',
    }
    this.DEFAULT_FORMAT_TYPES = {
      // format type desribe the topOffset, width, and height of the modal in proportion
      // updatePosition is called when the window is resized
      centralSmall: [0.2, 0.4, 0.3],
      centralLarge: [0.2, 0.7, 0.6],
      across: [0.3, 1, 0.4],
      overlay: [0.1, 0.8, 0.8],
    }

    // callback
    this.callback = callback

    // ui
    this.draggable = false
    this.formatType = formatType
    this.stayInWindow = stayInWindow
    this.freeHeight = freeHeight
    this.paddingTopBottom = paddingTopBottom
    this.buttonRowHtml = this.DEFAULT_BUTTON_ROW_HTML

    if (!(buttonType in this.DEFAULT_BUTTON_HTML)) {
      throw new Error('buttonType invalid')
    }
    this.buttonType = buttonType

    // row hold the row object in dom as well as the bindedField object {rowDom: row, bindedField: bindedField}
    this.rows = []

    // set dragbox title
    this.title = '<center><h5>Smart Modal</h5></center>'

    // setup the button
    this.append(this.buttonRowHtml, '.dragbox-footer')
    this.append(
      this.DEFAULT_BUTTON_HTML[this.buttonType],
      '.smartmodal-buttonrow',
    )

    this.button = $(this.boxElement).find(`.smartmodal-${this.buttonType}`)

    // update position to fit the screen adequatly and show
    this.callAfterConstructor()

    // event listener for window resize updates the size and position.
    const smartModalObject = this
    $(window).resize(() => {
      smartModalObject.updatePosition()
    })

    // event listener on the button
    $(this.button).click(() => {
      smartModalObject.callThenDestroy()
    })
  }

  // after setup life cycle function
  callAfterConstructor() {
    // update position to fit the screen adequatly and show
    this.updateSize()
    this.updatePosition()
    // this.show()
  }

  // look for a callback then destroy
  callThenDestroy() {
    if (this.callback) {
      this.callback()
    }

    this.destroy()
  }

  // position function
  updatePosition() {
    // var coordinates = Dragbox.getCoordinateInWindow(this.boxElement);
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth
    const format = this.DEFAULT_FORMAT_TYPES[this.formatType]
    let topPos = format[0] * innerHeight
    const leftPos = innerWidth * ((1 - format[1]) / 2)
    const width = innerWidth * format[1]
    let height = innerHeight * format[2]

    if ((this.stayInWindow) && (this.boxElement.height() + topPos > innerHeight)) {
      this.freeHeight = false
      const offset = innerHeight - this.boxElement.height()
      topPos = offset > this.paddingTopBottom ? offset / 2 : this.paddingTopBottom / 2
      height = offset > this.paddingTopBottom ? innerHeight - offset : innerHeight - this.paddingTopBottom
      this.overflow = 'scroll'
    }

    this.width = width
    this.height = height


    $(this.boxElement).css({
      left: leftPos,
      top: topPos,
    })
    // $(this.boxElement).animate({
    //   left: leftPos,
    //   top: topPos,
    // }, 25, () => {})
    return false
  }


  set title(html) {
    if (this.boxElement) {
      $(this.boxElement).find('.dragbox-title').html(html)
      this.updateSize()
      delay(50).then(() => { this.updatePosition(); this.show() })
    }
  }

  set content(html) {
    if (this.boxElement) {
      this.contentDiv.html(html)
      this.updateSize()
      delay(50).then(() => { this.updatePosition(); this.show() })
    }
  }


  set buttonText(text = 'Close') {
    if (hasConstructor($, this.button) && hasConstructor(String, text)) {
      this.button.html(text)
    }
  }

  get buttonText() {
    if (hasConstructor($, this.button)) {
      return this.button.html()
    }
    return undefined
  }
}
