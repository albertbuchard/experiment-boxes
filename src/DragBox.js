import $ from 'jquery'
import { debuglog, delay } from './utilities'

/** Dragable div - Parent class suporting the toolbox  */
export default class DragBox {
  constructor(boxElement = null, width = null, height = null) {
    // mock window if in node
    if (typeof window === 'undefined') {
      global.window = {}
    }

    this.freeHeight = true
    if (height !== null) {
      this.freeHeight = false
    }
    // constants
    this.MAX_BINDED_PROPERTIES = 15
    this.INIT_WIDTH = width || 400
    this.INIT_HEIGHT = height || 300
    this.TITLE_HEIGHT = 36
    this.FOOTER_HEIGHT = 34
    this.DEFAULT_BOX_THEME = 'dragbox-gray'
    this.DEFAULT_DRAGGABLE = true
    this.DEFAULT_STICKINESS_TYPE = 'magnetized'

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

    // ui variables
    this.boxId = null
    this.boxElement = boxElement
    this.draggable = this.DEFAULT_DRAGGABLE
    this.boxHTML = null

    // stickness
    this.shouldStick = null
    this.shouldMagnetize = null
    this.isStickingX = null
    this.isStickingY = null

    this.stickiness = this.DEFAULT_STICKINESS_TYPE

    // private
    this._beingDragged = false
    this._visibility = 'hidden'
    this._overflow = 'hidden'
    this._boxClass = this.DEFAULT_BOX_THEME
    this._width = this.INIT_WIDTH
    this._height = this.INIT_HEIGHT

    // keyboard variables
    // maps the keys pressed with either true on kedown or false on keyup
    this.map = []

    // keep mouse position at all times
    this.currentMousePos = {
      x: -1,
      y: -1,
    }

    const thisObject = this

    $(document).mousemove((event) => {
      thisObject.currentMousePos.x = event.pageX
      thisObject.currentMousePos.y = event.pageY
    })

    // check if the box already exists, else create it
    if (!this.boxElement) {
      // get a unique ID for the box
      this.boxId = `dragbox${$('div[id*="dragbox"]').length + 1}`

      // html for creation
      this.boxHTML = `<div id="${this.boxId}" class="dragbox ${this._boxClass}" style="display:none;" draggable="false">
          <div class="col-xs-12 dragbox-container">
            <div class="col-xs-12 dragbox-title centered"><h3>Dragbox</h3></div>
          <div class="col-xs-12 dragbox-content"></div>
          <div class="col-xs-12 dragbox-footer"></div>
        </div>`

      $(document.body).append(this.boxHTML)
      this.boxElement = $(`#${this.boxId}`)
    } else {
      this.boxId = $(this.boxElement).attr('id')
    }

    // set class
    this.boxClass = $(this.boxElement).attr('class')

    // set size
    this.width = this._width
    this.height = this._height

    // set overflow
    this.overflow = 'hidden'

    // keyboard show hide hotkeys events
    $(document.body).keydown((e) => {
      thisObject.keyfunction(e)
    })
    $(document.body).keyup((e) => {
      thisObject.keyfunction(e)
    })

    // when clicked bring  dragbox
    $(this.boxElement).click(() => {
      $('.dragbox').css('zIndex', 10)
      $(thisObject.boxElement).css('zIndex', 100)
    })

    $(this.boxElement).find('.dragbox-title').mousedown((e) => {
      thisObject.startDrag(e)
    })
    $(this.boxElement).find('.dragbox-title').mouseup((e) => {
      thisObject.stopDrag(e)
    })

    // draggin cleanUp event
    $(document).click((e) => {
      thisObject.stopDrag(e)
    })

    /* --- Load the query string if reload and import was used --- */
    this.queryString = DragBox.getQueryString()
  }
  // destroy
  destroy() {
    // fade out and remove from DOM
    const thisObject = this
    $(this.boxElement).animate({
      opacity: 0,
    }, 25, () => {
      $(thisObject.boxElement).remove()
    })
  }

