/*const app = document.getElementById('root');
const logo = document.createElement('img');
logo.src = "imgs/up.png";

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);*/

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const dbRef = firebase.database().ref();
var mycourse = getUrlVars()["course"];
//console.log(mycourse);
mycourse = mycourse.replace(/-/g, ' ');
document.getElementById('course-name').innerHTML = mycourse;  
const studentListUI = document.getElementById("studentList");

var tableBody = document.getElementById("student-rows");

function appendStudent(studentName){
	var tr = document.createElement('TR');
	var name = document.createElement('TD');
	var no = document.createElement('TD');
	name.appendChild(document.createTextNode(studentName)); 
	no.appendChild(document.createTextNode(" data "));  
	tr.appendChild(name);  
	tr.appendChild(no);
	tableBody.appendChild(tr);
}

function filterStudentsList(subjectRef, student_obj, key){
	subjectRef.once('value', function (subjectStudentsnapshot){
		var flag = 0;
		let student_list = subjectStudentsnapshot.val();
		for(let key2 in student_list){
			if(student_obj[key].name == student_list[key2].name){
				flag = 1;
			}					
		}
		if(flag == 0){ 
			appendStudent(student_obj[key].name)
		}
		flag = 0;
	});
}
dbRef.child("students").once('value', function (snapshot){
	console.log("table list of students not taken the course yet")
	let student_obj = snapshot.val();                                       //refactor loop is too long
	for(let key in student_obj){ 
		dbRef.child("subjects").orderByChild("code").equalTo(mycourse).once("value", subjectsnapshot => {
			if(subjectsnapshot.exists()){
				var key1 = Object.keys(subjectsnapshot.val())[0];
				const subjectStudentRef = dbRef.child('subjects/' + key1 +'/studentsTaken');
				filterStudentsList(subjectStudentRef,student_obj, key)
			}
		});
	} 
});