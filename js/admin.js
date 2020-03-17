var counter = 0;
const dbRef = firebase.database().ref(); 
var count = 0;
var rows = document.getElementById("courserows");
 
class Students {   //class 1
	constructor(){

	}
} 

dbRef.child("students").once('value', function (snapshot){
	let students = snapshot.val();
	for(let key in students){
		count++;
	}
});
function getStudentList(subject_obj, key){
	dbRef.child("subjects").orderByChild("code").equalTo(subject_obj[key].code).once("value", subjectsnapshot => {
		if(subjectsnapshot.exists()){
			var key1 = Object.keys(subjectsnapshot.val())[0];
			const subjectStudentRef = dbRef.child('subjects/' + key1 +'/studentsTaken');
			subjectStudentRef.once('value', function (subjectStudentsnapshot){
				let student_list = subjectStudentsnapshot.val();
				for(let key2 in student_list){
					counter++;						
				}
				//console.log(counter);
				var htmlname = subject_obj[key].code;
				htmlname = htmlname.replace(/\s+/g, '-');
				console.log(htmlname);

				document.getElementById(htmlname).innerHTML = count - counter;
				counter = 0;
			});
		}	
	});  
}
 
//list of subjects... 
dbRef.child("subjects").once('value', function (subjectsnapshot){     
	//subdivide design to routine levels
	let subject_obj = subjectsnapshot.val();
	for(let key3 in subject_obj){ 
		if(subject_obj[key3].code != "CMSC 195"){
		//list of all students
			dbRef.child("students").once('value', function (snapshot){
				let student_obj = snapshot.val();
				for(let key in student_obj){ 
					//get list of students of a subject
					getStudentList(subject_obj, key3);
				} 
			});
		}
	}
});

function showStudentList(course){
	var x = document.getElementById(course).value; 
	console.log(x);  
	if(x == 0){
		alert("All the students in the student list have taken this subject");
		logger.log({
			message: 'All the students in the list who have taken this subject',
			level: 'info'
		})
	}
	else{
		location.href = 'list.html?course='+course;
	}
	//window.location = '/list.html?course='+course;
}   

function changeCellColor(bgColor, color){
	event.target.style.backgroundColor = bgColor;
	event.target.style.color = color;
}
rows.addEventListener("mouseover", function(event){   //refactor  //code is duplicated
	
	if(isNaN(parseInt(event.target.innerHTML))){  
		changeCellColor("#d9f8f7", "") 
	} 
}, false);

rows.addEventListener("mouseout", function(event){  
	changeCellColor("", "") 
}, false);