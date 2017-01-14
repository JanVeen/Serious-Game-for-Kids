"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var _get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===void 0){var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;return get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return call&&("object"==typeof call||"function"==typeof call)?call:self}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Storage=function(_StorageCore){function Storage(){return _classCallCheck(this,Storage),_possibleConstructorReturn(this,(Storage.__proto__||Object.getPrototypeOf(Storage)).apply(this,arguments))}return _inherits(Storage,_StorageCore),_createClass(Storage,[{key:"addItem",value:function addItem(a){if(!(a instanceof Container))throw new TypeError("Expected a Container, but got a "+a.constructor.name);_get(Storage.prototype.__proto__||Object.getPrototypeOf(Storage.prototype),"addItem",this).call(this,a)}},{key:"getItemQuantity",value:function getItemQuantity(a){var b=function b(c,d){return c+d};return this.items.map(function(c){return c.items.map(function(d){return a.name==d.name?d.values.quantity:0}).reduce(b,0)}).reduce(b,0)}},{key:"updatePerishableProducts",value:function updatePerishableProducts(){this.items.forEach(function(a){a.updatePerishableProducts()})}},{key:"usedCapacity",value:function usedCapacity(){return this.items.length}},{key:"usedContainerCapacity",value:function usedContainerCapacity(){var a=0<arguments.length&&void 0!==arguments[0]&&arguments[0],b=this.items.reduce(function(c,d){return c+d.usedCapacity()},0);return a&&(b=100*(b/this.maxContainerCapacity())),b}},{key:"maxContainerCapacity",value:function maxContainerCapacity(){return this.items.reduce(function(a,b){return a+b.capacity},0)}},{key:"toString",value:function toString(){return"I am a Storage; currently I have "+this.usedCapacity()+" Containers, out of a maximum of "+this.capacity}}]),Storage}(StorageCore);