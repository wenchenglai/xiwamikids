App.ConnectAddfamilyController = Ember.ObjectController.extend({
    familyName: "",
    zipcode: "",
    description: "",
    disabled: function () {
        return Ember.isEmpty(this.get('familyName')) || Ember.isEmpty(this.get('zipcode'));
    }.property('familyName', 'zipcode'),
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

                newRecord.save().then(function (data) {
                    debugger;
                    return self.send('closeAddMemberModal');
                }, function (error) {
                    // deal with the failure here
                    return self.send('closeAddMemberModal');
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