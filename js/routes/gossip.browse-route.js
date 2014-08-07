App.GossipBrowseRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var user = this.get('session.store').restore();
        return this.store.find('gossip', { status: 'all', userId: user.id, longitude: user.longitude, latitude: user.latitude });
    }
});