import $ from 'jquery'
import BindedProperty from './BindedProperty'
import { debugError, mandatory, isNumeric, parseDate, passwordStrength, scorePassword } from './utilities'

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
    { constraints = '', title = null, baseMessage = '' } = {},
  ) {
    super(object, property, hierarchy)

    // constant
    this.VALID_FIELD_TYPE = ['input', 'select', 'slider', 'radio']

    // field
    this._field = undefined
    this.fieldType = fieldType
    this.fieldHTML = null
    this.allowedValues = allowedValues
    this.constraints = constraints || ''
    this.tempClass = `binded-${typeof object}${property}`
    this.subfields = []
    this.errorDiv = null
    this.messageDiv = null
    this.title = (title || property).replace(/(^|\s)[a-z]/g, f => f.toUpperCase())
    this.baseMessage = baseMessage


    // parent
    this.parent = parent

    // build the field html based on the fieldType: input, select, textaera, slider, radio
    const idRadio = $('input[type="radio"]').length
    let html = ''
    switch (this.fieldType) {
      case 'input':
        this.fieldHTML = `<div class="form-group"><label class="bindedfield-label">${this.title}</label>
        <input type="text" class="form-control ${this.tempClass}" data-binded="${property}">
          <div class="col-sm-10 bindedfield-errordiv ${this.tempClass}-error" >
            <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>
          </div>
          <div class="col-sm-10 bindedfield-messagediv ${this.tempClass}-message" >
            <i class="glyphicon glyphicon-info"></i><span class="bindedfield-message"></span>
          </div>
        </div>`
        break
      case 'password':
        this.fieldHTML = `<div class="form-group"><label class="bindedfield-label">${this.title}</label>
          <input type="password" class="form-control ${this.tempClass}" data-binded="${property}">
            <div class="col-sm-10 bindedfield-errordiv ${this.tempClass}-error" >
              <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>
            </div>
            <div class="col-sm-10 bindedfield-messagediv ${this.tempClass}-message" >
            <i class="glyphicon glyphicon-info"></i><span class="bindedfield-message"></span>
            </div>
          </div>`
        break
      case 'select':
        if (!allowedValues) {
          debugError('fieldType selector needs at least one allowedValues')
          return
        }

        html += `<div class="form-group">
        <label class="bindedfield-label">${this.title}</label>
        <select class="form-control ${this.tempClass}" data-binded="${property}">`

        for (let i = 0; i < this.allowedValues.length; i++) {
          html += `${this.fieldHTML}<option value="${
          this.allowedValues[i]
          }">${
          this.allowedValues[i]
          }</option>`
        }
        this.fieldHTML = `${html}</select>
        <div class="col-sm-10 bindedfield-errordiv ${this.tempClass}-error"
          <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>
          </div>
          <div class="col-sm-10 bindedfield-messagediv ${this.tempClass}-message" >
          <i class="glyphicon glyphicon-info"></i><span class="bindedfield-message"></span>
        </div>
      </div>`
        break
      case 'textaera':
        this.fieldHTML = `<div class="form-group"><label class="bindedfield-label">${this.title}</label>
                            <textarea class="form-control ${this.tempClass}" rows="3" data-binded="${property}"></textarea>
                            <div class="col-sm-10 bindedfield-errordiv ${this.tempClass}-error" >
                              <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>
                            </div>
                            <div class="col-sm-10 bindedfield-messagediv ${this.tempClass}-message" >
                              <i class="glyphicon glyphicon-info"></i><span class="bindedfield-message"></span>
                            </div>
                          </div>`
        break
      case 'slider':
        this.fieldHTML = `<div class="form-group"><label class="bindedfield-label">${this.title}</label>
      <input type="range" data-binded="${property}" class="form-control ${this.tempClass}" min="${this.allowedValues[0]}" max="${this.allowedValues[1]}" step="${this.allowedValues[2]}" />
      <div class="col-sm-10 bindedfield-errordiv ${this.tempClass}-error" >
        <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>
      </div>
      <div class="col-sm-10 bindedfield-messagediv ${this.tempClass}-message" >
        <i class="glyphicon glyphicon-info"></i><span class="bindedfield-message"></span>
      </div>
      </div>`
        break
      case 'radio':
        if (!allowedValues) {
          debugError('fieldType selector needs at least one allowedValues')
          return
        }

        html = `<fieldset class="form-group"><label class="bindedfield-label">${this.title}</label>`
        for (const value of this.allowedValues) {
          html += `<div class="form-check">
            <label class="form-check-label">
              <input type="radio" class="form-check-input ${this.tempClass}" name="${property}${idRadio}" value="${value}" data-binded="${property}" checked>
              ${value}
            </label>
          </div> `
        }

        this.fieldHTML = `${html}
          <div class="col-sm-10 bindedfield-errordiv ${this.tempClass}-error" >
            <i class="glyphicon glyphicon-remove"></i><span class="bindedfield-error"></span>
          </div>
          <div class="col-sm-10 bindedfield-messagediv ${this.tempClass}-message" >
            <i class="glyphicon glyphicon-info"></i><span class="bindedfield-message"></span>
          </div>
        </fieldset>`
        break
      default:
        debugError('fieldType is invalid : input, selector and slider are the only valid type for now')
        return
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
      let valueWasIn = false
      let lastValue = ''
      for (const field of fields) {
        $(field).removeClass(`${this.tempClass}`)
        if (field.value === this.value) {
          valueWasIn = true
          field.checked = true
        }
        this.subfields.push($(field))
        // add event listener on change
        $(field).change(() => {
          this.update('field')
        })

        lastValue = field.value
      }
      if (!valueWasIn && !this.value) {
        this.value = lastValue
      }
    } else {
      this.field = $(`.${this.tempClass}`)
      this.field.removeClass(`${this.tempClass}`)

      if (this.allowedValues) {
        if (this.allowedValues.constructor === Array) {
          if (this.fieldType === 'slider') {
            if (!this.value) { this.value = this.allowedValues[0] }
            if (this.value < this.allowedValues[0]) { this.value = this.allowedValues[0] }
            if (this.value > this.allowedValues[1]) { this.value = this.allowedValues[1] }
            if (this.value % this.allowedValues[2] !== 0) { this.value = this.allowedValues[2] * Math.floor(this.value / this.allowedValues[2]) }
            this.field.val(this.value)
          } else if (this.allowedValues.indexOf(this.value) !== -1) {
            this.field.val(this.value)
          } else {
            this.value = this.allowedValues[0]
          }
        } else {
          this.field.val(this.value)
        }
      } else {
        this.field.val(this.value)
      }

      this.errorDiv = $(`.${this.tempClass}-error`)
      if (this.errorDiv.length) {
        this.errorDiv.removeClass(`${this.tempClass}-error`)
        this.errorDiv.hide()
      } else {
        this.errorDiv = null
      }

      this.messageDiv = $(`.${this.tempClass}-message`)
      if (this.messageDiv.length) {
        this.messageDiv.removeClass(`${this.tempClass}-message`)
        this.messageDiv.hide()
      } else {
        this.messageDiv = null
      }

      this.message = this.baseMessage

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
      if (this.value !== this.field.val()) {
        this.value = this.field.val()
        const [valid, msg] = this.verify()
        if (valid) { this.correct(msg) } else { this.incorrect(msg) }
      }
      $(this.field).get(0).blur()
    } else if (this.field.val() !== String(this.value)) {
      this.field.val(this.value)
      const [valid, msg] = this.verify()
      if (valid) { this.correct(msg) } else { this.incorrect(msg) }
    }
  }

  correct(msg) {
    // remove incorrect class
    this.field.removeClass('bindedfield-incorrect')
    this.error = ''
    this.message = msg
  }

  incorrect(msg = 'Field does not match constraints') {
    // add incorrect class
    this.field.addClass('bindedfield-incorrect')
    this.error = msg
    this.message = ''
  }


  /**
   * Verifies that the current value respect the constraints
   * @method verify
   * @return {bool}
   */
  verify() {
    // TODO Finish implementation of constraints
    // TODO think of creating a parser for the constraints when all is gut --- if necessary... or not
    let okMessage = ''
    if ((typeof this.constraints === 'string') && (this.constraints !== '')) {
      const constraintsArray = this.constraints.split(';')
      for (let constraint of constraintsArray) {
        const keyVal = constraint.split(':')
        if (keyVal.length > 2) {
          debugError(`BindedField.parsedConstraints: Invalid constraint - ${constraint}`)
        } else if (keyVal.length === 2) {
          const key = keyVal[0].trim()
          const val = keyVal[1].split(',')

          switch (key) {
            case 'length':
              val[0] = Number(val[0].trim())
              if (isNaN(val[0])) {
                debugError(`BindedField.parsedConstraints: Invalid constraint value - ${constraint}`)
              } else if ((val.length === 1) && (this.value.length !== val[0])) {
                return [false, `Length must be ${val[0]}`]
              } else if (val.length === 2) {
                val[1] = Number(val[1].trim())
                if (isNaN(val[1])) {
                  debugError(`BindedField.parsedConstraints: Invalid constraint value - ${constraint}`)
                } else if ((this.value.length < val[0]) || (this.value.length > val[1])) {
                  return [false, `Length out of bounds: [${val[0]}, ${val[1]}]`]
                }
              }
              break
            case 'contains':
              for (const char of val) {
                if (!char) {
                  debugError(`BindedField.parsedConstraints: Invalid values for the contains rule - ${constraint}`)
                  continue
                }
                if (this.value.indexOf(char) === -1) {
                  return [false, `Character ${char} must be present - all necessary characters are : ${keyVal[1].toString()}`]
                }
              }
              break
            case 'score':
              val[0] = Number(val[0].trim())
              if (isNaN(val[0])) {
                debugError(`BindedField.parsedConstraints: Invalid non numeric constraint value - ${constraint}`)
              } else {
                const passwordScore = scorePassword(this.value)
                if (passwordScore < val[0]) {
                  return [false, `Password score must be above ${val[0]} -- currently score is ${passwordScore}`]
                }
                okMessage += `Security score: ${passwordScore} `
              }
              break
            default:
              debugError(`BindedField.parsedConstraints: Invalid constraint - ${constraint}`)
          }
        } else {
          constraint = constraint.trim()
          // single word constraint
          switch (constraint) {
            case 'mandatory':
              if ((this.value === '') || (this.value === null)) { return [false, 'Field is mandatory'] }
              break
            case 'alpha':
              if ((this.value !== '') && (/^[a-zA-Z]+$/.test(this.value) === false)) { return [false, 'Value must contain only alphabetic characters'] }
              break
            case 'numeric':
              if (!isNumeric(this.value)) { return [false, 'Value must contain only numeric characters'] }
              break
            case 'date':
              if (parseDate(this.value) === null) { return [false, 'Invalid date format. Use dd/mm/yyyy.'] }
              break
            default:
              debugError(`BindedField.parsedConstraints: Invalid constraint - ${constraint}`)
          }
        }
      }
    }

    if (this.allowedValues !== null) {
      if (this.allowedValues.constructor === Array) {
        if (this.fieldType === 'slider' && ((this.value < this.allowedValues[0]) || (this.value > this.allowedValues[1]) || (this.value % this.allowedValues[2] !== 0))) {
          return [false, 'Value not allowed']
        } else if (this.fieldType !== 'slider' && (!this.allowedValues.includes(this.value))) {
          return [false, 'Value not allowed']
        }
      }
      if ((this.allowedValues.constructor === String) && (this.allowedValues !== this.value)) { return [false, 'Value not allowed'] }
    }

    return [true, okMessage]
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

  set error(message) {
    if (this.errorDiv !== null) {
      if (message) {
        this.errorDiv.find('.bindedfield-error').text(message)
        this.errorDiv.show()
      } else {
        this.errorDiv.find('.bindedfield-error').text('')
        this.errorDiv.hide()
      }
    }
  }

  get error() {
    return null
  }

  set message(message) {
    if (this.messageDiv !== null) {
      if (message) {
        this.messageDiv.find('.bindedfield-message').text(message)
        this.messageDiv.show()
      } else {
        this.messageDiv.find('.bindedfield-message').text('')
        this.messageDiv.hide()
      }
    }
  }

  get message() {
    return null // write only
  }

  get parsedConstraints() {
    // TODO
  }

  set parsedConstraints(constraints) {
    debugError('BindedField.parsedConstraints: read-only')
  }
}
