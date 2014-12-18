App.Activity = DS.Model.extend({
    creator: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    fromTime: DS.attr('date'),
    toTime: DS.attr('date'),
    location: DS.attr('string'),
    url: DS.attr('string'),
    imageUrl: DS.attr('string'),
    imageData: DS.attr('string'),
    like: DS.attr('number'),
    type: DS.attr('string')
});