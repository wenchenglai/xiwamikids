App.ConnectAddmemberController = Ember.ObjectController.extend({
    years: function() {
        var currentYear = new Date().getFullYear();
        return this.getEnumeration(currentYear - 80, currentYear);
    }.property(),

    months: function() {
        return this.getEnumeration(1, 12);
    }.property(),

    days: function() {
        return this.getEnumeration(1, 31);
    }.property(),

    getEnumeration: function(start, length) {
        var array = [];
        for (var i = start; i <= length; ++i) {
            array.push(i);
        }
        return array;
    },
    languages: ['English', 'Chinese', 'Russian'],
    relationships: [
      {text: "Daughter", id: 1},
      {text: "Son", id: 2 },
      {text: "Mother", id: 3 },
      {text: "Father", id: 4 }
    ],
    pronoun: "He",
    firstName: "",
    lastName: "",
    nickName: "",
    gender: "",
    selectedYear: null,
    selectedMonth: null,
    selectedDay: null,
    selectedLanguage: null,
    selectedRelation: null,
    familyId: -1,

    disabled: function () {
        return Ember.isEmpty(this.get('firstName')) || Ember.isEmpty(this.get('lastName'));
    }.property('firstName', 'lastName'),

    actions: {
        close: function () {
            return this.send('closeFamilyMemberModal');
        },
        addMember: function (params) {
            var self = this,
                model = this.get('model'),
                firstName = this.get('firstName'),
                lastName = this.get('lastName'),
                nickName = this.get('nickName'),
                gender = this.get('gender'),
                selectedYear = this.get('selectedYear'),
                selectedMonth = this.get('selectedMonth'),
                selectedDay = this.get('selectedDay'),
                selectedLanguage = this.get('selectedLanguage'),
                selectedRelation = this.get('selectedRelation');

            // create a record and save it to the store
            //var newkid = this.store.createRecord('member', {
            //    firstName: firstName,
            //    lastName: lastName,
            //    nickname: nickName,
            //    gender: gender,
            //    birthday: new Date(selectedYear, selectedMonth, selectedDay),
            //    languages: ['Chinese', 'English'],
            //    type: selectedRelation
            //});
            model.set('birthday', new Date(selectedYear, selectedMonth, selectedDay));
            
            var onSuccess = function (article) {
                //debugger;
                //f.save().then(function () {
                //$this.transitionToRoute('connect.index');
                return self.send('closeFamilyMemberModal');
                //});
            };

            var onFail = function (ret) {
                // deal with the failure here
                if (ret.status === 200)
                    return self.send('closeFamilyMemberModal');
                debugger;
            };

            model.save().then(onSuccess, onFail);

            //this.store.find('family', this.get("familyId")).then(function (family) {
            //    newkid.set('family', family);
            //    var f = family;
            //    var onSuccess = function (article) {
            //        //debugger;
            //        //f.save().then(function () {
            //            //$this.transitionToRoute('connect.index');
            //        return self.send('closeFamilyMemberModal');
            //        //});
            //    };

            //    var onFail = function (ret) {
            //        // deal with the failure here
            //        if (ret.status === 200)
            //            return self.send('closeFamilyMemberModal');
            //        debugger;
            //    };

            //    newkid.save().then(onSuccess, onFail);
            //});
        }
    }
});