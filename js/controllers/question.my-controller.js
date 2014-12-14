App.QuestionMyController = Ember.ArrayController.extend({
    sortProperties: ['createdDate'],
    sortAscending: false,

    actions: {
        loadOpen: function () {
            var self = this,
                user = self.get('session.store').restore();
            self.store.find('question', { status: 'Open', creator: user.id }).then(function (records) {
                self.set('content', records);
            });
        },
        loadAnswered: function () {
            var self = this,
                user = self.get('session.store').restore();
            self.store.find('question', { status: 'Answered', creator: user.id }).then(function (records) {
                self.set('content', records);
            });
        }
    }
});