App.Family = DS.Model.extend({
	zipCode: DS.attr('string'),
	cityState: DS.attr('string'),
	familyName: DS.attr('string'),
	description: DS.attr('string'),
	location: DS.attr('raw'),
	members: DS.hasMany('member', { embedded: 'always' })
});

//App.Family.FIXTURES = [{
//    id: 1,
//    zipcode: '48105',
//    parents: [],
//    kids: []
//}, {
//    id: 2,
//    zipcode: '48105',
//    parents: [],
//    kids: []
//}, {
//    id: 3,
//    zipcode: '48105',
//    parents: [],
//    kids: []
//}];
