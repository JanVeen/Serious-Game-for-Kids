"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var _get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===void 0){var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;return get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return call&&("object"==typeof call||"function"==typeof call)?call:self}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var FactoryController=function(_OrderController){function FactoryController(){return _classCallCheck(this,FactoryController),_possibleConstructorReturn(this,(FactoryController.__proto__||Object.getPrototypeOf(FactoryController)).apply(this,arguments))}return _inherits(FactoryController,_OrderController),_createClass(FactoryController,[{key:"view",value:function view(){var _this2=this,a=GAME.model.factory.groupByProductType();this._loadTemplate("src/views/template/factory/factory.html","#factory",Object.keys(a)).done(function(){_this2.registerEvent(),_this2._setActiveTab(),$("#order-transport-cost").html(GAME.model.config.orderTransportCost)}),this._factoryFormInputView(a)}},{key:"registerEvent",value:function registerEvent(){var a=$("form[name=newFactoryOrder]");a.submit(function(b){b.preventDefault();var c=new FactoryController;c.factoryOrder(a.serializeArray())&&a.trigger("reset")}),a.on("reset",function(){$("#factory-order-cost").html(0),$("#factory-order-capacity").html(0)})}},{key:"factoryOrder",value:function factoryOrder(a){var b=OrderController._makeOrder(a),c=new FactoryOrder(b);return!!this.validateOrder(c)&&(GAME.model.orders.push(c),this._updateMoney(-c.orderCost()-GAME.model.config.orderTransportCost),this._updateOrderView(c),toastr.success(Controller.l("Order has been placed!")),!0)}},{key:"validateOrder",value:function validateOrder(a){var b=a.products,c=b.reduce(function(f,g){return f+g.shelfSize()},0),d=b.reduce(function(f,g){return f+g.stockValue()},0)+GAME.model.config.orderTransportCost;return b.length?GAME.model.orders.length==GAME.model.config.maxSimultaneousOrders?(toastr.error(Controller.l("There is no room for another order at this time!")),!1):c>GAME.model.config.orderCapacity?(toastr.error(Controller.l("There is insufficient space on the truck!")),!1):d>GAME.model.config.money?(toastr.error(Controller.l("You cannot afford this!")),!1):!b.some(function(f){return 0>f.values.quantity})||(toastr.error(Controller.l("You cannot order a negative amount!")),!1):(toastr.warning(Controller.l("An order cannot be empty.")),!1)}},{key:"completeOrder",value:function completeOrder(a){var b=new WarehouseController,c=new FactoryOrder(OrderController._copyOrder(a));b.processFactoryOrder(a)&&_get(FactoryController.prototype.__proto__||Object.getPrototypeOf(FactoryController.prototype),"completeOrder",this).call(this,c),b.updateContainerView(),b.updateCapacityView()}},{key:"_factoryFormInputView",value:function _factoryFormInputView(a){Object.keys(a).forEach(function(b){var c={products:a[b],type:b};this._loadTemplate("src/views/template/factory/forminput.html","#"+b,c,!0).done(function(){$("form[name=newFactoryOrder] :input").change(function(){var d=$("form[name=newFactoryOrder]").serializeArray(),f=OrderController._makeOrder(d);$("#factory-order-cost").html(f.reduce(function(g,h){return g+h.stockValue()},0)),$("#factory-order-capacity").html(f.reduce(function(g,h){return g+h.shelfSize()},0))})})},this)}},{key:"_setActiveTab",value:function _setActiveTab(){var a=$("form[name=newFactoryOrder]");a.find("li.text-capitalize").first().addClass("active"),a.find("div.tab-content :first-child").addClass("active")}},{key:"_updateOrderView",value:function _updateOrderView(a){this._loadTemplate("src/views/template/factory/factoryorder.html","#factory-orders",a,!0)}}],[{key:"updateOrder",value:function updateOrder(){var a=$(".factory-order");a&&(a.each(function(){var _this3=this,b=GAME.model.orders.filter(function(c){return c.id===parseInt($(_this3).data("factory"))}).shift();if(b.time=b.time-1,b.time){var c=100*(1-b.time/b.initDuration);$(this).find(".order-progress-bar").css({width:c+"%"}).attr("aria-valuenow",c)}else new FactoryController().completeOrder(b),$(this).remove()}),GAME.model.orders=GAME.model.orders.filter(function(b){return b.time}))}}]),FactoryController}(OrderController);