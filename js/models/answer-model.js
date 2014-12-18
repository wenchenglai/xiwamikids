App.Answer = DS.Model.extend({
    byUser: DS.belongsTo('member'),
    question: DS.belongsTo('question'),
    createdDate: DS.attr('date'),
    body: DS.attr('string'),
    like: DS.attr('number'),
    isBest: DS.attr('boolean')
});