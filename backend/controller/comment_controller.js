const express = require("express");
const router = express.Router();
const commentService = require("../service/comment_service");

router.use(express.json());

router.get("/", (req, res) => {
  res.json(commentService.getAll());
});

router.get('/Allcomments/:rentalId', (req, res) => {
    const rentalId = req.params.rentalId;
    try {
    const comments = commentService.getAllComments(rentalId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: "Comment not found" });
  }});

router.get("/:idRental/:idUser", (req, res) => {
    const idRental = req.params.idRental;
    const idUser = req.params.idUser;
  
    try {
      const isCommented = commentService.isAlreadyCommented(idRental, idUser);
      res.status(200).json({ isCommented }); 
    } catch (error) {
      res.status(500).json({ error: "Failed to check comment status" });
    }
  });
  

router.post("/", (req, res) => {
    const comment = req.body;
  
  
    try {
      commentService.create(comment);
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create comment" });
    }
  });




router.put('/update', (req, res) => {
    const { commentId, isApproved ,isSeen} = req.body;
    console.log("aaaaaaaa")

    const updatedComment = commentService.update(commentId, isApproved,isSeen);
  
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
  
    res.json(updatedComment);
  });
  


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var comment = commentService.getById(id);

    if (comment) {
      commentService.remove(id);
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Basket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    var comment = commentService.getById(id);

    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ error: "Basket not found" });
  }
});



module.exports = router;
