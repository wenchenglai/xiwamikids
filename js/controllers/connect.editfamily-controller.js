App.ConnectEditfamilyController = Ember.ObjectController.extend({

    actions: {
        close: function () {
            return this.send('closeAddMemberModal');
        },
        edit: function (params) {
            var $this = this,
                familyName = this.get('familyName'),
                zipcode = this.get('zipcode'),
                description = this.get('description');

            var fromModel = this.get('model').content;
            debugger;
            var onSuccess = function (person) {
                $this.send('closeAddMemberModal');
            };

            var onFail = function (ret) {
                // deal with the failure here
                if (ret.status === 200)
                    $this.send('closeAddMemberModal');
            };
            
            if (fromModel.get('isDirty'))
                fromModel.save().then(onSuccess, onFail);
        }
    }
});