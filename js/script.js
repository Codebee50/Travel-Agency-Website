const mobile = document.getElementById("mobile");
const navbar = document.querySelector(".navbar");
const btnCloseNav = document.getElementById("close-nav");
const navOverlay = document.querySelector(".nav-overlay");
const switchCommentDown = document.getElementById("scd");
const swtichCommentUp = document.getElementById("scu");
const commentContainer = document.querySelector(".comments-container");
const dotsContainer = document.querySelector(".dots-container");

class Comment {
  constructor(body, commentator, title, type, id, imagePath) {
    this.body = body;
    this.commentator = commentator;
    this.title = title;
    this.type = type;
    this.id = id;
    this.imagePath = imagePath;
  }
}

const commentList = [];
commentList.push(
  new Comment(
    "This agency is awesome.. They have a lot of options and flexibility to suit your needs and budget. I will definitely use them again.",
    "Mike taylor",
    "Lahore, Pakistan",
    "main-comment",
    0,
    "img/commentator-one.png"
  )
);

commentList.push(
  new Comment(
    "I had a wonderful time in Bali thanks to this agency They arranged everything perfectly and were very helpful kudos to all the staff",
    "Maya Evelyn",
    "CEO of Red Button",
    "background-comment",
    1,
    "img/comt-two.png"
  )
);

commentList.push(
  new Comment(
    "This is the best travel agency ever! They offer great deals and amazing customer service. I highly recommend them, a pure experience.",
    "John Jones",
    "Customer",
    "background-comment",
    2,
    "img/comt-one.png"
  )
);

commentList.push(
  new Comment(
    "A very professional and reliable travel agency. They expertly planned our family vacation to Disney World and it was a huge blast!.",
    "Iris Willow",
    "Founder at Sydtech",
    "background-comment",
    3,
    "img/comt-three.png"
  )
);

populateDots(commentList)
populateCommentsUi(commentList);

//populates the comment container with a list of comments
function populateCommentsUi(comments, backwards = false) {
  commentContainer.innerHTML = "";
  let mainCommentIndex = commentList.findIndex(
    (comment) => comment.type === "main-comment"
  );



  comments.forEach(function (comment, index) {
    if (comment.type !== "main-comment" && index !== mainCommentIndex + 1)
      addComment(comment);
    // else mainCommentIndex = index;
  });

  addComment(commentList[mainCommentIndex]);
  addComment(commentList[mainCommentIndex + 1]);

  selectDot(commentList)
}

//adds a new comment item to the ui comment container
function addComment(comment) {
  const htmlContent = `<div class="comment-item ${comment.type}">
    <div class="image-container">
        <img src="${comment.imagePath}" alt="Good comment on Jadoo">
    </div>
    <div class="comment-body" id="${comment.id}">
        <p class="comment-text">“${comment.body}”</p>

        <p class="commentator-name">${comment.commentator}</p>
        <p class="commentator-loc">${comment.title}</p>
    </div>
</div>`;

  commentContainer.innerHTML += htmlContent;
}

function populateDots(commentList){
  dotsContainer.innerHTML = ''
  commentList.forEach(function(comment){
    const dotHtml = comment.type === 'main-comment'?`<div class="dot selected" data-dotid="${comment.id}" id="dot-${comment.id}"></div>`: `<div class="dot" data-dotid="${comment.id}" id="dot-${comment.id}"></div>`;
    dotsContainer.insertAdjacentHTML('beforeend', dotHtml);
  })
}

function selectDot(commentList){
  document.querySelectorAll('.dot').forEach(function(dot){
    dot.classList.remove('selected')
  })

  for(const comment of commentList){
    if(comment.type === 'main-comment'){
      const selecteddot = document.getElementById(`dot-${comment.id}`)
      selecteddot.classList.add('selected') 
      break;//we found our dot, no more need to search
    }
  }
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

        commentList.push(commentList.shift()); //removing the element at the top of the list and adding it to the bottom of the list
        setTimeout(() => {
          populateCommentsUi(commentList); //re populating the comment container
        }, 500);
      }
      break;
    }
    index++;
  }
});

swtichCommentUp.addEventListener("click", function () {
  let index = 0;
  for (const comment of commentList) {
    //get the comment from the ui
    const mainCommentBody = document.getElementById(comment.id);
    if (comment.type === "main-comment") {
      //this is the comment currently at the top
      const nextComment = commentList.slice(-1)[0]; //get the last comment in the list
      if (nextComment) {
        mainCommentBody.style.transform = "translate(0, 50%)"; //moving the comment at the top downward
        const nextCommentBody = document.getElementById(nextComment.id);
        nextCommentBody.style.transform = "translate(0, -50%)"; //moving the comment below it upward

        comment.type = "background-comment"; //making the comment at the top a background comment
        nextComment.type = "main-comment"; //making the comment below it the main comment i.e switching them

        commentList.unshift(commentList.pop()); //removing the element a the bottom of the list and adding it to the top of this list
        setTimeout(() => {
          populateCommentsUi(commentList, true); //re populating the comment container
        }, 500);
      }
      break;
    }
    index++;
  }
});

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
