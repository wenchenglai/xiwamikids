App.Activity = DS.Model.extend({
    creatorId: DS.attr('string'),
    title: DS.attr('string'),
    description: DS.attr('string'),
    fromTime: DS.attr('date'),
    toTime: DS.attr('date'),
    location: DS.attr('string'),
    catetory: DS.attr('string'),
    originalLink: DS.attr('string'),
    facebookEventUrl: DS.attr('string'),
    imageUrl: DS.attr('string'),
    createdDate: DS.attr('date'),
    isDeleted: DS.attr('')
});