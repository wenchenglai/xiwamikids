App.UserProfileController = Ember.ObjectController.extend({
    actions: {
        save: function (params) {
            var self = this,
                fromModel = this.get('model');

            var onSuccess = function (ret) {
                self.send('closeModal');
            };

            var onFail = function (ret) {
                if (ret.status === 200)
                    self.send('closeModal');
                // deal with the failure here
            };

            fromModel.save().then(onSuccess, onFail);
        }
    }
});