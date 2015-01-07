App.TipDetailRoute = Ember.Route.extend({
    model: function (param) {
        return this.store.find('tip', param.id);
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
    },

    actions: {
        refresh: function () {
            this.refresh();
        }
    }
});