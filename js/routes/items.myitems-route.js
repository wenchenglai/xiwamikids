App.ItemsMyitemsRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var user = this.get('session.store').restore();
        return this.store.find('item', { status: 'Open', seller : user.id});
    },

    actions: {
        openAddItemModal: function (modalName) {
            var self = this;
            var user = self.get('session.store').restore();
            self.store.find('member', user.id).then(function (member) {
                var empty = self.store.createRecord('item', { seller: member, status: 'open' });
                self.controllerFor(modalName).set('model', empty);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },
        openEditItemModal: function (modalName, id) {
            var self = this;

            self.store.find('item', id).then(function (item) {
                self.controllerFor(modalName).set('model', item);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },
        closeAddItemModal: function (needReload) {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });

            if (needReload) {
                //this.transitionTo('items.myitems');
                this.refresh();
            }
        },
        deleteItem: function (id) {
            var route = this;
            this.store.find('item', id).then(function (record) {
                record.destroyRecord();
                //record.deleteRecord();
                //record.save().then(function () {
                //    //route.transitionTo('items.myitems');
                //});
            });
        }
    }
});