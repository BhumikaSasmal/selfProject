AFRAME.registerComponent("create-markers", {
    init: async function () {
      var mainScene = document.querySelector("#main-scene");
      var books = await this.getBooks();
      books.map(book => {
        var marker = document.createElement("a-marker");
        marker.setAttribute("id", book.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", book.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
  
          // summary Container
          var mainPlane = document.createElement("a-plane");
          mainPlane.setAttribute("id", `main-plane-${book.id}`);
          mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
          mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
          mainPlane.setAttribute("width", 1.7);
          mainPlane.setAttribute("height", 1.5);
          mainPlane.setAttribute("visible", false);
          marker.appendChild(mainPlane);
  
          // Book title background plane
          var titlePlane = document.createElement("a-plane");
          titlePlane.setAttribute("id", `title-plane-${book.id}`);
          titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
          titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          titlePlane.setAttribute("width", 1.69);
          titlePlane.setAttribute("height", 0.3);
          titlePlane.setAttribute("material", { color: "#F0C30F" });
          mainPlane.appendChild(titlePlane);
  
          // book title
          var bookTitle = document.createElement("a-entity");
          bookTitle.setAttribute("id", `book-title-${book.id}`);
          bookTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
          bookTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          bookTitle.setAttribute("text", {
            font: "monoid",
            color: "black",
            width: 1.8,
            height: 1,
            align: "center",
            value: book.book_name.toUpperCase()
          });
          titlePlane.appendChild(bookTitle);
  
          // summary
          var summary = document.createElement("a-entity");
          summary.setAttribute("id", `summary-${book.id}`);
          summary.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
          summary.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          summary.setAttribute("text", {
            font: "monoid",
            color: "black",
            width: 2,
            align: "left",
            value: `${book.summary.join("\n\n")}`
          });
          mainPlane.appendChild(summary);
        
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
    }
  });
  