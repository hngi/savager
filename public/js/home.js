const coll = document.querySelectorAll(".collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let comment = this.nextElementSibling;
    if (comment.style.display === "none") {
        comment.style.display = "block";
    } else {
        comment.style.display = "none";
    }
  });
}
