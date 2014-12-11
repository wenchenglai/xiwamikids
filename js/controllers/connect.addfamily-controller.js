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

                fromModel.set('cityState', cityState)
                // create a record and save it to the store
                //var newRecord = self.store.createRecord('family', {
                //    zipCode: zipCode,
                //    cityState: cityState,
                //    familyName: familyName,
                //    description: description
                //});

                fromModel.save().then(function (family) {
                    var user = self.get('session.store').restore(),
                        userId,
                        session = self.get('session');

                    //userId = session.get('currentUser').get('id');
                    userId = user.id;


                    // after we create a new family, we should add current user as a member of the family
                    self.store.find('member', userId).then(function(member) {
                        member.set('family', family);
                        member.save().then(function(mem) {
                            user.familyId = family.get('id');
                            user.longitude = family.get('location')[0];
                            user.latitude = family.get('location')[1];
                            self.get('session.store').persist(user);

                            self.store.find('family', user.familyId).then(function(myfam) {
                                self.get('controllers.ConnectMyfamily').set('model', myfam);
                                return self.send('closeFamilyMemberModal', true);
                            });

                        }, onFail);
                    }, onFail);
                }, onFail);
            };

            var onFail = function (error) {
                // deal with the failure here
                self.set('showError', true);
                self.set('errorMessage', error.statusText + ": " + error.responseText);
            };

            // we need to get the cityState info based on the provided zip code using Google API
            Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&sensor=true').then(onSuccess, onFail);
        }
    }
});