App.UserProfileController = Ember.ObjectController.extend({
    _getISODateString: function (date) {
        if (date) {
            var com = date.split("/");

            return com[0] + "-" + com[1] + "-" + com[2];
        }
    },
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
                        FB.api('/me?fields=id,name,location,education,hometown,birthday', function (fbUser) {
                            fromModel.set('birthday', new Date(self._getISODateString(fbUser.birthday)));
                            fromModel.set('fhometown', fbUser.hometown.name);
                            fromModel.set('flocation', fbUser.location.name);
                            //fromModel.save();
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