App.Item = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('number'),
    size: DS.attr('string'),
    width: DS.attr('number'),
    length: DS.attr('number'),
    height: DS.attr('number'),
    fromAge: DS.attr('number'),
    toAge: DS.attr('number'),
    condition: DS.attr('string'),
    type: DS.attr('string'),
    status: DS.attr('string'),
    imageUrl: DS.attr('string'),
    createdDate: DS.attr('date'),
    isDeleted: DS.attr('')
});