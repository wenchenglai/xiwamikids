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

    disabled: function () {
        //return Ember.isEmpty(this.get('firstName'));
        // I have to return false all the time for now, until I figure out how to update DOM using ember automatically when computed property got changed.
        return false;
    }.property('firstName'),
    actions: {
        close: function () {
            return this.send('closeAddMemberModal');
        },
        addkid: function (params) {
            var $this = this,
                firstName = this.get('firstName'),
                lastName = this.get('lastName'),
                nickName = this.get('nickName'),
                gender = this.get('gender'),
                selectedYear = this.get('selectedYear'),
                selectedMonth = this.get('selectedMonth'),
                selectedDay = this.get('selectedDay'),
                selectedLanguage = this.get('selectedLanguage'),
                selectedRelation = this.get('selectedRelation');

            debugger;
            // create a record and save it to the store
            var newkid = this.store.createRecord('person', {
                firstName: firstName,
                lastName: lastName,
                nickname: nickName,
                gender: gender,
                birthday: new Date(selectedYear, selectedMonth, selectedDay),
                selectedLanguage: ['Chinese', 'English'],
                type: selectedRelation
            });

            this.store.find('family', 1).then(function (family) {
                newkid.set('family', family);
                var f = family;
                var onSuccess = function (article) {
                    //debugger;
                    f.save().then(function () {
                        //$this.transitionToRoute('connect.index');
                        return $this.send('closeAddMemberModal');
                    });
                };

                var onFail = function (article) {
                    // deal with the failure here
                    debugger;
                };

                newkid.save().then(onSuccess, onFail);
            });
        }
    }
});