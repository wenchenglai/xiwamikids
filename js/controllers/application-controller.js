App.ApplicationController = Ember.ArrayController.extend({
    init: function() {
            
    },

    updateCurrentPath: function() {
        var currentPath = this.get('currentPath');
        App.set('currentPath', currentPath);
        //debugger;
        if (currentPath === 'index' || currentPath === '') {
            this.set('content', [{ displayName: 'My Xiwami', linkName: 'index' }]);

        } else if (currentPath === 'connect.index') {
            this.set('content', [{ displayName: 'Friends', linkName: 'connect.index' }, { displayName: 'Search Families', linkName: 'connect.search' }, { displayName: 'Add Kids', linkName: 'connect.addkid' }]);

        } else if (currentPath === 'items.index') {
            this.set('content', [{ displayName: 'Your Items', linkName: 'items.index' }, { displayName: 'Search Items', linkName: 'items.search' }, { displayName: 'Add Items', linkName: 'items.additem' }]);

        } else if (currentPath === 'playdates.index') {
            this.set('content', [{ displayName: 'Calendar', linkName: 'playdates.index' }, { displayName: 'Search Events', linkName: 'playdates.search' }]);

        }

    }.observes('currentPath'),

    updateContent: function() {
        //debugger;
    },

    actions: {
        home: function() {
            this.transitionToRoute('index');
        },
        connect: function() {
            this.transitionToRoute('connect');
        },
        items: function() {
            this.transitionToRoute('items');
        },
        playdates: function() {
            this.transitionToRoute('playdates');
        },
        logout: function() {
            FB.logout(function(response) {
                // Person is now logged out

            });
        },
        searchparents: function() {
            debugger;
        }
    }
});

App.IndexController = Ember.ArrayController.extend({
    init: function () {
        this._super();
        //debugger;
    },
    updateContent: function () {
        //debugger;
    }
});