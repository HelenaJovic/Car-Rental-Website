class CommentDTO {
    constructor(
      commentId,
      text,
      rentalId,
      idUser,
      userName,
      surname,
      logo,
      isApproved,
      isSeen,
      grade
    ) {
      this.commentId = commentId;
      this.userName=userName;
      this.surname=surname;
      this.idUser=idUser;
      this.rentalId=rentalId;
      this.text=text;
      this.logo=logo;
      this.isApproved=isApproved;
      this.isSeen=isSeen;
      this.grade=grade;
    }
  }
  
  module.exports = CommentDTO;
  