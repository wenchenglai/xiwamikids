App.TipBrowseRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var user = this.get('session.store').restore();
        return this.store.find('tip', { status: 'all', userId: user.id, longitude: user.longitude, latitude: user.latitude });
    }
});