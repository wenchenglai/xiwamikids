App.GossipMyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var user = this.get('session.store').restore();
        return this.store.find('gossip', { status: 'my', user: user.id });
    },

    actions: {
        deleteQuestion: function (id) {
            this.store.find('gossip', id).then(function (record) {
                record.deleteRecord();
                record.save();
            });
        }
    }
});