App.ConnectEditmemberController = Ember.ObjectController.extend({
    localinit: function() {
        //debugger;
        //var model = this.get('model');
        //var birthday = model.get('birthday');
        //this.set('selectedYear', birthday.getFullYear());
        //return this.set('content', App.Post.find({
        //    recent: true
        //}));
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
    languages: ['English', 'Chinese', 'Russian'],
    relationships: [
      { text: "Daughter", id: 1 },
      { text: "Son", id: 2 },
      { text: "Mother", id: 3 },
      { text: "Father", id: 4 }
    ],
    pronoun: "He",
    //firstName: "",
    //lastName: "",
    //nickName: "",
    gender: function () {
        var gender = this.get('model.gender');
        return gender;
    }.property('model.birthday'),
    selectedYear: function () {
        var birthday = this.get('model.birthday');
        var mydate = new Date(birthday);
        var year = mydate.getFullYear();
        return year;
    }.property('model.birthday'),
    selectedMonth: function () {
        var birthday = this.get('model.birthday');
        var mydate = new Date(birthday);
        var month = mydate.getMonth() + 1;
        return month;
    }.property('model.birthday'),
    selectedDay: function () {
        var birthday = this.get('model.birthday');
        var mydate = new Date(birthday);
        var day = mydate.getDate();
        return day;
    }.property('model.birthday'),
    //selectedLanguage: null,
    selectedRelation: function () {
        var type = this.get('model.type');
        return type;
    }.property('model.birthday'),

    //disabled: function () {
    //    //return Ember.isEmpty(this.get('firstName'));
    //    // I have to return false all the time for now, until I figure out how to update DOM using ember automatically when computed property got changed.
    //    return false;
    //}.property('firstName'),

    actions: {
        close: function () {
            //debugger;
            return this.send('closeAddMemberModal');
        },
        edit: function (params) {
            var $this = this,
                firstName = this.get('firstName'),
                lastName = this.get('lastName'),
                nickName = this.get('nickName');
                //gender = this.get('gender'),
                //selectedYear = this.get('selectedYear'),
                //selectedMonth = this.get('selectedMonth'),
                //selectedDay = this.get('selectedDay'),
                //selectedLanguage = this.get('selectedLanguage'),
                //selectedRelation = this.get('selectedRelation');

            debugger;
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