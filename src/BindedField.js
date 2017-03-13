import $ from 'jquery'
import BindedProperty from './BindedProperty'
import { mandatory } from './utilities'

export default class BindedField extends BindedProperty {
  // this class holds an active input field (select, text input, slider component)
  // it creates a field from the selected type and bind a binded property to it
  constructor(
    object = mandatory('object'),
    property = mandatory('property'),
    parent = null,
    fieldType = 'input',
    allowedValues = null,
    hierarchy = null,
  ) {
    super(object, property, hierarchy)

    // constant
    this.VALID_FIELD_TYPE = ['input', 'selector', 'slider']

    // field
    this.field = null
    this.fieldType = fieldType
    this.fieldHTML = null
    this.allowedValues = allowedValues
    this.tempClass = `binded-${typeof object}${property}`

    // parent
    this.parent = parent

    // build the field html
    switch (this.fieldType) {
      case 'input':
        this.fieldHTML = `<fieldset class="form-group"><label>${property}</label>
        <input type="text" class="form-control ${this.tempClass}" data-binded="${property}">
        </fieldset>`
        break
      case 'selector':
        if (!allowedValues) {
          throw new Error('fieldType selector needs at least one allowedValues')
        }

        this.fieldHTML = `<fieldset class="form-group">
        <label>${property}</label>
        <select class="form-control ${this.tempClass}" data-binded="${property}">`

        for (let i = 0; i < this.allowedValues.length; i++) {
          this.fieldHTML = `${this.fieldHTML}<option value="${
          this.allowedValues[i]
          }">${
          this.allowedValues[i]
          }</option>`
        }
        this.fieldHTML = `${this.fieldHTML}</select></fieldset>`
        break
      case 'slider':
        break
      default:
        throw new Error(
        'fieldType is invalid : input, selector and slider are the only valid type for now',
      )
    }

    if (parent) {
      this.placeInParent()
    }
  }

  // ui function
  placeInParent(parent = null) {
    if (parent) {
      this.parent = parent
    }

    $(this.parent).append(this.fieldHTML)
    this.field = $(`.${this.tempClass}`)
    this.field.removeClass(`.${this.tempClass}`)

    if (this.allowedValues) {
      if (this.allowedValues.constructor === Array) {
        if (this.allowedValues.indexOf(this.value) !== -1) {
          this.field.val(this.value)
        } else {
          this.field.val(this.allowedValues[0])
        }
      } else {
        this.field.val(this.value)
      }
    } else {
      this.field.val(this.value)
    }

    const thisObject = this

    // add event listener on change
    this.field.change(() => {
      thisObject.update('field')
    })
    this.field.keydown((e) => {
      switch (e.keyCode) {
        case 13:
        /* Pressed enter */
          thisObject.update('field')
          break
        default:
        /**/
      }
    })
  }

  delete() {
    // delete the fieldset
    this.field.parent().remove()
    this.property = null
    this.object = null
  }

  update(origin = 'field') {
    if (origin === 'field') {
      this.value = $(this.field).val()
      $(this.field).get(0).blur()
    } else if (
        $(this.field).val().toUpperCase() !== String(this.value).toUpperCase()
      ) {
      $(this.field).val(this.value)
    }
  }

  // getters and setters
  set value(value) {
    if (typeof this.object[this.property] === 'undefined') {
      throw new Error('The variable you are trying to bind is undefined - either this object or the property is incorrect')
    } else {
      this.object[this.property] = this.convertToType(value)
      this.update('setter')
    }
  }

  get value() {
    if (typeof this.object[this.property] === 'undefined') {
      throw new Error('The variable you are trying to bind is undefined - either this object or the property is incorrect')
    } else {
      return this.object[this.property]
    }
  }
}
