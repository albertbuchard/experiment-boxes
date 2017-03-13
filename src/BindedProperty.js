
export default class BindedProperty {
  constructor(object = null, property = null, hierarchy = null) {
    // constants
    this.HANDLED_VARIABLE_TYPES = ['number', 'string', 'boolean']

    // data properties
    this.property = property
    this.object = object
    this.propagate = false
    // to add ? chain propagation? a subscription system maybe...
    this.type = null

    // export value as hierarchy if set, else set as property name
    this.hierarchy = hierarchy !== null ? hierarchy : property
    this.exportName = this.hierarchy.replace(/\./g, '_')

    if (!this.object) {
      // if parent object is not set consider that the binding is with a variable in the global scope
      this.object = window
    }

    if (property !== null) {
      this.bind(object, property)
    }
  }

  /* ======== Binding function ======== */
  bind(object, property) {
    const propertyType = typeof this.object[this.property]
    if (propertyType === 'undefined') {
      throw new Error(`Parambox: The variable '${property}' you are trying to bind is undefined - either this object or the property is not defined`)
    } else {
      if (this.HANDLED_VARIABLE_TYPES.indexOf(propertyType) === -1) {
        throw new Error('The variable you are trying to bind is of a non-handled type (string, number or boolean)')
      }

      /**
       * Binded property key
       * @type {string}
       */
      this.property = property

      /**
       * Parent object
       * @type {object}
       */
      this.object = object

      /**
       * Binded property type constructor
       * @type {function}
       */
      this.type = this.object[this.property].constructor
    }
  }

  convertToType(value) {
    if (this.type) {
      if (this.type === Boolean) {
        switch (String(value).toUpperCase()) {
          case '0':
            return false
          case '1':
            return true
          case 'FALSE':
            return false
          case 'TRUE':
            return true
          default:
            throw new Error('BindedProperty.convertToType: invalid string value for boolean type')
        }
      }
      return this.type(value)
    }
    throw new Error('You are trying to convert a value to a the type of the binded property but the object has no property binded to it (or no type)')
  }
  // getters and setters
  set value(value) {
    if (typeof this.object[this.property] === 'undefined') {
      throw new Error(
        'The variable you are trying to bind is undefined - either this object or the property is incorrect',
      )
    } else {
      this.object[this.property] = this.convertToType(value)
    }
  }

  get value() {
    if (typeof this.object[this.property] === 'undefined') {
      throw new Error(
        'The variable you are trying to bind is undefined - either this object or the property is incorrect',
      )
    } else {
      return this.object[this.property]
    }
  }
}
