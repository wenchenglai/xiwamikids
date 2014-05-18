App.Activity = DS.Model.extend({
    creatorId: DS.attr('string'),
    name: DS.attr('string'),
    description: DS.attr('string'),
    date: DS.attr('date'),
    fromTime: DS.attr('date'),
    toTime: DS.attr('date'),
    location: DS.attr('string'),
    type: DS.attr('string'),
    originalLink: DS.attr('string'),
    imageUrl: DS.attr('string'),
    createdDate: DS.attr('date')
});