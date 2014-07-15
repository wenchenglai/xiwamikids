App.ConnectSearchController = Ember.ArrayController.extend({
    ages: [0, 1, 2, 3, 4, 5, 6],
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    distances: ['5 miles', '10 miles', '25 miles', '50 miles'],
    toAge: 6,
    fromAge: 0,
    actions: {
        searchfamilies: function () {
            this.set('fromAge',this.get('fromAge'));
            this.set('toAge', this.get('toAge'));
            var languages = this.get('languages');
            var distance = this.get('distance');

            var query = {
                zipcode: '48105',
                distance: distance,
                languages: languages,
                fromAge: this.get('fromAge'),
                toAge: this.get('toAge')
            };

            var onSuccess = function (json) {
                var cityState = json.results[0].formatted_address;

            };

            var onFail = function (article) {
                // deal with the failure here
                debugger;
            };

            //var queryString = "distance=" + distance;
            //queryString += "&fromAge=" + fromAge;
            //queryString += "&toAge=" + toAge;
            //queryString += "languages";

            //Ember.$.getJSON('http://localhost:8088/families/53a78f832e853854ec59d93f?address=' + zipcode + '&sensor=true').then(onSuccess, onFail);

            var found = this.store.find('family', query);
            this.set('content', found);
        }
    }
});