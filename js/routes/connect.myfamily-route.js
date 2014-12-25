App.ConnectMyfamilyRoute = Ember.Route.extend(SimpleAuth.AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            currentUser = self.get('session.user');

        if (currentUser) {
            if (currentUser.get('family'))
                return this.store.find('family', currentUser.get('family').id);
        } else {
            throw new Error("There is no user in session");
        }
        return null;
    },
    setupController: function (controller, model) {
        controller.set('content', model);
    },
    didTransition: function (infos) {
        // 2014-12-09 Set document title on every route
        // http://balinterdi.com/2014/05/28/setting-the-document-title-in-ember-apps.html
        $(document).attr('title', 'Connect - My Family');
    },
    actions: {
        openAddMemberModal: function (modalName, id) {
            var self = this;
            this.store.find('family', id).then(function (family) {
                var empty = self.store.createRecord('member', { family: family });
                self.controllerFor(modalName).set('model', empty);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        openEditMemberModal: function (modalName, id) {
            var self = this;
            this.store.find('member', id).then(function(member) {
                self.controllerFor(modalName).set('model', member);
                return self.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            });
        },

        openAddFamilyModal: function (modalName, model) {
            var self = this;
            var emptyModel = self.store.createRecord('family');
            self.controllerFor(modalName).set('model', emptyModel);
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        openEditFamilyModal: function (modalName, id) {
            this.controllerFor(modalName).set('model', this.store.find('family', id));
            //this.controllerFor(modalName).set('model', this.store.find('person', id));
            //this.generateController('connect.addmember');
            //debugger;
            return this.render(modalName, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeFamilyMemberModal: function (needReload) {
            if (needReload) {
                //this.transitionTo('items.myitems');
                this.refresh();
            }

            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        deleteMember: function(id) {
            this.store.find('member', id).then(function (record) {
                //p.destroyRecord(); // => DELETE to /posts/2
                record.deleteRecord();
                record.save();
            });
            
        },

        deleteFamily: function (id) {
            debugger;
            this.store.find('family', id).then(function (record) {
                //record.destroyRecord(); // => DELETE to /posts/2
                record.deleteRecord();
                record.save();
            });

        }
    }
});