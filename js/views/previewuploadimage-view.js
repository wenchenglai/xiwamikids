App.FileField = Ember.TextField.extend({
    type: 'file',
    //attributeBindings: ['name'],
    change: function (evt) {
        var input = evt.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var that = this;
            reader.onload = function (e) {
                var data = e.target.result;
                that.set('parentView.content', data);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
}),

App.PreviewImageView = Ember.View.extend({
    attributeBindings: ['name', 'width', 'height', 'src'],
    tagName: 'img',
    viewName: 'previewImageView'
})