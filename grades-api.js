const setEditModal = (studentno) => {

}

const deleteGrade = (studentno) => {

}

const loadGrades = () => {
	const xhttp = new XMLHttpRequest();
	console.log("at loadGrades");
	 
    //example
    xhttp.open("GET", "https://ghibliapi.herokuapp.com/films", false);
    xhttp.send();

    const movies = JSON.parse(xhttp.responseText);
    
    for(let movie of movies){
        const x = ` 
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.release_date}</h6>

                        <div>Director: ${movie.director}</div>
                        <div>Producer: ${movie.producer}</div>
                        <div>Ratings: ${movie.rt_score}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${movie.id})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('movies').innerHTML = document.getElementById('movies').innerHTML + x;
    }
    xhttp.open("GET", "http://localhost:8080/api/user", false);
    xhttp.send(); 
    const movies = JSON.parse(xhttp.responseText);
    
    for(let login of users){
        var y = 0;
        const x = ` 
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Account No${y}</h5> 

                        <div>Email: ${login.email}</div>
                        <div>Password: ${login.password}</div> 

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${login.email})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        document.getElementById('accounts').innerHTML = document.getElementById('accounts').innerHTML + x;
        y++;
    }
}
loadGrades();