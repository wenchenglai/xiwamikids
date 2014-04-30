App.ConnectAddkidRoute = Ember.Route.extend({
    model: function () {

        //return Em.Object.create({});
        return this.store.find('family');
    }
});