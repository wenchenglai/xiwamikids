App.TipMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        return self.store.find('tip', { status: 'all', creator: user.id, longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
        loadData: function (status) {
            var self = this,
                user = self.get('session.user');

            self.store.find('tip', { status: status, creator: user.id }).then(function (records) {
                self.get('controller').set('content', records);
            });
        },

        openAddModal: function (modalName) {
            var self = this,
                user = self.get('session.user');

            self.store.find('member', user.id).then(function (member) {
                var empty = self.store.createRecord('tip', { creator: member });
                self.controllerFor(modalName).set('model', empty);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        closeAddModal: function (needReload) {
            if (needReload) {
                this.refresh();
            }

            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        openEditModal: function (modalName, id) {
            var self = this;
            this.store.find('tip', id).then(function (tip) {
                self.controllerFor(modalName).set('model', tip);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        delete: function (id) {
            this.store.find('tip', id).then(function (record) {
                record.deleteRecord();
                record.save();
            });
        }
    }
});