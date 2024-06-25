var studentId = null;

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    if (studentId === null) {
      this.askStudentId();
    }

    var books = await this.getBooks();

    this.el.addEventListener("markerFound", () => {
      if (studentId !== null) {
        var markerId = this.el.id;
        this.handleMarkerFound(books, markerId);
      }
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },

  askStudentId: function () {
   
    swal({
      title: "Welcome to Library",
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your student id",
          type: "number",
          min: 1
        }
      }
    }).then(inputValue => {
      studentId = inputValue;
    });
  },

  handleMarkerFound: function (books, markerId) {
    
    var book = books.filter(book =>book.id === markerId)[0];

    if (book.issued = true) {
      swal({
        icon: "warning",
        title: book.book_name.toUpperCase(),
        text: "This has already been issued.",
        timer: 2500,
        buttons: false
      });
    } else {
   

      // Make summary Container visible
      var summaryContainer = document.querySelector(
        `#main-plane-${book.id}`
      );
      summaryContainer.setAttribute("visible", true);

      // Make book title Plane visible
      var titlePlane = document.querySelector(`#title-plane-${book.id}`);
      titlePlane.setAttribute("visible", true);


      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      var summaryButton = document.getElementById("summary-button");
      var issueButtton = document.getElementById("issue-button");
    

      // Handling Click Events
     

      issueButtton.addEventListener("click", () => {
        var sid;
       studentId <= 9 ? (sid = `S0${studentId}`) : `S0${studentId}`;
        this.handleIssue(sid, book);

        swal({
          
          title: "Book Issued",
          timer: 2000,
          buttons: false
        });
      });
    }
  },
  
  handleIssue: function (sid,book ) {
    // Reading currnt details
    firebase
      .firestore()
      .collection("students")
      .doc(sid)
      .get()
      .then(doc => {
        var details = doc.data();

        details [book.id] = {
            book: book.book_name,
            issued: book.issued,
            author: book.author,
            summary: book.summary
            //find a way to insert due date here + update issue status
          };

        // Updating Db
        firebase
          .firestore()
          .collection("books")
          .doc(doc.id)
          .update(details);
      });
  },
  getBooks: async function () {
    return await firebase
      .firestore()
      .collection("books")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },

  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
