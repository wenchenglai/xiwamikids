App.ConnectAddkidController = Ember.ObjectController.extend({
    years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    languages: ['English', 'Chinese', 'Russian'],
    currentContact: null,
    init: function () {
        this._super();
        var controller = this;
        //$(document).delegate('.modal', 'hidden', function () {
        //    controller.get('currentContact.transaction').rollback();
        //});
    },
    showmodal: function () {
        debugger;
        var newp = App.Person.createRecord();
        debugger;
        this.set('currentContact', newp);
        debugger;
        $('#modal').modal();
    },
    actions: {
        addkid: function (params) {
            var $this = this;
            debugger;

            var year = this.get('year');
            var month = this.get('month');
            var day = this.get('day');

            // create a record and save it to the store
            var newkid = this.store.createRecord('person', {
                firstName: this.get('firstName'),
                lastName: this.get('lastName'),
                nickname: this.get('nickname'),
                gender: this.get('gender'),
                birthday: new Date(year, month, day)
            });

            this.store.find('family', 1).then(function(family)
            {
                newkid.set('family', family);
                var f = family;
                var onSuccess = function (article) {
                    debugger;
                    f.save().then(function() {
                        $this.transitionToRoute('connect.index');
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