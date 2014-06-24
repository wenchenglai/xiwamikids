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

        Ember.$.ajax({
            url: '/templates/familygrid-component.hbs.html',
            async: false,
            success: function (resp) {
                Em.TEMPLATES['components/family-grid'] = Ember.Handlebars.compile(resp);
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


//App.ApplicationSerializer = DS.LSSerializer.extend();
//App.ApplicationAdapter = DS.LSAdapter.extend({
//    namespace: 'xiwamilocal'
//});

//debugger;
App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:8080'
    //headers: { 
    //'Content-Type': 'application/json'
    //}
});

//App.ApplicationSerializer = DS.RESTSerializer.extend({
//    primaryKey: '_id'
//});
//debugger;
//DS.JSONSerializer.reopen({ // or DS.RESTSerializer
//    serializeHasMany: function (record, json, relationship) {
//        debugger;
//        var key = relationship.key,
//            hasManyRecords = Ember.get(record, key);

//        // Embed hasMany relationship if records exist
//        if (hasManyRecords && relationship.options.embedded == 'always') {
//            json[key] = [];
//            hasManyRecords.forEach(function (item, index) {
//                json[key].push(item.serialize());
//            });
//        }
//            // Fallback to default serialization behavior
//        else {
//            return this._super(record, json, relationship);
//        }
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
