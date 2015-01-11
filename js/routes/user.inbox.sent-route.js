App.InboxSentRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        return self.store.find('message', { from: user.id, fromStatus: 'sent' });
    },

    actions: {
        delete: function (id) {
            this.store.find('tip', id).then(function (record) {
                record.destroyRecord();
                //record.deleteRecord();
                //record.save();
            });
        }
    }
});