  // size methods
  updateSize() {
    $(this.boxElement).width(this.width)
    if (!this.freeHeight) {
      const currentHeight = this.boxElement.height()
      const currentContentHeight = this.boxElement.find('.dragbox-content').height()
      const difference = currentHeight - this.height
      $(this.boxElement)
        .find('.dragbox-content')
        .css({
          height: Math.max(currentContentHeight - difference, 50),
        })
      // $(this.boxElement).height(this.height)
      // const contentHeight = this.height - this.TITLE_HEIGHT - this.FOOTER_HEIGHT - 7
      // $(this.boxElement).css({
      //   height: this.height,
      //   width: this.width,
      // })
      // $(this.boxElement)
      //   .find('.dragbox-container')
      //   .css({
      //     height: this.height,
      //   })
      // $(this.boxElement)
      //   .find('.dragbox-content')
      //   .css({
      //     height: contentHeight,
      //   })
    } else {
      $(this.boxElement).css({
        width: this.width,
      })
    }
  }

  // drag methods
  startDrag(e) {
    // prevent classic dragging from happening
    e.preventDefault()

    // check if already being dragged, stop the dragging if so
    if (this.beingDragged) {
      this.beingDragged = false
      return null
    }

    if (!this.draggable) {
      return null
    }

    // calculate X and Y offset of the mouse compare to the top left corner of the box
    const offset = {
      x: e.clientX - $(this.boxElement).offset().left,
      y: e.clientY - $(this.boxElement).offset().top,
    }

    // set the beingdragged flag to true
    this.beingDragged = true

    // start the update loop for smooth dragging
    this.loopDrag(offset)

    // another way of preventing default, just in case
    return false
  }

  stopDrag() {
    this.beingDragged = false
  }

  loopDrag(offset) {
    if (this.beingDragged === true) {
      const newPosX = this.currentMousePos.x - offset.x
      const newPosY = this.currentMousePos.y - offset.y

      const element = {
        offsetLeft: newPosX,
        offsetTop: newPosY,
        offsetWidth: $(this.boxElement).width(),
        offsetHeigth: $(this.boxElement).height(),
      }

      // maintain box totally visible and check for sticky borders
      const constrainedPosition = DragBox.stayInWindow(element)
      let constrainedPositionX = constrainedPosition.x
      let constrainedPositionY = constrainedPosition.y

      // stickiness
      // glue
      if (this.shouldStick) {
        // make the box sticky if collided with x border
        if ((constrainedPosition.stickyX === -2) || (constrainedPosition.stickyX === 2)) {
          this.isStickingX = true
        }

        // for sticky window, check if the box got out of the sticky x aera before authorizing movement in x
        if (this.isStickingX && constrainedPosition.stickyX !== 0) {
          constrainedPositionX = constrainedPosition.leftSticky // stick to the window
        }

        // make sure stickiness disapears when out of the sticky zone
        if (constrainedPosition.stickyX === 0) {
          this.isStickingX = false
        }

        // make the box sticky if collided with y border
        if ((constrainedPosition.stickyY === -2) || (constrainedPosition.stickyY === 2)) {
          this.isStickingY = true
        }

        // for sticky window, check if the box got out of the sticky y aera before authorizing movement in y
        if (this.isStickingY && constrainedPosition.stickyY !== 0) {
          constrainedPositionY = constrainedPosition.topSticky // stick to the window
        }

        // make sure stickiness disapears when out of the sticky zone
        if (constrainedPosition.stickyY === 0) {
          this.isStickingY = false
        }
      }

      // magnet
      if (this.shouldMagnetize) {
        constrainedPositionX = constrainedPosition.leftSticky
        constrainedPositionY = constrainedPosition.topSticky
      }

      const thisObject = this
      $(this.boxElement).animate({
        left: constrainedPositionX,
        top: constrainedPositionY,
      }, 25, () => { thisObject.loopDrag(offset) })
    }
  }

  // keyboard functions
  keyfunction() {
    // check if shift + P hotkeys were stroke and toggle visibility if so
    debuglog('dragbox: keyfunction() called.', this)
  }

  // visibility functions
  toggle() {
    // toggle box visibility
    if (this.visibility === 'hidden') {
      this.visibility = 'visible'
    } else {
      this.visibility = 'hidden'
    }
  }

  show() {
    this.visibility = 'visible'
  }

  hide() {
    this.visibility = 'hidden'
  }

