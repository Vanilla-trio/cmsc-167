(function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;
  
          // window.alert(name);
  
          document.getElementById("user").innerHTML = user.displayName;
          document.getElementById("avatar").setAttribute("src", user.photoURL);
  
              const dbRef = firebase.database().ref();
              const subjectsRef = firebase.database().ref("subjects/");
              const gradesRef = firebase.database().ref("grades/");
              //var x = user.displayName;
              var x = user.displayName;
              //studentName = x;
              const studentsRef = dbRef.child("students");
  
              setTimeout(function(){
                  dbRef.child("students").orderByChild("name").equalTo(x).once("value",snapshot => {
                      if(snapshot.exists()){
                          console.log("Old Student");
                      }
                      else{
                          var userRef = studentsRef.push({
                              name: x
                          });
                          console.log("New Student pushed");
                      }
                  });
              }, 1000); //60 seconds 
  
              setTimeout(function(){
                  console.log("STUDENT LOGGED IN: " + x);
  
                  //check if student name is under grades name
                  dbRef.child("grades").orderByChild("name").equalTo(x).once("value", snapshot => {
                  if(snapshot.exists()){
                      snapshot.forEach(function(childSnapshot) {
                          childSnapshot.forEach(function(listSnapshot){
                              let obj = listSnapshot.val();
                              for(let key in obj){
                                  if(obj[key].course != undefined){
                                      var str = obj[key].course.replace(/\s+/g, '-');
                                      console.log(str + " - " + obj[key].grade);
                                      document.getElementById(str).style.color = '#FF0000';
                                      //search subjects in subject list and push the name
                                      dbRef.child("subjects").orderByChild("code").equalTo(obj[key].course).once("value", snapshot => {
                                          if(snapshot.exists()){
                                              var key = Object.keys(snapshot.val())[0];
                                              const subjectStudentRef = dbRef.child('subjects/' + key +'/studentsTaken');
                                              subjectStudentRef.orderByChild("name").equalTo(x).once("value", snapshot => {
                                                  if(snapshot.exists()){
                                                      console.log("Student is already on the list");
                                                  }
                                                  else{
                                                      var a = subjectStudentRef.push({
                                                          name: x
                                                      });
                                                      console.log("SUBJECT TAKEN");
                                                  }
                                              });
                                          }
                                          else{
                                              console.log("SUBJECT IN THE GRADE DOES NOT EXIST");
                                          }
                                      });
                                  }
                              }
                                  //console.log(childSnapshot.key+" - "+listSnapshot.key+": "+listSnapshot.val());
                          });
                      });
                  }
                  else{
                      console.log("Student does not currently have any grades");
                  }
                  });
              }, 1500); //10 seconds 
  
      } else {
          // No user is signed in.
        }
    });
    
  })()