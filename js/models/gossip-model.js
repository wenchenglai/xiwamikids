App.Gossip = DS.Model.extend({
    user: DS.attr('string'),
    gossipText: DS.attr('string'),
    createdDate: DS.attr('date'),
    answers: DS.hasMany('answer', { embedded: 'always' })
});