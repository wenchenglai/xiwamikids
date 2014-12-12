App.Tip = DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    url: DS.attr('string'),
    createdDate: DS.attr('date'),
    expiredDate: DS.attr('date'),
    like: DS.attr('number'),
    type: DS.attr('string')
});