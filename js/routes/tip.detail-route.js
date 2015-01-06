App.TipDetailRoute = Ember.Route.extend({
    model: function (id) {
        return this.store.find('tip', id);
    },

    setupController: function(controller, model) {
        controller.set('content', model);

        var query = {
            entity: model.get('id'),
            entityType: 'tip'
        };
        this.store.find('discussion', query).then(function(discussions) {
            controller.set('discussions', discussions);
        });
    }
});