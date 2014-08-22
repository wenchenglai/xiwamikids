App.IndexRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        // debugger;
    },
    model: function () {
        //debugger;
        if ($("#isAuth").text() === 'Yes') {
            //debugger;
            FB.api('/625848591/feed', function (response) {
                //debugger;
                return response;
            });
        } else {
            return [];
        }
    },
    setupController: function (controller, feeds) {
        //debugger;
        //controller.set('model', playlist.get('songs'));
    }
});