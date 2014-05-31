App.ItemsAdditemController = Ember.ObjectController.extend({
    ages: [0, 1, 2, 3, 4, 5, 6],
    toAge: 0,
    fromAge: 0,
    name: "",
    description: "",
    price: null,
    type: '',
    condition: '',
    size: '',
    width: '',
    length: '',
    height: '',
    disabled: function () {
        return Ember.isEmpty(this.get('name')) || Ember.isEmpty(this.get('description'));
    }.property('name', 'description'),
    actions: {
        close: function () {
            return this.send('closeAddItemModal', false);
        },
        add: function (params) {
            var $this = this,
                name = this.get('name'),
                description = this.get('description'),
                price = this.get('price'),
                condition = this.get('condition'),
                type = this.get('type'),
                size = this.get('size'),
                width = this.get('width'),
                length = this.get('length'),
                height = this.get('height'),
                fromAge = this.get('fromAge'),
                toAge = this.get('toAge');

            // create a record and save it to the store
            var newRecord = this.store.createRecord('item', {
                name: name,
                description: description,
                price: price,
                condition: condition,
                type: type,
                size: size,
                width: width,
                length: length,
                height: height,
                fromAge: fromAge,
                toAge: toAge,
                status: "Open",
                createdDate: new Date(),
                isDeleted: false
        });

            newRecord.save().then(function (record) {
                $this.send('closeAddItemModal', true);

            }, function (record) {
                // deal with the failure here
                debugger;
            });
        }
    }
});