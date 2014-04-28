App.Event = DS.Model.extend({
    name: DS.attr('string'),
    date: DS.attr('date'),
    fromTime: DS.attr('date'),
    toTime: DS.attr('date'),
    location: DS.attr('string'),
    type: DS.attr(),
    imageUrl: DS.attr('string'),
    createdDate: DS.attr('date')
});