const mobile = document.getElementById("mobile");
const navbar = document.querySelector(".navbar");
const btnCloseNav = document.getElementById("close-nav");
const navOverlay = document.querySelector(".nav-overlay");
const switchCommentDown = document.getElementById("scd");
const swtichCommentUp = document.getElementById('scu')
const commentContainer = document.querySelector(".comments-container");

class Comment {
  constructor(body, commentator, title, type, id) {
    this.body = body;
    this.commentator = commentator;
    this.title = title;
    this.type = type;
    this.id = id;
  }
}

const commentList = [];
commentList.push(
  new Comment(
    "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    "Mike taylor",
    "Lahore, Pakistan",
    "main-comment",
    0
  )
);

commentList.push(
  new Comment(
    "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    "Chris Thomas",
    "CEO of Red Button",
    "background-comment",
    1
  )
);

commentList.push(
  new Comment(
    "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    "Onuh Kyrian",
    "CEO of Datagridder",
    "background-comment",
    2
  )
);

commentList.push(
  new Comment(
    "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.",
    "Emmanuel Jahi",
    "Founder at apple",
    "background-comment",
    3
  )
);

populateCommentsUi(commentList);
console.log(document.querySelectorAll('.comment-body'))
console.log(document.querySelectorAll('.comment-item'))


//populates the comment container with a list of comments
function populateCommentsUi(comments, nextIndex) {
  commentContainer.innerHTML = "";

  let mainCommentIndex = commentList.findIndex(
    (comment) => comment.type === "main-comment"
  );
  addComment(commentList[mainCommentIndex]);
  addComment(commentList[mainCommentIndex + 1]);

  comments.forEach(function (comment, index) { 
    if (comment.type !== "main-comment" && index !== (mainCommentIndex + 1))
      addComment(comment);
    // else mainCommentIndex = index;
  });
}

//adds a new comment item to the ui comment container
function addComment(comment) {
  const htmlContent = `<div class="comment-item ${comment.type}">
    <img src="img/commentator-one.png" alt="Good comment on Jadoo">

    <div class="comment-body" id="${comment.id}">
        <p class="comment-text">“${comment.body}”</p>

        <p class="commentator-name">${comment.commentator}</p>
        <p class="commentator-loc">${comment.title}</p>
    </div>
</div>`;

  commentContainer.innerHTML += htmlContent;
}

switchCommentDown.addEventListener("click", function () {
  let index = 0;
  for (const comment of commentList) {
    //get the comment from the ui
    const mainCommentBody = document.getElementById(comment.id);
    if (comment.type === "main-comment") {
      //this is the comment currently at the top
      const nextComment = commentList[index + 1]; //get the comment below it
      if (nextComment) {
        mainCommentBody.style.transform = "translate(0, 50px)"; //moving the comment at the top downward
        const nextCommentBody = document.getElementById(nextComment.id);
        nextCommentBody.style.transform = "translate(0, -90px)"; //moving the comment below it upward

        comment.type = "background-comment"; //making the comment at the top a background comment
        nextComment.type = "main-comment"; //making the comment below it the main comment i.e switching them

        commentList.push(commentList.shift()); //rearaging the array so the comment at the top is now the last
        setTimeout(() => {
          populateCommentsUi(commentList); //re populating the comment container
        }, 500);
      }
      break;
    }
    index++;
  }
});

swtichCommentUp.addEventListener("click", function(){
  let index = 0;
  for (const comment of commentList) {
    //get the comment from the ui
    const mainCommentBody = document.getElementById(comment.id);
    if (comment.type === "main-comment") {
      //this is the comment currently at the top
      const nextComment = commentList.slice(-1)[0]; //get the last comment in the list
      console.log(nextComment)
      if (nextComment) {
        mainCommentBody.style.transform = "translate(0, 50%)"; //moving the comment at the top downward
        console.log(document.querySelectorAll('.comment-body'))
        const nextCommentBody = document.getElementById(nextComment.id);
        nextCommentBody.style.transform = "translate(0, -90px)"; //moving the comment below it upward

        comment.type = "background-comment"; //making the comment at the top a background comment
        nextComment.type = "main-comment"; //making the comment below it the main comment i.e switching them

        commentList.push(commentList.shift()); //rearaging the array so the comment at the top is now the last
        setTimeout(() => {
          populateCommentsUi(commentList); //re populating the comment container
        }, 500);
      }
      break;
    }
    index++;
  }
})

function showNav() {
  navOverlay.classList.add("visible");
  navbar.classList.add("visible");
}

function closeNav() {
  navbar.classList.remove("visible");
  navOverlay.classList.remove("visible");
}

mobile.addEventListener("click", showNav);
btnCloseNav.addEventListener("click", closeNav);
