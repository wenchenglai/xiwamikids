App = Ember.Application.create({
    currentPath: '',

    ready: function () {

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
            url: '/templates/connect.addkid.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect/addkid'] = Ember.Handlebars.compile(resp);
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
            url: '/templates/items.additem.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['items/additem'] = Ember.Handlebars.compile(resp);
            }
        });

        Ember.$.ajax({
            url: '/templates/playdates.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['playdates'] = Ember.Handlebars.compile(resp);
            }
        });
    }
});

//App = Em.Application.createWithMixins(Em.Facebook);
//App.set('appId', '290368724455193');

//var url = 'hbs/about.hbs',
//    templateName = url.replace('.hbs', '');




//Ember.TEMPLATES['test'] = Ember.Handlebars.compile('Hello {{personName}}');

App.Router.map(function() {

    this.resource('connect', function () {
        this.route('search');
        this.route('addkid');
    });

    this.resource('items', function () {
        this.route('search');
        this.route('additem');
    });

    this.resource('playdates', function () {
        this.route('search');
    });
});


App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'xiwamilocal'
});

//App.ApplicationAdapter = DS.FixtureAdapter.extend();


