const dbRef = firebase.database().ref(); 
var count = 0;
var rows = document.getElementById("courserows");
 
class StudentCounter {   
	defaultValue(count){
		this.count = count
	}
	increase(){
		this.count++
	}
	decrease(){
		this.count--
	}
	getCount(){
		return this.count;
	}
} 

dbRef.child("students").once('value', function (snapshot){
	let students = snapshot.val();
	for(let key in students){
		count++;
	}
});
function displayStudentList(reference, subject){
	var counter = 0;
	reference.once('value', function (subjectStudentsnapshot){
		let student_list = subjectStudentsnapshot.val();
		for(let key2 in student_list){
			counter++;						
		} 
		document.getElementById(subject).innerHTML = count - counter;
		counter = 0;
	});
}
function getStudentList(subject_obj, key){
	dbRef.child("subjects").orderByChild("code").equalTo(subject_obj[key].code).once("value", subjectsnapshot => {
		if(subjectsnapshot.exists()){
			var key1 = Object.keys(subjectsnapshot.val())[0]; 
			const subjectStudentRef = dbRef.child('subjects/' + key1 +'/studentsTaken');
			var htmlname = subject_obj[key].code;
			htmlname = htmlname.replace(/\s+/g, '-'); 
			displayStudentList(subjectStudentRef, htmlname)
		}	
	});  
}
 
//list of subjects... 
dbRef.child("subjects").once('value', function (subjectsnapshot){   
	let subject_obj = subjectsnapshot.val();
	for(let key3 in subject_obj){ 
		if(subject_obj[key3].code != "CMSC 195"){
		//list of all students
			dbRef.child("students").once('value', function (snapshot){
				let student_obj = snapshot.val();
				for(let key in student_obj){  
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