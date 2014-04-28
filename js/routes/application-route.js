App.ApplicationRoute = Ember.Route.extend({
    model: function () {
        //this.get('store').findAll('family').then(function (record) {
        //    record.content.forEach(function (rec) {
        //        Ember.run.once(this, function () {
        //            rec.deleteRecord();
        //            rec.save();
        //        });
        //    }, this);
        //});

        //this.get('store').findAll('person').then(function (record) {
        //    record.content.forEach(function (rec) {
        //        Ember.run.once(this, function () {
        //            rec.deleteRecord();
        //            rec.save();
        //        });
        //    }, this);
        //});

        var fm = this.store.createRecord('family', {
            id: 1,
            zipcode: '48105',
            createdDate: new Date()
        });
        var store = this.store;
        fm.save().then(function (f) {
            var p1 = store.createRecord('person', {
                id: 1,
                lastName: 'Lai',
                firstName: 'Wen',
                email: 'a@a.com',
                languages: ['English', 'Chinese'],
                type: 'parent',
                createdDate: new Date(),
                family: f
            });
            //f.get('kids').content.push(p1);
            p1.save();
            //p1.save().then(function (p) {
            //    //debugger;
            //    //f.get('kids').content.push(p);
            //    //f.save();
            //});

            var p2 = store.createRecord('person', {
                id: 2,
                lastName: 'Chen',
                firstName: 'Jia',
                email: 'a@a.com',
                languages: ['English', 'Chinese'],
                type: 'parent',
                createdDate: new Date(),
                family: f
            });
            p2.save();
            //p2.save().then(function (p) { f.get('kids').content.push(p); });

            var p3 = store.createRecord('person', {
                id: 3,
                lastName: 'Lai',
                firstName: 'Sophie',
                email: 'a@a.com',
                languages: ['English', 'Chinese'],
                type: 'daughter',
                createdDate: new Date(),
                family: f
            });
            //p3.save();
            p3.save().then(function (p) { f.save(); });
        });


        //debugger;
        if (App.get('currentPath') === 'home' || App.get('currentPath') === '') {
            return ['Feeds', 'Reminders', 'blue'];
        } else {
            return ['red', 'yellow', 'blue'];
        }
    }
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function(transition) {
       // debugger;
    },
    model: function () {
        //debugger;
        if ($("#isAuth").text() === 'Yes') {
            //debugger;
            FB.api('/625848591/feed', function(response) {
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