App.ConnectEditmemberRoute = Ember.Route.extend({
    model: function () {
        debugger;
        //return Em.Object.create({});
        return this.store.find('person', 1);
    }
});