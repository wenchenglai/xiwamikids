App.Item = DS.Model.extend({
    name: DS.attr('string'),
    size: DS.attr('string'),
    fromAge: DS.attr('string'),
    toAge: DS.attr('date'),
    condition: DS.attr(),
    type: DS.attr(),
    imageUrl: DS.attr('string'),
    createdDate: DS.attr('date')
});