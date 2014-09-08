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
        //Ember.$.ajax({
        //    url: '/templates/familylist-component.hbs.html',
        //    async: false,
        //    success: function (resp) {
        //        Em.TEMPLATES['components/family-list'] = Ember.Handlebars.compile(resp);
        //    }
        //});

        Ember.$.ajax({
            url: '/templates/familygrid-component.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['components/family-grid'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/chosenmultiselect-component.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['components/chosen-multiselect'] = Ember.Handlebars.compile(resp);
            }
        });

        // Authentication
        Ember.$.ajax({
            url: '/templates/login.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['login'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/signup.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['signup'] = Ember.Handlebars.compile(resp);
            }
        });

        // Pages loading
        Ember.$.ajax({
            url: '/templates/connect.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.index.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/index'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.search.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/search'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.myfamily.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/myfamily'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.addmember.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/addmember'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.editmember.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/editmember'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.addfamily.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/addfamily'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/connect.editfamily.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/editfamily'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/items.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['items'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/items.search.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['items/search'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/items.myitems.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['items/myitems'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/items.additem.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['items/additem'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/activity.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['activity'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/activity.search.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['activity/search'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/activity.calendar.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['activity/calendar'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/activity.map.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['activity/map'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/activity.my.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['activity/my'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/activity.edit.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['activity/edit'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/helpout.ask.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['helpout/ask'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/helpout.browse.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['helpout/browse'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/helpout.my.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['helpout/my'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/helpout.edit.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['helpout/edit'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/gossip.my.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['gossip/my'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/gossip.browse.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['gossip/browse'] = Ember.Handlebars.compile(resp);
            }
        });
    }
});

// Root URL is used when user logged out of app
App.Router.reopen({
    rootURL: 'index.html'
});

App.Router.map(function() {

    this.route('login');

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