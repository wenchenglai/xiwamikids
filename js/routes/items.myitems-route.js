App.ItemsMyitemsRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        debugger;
        //return Em.Object.create({});
        return this.store.find('item', { status: 'Open' });
    },
    afterModel: function(model) {
        var data = model;
        //debugger;
    },
    actions: {
        openAddItemModal: function (modalName, model) {
            //this.controllerFor(modalName).set('model', model);
            //this.generateController('connect.addmember');
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeAddItemModal: function (needReload) {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
            //debugger;
            if (needReload) {
                this.transitionTo('items.myitems');
            }
        },
        deleteItem: function (id) {
            //debugger;
            var route = this;
            this.store.find('item', id).then(function (record) {
                debugger;
                record.set('status', 'Deleted');
                //record.deleteRecord();
                record.save().then(function () {
                    debugger;
                    route.transitionTo('items.myitems');
                });
            });
        }
    }
});