App.QuestionMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            user = self.get('session.currentUser');

        return self.store.find('question', { status: 'Open', creator: user.id });
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