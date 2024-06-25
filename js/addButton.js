
AFRAME.registerComponent("create-buttons", {
    init: function() {
        //summary button
        var button1 = document.createElement("button");
        button1.innerHTML = "SUMMARY";
        button1.setAttribute("id", "summary-button");
        button1.setAttribute("class", "btn btn-warning mr-3");
  
        //issue button
        var button2 = document.createElement("button");
        button2.innerHTML = "ISSUE BOOK NOW";
        button2.setAttribute("id", "issue-button");
        button2.setAttribute("class", "btn btn-warning ml-3");

        // Append
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.appendChild(button1);
        buttonDiv.appendChild(button2);
    }
  });