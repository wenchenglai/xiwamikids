Ember.Handlebars.registerBoundHelper('prettyDate', function (date, format) {
    return moment(date).format(format);
});