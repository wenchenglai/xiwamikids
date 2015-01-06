App.TipBrowseRoute = Ember.Route.extend({
    model: function () {
        var user = this.get('session.user');
        return this.store.find('tip', { status: 'all', longitude: user.longitude, latitude: user.latitude });
    },

    actions: {
        viewDetail: function (id) {
            this.transitionTo('tip.detail', id);
        }
    }
});