  // content function
  /**
   * Add the specified html code to the specified target.
   * If wrapInDivClass is set, a div of specified class is created around the html code. This could be usefull to set grid class like 'col-xs-12'.
   * @param  {string} html           html to append to the target
   * @param  {String} to             target identifier eg .target-class or #targetID
   * @param  {String} wrapInDivClass Null by default. If set, creates a div with specified class wrapping the html code.
   */
  append(html, to = '.dragbox-content', wrapInDivClass = null, type = 'append') {
    // TODO Convert all element creation to pure javascript -- make a react version
    // append html to the selected child element of the dragbox
    if (this.boxElement) {
      if (wrapInDivClass !== null) {
        html = `<div class="${wrapInDivClass}" >${html}</div>`
      }

      if (type !== 'prepend') {
        type = 'append'
      }

      if (to !== 'container') {
        (this.boxElement.find(to))[type](html)
      } else {
        this.boxElement[type](html)
      }
    }
  }

  prepend(html, to = '.dragbox-content', wrapInDivClass = null) {
    this.append(html, to, wrapInDivClass, 'prepend')
  }

  /**
   * set or get html of the selected child element of the DragBox
   * @param  {String} child child selector
   * @param  {?string} value Either null if you want to get the html or a string to set the html of the node
   * @return {?string}       If value is null, returns a string of the html content of the node.
   */
  html(child = '.dragbox-content', value = null) {
    if (this.boxElement) {
      const target = (child !== 'container') ? this.boxElement.find(child) : this.boxElement

      if (value !== null) {
        target.html(value)
        return value
      }

      return target.html()
    }

    return null
  }

  /* ======== Setters and getters ======== */
  set width(width) {
    this._width = width
    this.updateSize()
  }

  get width() {
    return this._width
  }

  set height(height) {
    this._height = height
    this.updateSize()
  }

  get height() {
    return this._height
  }

  set scrollHeigth(val) {
    // read-only
  }

  get scrollHeight() {
    if (this.boxElement) {
      return this.boxElement.height() - this.contentElement.height() + this.contentElement.get(0).scrollHeight
    }
    return undefined
  }

  set beingDragged(dragged) {
    this._beingDragged = dragged
    $(this.boxElement).attr('beingDragged', dragged)
  }

  get beingDragged() {
    return this._beingDragged
  }

  set boxClass(newClass) {
    if (this.boxElement) {
      if (typeof newClass !== 'string') {
        throw new Error('newClass must be a string')
      }

      // if there is more than one class in the string take the first one
      // var spacePos = newClass.indexOf(" ");
      // if (spacePos != -1) {
      //   newClass = newClass.substr(0, spacePos);
      // }
      // remove the old class from the boxElement and add the new class
      this.boxElement.removeClass(this.boxClass).addClass(newClass)
      this._boxClass = newClass
    }
  }

  get boxClass() {
    if (this.boxElement) {
      return this._boxClass
    }
    return null
  }

  set visibility(visibility) {
    this._visibility = visibility
    if (visibility === 'visible') {
      // $(this.boxElement).animate({
      //   opacity: 1.0
      // }, 150);
      $(this.boxElement).show()
    } else {
      // $(this.boxElement).animate({
      //   opacity: 0.0
      // }, 150);
      $(this.boxElement).hide()
    }
  }

  get visibility() {
    return this._visibility
  }

  set overflow(overflow) {
    this._overflow = overflow
    $(this.boxElement).find('.dragbox-content').css('overflow-y', overflow)
  }

  get contentElement() {
    return $(this.boxElement).find('.dragbox-content')
  }

  set contentElement(element) {
    console.warn('DragBox.contentElement: read-only for now')
  }

  get overflow() {
    return this._overflow
  }

  /**
   * Variable defining how the box behaves near screen limit, weither it stick "glue", it magnetize "magnetized" or it has no interaction "none".
   * @return {string} Either glue, or magnetized
   */
  static get stickiness() { /**/ }
  static get title() { /**/ }

  get stickiness() {
    return this._stickiness
  }

  set stickiness(type) {
    // different type of stickyness for the box : "none", "glue", "magnetized"
    switch (type) {
      case 'glue':
        this.shouldStick = true
        this.shouldMagnetize = false
        debuglog('stickiness set to glue')
        break
      case 'magnetized':
        this.shouldStick = false
        this.shouldMagnetize = true
        debuglog('stickiness set to magnetized')
        break
      default:
        this.shouldMagnetize = false
        this.shouldStick = false
        debuglog('Parambox: stickiness set to none')
    }
    this._stickiness = type
  }

