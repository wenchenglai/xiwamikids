App.TipMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        return self.store.find('tip', { status: 'my', userId: user.id, longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
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
    }
});