App.ActivitySearchController = Ember.ArrayController.extend({
    distances: ['5 miles', '10 miles', '25 miles', '50 miles'],

    actions: {
        search: function () {
            var self = this,
                user = self.get('session.store').restore();

            this.store.find('family', user.familyId).then(function (family) {
                var query = {
                    longitude: family.get('location')[0],
                    latitude: family.get('location')[1],
                    distance: self.get('distance'),
                    queryText: self.get('queryText')
                };

                self.store.find('activity', query).then(function (activities) {
                    self.set('model', activities.content);
                });
            });
        }
    }
});