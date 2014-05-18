App.ConnectSearchRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        //var f = this.store.createRecord('family', {
        //    zipcode: '48105'
        //});

        //f.save();

        //var p = this.store.createRecord('person', {
        //    lastName: 'Lai',
        //    firstName: 'Wen',
        //    email: 'a@a.com',
        //    languages: ['English', 'Chinese'],
        //    type: 'parent',
        //    family: f
        //});
        //p.save();

        //var p2 = this.store.createRecord('person', {
        //    lastName: 'Chen',
        //    firstName: 'Jia',
        //    email: 'a@a.com',
        //    languages: ['English', 'Chinese'],
        //    type: 'parent',
        //    family: f
        //});
        //p2.save();

        //var p3 = this.store.createRecord('person', {
        //    lastName: 'Lai',
        //    firstName: 'Sophie',
        //    email: 'a@a.com',
        //    languages: ['English', 'Chinese'],
        //    type: 'parent',
        //    family: f
        //});
        //p3.save();
        

    },
    model: function () {
        //return this.store.find('family');
    },

    afterModel: function(data, tran, qparams) {
    }
});