// setup Facebook SDK
FB.init({ appId: '290368724455193' });

// setup Google+ API
function googleApiLoaded() {
    gapi.client.setApiKey('A_Dlo1Vp4KMI8d8B9QMWgPQb');
};

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
        container.register('authenticator:googleplus', App.GooglePlusAuthenticator);
    }
});

App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_ACTIVE_GENERATION: true,
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

App.Router.reopen({
    rootURL: 'index.html'
});

//App = Em.Application.createWithMixins(Em.Facebook);
//App.set('appId', '290368724455193');

//var url = 'hbs/about.hbs',
//    templateName = url.replace('.hbs', '');

//Ember.TEMPLATES['test'] = Ember.Handlebars.compile('Hello {{personName}}');

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
        this.route('my');
        this.route('edit');
    });

    this.resource('helpout', function () {
        this.route('ask');
        this.route('browse');
    });
});

// the custom authenticator that initiates the authentication process with Facebook
App.FacebookAuthenticator = SimpleAuth.Authenticators.Base.extend({
    restore: function (properties) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(properties.accessToken)) {
                resolve(properties);
            } else {
                reject();
            }
        });
    },
    authenticate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.getLoginStatus(function (fbResponse) {
                if (fbResponse.status === 'connected') {
                    Ember.run(function () {
                        resolve({ accessToken: fbResponse.authResponse.accessToken });
                    });
                } else if (fbResponse.status === 'not_authorized') {

                    reject();
                } else {
                    FB.login(function (fbResponse) {
                        if (fbResponse.authResponse) {
                            Ember.run(function () {
                                resolve({ accessToken: fbResponse.authResponse.accessToken });
                            });
                        } else {
                            reject();
                        }
                    });
                }
            });
        });
    },
    invalidate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.logout(function (response) {
                Ember.run(resolve);
            });
        });
    }
});

// the custom authenticator that initiates the authentication process with Google+
App.GooglePlusAuthenticator = SimpleAuth.Authenticators.Base.extend({
    restore: function (properties) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(properties.access_token)) {
                resolve(properties);
            } else {
                reject();
            }
        });
    },
    authenticate: function () {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            gapi.auth.authorize({
                client_id: '973620112090-cdupacm1dvpmt5ahibvtl8hnv6u903v9.apps.googleusercontent.com',
                scope: ['https://www.googleapis.com/auth/plus.me'],
                'approvalprompt': 'force',
                immediate: false
            }, function (authResult) {
                if (authResult && !authResult.error) {
                    resolve({ access_token: authResult.access_token });
                } else {
                    reject((authResult || {}).error);
                }
            });
        });
    },
    invalidate: function () {
        return Ember.RSVP.resolve();
    }
});

//App.ApplicationSerializer = DS.LSSerializer.extend();
//App.ApplicationAdapter = DS.LSAdapter.extend({
//    namespace: 'xiwamilocal'
//});

App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:8088'
    //headers: { 
    //'Content-Type': 'application/json'
    //}
});

// the problem when writing my own serializer is the data transforms are not being utilized
//App.ApplicationSerializer = DS.RESTSerializer.extend({
//    //primaryKey: '_id'
//    serialize: function (record, options) {
//        debugger;

//        var json = {},
//            changedAttributes = Object.keys(record.get('_inFlightAttributes'));

//        json[this.get('primaryKey')] = record.get('id');

//        record.eachAttribute(function(key, attribute) {
//            if (changedAttributes.indexOf(key) != -1) {
//                if (!attribute.options.readOnly) {
//                    var data = record.get(key);
//                    if (data instanceof Date) {
//                        json[key] = moment(data).format('YYYY/MM/DD');
//                    } else 
//                        json[key] = record.get(key);
//                }
//            }
//        });


//        return json;
//    }
//});


// 
// Handle deserializing data
//
//App.ApplicationSerializer = DS.RESTSerializer.extend({
//    //primaryKey: '_id',
//    /**
//     The current ID index of generated IDs
//     @property
//     @private
//    */
//    _generatedIds: 0,

//    /**
//     Sideload a JSON object to the payload
     
//     @method sideloadItem
//     @param {Object} payload JSON object representing the payload
//     @param {subclass of DS.Model} type The DS.Model class of the item to be sideloaded
//     @paraam {Object} item JSON object representing the record to sideload to the payload
//    */
//    sideloadItem: function (payload, type, item) {
//        debugger;
//        var sideloadKey = type.typeKey.pluralize(),     // The key for the sideload array 
//            sideloadArr = payload[sideloadKey] || [],   // The sideload array for this item
//            primaryKey = Ember.get(this, 'primaryKey'), // the ID property key
//            id = item[primaryKey];

//        // Missing an ID, give it one 
//        if (typeof id == 'undefined') {
//            id = 'generated-' + (++this._generatedIds);
//            item[primaryKey] = id;
//        }

//        // Don't add if already side loaded
//        debugger;
//        if (sideloadArr.findBy('_id', id) != undefined) {
//            return payload;
//        }

//        // Add to sideloaded array
//        sideloadArr.push(item);
//        payload[sideloadKey] = sideloadArr;
//        return payload;
//    },

//    /**
//     Extract relationships from the payload and sideload them. This function recursively 
//     walks down the JSON tree
     
//     @method sideloadItem
//     @param {Object} payload JSON object representing the payload
//     @paraam {Object} recordJSON JSON object representing the current record in the payload to look for relationships
//     @param {Object} primaryType The DS.Model class of the record object
//    */
//    extractRelationships: function (payload, recordJSON, primaryType) {
//        primaryType.eachRelationship(function (key, relationship) {
//            var related = recordJSON[key], // The record at this relationship
//                type = relationship.type;  // belongsTo or hasMany

//            if (related) {

//                // One-to-one
//                if (relationship.kind == 'belongsTo') {
//                    // Sideload the object to the payload
//                    this.sideloadItem(payload, type, related);

//                    // Replace object with ID
//                    recordJSON[key] = related.id;

//                    // Find relationships in this record
//                    this.extractRelationships(payload, related, type);
//                }

//                    // Many
//                else if (relationship.kind == 'hasMany') {
//                    // Loop through each object
//                    related.forEach(function (item, index) {

//                        // Sideload the object to the payload
//                        this.sideloadItem(payload, type, item);

//                        // Replace object with ID
//                        related[index] = item.id;

//                        // Find relationships in this record
//                        this.extractRelationships(payload, item, type);
//                    }, this);
//                }

//            }
//        }, this);

//        return payload;
//    },

//    /**
//     Overrided method
//    */
//    normalizePayload: function (type, payload) {
//        debugger;
//        var typeKey = type.typeKey,
//            typeKeyPlural = typeKey.pluralize();

//        payload = this._super(type, payload);

//        // Many items (findMany, findAll)
//        if (typeof payload[typeKeyPlural] != 'undefined') {
//            payload[typeKeyPlural].forEach(function (item, index) {
//                this.extractRelationships(payload, item, type);
//            }, this);
//        }

//            // Single item (find)
//        else if (typeof payload[typeKey] != 'undefined') {
//            this.extractRelationships(payload, payload[typeKey], type);
//        }

//        return payload;
//    }
//});

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

//App.Store = DS.Store.extend({
//    revision: 13,
//    adapter: 'DS.FixtureAdapter'
//});
