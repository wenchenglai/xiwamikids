App.ApplicationController = Ember.ArrayController.extend({
    init: function() {
            
    },

    updateCurrentPath: function() {
        var currentPath = this.get('currentPath');
        App.set('currentPath', currentPath);
        //debugger;
        if (currentPath === 'index' || currentPath === '') {
            this.set('content', [{ displayName: 'Index', linkName: 'index' }, { displayName: 'Ask for Help', linkName: 'helpout.ask' }, { displayName: 'Help Others', linkName: 'helpout.browse' }]);

        } else if (currentPath === 'connect.index') {
            this.set('content', [{ displayName: 'Index', linkName: 'connect.index' }, { displayName: 'Search Families', linkName: 'connect.search' }, { displayName: 'My Family', linkName: 'connect.myfamily' }]);

        } else if (currentPath === 'items.index') {
            this.set('content', [{ displayName: 'Index', linkName: 'items.index' }, { displayName: 'Search Items', linkName: 'items.search' }, { displayName: 'My Items', linkName: 'items.myitems' }]);

        } else if (currentPath === 'activity.index') {
            this.set('content', [{ displayName: 'Index', linkName: 'activity.index' }, { displayName: 'Search Events', linkName: 'activity.search' }, { displayName: 'Calendar', linkName: 'activity.calendar' }, { displayName: 'My Events', linkName: 'activity.my' }]);

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
        activity: function() {
            this.transitionToRoute('activity');
        },
        logout: function() {
            FB.logout(function(response) {
                // Person is now logged out

            });
        },
        searchparents: function() {
            debugger;
        },
        openAddMemberModal: function (modalName, model) {
            debugger;
            //this.controllerFor(modalName).set('model', model);
            debugger;
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },
        closeAddMemberModal: function () {
            debugger;
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});