const commentRepo = require("../repo/comment_repo");
const userService=require("../service/user_service")
const commentDTO=require("../dto/commentDTO");

function create(comment) {
  commentRepo.create(comment);
}

function remove(id) {
  return commentRepo.remove(id);
}

function getAll() {
  return commentRepo.getAll();
}

function getById(id) {
  return commentRepo.getById(id);
}

function update(commentId, isApproved,isSeen) {
    const comment = commentRepo.getById(commentId);
  
    if (!comment) {
      return null; 
    }

    comment.isApproved = isApproved;
    comment.isSeen=isSeen;
      const updatedComment = commentRepo.update(commentId, comment);
  
    return updatedComment;
  }
  
function getCommentsByRentalId(rentalId) {
    return commentRepo.getCommentsByRentalId(rentalId);
}


function isAlreadyCommented(idRental,idUser)
{
    return commentRepo.isAlreadyCommented(idRental,idUser);
}

function getAllComments(idRental) {
    const comments = commentRepo.getCommentsByRentalId(idRental);
    const commentDTOs = [];
  
    for (const comment of comments) {
      const user = userService.getById(comment.idUser);
  
      const commentDto = new commentDTO();
      commentDto.commentId = comment.id;
      commentDto.logo = user.image;
      commentDto.userName = user.name;
      commentDto.idUser=user.id;
      commentDto.surname = user.surname;
      commentDto.text = comment.text;
      commentDto.rentalId = idRental;
      commentDto.isApproved = comment.isApproved; // Pretpostavka da komentar ima polje isApproved
      commentDto.isSeen=comment.isSeen;
      commentDto.grade=comment.grade;

  
      commentDTOs.push(commentDto);
    }
  
    return commentDTOs;
  }
  


module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  isAlreadyCommented,
  getAllComments,
  getCommentsByRentalId
};
