//Credits for Ui
//https://developer.okta.com/blog/2018/06/05/authentication-vanilla-js 

//let scene, camera; 

/*function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight, 1, 1000);
	camera.position.z = 1; 
	camera.rotation.x = 1.16;
	camera.rotation.y = -0.12;
	camera.rotation.z = 0.27;

	let ambient = new THREE.AmbientLight(0x55555);
	scene.add(ambient);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.fog = new THREE.FogExp2(0x03544e, 0.001);
	renderer.setClearColor(scene.fog.color);
	document.body.appendChild(renderer.domElement);
	render();
}
function render(){
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
init();*/
function admin(){
  console.log('admin clicked');
  location.href = "admin.html";
}
