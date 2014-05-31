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

    categories: [
      { text: "Education", id: 1 },
      { text: "Fun", id: 2 },
      { text: "Literary & Books", id: 3 },
      { text: "Sports", id: 4 }
    ],

    actions: {
        editActivity: function (params) {
            debugger;
            var $this = this;

            var fromModel = this.get('model'); //.content;

            // IF in edit mode, the model is actually a promise, so we need to get the real loaded model, which is the content
            if (fromModel.content) {
                fromModel = fromModel.content;
            } else {
                fromModel.set('isDeleted', false);
            }

            var test = this.store.find('activity', 1);

            var onSuccess = function (person) {
                $this.send('closeEditModal');
            };

            var onFail = function (post) {
                // deal with the failure here
            };

            fromModel.save().then(onSuccess, onFail);
        },
    }
});