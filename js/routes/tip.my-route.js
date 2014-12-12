App.TipMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            //user = self.get('session.currentUser'),
            user2 = self.get('session.userAccount');

        user2.then(function(user) {
            return self.store.find('tip', { status: 'my', userId: user.id, longitude: user.longitude, latitude: user.latitude });
        });

    },

    actions: {
        openAddModal: function (modalName) {
            var self = this,
                user = self.get('session.currentUser');

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