App.ConnectAddfamilyController = Ember.ObjectController.extend({
    needs: ['ConnectMyfamily'],
    familyName: "",
    zipCode: "",
    description: "",
    disabled: function () {
        return Ember.isEmpty(this.get('familyName')) || Ember.isEmpty(this.get('zipCode'));
    }.property('familyName', 'zipCode'),
    actions: {
        close: function () {
            return this.send('closeAddMemberModal');
        },
        add: function (params) {
            var self = this,
                familyName = this.get('familyName'),
                zipCode = this.get('zipCode'),
                description = this.get('description');

            var onSuccess = function (json) {
                var cityState = json.results[0].formatted_address;

                // create a record and save it to the store
                var newRecord = self.store.createRecord('family', {
                    zipCode: zipCode,
                    cityState: cityState,
                    familyName: familyName,
                    description: description
                });

                newRecord.save().then(function (family) {
                    var user = self.get('session.store').restore();
                    self.store.find('member', user.id).then(function(member) {
                        member.set('family', family);
                        member.save().then(function(mem) {
                            user.familyId = family.get('id');
                            user.longitude = family.get('location')[0];
                            user.latitude = family.get('location')[1];
                            self.get('session.store').persist(user);
                            var test = self.store.find('family', user.familyId);
                            test.then(function(myfam) {
                                self.get('controllers.ConnectMyfamily').set('model', myfam);
                                return self.send('closeAddMemberModal', true);
                            });

                        }, function(df) {
                            debugger;
                        });
                    });
                    
                }, function (error) {
                    // deal with the failure here
                    //return self.send('closeAddMemberModal');
                });
            };

            var onFail = function (article) {
                // deal with the failure here
                debugger;
            };

            Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&sensor=true').then(onSuccess, onFail);
        }
    }
});