App.ItemsMyitemsRoute = Ember.Route.extend({
    model: function () {
        //debugger;
        //return Em.Object.create({});
        return this.store.find('item', { status: 'Open' });
    },
    afterModel: function(model) {
        var data = model;
        //debugger;
    }
});