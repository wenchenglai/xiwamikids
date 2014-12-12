App.ActivityMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var user = this.get('session.store').restore();
        return this.store.find('activity', { status: 'Upcoming', creator: user.id });
    },

    afterModel: function(activities, transition) {
        if (activities.get('length') === 1) {
            var b = 3;
        }

        var a = 4;
    },

    actions: {
        openAddModal: function (modalName) {
            var self = this;
            var user = self.get('session.store').restore();
            self.store.find('member', user.id).then(function (member) {
                var empty = self.store.createRecord('activity', { creator: member });
                self.controllerFor(modalName).set('model', empty);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        openEditModal: function (modalName, id) {
            var self = this;
            self.store.find('activity', id).then(function (activity) {
                self.controllerFor(modalName).set('model', activity);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        closeAddEditModal: function (needReload) {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });

            if (needReload) {
                this.refresh();
            }
        },

        deleteActivity: function (id) {
            this.store.find('activity', id).then(function (record) {
                //record.set('isDeleted', true);
                record.deleteRecord();
                record.save();
            });
        }
    }
});