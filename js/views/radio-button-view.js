App.RadioButtonView = Ember.View.extend({

    classNameBindings: [':btn', ':btn-info', 'isSelected:test'],
    //selection: '',
    attributeBindings: ["value"],
    click: function () {
        this.set("selection", this.get('value'));
    },
    isSelected: function () {
        return this.get("value") == this.get("selection");
    }.property('selection')
});