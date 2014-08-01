App.ActivityMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        //return Em.Object.create({});
        return this.store.find('activity', {isDeleted: false});
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