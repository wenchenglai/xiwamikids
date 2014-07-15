App.ChosenMultiselectComponent = Ember.Component.extend({
    init: function () {
        this._super();
    },

    // settings
    labelClass: 'col-sm-2',
    label: 'Date',
    inputContainerClass: 'col-sm-2',
    inputClass: '',
    value: '',
    multiple: 'true',
    dataPlaceholder: '',
    optionLabelPath: 'content.description',
    optionValuePath: 'content.id',
    content: Ember.A(),
    chosenSelection: Ember.A(),
    selection: null,
    intputDisabled: false,

    // view properties
    labelClasses: function () {
        return this.get('labelClass') + ' control-label';
    }.property('labelClass'),
    inputContainerClasses: function () {
        return this.get('inputContainerClass') + ' input-group';
    }.property('inputContainerClass'),
    inputClasses: function () {
        return this.get('inputClass') + ' form-control chosen-select';
    }.property('inputClass'),

    disabledFixer: function () {
        var chosenSelect = this.$(".chosen-select");
        chosenSelect.prop('disabled', this.get('intputDisabled')).trigger("liszt:updated");
        chosenSelect.trigger("chosen:updated");
    }.observes('intputDisabled'),

    //// dom stuff
    setup: function () {

        var chosenSelect = $(".chosen-select");
        chosenSelect.find('script').remove();

        chosenSelect.chosen();

        // styling setup
        chosenSelect.attr('data-placeholder', this.get('dataPlaceholder'));
        $(".chosen-choices").addClass(this.get('inputContainerClass'));
        $(".search-field > input").addClass('form-control');

        // initial values
        var optionValueName = this.get('optionValuePath').replace('content.', '');
        var currentSelection = this.get('chosenSelection').map(function (x) {
            return x.get(optionValueName);
        });
        chosenSelect.val(currentSelection);
        chosenSelect.prop('disabled', this.get('intputDisabled')).trigger("liszt:updated");
        chosenSelect.trigger("chosen:updated");

        // handling changes
        var self = this;
        chosenSelect.chosen().change(function (event, item) {
            if (item.selected) {
                var val = item.selected;
                var selectedItem = self.get('content').findBy(optionValueName, val);
                self.get('chosenSelection').pushObject(selectedItem);
            }
            if (item.deselected) {
                var deselected = item.deselected;
                var deselectedItem = self.get('content').findBy(optionValueName, deselected);
                self.get('chosenSelection').removeObject(deselectedItem);
            }
        });
    }.on('didInsertElement'),
    teardown: function () {
    }.on('willDestroyElement')
});