App.TipDetailRoute = Ember.Route.extend({
    model: function (param) {
        return this.store.find('tip', param.id);
    },

    setupController: function(controller, model) {
        controller.set('content', model);

        var query = {
            parent: model.get('id'),
            parentType: 'tip'
        };
        this.store.find('feedback', query).then(function(feedbacks) {
            controller.set('feedbacks', feedbacks);
        });
    },

    actions: {
        refresh: function () {
            this.refresh();
        }
    }
});