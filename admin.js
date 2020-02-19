
var counter = 0;
const dbRef = firebase.database().ref(); 
var count = 0;
var rows = document.getElementById("courserows");

dbRef.child("students").once('value', function (snapshot){
	let students = snapshot.val();
	for(let key in students){
		count++;
	}
});   
//list of subjects... 
dbRef.child("subjects").once('value', function (subjectsnapshot){ 
	console.log("dbref")
	let subject_obj = subjectsnapshot.val();
	for(let key3 in subject_obj){
		//console.log(subject_obj[key3].code);
		if(subject_obj[key3].code != "CMSC 195"){
		//list of all students
			dbRef.child("students").once('value', function (snapshot){
				let student_obj = snapshot.val();
				for(let key in student_obj){
					//console.log("Original student"+ student_obj[key].name);
					//get list of students of a subject
					dbRef.child("subjects").orderByChild("code").equalTo(subject_obj[key3].code).once("value", subjectsnapshot => {
						if(subjectsnapshot.exists()){
							var key1 = Object.keys(subjectsnapshot.val())[0];
							const subjectStudentRef = dbRef.child('subjects/' + key1 +'/studentsTaken');
							subjectStudentRef.once('value', function (subjectStudentsnapshot){
								let student_list = subjectStudentsnapshot.val();
								for(let key2 in student_list){
									counter++;						
								}
								//console.log(counter);
								var htmlname = subject_obj[key3].code;
								htmlname = htmlname.replace(/\s+/g, '-');
								console.log(htmlname);

								document.getElementById(htmlname).innerHTML = count - counter;
								counter = 0;
							});
						}
					});
				} 
			});
		}
	}
});

function studentList(course){
	var x = document.getElementById(course).value;
	//x undefined
	console.log(x); //alert is still not working because x takes time to load. 
	if(x == 0){
		alert("All the students in the student list have taken this subject");
	}
	else{
		location.href = 'list.html?course='+course;
	}
	//window.location = '/list.html?course='+course;
}   

rows.addEventListener("mouseover", function(event){   
	
	if(isNaN(parseInt(event.target.innerHTML))){  
		event.target.style.backgroundColor = "#d9f8f7";
		event.target.style.color = ""; 
	} 
}, false);

rows.addEventListener("mouseout", function(event){  
	event.target.style.backgroundColor = "";
	event.target.style.color = "";  
}, false);