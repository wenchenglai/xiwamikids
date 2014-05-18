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

        var newFamily = this.store.createRecord('family', {
            id: 1,
            zipcode: '48105',
            familyName: 'Wen Lai Family',
            description: 'We are a happy family living in Ann Arbor, MI',
            cityState: 'Ann Arbor, MI 48105',
            createdDate: new Date()
        });
        var store = this.store;
        newFamily.save().then(function (family) {
            var p1 = store.createRecord('person', {
                id: 1,
                lastName: 'Lai',
                firstName: 'Wen',
                nickName: 'Wayne',
                email: 'wenchenglai@gmail.com',
                birthday: '1978-07-01',
                languages: ['English', 'Chinese'],
                type: 1,
                gender: 'male',
                createdDate: new Date(),
                family: family
            });
            p1.save();

            var p2 = store.createRecord('person', {
                id: 2,
                lastName: 'Chen',
                firstName: 'Jia',
                email: 'jiac@umich.edu',
                birthday: '1981-09-01',
                languages: ['English', 'Chinese'],
                type: 2,
                gender: 'female',
                createdDate: new Date(),
                family: family
            });
            p2.save();
            //p2.save().then(function (p) { f.get('kids').content.push(p); });

            var p3 = store.createRecord('person', {
                id: 3,
                lastName: 'Lai',
                firstName: 'Sophie',
                email: 'a@a.com',
                birthday: '2011-07-01',
                languages: ['English', 'Chinese'],
                type: 4,
                gender: 'female',
                createdDate: new Date(),
                family: family
            });
            //p3.save();
            p3.save().then(function (p) { family.save(); });
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