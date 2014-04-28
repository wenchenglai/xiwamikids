App.RadioButtonView = Ember.View.extend({
    classNameBindings: ['active'],
    attributeBindings: ["value"],
    click: function () {
        debugger;
        this.set("selection", this.get('value'));
    },
    active: function () {
        return this.get("value") == this.get("selection");
    }.property('selection')
});