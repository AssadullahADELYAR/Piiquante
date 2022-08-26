//Importing Sauce and User Schema
const Sauce = require("../models/sauces");
const user = require("../models/user");
const fs = require("fs");

//Creating New Sauce
exports.createSauce = (req, res, next) => {
   //Storing the URL in variable
   const url = req.protocol + "://" + req.get("host");
   const sauceObject = JSON.parse(req.body.sauce);
   delete sauceObject._id;
   const sauce = new Sauce({
      ...sauceObject,
      imageUrl: url + "/images/" + req.file.filename,
   });
   sauce
      .save()
      .then(() => {
         res.status(201).json({
            message: "Post saved successfully",
         });
         // console.log("Sauce Object: ", sauce);
      })
      .catch((error) => {
         res.status(400).json({
            error: error,
            message: "This is the post route",
         });
      });
};

//Getting (Displaying) Single Sauce
exports.getOneSauce = (req, res, next) => {
   Sauce.findOne({
      _id: req.params.id,
   })
      .then((sauce) => {
         res.status(200).json(sauce);
      })
      .catch((error) => {
         res.status(404).json({
            error: error,
         });
      });
};

//Modifing Single Sauce
exports.modifySauce = (req, res, next) => {
   const url = req.protocol + "://" + req.get("host");

   let sauceObj = { ...req.body };

   //If the user update the image
   if (req.file) {
      sauceObj = {
         ...req.body,
         imageUrl: url + "/images/" + req.file.filename,
         _id: req.params.id,
      };
   } else {
      //Or only the information fileds
      sauceObj = { ...req.body, _id: req.params.id };
   }
   //Then Update the Sauce
   Sauce.updateOne(
      {
         _id: req.params.id,
      },
      sauceObj
   )
      .then(() => {
         res.status(200).json({
            message: "Sauce updated successfully",
         });
      })
      .catch((error) => {
         res.status(404).json({
            error: error,
         });
      });
};

//Deleting the Sauce
exports.deleteSauce = (req, res, next) => {
   Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink("images/" + filename, () => {
         Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
               res.status(200).json({
                  message: "Deleted!",
               });
            })
            .catch((error) => {
               res.status(400).json({
                  error: error,
               });
            });
      });
   });
};

//Getting (Displaying) all Sauces
exports.getAllSauce = (req, res, next) => {
   Sauce.find()
      .then((sauce) => {
         res.status(200).json(sauce);
      })
      .catch((error) => {
         res.status(400).json({
            error: error,
         });
      });
};

//----------------- Like and Dislike -----------------//

exports.likeSauce = (req, res, next) => {
   let like = req.body.like;
   let userId = req.body.userId;
   let sauceId = req.params.id;

   //Find the Sauce
   Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
         console.log("This is object " + sauce);

         //User add like
         if (!sauce.usersLiked.includes(userId) && like === 1) {
            //Update the sauce: Add the like
            Sauce.updateOne(
               { _id: sauceId },
               {
                  $push: { usersLiked: userId },
                  $inc: { likes: +1 },
               }
            )
               .then(() =>
                  res.status(201).json({ message: "You have liked the sauce" })
               )
               .catch((error) => res.status(400).json(error));
         }

         //User remove like
         if (sauce.usersLiked.includes(userId) && like === 0) {
            //Update the sauce: Remove the like
            Sauce.updateOne(
               { _id: sauceId },
               {
                  $pull: { usersLiked: userId },
                  $inc: { likes: -1 },
               }
            )
               .then(() =>
                  res.status(201).json({ message: "You have removed the like" })
               )
               .catch((error) => res.status(400).json(error));
         }

         //User add dislike
         if (!sauce.usersDisliked.includes(userId) && like === -1) {
            //Update the sauce: Add dislike
            Sauce.updateOne(
               { _id: sauceId },
               {
                  $push: { usersDisliked: userId },
                  $inc: { dislikes: +1 },
               }
            )
               .then(() => res.status(201).json({ message: "Like +1" }))
               .catch((error) => res.status(400).json(error));
         }

         //User remove dislike
         if (sauce.usersDisliked.includes(userId) && like === 0) {
            //Update the sauce: Remove dislike
            Sauce.updateOne(
               { _id: sauceId },
               {
                  $pull: { usersDisliked: userId },
                  $inc: { dislikes: -1 },
               }
            )
               .then(() => res.status(201).json({ message: "Like +1" }))
               .catch((error) => res.status(400).json(error));
         }
      })
      .catch((error) => res.status(400).json({ error }));
};
