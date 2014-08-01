App.HelpoutMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        //return Em.Object.create({});
        return this.store.find('question', { isDeleted: false });
    },

    actions: {
        openEditModal: function (modalName, id) {
            var self = this;
            self.store.find('question', id).then(function (activity) {
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

        deleteQuestion: function (id) {
            this.store.find('question', id).then(function (record) {
                record.deleteRecord();
                record.save();
            });
        }
    }
});