console.log("The client JS is working");

var deletePost = document.querySelector(".deleteForm");

if(deletePost){
  deletePost.addEventListener("submit", function(event){
    if(confirm("Are you sure?") !== true){
      event.preventDefault();
    }
  })
}
