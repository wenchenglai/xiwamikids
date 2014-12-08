App.IndexRoute = Ember.Route.extend({
    actions: {
        error: function (error, transition) {
            this.controllerFor('error').set('errorMessage', 'Error in index-route');
            this.transitionTo('error');
        }
    }
});