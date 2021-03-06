class CustomerController extends OrderController
{
    view()
    {
        this._loadTemplate(
            "src/views/template/customer/customer.html",
            "#customers",
            GAME.model.customers
        );
    }

    registerEvent(id)
    {
        $("button[data-customer="+ id +"].customer-serve").click(function (e) {
            closure(function (customer, controller) {
                if (controller.validateOrder(customer.order)) {
                    controller.completeOrder(customer);
                } else {
                    toastr.warning(Controller.l("You don't have all the products to complete this order."))
                }
            });

            $(this).off(e);
        });

        $("button[data-customer="+ id +"].customer-send-away").click(function (e) {
            closure(function (customer, controller) {
                controller.sendAway(customer);
            });

            $(this).off(e);
        });

        const closure = function (fn) {
            let customer = GAME.model.customers.filter((customer) => customer.id == id).shift();
            let customerController = new CustomerController();

            fn(customer, customerController);
            customerController._updateCustomerView();
        };
    }

    generateOrder()
    {
        const demandGenerator = new DemandController();
        const protoOrder = GAME.model.products.map(
            prod => {
                return {
                    name: prod.name,
                    value: demandGenerator.randomDemandGenerator(prod.demand)
                }
            }
        );

        if (protoOrder.some(prod => prod.value > 0)) {
            const customer = new Customer(OrderController._makeOrder(protoOrder));

            GAME.model.customers.push(customer);
            this._updateOrderView(customer);

            toastr.info(Controller.l("New customer is waiting!"));
        }
    }

    /**
     * @augments OrderController.completeOrder
     *
     * @param {Customer} customer
     */
    completeOrder(customer)
    {
        this._updateMoney(customer.order.orderCost());

        this._updateSatisfaction(customer.order.time);

        const warehouseController = new WarehouseController();
        const orderCopy = new CustomerOrder(OrderController._copyOrder(customer.order));

        if (warehouseController.processCustomerOrder(orderCopy)) {
            super.completeOrder(customer);
        }

        warehouseController.updateContainerView();
        warehouseController.updateCapacityView();

        GAME.model.customers = GAME.model.customers.filter((item) => customer.id != item.id);
    }

    /**
     * Removes customer from the customer array.
     *
     * @param {Customer} customer
     */
    sendAway(customer)
    {
        // TODO Log event in history
        GAME.model.customers = GAME.model.customers.filter((item) => customer.id != item.id);

        if (GAME.model.config.penaltySendingCustomerAway) {
            this._updateMoney(-GAME.model.config.penaltySendingCustomerAway);
            toastr.warning(Controller.l("You got a penalty for sending the customer away."));
        }
    }

    /**
     * Validates order if quantity in warehouse for every product is
     * larger than in order.
     *
     * @return {boolean}
     */
    validateOrder(order)
    {
        return order.products.every(function (product) {
            let quantity = GAME.model.warehouse.getItemQuantity(product);
            return quantity >= product.values.quantity;
        });
    }

    /**
     * @private
     */
    _updateCustomerView()
    {
        $("#customer-orders").empty();

        GAME.model.customers.forEach(function (customer) {
            this._updateOrderView(customer);
        }, this);
    }

    /**
     * @private
     */
    _updateOrderView(customer)
    {
        if (GAME.model.customers.length) {
            $(".no-customers").remove();
        }

        this._loadTemplate(
            "src/views/template/customer/customerorder.html",
            "#customer-orders",
            customer,
            true
        ).done(() => this.registerEvent(customer.id));
    }
}
