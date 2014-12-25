App.ConnectAddfamilyController = Ember.ObjectController.extend({
    showError: false,
    errroMessage: "",
    needs: ['ConnectMyfamily'],

    disabled: function () {
        return Ember.isEmpty(this.get('familyName')) || Ember.isEmpty(this.get('zipCode'));
    }.property('familyName', 'zipCode'),

    actions: {
        close: function () {
            return this.send('closeFamilyMemberModal');
        },
        add: function (params) {
            var self = this,
                fromModel = this.get('model'),
                zipCode = fromModel.get('zipCode');

            var onSuccess = function (json) {
                var cityState = json.results[0].formatted_address;

                fromModel.set('cityState', cityState);

                fromModel.save().then(function (newlySavedfamily) {
                    var user = self.get('session.user'),
                        userId = user.get('id'),
                        session = self.get('session');

                    // after we create a new family, we should add current user as a member of the family
                    self.store.find('member', userId).then(function(member) {
                        member.set('family', newlySavedfamily);
                        member.save().then(function(mem) {
                            session.set("user", mem);

                            self.get('controllers.ConnectMyfamily').set('model', newlySavedfamily);
                            return self.send('closeFamilyMemberModal', true);
                        }, onFail);
                    }, onFail);
                }, onFail);
            };

            var onFail = function (error) {
                // deal with the failure here
                self.set('showError', true);
                self.set('errorMessage', "Error in Connect.AddFamily Controller: " + error.message);
            };

            var onGoogleApiFail = function (error) {
                // deal with the failure here
                self.set('showError', true);
                self.set('errorMessage', error.statusText + ": " + error.responseText);
            };

            // we need to get the cityState info based on the provided zip code using Google API
            Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&sensor=true').then(onSuccess, onGoogleApiFail);
        }
    }
});