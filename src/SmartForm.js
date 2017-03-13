/** TODO: Class generating a form based on preset fields and managing */
// class SmartForm extends SmartModal {
//   constructor(fields = mandatory(), callback = null, url = null, boxElement = null) {
//     if (fields.constructor !== Object) {
//       throw new Error("SmartForm: fields is not an object.");
//     }
//     /* --- Create the modal for the form --- */
//     super("overlay", callback, "sendbutton", boxElement);
//     // TODO Create the form element IF url !== null, else only use the callback to handle data.
//     // constraints can be functions like checkPassword(x) { return (bool) }
//     this.fields = {};
//     var keys = _.keys(fields);
//     for (var i = 0; i < keys.length; i++) {
//       var key = keys[i];
//       // fields needs to have a name and type property
//       if (typeof fields[key].type === "undefined") {
//         throw new Error("SmartForm: field[" + i + "].type is undefinned");
//       }
//       var baseField = {
//         type: null,
//         constraints: null,
//         value: "",
//         bindedField: null
//       };
//       fields[key] = _.extends(baseField, fields[key]); // TODO Either migrate to lodash or rewrite an extend function as well a a keys function
//       this.fields[key] = fields[key];
//       // TODO Create a form row
//       this.fields[key].bindedField = new BindedField(this.fields, key, this.content, this.fields[key].type, this.fields[key].constraints);
//     }
//   }
// }
