App.HelpoutAskController = Ember.ArrayController.extend({
    question: '',
    disabled: function() {
        return Ember.isEmpty(this.get('question'));
    }.property('question'),
    asked: false,
    actions: {
        ask: function () {
            //debugger;
            this.set("asked", true);

            //return Ember.$.ajax({
            //    url: 'http://192.168.244.133:8983/solr/core1/select?q=' + params.query + '&wt=json&indent=true',
            //    dataType: 'jsonp',
            //    jsonp: 'json.wrf'
            //});
            debugger;
            var $this = this,
                question = this.get('question');

            var newRecord = this.store.createRecord('question', {
                userId: "wenfacebookid",
                question: question,
                isAnswered: false,
                createdDate: new Date()
            });

            newRecord.save().then(function (record) {
                //$this.send('closeAddItemModal', true);
                debugger;
            }, function (record) {
                // deal with the failure here
                debugger;
            });
        }
    }
});