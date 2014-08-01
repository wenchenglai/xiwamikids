App.ConnectSearchController = Ember.ArrayController.extend({
    ages: [0, 1, 2, 3, 4, 5, 6],
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    distances: ['5 miles', '10 miles', '25 miles', '50 miles'],
    toAge: 6,
    fromAge: 0,
    actions: {
        searchfamilies: function () {
            var self = this;
            this.set('fromAge',this.get('fromAge'));
            this.set('toAge', this.get('toAge'));
            var languages = this.get('languages');
            var distance = this.get('distance');
            var user = self.get('session.store').restore();

            this.store.find('family', user.familyId).then(function (family) {
                var query = {
                    longitude: family.get('location')[0],
                    latitude: family.get('location')[1],
                    distance: distance,
                    languages: languages,
                    fromAge: self.get('fromAge'),
                    toAge: self.get('toAge')
                };

                self.store.find('family', query).then(function(families) {
                    self.set('model', families.content);
                });
                
            });
        }
    }
});