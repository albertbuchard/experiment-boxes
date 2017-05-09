import $ from 'jquery'
import BindedProperty from './BindedProperty'
import { debugError, mandatory } from './utilities'

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
    this.VALID_FIELD_TYPE = ['input', 'select', 'slider', 'radio']

    // field
    this._field = undefined
    this.fieldType = fieldType
    this.fieldHTML = null
    this.allowedValues = allowedValues
    this.tempClass = `binded-${typeof object}${property}`
    this.subfields = []

    // parent
    this.parent = parent

    // build the field html
    let html = ''
    switch (this.fieldType) {
      case 'input':
        this.fieldHTML = `<div class="form-group"><label>${property}</label>
        <input type="text" class="form-control ${this.tempClass}" data-binded="${property}">
        </div>`
        break
      case 'select':
        if (!allowedValues) {
          throw new Error('fieldType selector needs at least one allowedValues')
        }

        html += `<div class="form-group">
        <label>${property}</label>
        <select class="form-control ${this.tempClass}" data-binded="${property}">`

        for (let i = 0; i < this.allowedValues.length; i++) {
          html += `${this.fieldHTML}<option value="${
          this.allowedValues[i]
          }">${
          this.allowedValues[i]
          }</option>`
        }
        this.fieldHTML = `${html}</select></div>`
        break
      case 'textaera':
        this.fieldHTML = `<div class="form-group"><label>${property}</label>
                            <textarea class="form-control ${this.tempClass}" rows="3" data-binded="${property}"></textarea>
                          </div>`
        break
      case 'slider':
        this.fieldHTML = `<div class="form-group"><label>${property}</label>
      <input type="range" data-binded="${property}" class="form-control ${this.tempClass}" min="${this.allowedValues[0]}" max="${this.allowedValues[1]}" step="${this.allowedValues[2]}" />
      </div>`
        break
      case 'radio':
        html = `<fieldset class="form-group"><label>${property}</label>`
        for (const value of this.allowedValues) {
          html += `<div class="form-check">
            <label class="form-check-label">
              <input type="radio" class="form-check-input ${this.tempClass}" name="${property}" value="${value}" data-binded="${property}" checked>
              ${value}
            </label>
          </div> `
        }

        this.fieldHTML = `${html}</fieldset>`
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

    // appends html to the parent
    $(this.parent).append(this.fieldHTML)

    // radio type has several fields
    if (this.fieldType === 'radio') {
      const fields = $(`.${this.tempClass}`)

      for (const field of fields) {
        $(field).removeClass(`.${this.tempClass}`)
        if (field.value === this.value) { field.checked = true }
        this.subfields.push($(field))
        // add event listener on change
        $(field).change(() => {
          this.update('field')
        })
      }
    } else {
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

      // add event listener on change
      this.field.change(() => {
        this.update('field')
      })

      this.field.keydown((e) => {
        switch (e.keyCode) {
          case 13:
          /* Pressed enter */
            this.update('field')
            break
          default:
          /**/
        }
      })
    }
  }

  delete() {
    // delete the div
    this.field.parent().remove()
    this.property = null
    this.object = null
  }

  update(origin = 'field') {
    if (typeof this.field === 'undefined') {
      debugError('BindedField.update: undefined field.')
    } else if (origin === 'field') {
      this.value = this.field.val()
      $(this.field).get(0).blur()
    } else if (
        this.field.val().toUpperCase() !== String(this.value).toUpperCase()
      ) {
      this.field.val(this.value)
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

  get field() {
    if (this.subfields.length) {
      for (const field of this.subfields) {
        if ($(field)[0].checked) {
          return $(field)
        }
      }
    }
    return $(this._field)
  }

  set field(field) {
    this._field = field
  }
}
