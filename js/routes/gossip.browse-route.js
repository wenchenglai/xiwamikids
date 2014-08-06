App.GossipBrowseRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var user = this.get('session.store').restore();
        return this.store.find('gossip', { status: 'all', user: user.id });
    }
});