App.ConnectEditfamilyController = Ember.ObjectController.extend({

    actions: {
        close: function () {
            //debugger;
            return this.send('closeAddMemberModal');
        },
        edit: function (params) {
            var $this = this,
                familyName = this.get('familyName'),
                zipcode = this.get('zipcode'),
                description = this.get('description');

            var fromModel = this.get('model').content;
            // create a record and save it to the store

            var onSuccess = function (person) {
                $this.send('closeAddMemberModal');
            };

            var onFail = function (post) {
                // deal with the failure here
            };

            fromModel.save().then(onSuccess, onFail);
        }
    }
});