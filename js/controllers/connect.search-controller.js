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
            var ads = this.store.find('family');
            debugger;
            var data = this.store.find('person');
            debugger;
            this.set('content', data);
        }
    }
});