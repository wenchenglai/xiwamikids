App.UserAccountController = Ember.ObjectController.extend({
    disabledImportFacebook: function () {
        return Ember.isEmpty(this.get('facebookId'));
    }.property('facebookId'),

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
        },
        importFromFacebook: function (params) {
            var self = this,
                fromModel = self.get('model');

            FB.getLoginStatus(function (fbResponse) {
                if (fbResponse.status === 'connected') {
                    // if logged in before, the cookie will have this status
                    Ember.run(function () {
                        FB.api('/me?fields=id,name,address,email,birthday', function (fbUser) {
                            if (!fromModel.get('email'))
                                fromModel.set('email', fbUser.email);

                            if (!fromModel.get('facebookId'))
                                fromModel.set('facebookId', fbUser.id);
                        });
                    });
                } else if (fbResponse.status === 'not_authorized') {
                    // if facebook App setup is wrong, we could come here
                    reject();
                } else {
                    // status is unknown, then we must prompt with facebook login page
                    FB.login(function (fbResponse) {
                        if (fbResponse.authResponse) {
                            Ember.run(function () {
                                resolve({
                                    accessToken: fbResponse.authResponse.accessToken,
                                    facebookId: fbResponse.authResponse.userID
                                });
                            });
                        } else {
                            reject();
                        }
                    });
                }
            });
        }
    }
});