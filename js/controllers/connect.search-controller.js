App.ConnectSearchController = Ember.ArrayController.extend({
    ages: [0, 1, 2, 3, 4, 5, 6],
    languages: ['English', 'Chinese', 'Russian'],
    distances: ['5 miles', '10 miles', '25 miles', '50 miles'],
    toAge: 0,
    fromAge: 0,
    actions: {
        searchfamilies: function () {
            this.set('fromAge',this.get('fromAge'));
            this.set('toAge', this.get('toAge'));
            var language = this.get('language');
            var distance = this.get('distance');

            var query = {
                distance: distance,
                languages: language,
                fromAge: this.get('fromAge'),
                toAge: this.get('toAge')
            };

            var found = this.store.find('family', query);
            this.set('content', found);
        }
    }
});