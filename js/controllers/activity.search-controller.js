App.ActivitySearchController = Ember.ArrayController.extend({
    distances: ['5 miles', '10 miles', '25 miles', '50 miles'],
    periods: ['today','This coming weekend', 'next 30 days', 'next 6 months', 'custom time range'],

    actions: {
        search: function () {
            var self = this,
                session = self.get('session'),
                user = session.get('user');

            var query = {
                longitude: session.get('longitude'),
                latitude: session.get('latitude'),
                distance: self.get('distance'),
                queryText: self.get('queryText')
            };

            self.store.find('activity', query).then(function (activities) {
                self.set('model', activities.content);
            });
        }
    }
});