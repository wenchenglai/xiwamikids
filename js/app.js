window.ENV = window.ENV || {};
window.ENV['simple-auth'] = {
    store: 'simple-auth-session-store:local-storage'
};

Ember.Application.initializer({
    name: 'authentication',
    before: 'simple-auth',
    initialize: function (container, application) {
        // customize the session so that it allows access to the account object
        SimpleAuth.Session.reopen({
            account: function () {
                var facebookId = FB.getAuthResponse().userID;
                var query = {
                    facebookId: facebookId
                };
                if (!Ember.isEmpty(facebookId)) {
                    return container.lookup('store:main').find('account', query);
                }
            }.property('facebookId')
        });

        // register the Facebook and Google+ authenticators so the session can find them
        container.register('authenticator:facebook', App.FacebookAuthenticator);
        //container.register('authenticator:googleplus', App.GooglePlusAuthenticator);
    }
});

App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_ACTIVE_GENERATION: true,
    currentPath: '',

    _loadTemplate: function(url, indexName) {
        Ember.$.ajax({
            url: url,
            async: false,
            success: function (resp) {
                Em.TEMPLATES[indexName] = Ember.Handlebars.compile(resp);
            }
        });
    },
    ready: function () {

        // Components loading
        this._loadTemplate('/templates/familylist-component.hbs.html', 'components/family-list');
        this._loadTemplate('/templates/familygrid-component.hbs.html', 'components/family-grid');
        this._loadTemplate('/templates/chosenmultiselect-component.hbs.html', 'components/chosen-multiselect');

        // Authentication
        this._loadTemplate('/templates/login.hbs.html', 'login');
        this._loadTemplate('/templates/signup.hbs.html', 'signup');

        // Pages loading
        this._loadTemplate('/templates/connect.hbs.html', 'connect');
        this._loadTemplate('/templates/connect.index.hbs.html', 'connect/index');
        this._loadTemplate('/templates/connect.search.hbs.html', 'connect/search');
        this._loadTemplate('/templates/connect.myfamily.hbs.html', 'connect/myfamily');
        this._loadTemplate('/templates/connect.addmember.hbs.html', 'connect/addmember');
        this._loadTemplate('/templates/connect.editmember.hbs.html', 'connect/editmember');
        this._loadTemplate('/templates/connect.addfamily.hbs.html', 'connect/addfamily');
        this._loadTemplate('/templates/connect.editfamily.hbs.html', 'connect/editfamily');
        this._loadTemplate('/templates/items.hbs.html', 'items');
        this._loadTemplate('/templates/items.search.hbs.html', 'items/search');
        this._loadTemplate('/templates/items.myitems.hbs.html', 'items/myitems');
        this._loadTemplate('/templates/items.additem.hbs.html', 'items/additem');
        this._loadTemplate('/templates/activity.hbs.html', 'activity');
        this._loadTemplate('/templates/activity.search.hbs.html', 'activity/search');
        this._loadTemplate('/templates/activity.calendar.hbs.html', 'activity/calendar');
        this._loadTemplate('/templates/activity.map.hbs.html', 'activity/map');
        this._loadTemplate('/templates/activity.my.hbs.html', 'activity/my');
        this._loadTemplate('/templates/activity.edit.hbs.html', 'activity/edit');
        this._loadTemplate('/templates/helpout.ask.hbs.html', 'helpout/ask');
        this._loadTemplate('/templates/helpout.browse.hbs.html', 'helpout/browse');
        this._loadTemplate('/templates/helpout.my.hbs.html', 'helpout/my');
        this._loadTemplate('/templates/helpout.edit.hbs.html', 'helpout/edit');
        this._loadTemplate('/templates/gossip.my.hbs.html', 'gossip/my');
        this._loadTemplate('/templates/gossip.browse.hbs.html', 'gossip/browse');
    }
});

// Root URL is used when user logged out of app
App.Router.reopen({
    rootURL: 'index.html'
});

App.Router.map(function() {

    this.route('login');
    this.route('signup');

    this.resource('connect', function () {
        this.route('search');
        this.route('myfamily');
        this.route('addmember');
        this.route('editmember');
        this.route('editperson', { path: '/editperson/:id' });
    });

    this.resource('items', function () {
        this.route('search');
        this.route('myitems');
        this.route('additem');
    });

    this.resource('activity', function () {
        this.route('search');
        this.route('calendar');
        this.route('map');
        this.route('my');
        this.route('edit');
    });

    this.resource('helpout', function () {
        this.route('ask');
        this.route('browse');
        this.route('my');
    });

    this.resource('gossip', function () {
        this.route('browse');
        this.route('my');
    });
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:8088'
    //host: 'http://199.223.236.115:8088/',
    //namespace: 'xiwamirest-0.0.1'
    //headers: { 
    //'Content-Type': 'application/json'
    //}
});