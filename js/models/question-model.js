App.Question = DS.Model.extend({
    userId: DS.attr('string'),
    question: DS.attr('string'),
    createdDate: DS.attr('date'),
    isAnswered: DS.attr("")
});