App.ActivityEditController = Ember.ObjectController.extend({
    localinit: function () {
        //debugger;
        //var model = this.get('model');
        //var birthday = model.get('birthday');
        //this.set('selectedYear', birthday.getFullYear());
        //return this.set('content', App.Post.find({
        //    recent: true
        //}));
    }.on('init'),

    types: ["Education", "Fun", "Literary & Books", "Sports"],

    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('fromTime')) || Ember.isEmpty(this.get('toTime'));
    }.property('title', 'fromTime', 'toTime'),

    actions: {
        closeModal: function () {
            var record = this.get('model');
            if (record.get('id')) {
                if (record.get('isDirty')) {
                    record.rollback();
                }
            } else {
                record.deleteRecord();
            }

            return this.send('closeAddEditModal', false);
        },
        addOrEdit: function (params) {
            var self = this,
                fromModel = self.get('model'); 

            fromModel.save().then(function (record) {
                self.send('closeAddEditModal', true);
            }, function (error) {
                throw new Error(error.errorThrown.message + "; Stack: " + error.errorThrown.stack);
            });
        },
    }
});