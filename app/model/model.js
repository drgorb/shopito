ShoppingList = new Meteor.Collection("ShoppingList")
ShoppingListItem = new Meteor.Collection("ShoppingListItem")

ShoppingList.allow(
   {
      insert: function (userId, doc) {
         // the user must be logged in, and the document must be owned by the user
         return (userId && doc.owner === userId);
      },
      update: function (userId, doc, fields, modifier) {
         // can only change your own documents or documents which have been shared with you
         // but you can not changed the sharing unless it is your document
         return doc.owner === userId || (doc.shared && !_(fields).contains("shared"));
      },
      remove: function (userId, doc) {
         // can only remove your own documents
         return doc.owner === userId;
      }
   })

ShoppingList.deny(
   {
      update: function (userId, doc, fields, modifier) {
         return _(fields).contains("owner");
      }
   })