  get title() {
    if (this.boxElement) {
      $(this.boxElement).find('.dragbox-title').html()
    }
  }

  set title(html) {
    if (this.boxElement) {
      $(this.boxElement).find('.dragbox-title').html(html)
      this.updateSize()
    }
  }

  set content(html) {
    if (this.boxElement) {
      this.contentDiv.html(html)
      this.updateSize()
    }
  }

  get content() {
    if (this.boxElement) {
      return this.contentDiv.html()
    }

    return null
  }

  get contentDiv() {
    if (this.boxElement) {
      return $(this.boxElement).find('.dragbox-content')
    }

    return null
  }

  /* =============== Helper functions =============== */
  /**
   * From http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters?page=1&tab=votes#tab-top
   * @return {Array} Array containing variables of the location string.
   */
  static getQueryString() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    const queryString = {}
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      // If first entry with this name
      if (typeof queryString[pair[0]] === 'undefined') {
        queryString[pair[0]] = decodeURIComponent(pair[1])
        // If second entry with this name
      } else if (typeof queryString[pair[0]] === 'string') {
        const arr = [queryString[pair[0]], decodeURIComponent(pair[1])]
        queryString[pair[0]] = arr
        // If third or later entry with this name
      } else {
        queryString[pair[0]].push(decodeURIComponent(pair[1]))
      }
    }
    return queryString
  }

  /* ======== Static ======== */
  // TODO make non static probably
  // some static helper functions
  static stayInWindow(element) {
    if (typeof element === 'undefined') {
      throw new Error('element is undefined')
    }

    // constants
    const STOP_BEING_STICKY_AFTER = 0.15

    // times the size in distance
    // coordinates
    const left = element.offsetLeft
    const right = element.offsetLeft + element.offsetWidth
    const top = element.offsetTop
    const bottom = element.offsetTop + element.offsetHeigth

    const maxLeft = window.innerWidth - element.offsetWidth
    const maxTop = window.innerHeight - element.offsetHeigth

    // TODO Clarify the integer constants and do not use nested ternary if possible
    return {
      x: left < 0 ? 0 : right > window.innerWidth ? maxLeft : left,
      y: top < 0 ? 0 : bottom > window.innerHeight ? maxTop : top,
      stickyX: left <= 0 ?
        -2 : left <= STOP_BEING_STICKY_AFTER * element.offsetWidth ?
        -1 : right >= window.innerWidth ?
        2 : right >= (window.innerWidth - (STOP_BEING_STICKY_AFTER * element.offsetWidth)) ?
        1 : 0,
      stickyY: top <= 0 ? -2 :
        top <= STOP_BEING_STICKY_AFTER * element.offsetHeigth ? -1 :
        bottom >= window.innerHeight ? 2 :
        bottom >= (window.innerHeight - (STOP_BEING_STICKY_AFTER * element.offsetHeigth)) ? 1 :
        0,
      leftSticky: left <= 0 ? 0 :
        left <= STOP_BEING_STICKY_AFTER * element.offsetWidth ? 0 :
        right >= window.innerWidth ? window.innerWidth - element.offsetWidth :
        (right >= window.innerWidth - (STOP_BEING_STICKY_AFTER * element.offsetWidth)) ? window.innerWidth - element.offsetWidth :
        left,
      topSticky: top <= 0 ? 0 :
        top <= STOP_BEING_STICKY_AFTER * element.offsetHeigth ? 0 :
        bottom >= window.innerHeight ? window.innerHeight - element.offsetHeigth :
        bottom >= window.innerHeight - (STOP_BEING_STICKY_AFTER * element.offsetHeigth) ? window.innerHeight - element.offsetHeigth :
        top,
    }
  }

  static getCoordinateInWindow(element) {
    const left = element.offsetLeft
    const right = element.offsetLeft + element.offsetWidth
    const top = element.offsetTop
    const bottom = element.offsetTop + element.offsetHeigth

    const maxLeft = window.innerWidth - element.offsetWidth
    const maxTop = window.innerHeight - element.offsetHeigth

    return {
      left,
      right,
      top,
      bottom,
      maxLeft,
      maxTop,
    }
  }
}
