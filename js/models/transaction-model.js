App.Transaction = DS.Model.extend({
    fromUser: DS.attr('string'),
    toUser: DS.attr('string'),
    item: DS.attr('string'),
    createdDate: DS.attr('date')
});