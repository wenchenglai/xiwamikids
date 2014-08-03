App.HelpoutMyController = Ember.ArrayController.extend({
    sortProperties: ['createdDate'],
    sortAscending: false,

    actions: {
        loadOpen: function () {
            var self = this,
                user = self.get('session.store').restore();
            self.store.find('activity', { status: 'Open', seller: user.id }).then(function (records) {
                self.set('content', records);
            });
        },
        loadAnswered: function () {
            var self = this,
                user = self.get('session.store').restore();
            self.store.find('activity', { status: 'Answered', seller: user.id }).then(function (records) {
                self.set('content', records);
            });
        }
    }
});