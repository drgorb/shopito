Template.shoppingLists.helpers(
   {
      itemCount: function(){
         return this.items ? this.items.length : 0;
      },

      updateName: function(){
         return Session.get("updateName" + this._id);
      }
   })

Template.shoppingLists.events(
   {
      "click a": function(evt) {
         evt.stopPropagation();
      },

      "click #addShoppingList": function(evt) {
         ShoppingList.insert({owner: Meteor.userId(), name: "Nouvelle Liste"})
      },

      "click .list-group-item": function(evt) {
         if(Meteor.user() && this.owner == Meteor.user()._id)
            Session.set("updateName" + this._id, true);
      },

      "click .validate-name": function(evt, template) {
         Session.set("updateName" + this._id, false);
         ShoppingList.update({_id: this._id}, {$set: {name: template.find("#" + this._id).value}});
         evt.stopPropagation();
      },

      "click .share-list": function(evt){
         ShoppingList.update({_id: this._id}, {$set: {shared: !this.shared}});
         Session.set("updateName" + this._id, false);
         evt.stopPropagation();
      },

      "click .delete-list": function(){
         ShoppingList.remove({_id: this._id});
      }
   })