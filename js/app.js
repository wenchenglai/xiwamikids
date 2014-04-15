App = Ember.Application.create({
    ready: function () {

        Ember.$.ajax({
            url: '/templates/connect.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['connect'] = Ember.Handlebars.compile(resp);
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
            url: '/templates/connect.hbs.html',
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
    });

    this.resource('items', function () {

    });

    this.resource('playdates', function () {

    });
});


