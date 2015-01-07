App.ItemsMyitemsRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            user = self.get('session.user');

        return self.store.find('item', { status: 'Open', seller: user.id });
    },

    actions: {
        openAddItemModal: function (modalName) {
            var self = this,
                user = self.get('session.user');

            self.store.find('member', user.id).then(function (member) {
                var empty = self.store.createRecord('item', { seller: member, status: 'Open' });
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
            if (needReload) {
                this.refresh();
            }

            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },
        deleteItem: function (id) {
            debugger;
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