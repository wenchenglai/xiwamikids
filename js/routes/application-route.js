App.ApplicationRoute = Ember.Route.extend(SimpleAuth.ApplicationRouteMixin, {
    _saveTransition: function (transition) {
        if (transition.targetName !== 'login') {
            this.controllerFor('login').set('previousTransition', transition);
        }
    },
    setupController: function (controller, post) {
        this._super(controller);
        this.generateController('login');
    },
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
        
        //var newFamily = this.store.createRecord('family', {
        //    id: 1,
        //    zipcode: '48105',
        //    familyName: 'Wen Lai Family',
        //    description: 'We are a happy family living in Ann Arbor, MI',
        //    cityState: 'Ann Arbor, MI 48105',
        //    createdDate: new Date()
        //});
        //var store = this.store;
        //newFamily.save().then(function (family) {
        //    debugger;
        //    var p1 = store.createRecord('person', {
        //        id: 1,
        //        lastName: 'Lai',
        //        firstName: 'Wen',
        //        nickName: 'Wayne',
        //        email: 'wenchenglai@gmail.com',
        //        birthday: '1978-07-01',
        //        languages: ['English', 'Chinese'],
        //        type: 1,
        //        gender: 'male',
        //        createdDate: new Date(),
        //        family: family
        //    });
        //    p1.save();

        //    var p2 = store.createRecord('person', {
        //        id: 2,
        //        lastName: 'Chen',
        //        firstName: 'Jia',
        //        email: 'jiac@umich.edu',
        //        birthday: '1981-09-01',
        //        languages: ['English', 'Chinese'],
        //        type: 2,
        //        gender: 'female',
        //        createdDate: new Date(),
        //        family: family
        //    });
        //    p2.save();
        //    //p2.save().then(function (p) { f.get('kids').content.push(p); });

        //    var p3 = store.createRecord('person', {
        //        id: 3,
        //        lastName: 'Lai',
        //        firstName: 'Sophie',
        //        email: 'a@a.com',
        //        birthday: '2011-07-01',
        //        languages: ['English', 'Chinese'],
        //        type: 4,
        //        gender: 'female',
        //        createdDate: new Date(),
        //        family: family
        //    });
        //    //p3.save();
        //    p3.save().then(function (p) { family.save(); });
        //});

        //var item1 = store.createRecord('item', {
        //    id: 1,
        //    name: 'Baby Doll',
        //    description: 'A baby doll that can talk',
        //    price: 2,
        //    size: '',
        //    width: 5,
        //    length: 12,
        //    height: 3,
        //    fromAge: 1,
        //    toAge: 4,
        //    condition: 'Used',
        //    type: 'Toy',
        //    status: 'Open',
        //    imageUrl: '',
        //    createdDate: new Date(2014, 04, 18),
        //    isDeleted: false
        //});
        //item1.save();

        //var item2 = store.createRecord('item', {
        //    id: 2,
        //    name: 'Blue Skirt',
        //    description: 'A blue skirt',
        //    price: 5,
        //    size: '3T',
        //    width: 5,
        //    length: 12,
        //    height: 3,
        //    fromAge: 3,
        //    toAge: 4,
        //    condition: 'Used',
        //    type: 'Cloth',
        //    status: 'Open',
        //    imageUrl: '',
        //    createdDate: new Date(2014, 04, 18),
        //    isDeleted: false
        //});
        //item2.save();

        //var item3 = store.createRecord('item', {
        //    id: 3,
        //    name: 'Chinese Character',
        //    description: 'A beginner chinese learning book',
        //    price: 2,
        //    size: '',
        //    width: 5,
        //    length: 8,
        //    height: 0.5,
        //    fromAge: 4,
        //    toAge: 5,
        //    condition: 'Used',
        //    type: 'Book',
        //    status: 'Closed',
        //    imageUrl: '',
        //    createdDate: new Date(2014, 04, 18),
        //    isDeleted: false
        //});
        //item3.save();

        //var activity1 = store.createRecord('activity', {
        //    id: 1,
        //    title: 'Dancing Babies',
        //    description: 'A kids dancing party by Ann Arbor Public Library',
        //    fromTime: new Date(2014, 7, 10, 10, 0, 0, 0),
        //    toTime: new Date(2014, 7, 10, 11, 0, 0 ,0),
        //    location: 'Ann Arbor Public Library - Downtown',
        //    category: 'Physical Exercise',
        //    originalLink: 'http://www.aadl.org/node/254176',
        //    facebookEventUrl: '',
        //    imageUrl: '',
        //    createdDate: new Date(2014, 04, 18),
        //    isDeleted: false
        //});
        //activity1.save();

        //var activity2 = store.createRecord('activity', {
        //    id: 2,
        //    title: 'Spanish Cultural Event',
        //    description: 'teach kids about spanish culture',
        //    fromTime: new Date(2014, 8, 21, 10, 0, 0, 0),
        //    toTime: new Date(2014, 8, 21, 11, 0, 0, 0),
        //    location: 'Ann Arbor Public Library - Downtown',
        //    category: 'Physical Exercise',
        //    originalLink: 'http://www.aadl.org/node/254176',
        //    facebookEventUrl: '',
        //    imageUrl: '',
        //    createdDate: new Date(2014, 05, 18),
        //    isDeleted: false
        //});
        //activity2.save();
    },
    actions: {
        willTransition: function (transition) {
            this._saveTransition(transition);
        }
        //sessionAuthenticationSucceeded: function() {
        //    debugger;
        //},

        //sessionAuthenticationFailed: function() {
        //    debugger;
        //},

        //invalidateSession: function() {
        //    debugger;
        //    this._super();
        //},
        
        //sessionInvalidationSucceeded: function() {
        //    debugger;
        //},

        //sessionInvalidationFailed: function() {
        //    debugger;
        //},

        //authorizationFailed: function() {
        //    debugger;
        //}
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