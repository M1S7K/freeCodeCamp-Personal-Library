'use strict';
const bookModel = require('../database/models').Book;
/*
*
*
*       Complete the API routing below
*       
*       
*/
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (title === "") {res.end("missing required field title");}
      // create new Book
      const newBook = new bookModel({title: title});
      // safe new book
      newBook.save((err, data) => {
        // check error
        if (err || !data) {
          res.send("missing required field comment");
        } else {
          res.json({ _id: newBook._id, title: newBook.title, });
        }
      });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      console.log("bookid", bookid)
      //json res format same as .get
      if (bookid == "") {
        res.send("missing required field comment")
      }
      //find bookid and update values
      bookModel.findByIdAndUpdate(bookid, {$push: { comments: comment }, $inc: {commentcount: 1} }, {new: true}, function(err, data){
        if (err) {
          res.send("no book exists")
        } else {
          res.json(data)
        }
      });
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
