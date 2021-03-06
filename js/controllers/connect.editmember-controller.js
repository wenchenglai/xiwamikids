﻿App.ConnectEditmemberController = Ember.ObjectController.extend({
    showError: false,
    errorMessage: '',

    localinit: function() {
        //debugger;

    }.on('init'),
    years: function () {
        var currentYear = new Date().getFullYear();
        return this.getEnumeration(currentYear - 80, currentYear);
    }.property(),

    months: function () {
        return this.getEnumeration(1, 12);
    }.property(),

    days: function () {
        return this.getEnumeration(1, 31);
    }.property(),

    getEnumeration: function (start, length) {
        var array = [];
        for (var i = start; i <= length; ++i) {
            array.push(i);
        }
        return array;
    },
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    allRelationships: [
      "Daughter",
      "Son",
      "Parent",
      "Grandparent",
      "Pet"
    ],
    foto: '',
    pronoun: function() {
        if (this.get('gender') === 'male')
            return 'He';
        else
            return 'She';
    }.property('gender'),

    actions: {
        close: function () {
            var record = this.get('model');
            if (record.get('id')) {
                if (record.get('isDirty')) {
                    record.rollback();
                }
            } else {
                record.deleteRecord();
            }

            return this.send('closeFamilyMemberModal');
        },
        edit: function () {
            var self = this,
                fromModel = self.get('model'),
                originalBirthday = fromModel.get('birthday'),
                birthday = new Date(self.get('birthYear'), self.get('birthMonth') - 1, self.get('birthDayNumber', 0, 0, 0, 0));
            
            if (originalBirthday) {
                // it's difficult to compare the original date attribute with the custom date object from UI (UI uses three different textboxes instead of calendar textbox)
                if (originalBirthday.toString() !== birthday.toString()) {
                    fromModel.set('birthday', birthday);
                }
            } else {
                fromModel.set('birthday', birthday);
            }

            var onSuccess = function (ret) {
                self.send('closeFamilyMemberModal');
            };

            var onFail = function (error) {
                self.set('errorMessage', error.responseText);
                self.set('showError', true);
            };

            fromModel.save().then(onSuccess, onFail);
        }
    }
});