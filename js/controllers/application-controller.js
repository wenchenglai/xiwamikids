App.ApplicationController = Ember.ArrayController.extend({
    currentPathDidChange: function () {
        var currentPath = this.get('currentPath'),
            currentResource = currentPath.split(".")[0];
        App.set('currentPath', currentPath);
        


        if (currentPath === 'index' || currentPath === '' || currentPath === 'tip.index') {
            this.set('content', [{ displayName: 'Index', linkName: 'index' },
                                 { displayName: 'Browse', linkName: 'tip.browse', subMenuitems: [{ displayName: 'Deals', linkName: 'tip.browse' }, { displayName: 'Education', linkName: 'tip.browse' }, { displayName: 'Health', linkName: 'tip.browse' }] },
                                 { displayName: 'My Tips', linkName: 'tip.my' }]);

        } else if (currentResource === 'question') {
            this.set('content', [{ displayName: 'Index', linkName: 'question.index' },
                                 { displayName: 'Ask for Help', linkName: 'question.ask' },
                                 { displayName: 'Browse', linkName: 'question.browse' },
                                 { displayName: 'My History', linkName: 'question.my' }]);

        } else if (currentResource === 'connect') {
            this.set('content', [{ displayName: 'Index', linkName: 'connect.index' },
                                 { displayName: 'Search Families', linkName: 'connect.search' },
                                 { displayName: 'My Family', linkName: 'connect.myfamily' }]);

        } else if (currentResource === 'items') {
            this.set('content', [{ displayName: 'Index', linkName: 'items.index' },
                                 { displayName: 'Search Items', linkName: 'items.search' },
                                 { displayName: 'My Items', linkName: 'items.myitems' }]);

        } else if (currentResource === 'activity') {
            this.set('content', [
                { displayName: 'Index', linkName: 'activity.index' },
                { displayName: 'Search Events', linkName: 'activity.search' },
                { displayName: 'Calendar', linkName: 'activity.calendar' },
                { displayName: 'Map', linkName: 'activity.map' },
                { displayName: 'My Events', linkName: 'activity.my' }
            ]);

        } else {
            this.set('content', []);
        }

    }.observes('currentPath')
});