App.Family = DS.Model.extend({
    zipcode: DS.attr(),
    kids: DS.hasMany('person')
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