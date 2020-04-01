// Survey Questions

var surveyQuestions = [

    "I like Chili P.",
    "Blue Sky is waaaay better than Chili P.",
    "Jesse shoulda kept his Cap'n Cook moniker.",
    "Jane was toxic for Jesse.",
    "Walter Jr. is hella annoying.",
    "Skyler is hot.",
    "Tuco Salamanca is just mis-understood.",
    "Hank should have forgiven Walt.",
    "I feel sorry for Mike and his grand daughter.",
    "Gus is a psycho path.",
    "Walter had no choice, he had to cook for his family",
    "Jesse is cool",
    "Hector Salamanca is awesome",
    "Hank is cool",
    "Heisenberg is a legend",
    "Saul Goodman is the best lawyer ever",
    "Mike should've killed Walt after that thing with Gus happened",
    "Walt Jr. should forgive Walt",
    "Skyler is just as culpable as Walt",
    "It was all worth it"
  ]
  
  // Display the survey questions
  
  displaySurvey();
  
  // When form submit button pressed
  
  $(".submit").on("click", (event) => {
      event.preventDefault();
  
      // Get input from survey
      let newFriend = getsurveyAnswers()
  
      // Add new friend to friend data array
    //   $.post("/api/friends", newFriend);
  
      // Get all possible friends from list
      $.get("/api/friends", (data) => {
          findFriend(newFriend,data);
      })
  });
  
  function displaySurvey () {
  
     // Display Survey
  
     for (var i = 0; i < surveyQuestions.length; i++) {
         $("#survey").append(
         `<h4 class="font-weight-bold">Question ${i+1}</h4>`
         +   `<h6>${surveyQuestions[i]}</h6>`
         +   `<select id = "q${i}" class="custom-select custom-select-sm" style="width: 15%">`
         +   `<option selected value="3">Select an Option</option>`
         +   `<option value="1">1 (Strongly Disagree)</option>`
         +   `<option value="2">2</option>`
         +   `<option value="3">3 (Indifferent)</option>`
         +   `<option value="4">4</option>`
         +   `<option value="5">5 (Strongly Agree)</option>`
         +   `</select><br><br>`
         );
     }
  }
  
  function getsurveyAnswers(){
  
      let scores = [];
      // Get the responses from each of the survey questions
      for ( var i=0; i<surveyQuestions.length; i++){
          scores[i] = $(`#q${i}`).val();
      }
  
      // Assign to friend object
      let friend = {
      friendName: $("#friendName").val().trim(),
      photo: $("#photo").val().trim(),
      scores: scores
      };
  
      // Reset form
      $("form")[0].reset();
      return friend;
  }
  
  function findFriend(friend,friendData){
      let ix = 0;
      let friendScore = 4 * friendData.length; 
      let c = []
 
      for (j=0; j<friendData.length-1; j++){
          // Calculate the difference between each survey response, loop through each possible friend
          c = friend.scores.map( (v, i)  =>{ return Math.abs(v - friendData[j].scores[i]); });
  
          // Add values to create friend score
          var sum = c.reduce((c, b) => { return c + b; }, 0);
          
        
          if ( sum < friendScore) {
              friendScore = sum;
              ix = j;
          }
  
          $(".modal-title").text(`You should be friends with:`);
          $(".modal-body").html(`<h4>${friendData[ix].friendName}</h4><img src="${friendData[ix].photo}" alt="New Friend">`);
      }
  }
  