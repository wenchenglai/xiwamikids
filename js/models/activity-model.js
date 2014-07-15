App.Activity = DS.Model.extend({
    member: DS.belongsTo('member'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    fromTime: DS.attr('date'),
    toTime: DS.attr('date'),
    location: DS.attr('string'),
    catetory: DS.attr('string'),
    originalLink: DS.attr('string'),
    facebookEventUrl: DS.attr('string'),
    imageUrl: DS.attr('string')
});