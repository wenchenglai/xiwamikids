App = Ember.Application.create({
    currentPath: '',

    ready: function () {

        // Components loading
        Ember.$.ajax({
            url: '/templates/familylist-component.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['components/family-list'] = Ember.Handlebars.compile(resp);
            }
        });

        // Pages loading
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
        this.route('my');
        this.route('edit');
    });

    this.resource('helpout', function () {
        this.route('ask');
        this.route('browse');
    });
});


App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'xiwamilocal'
});

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

//App.Store = DS.Store.extend({
//    revision: 13,
//    adapter: 'DS.FixtureAdapter'
//});
