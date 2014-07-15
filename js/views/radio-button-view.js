App.RadioButtonView = Ember.View.extend({

    classNameBindings: [':btn', ':btn-info', 'isSelected:active'],
    //selection: '',
    //attributeBindings: ["value"],
    click: function () {
        //debugger;
        this.set("selection", this.get('value'));
    },
    isSelected: function () {
        //debugger;
        return this.get("value") == this.get("selection");
    }.property('selection')
});