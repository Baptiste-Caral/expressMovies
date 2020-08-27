var form = document.querySelector('form')
form.addEventListener("submit", loginUser)

var loginArea = document.querySelector('#login')
var profileArea = document.querySelector('#profile')
var disconnectBtn = document.getElementById('disconnectBtn')
disconnectBtn.addEventListener('click', disconnect)
var connectionLinkArea = document.querySelector('#connectionLink')
handleFormDisplay();


function loginUser(event) {				
	loginUserWithXHR(event);
}	

function loginUserWithXHR(event) {		
	event.preventDefault();
	console.log('loginUserWithXHR');		

	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/login', true);

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {//Call a function when the state changes.
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			var token = xhr.response
			localStorage.setItem('token', token)
			switchToLoggedInMode()
			form.reset();
		}
	}				
	var email = document.getElementById('email').value
	var password = document.getElementById('password').value
	var payLoad = "email=" + email + "&" + "password=" + password
	xhr.send(payLoad); 				
}
function handleFormDisplay() {
	if(localStorage.getItem('token')) {
		switchToLoggedInMode()
	} else {
		switchToLoggedOutMode()
	}
}
function switchToLoggedInMode() {
	loginArea.style.display = 'none'
	profileArea.style.display = 'block'
	connectionLinkArea.innerHTML = '<a href="/login">déconnexion</a>'
}
function switchToLoggedOutMode() {
	loginArea.style.display = 'block'
	profileArea.style.display = 'none'
	connectionLinkArea.innerHTML = '<a href="/login">connexion</a>'
}
function disconnect() {
	switchToLoggedOutMode()
	localStorage.removeItem('token')
}