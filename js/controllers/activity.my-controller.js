App.ActivityMyController = Ember.ArrayController.extend({
    sortProperties: ['date', 'title'],
    sortAscending: false,

    actions: {
        loadUpcoming: function () {
            var self = this,
                user = self.get('session.store').restore();
            self.store.find('activity', { status: 'Upcoming', seller: user.id }).then(function (records) {
                self.set('content', records);
            });
        },
        loadPast: function (params) {
            var self = this,
                user = self.get('session.store').restore();
            self.store.find('activity', { status: 'Past', seller: user.id }).then(function (records) {
                self.set('content', records);
            });
        }
    }
});