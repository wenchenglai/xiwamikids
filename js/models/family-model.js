App.Family = DS.Model.extend({
    zipCode: DS.attr('string'),
    cityState: DS.attr('string'),
    familyName: DS.attr('string'),
    description: DS.attr('string'),
    location: DS.attr('raw'),
    members: DS.hasMany('member', { embedded: 'always' }),

    hasMember: function() {
        return this.get('members').get('length') > 0;
    }.property('members').cacheable()
});
