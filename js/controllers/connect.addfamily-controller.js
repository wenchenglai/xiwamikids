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
            var $this = this,
                familyName = this.get('familyName'),
                zipcode = this.get('zipcode'),
                description = this.get('description'),
                cityState = "";
            

            var onSuccess = function (json) {
                cityState = json.results[0].formatted_address;

                // create a record and save it to the store
                var newRecord = $this.store.createRecord('family', {
                    familyName: familyName,
                    zipcode: zipcode,
                    description: description,
                    cityState: cityState
                });

                newRecord.save().then(function (data) {
                    return $this.send('closeAddMemberModal');
                }, function (article) {
                    // deal with the failure here
                    debugger;
                });
            };

            var onFail = function (article) {
                // deal with the failure here
                debugger;
            };

            Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode + '&sensor=true').then(onSuccess, onFail);
        }
    }
});