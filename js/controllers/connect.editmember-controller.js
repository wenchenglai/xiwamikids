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
    allLanguages: ['Chinese (Mnadarin)', 'Chinese (Cantonese)', 'English', 'French', 'German', 'Indonesian', 'Japanese', 'Korean', 'Russian', 'Spanish'],
    //relationships: [
    //  { text: "Daughter", id: 1 },
    //  { text: "Son", id: 2 },
    //  { text: "Mother", id: 3 },
    //  { text: "Father", id: 4 },
    //  { text: "Grandfather", id: 4 },
    //  { text: "Grandmother", id: 4 },
    //  { text: "Pet", id: 4 },
    //],
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
    //firstName: "",
    //lastName: "",
    //nickName: "",
    //gender: function () {
    //    var gender = this.get('model.gender');
    //    return gender;
    //}.property('model.gender'),
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

    //disabled: function () {
    //    //return Ember.isEmpty(this.get('firstName'));
    //    // I have to return false all the time for now, until I figure out how to update DOM using ember automatically when computed property got changed.
    //    return false;
    //}.property('firstName'),

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

            return this.send('closeAddMemberModal');
        },
        edit: function () {
            var $this = this,
                fromModel = this.get('model'),
                originalBirthday = fromModel.get('birthday'),
                birthday = new Date(this.get('selectedYear'), this.get('selectedMonth') - 1, this.get('selectedDay', 0, 0, 0, 0));
            
            if (originalBirthday) {
                // it's difficult to compare the original date attribute with the custom date object from UI (UI uses three different textboxes instead of calendar textbox)
                if (originalBirthday.toString() !== birthday.toString()) {
                    fromModel.set('birthday', birthday);
                }
            } else {
                fromModel.set('birthday', birthday);
            }

            var onSuccess = function (ret) {
                $this.send('closeAddMemberModal');
            };

            var onFail = function (ret) {
                if (ret.status === 200)
                    $this.send('closeAddMemberModal');
                // deal with the failure here
            };

            fromModel.save().then(onSuccess, onFail);
        }
    }
});