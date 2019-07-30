	var openSvc = "http://localhost:8188/Service.svc/";
	var closedSvc = "http://localhost:8189/Service.svc/";
	var global_passwd = "";
	var global_username = "";
	var currentpage = "home";
function registerthisdamnthing(){
	var xmlRe = new XMLHttpRequest();
	var url = "http://localhost:8188/Service.svc/register";//"http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
	var address = document.getElementById("address").value;
	var username = document.getElementById("user").value;
	var pass = document.getElementById("pw").value;
	xmlRe.open("POST", url, true);
	xmlRe.setRequestHeader("Content-Type",  "application/json;charset=UTF-8");
	xmlRe.onload = function () {
		alert(JSON.parse(xmlRe.responseText));
		}	
	var topost = {"Address":address, "Name": username, "Password":pass};
	xmlRe.send(JSON.stringify(topost));
}
function login(){
	var xhr = new XMLHttpRequest();
	global_username = document.getElementById("urnm").value;
	global_passwd = document.getElementById("pswd").value;
	if( global_username == "" && global_passwd == ""){
		alert("Please enter Credentials");
		return;
	}
	else if (global_username == "" && global_passwd != ""){
		alert("Please enter a username")
		return;
	}
	else if (global_username != "" && global_passwd == ""){
		alert("Please enter a password");
		return;
	}
	var url = "http://localhost:8189/Service.svc/user";
	xhr.open("GET", url, true, global_username, global_passwd);
	xhr.withCredentials = true;
	xhr.setRequestHeader("Accept",  "application/json;");
	xhr.onload = function (){
		if (xhr.status == 401){
			document.getElementById("fail").style.display = "inline";
			document.getElementById("valid").style.display = "none";
			document.getElementById("logged").style.display = "none";
			document.getElementById("loggedin").style.display = "none";
			document.getElementById("login1").style.display = "inline";
		}
		else if (xhr.status == 200) {
			document.getElementById("valid").style.display = "inline";
			document.getElementById("fail").style.display = "none";
			document.getElementById("loggedin").style.display = "inline";
			document.getElementById("login1").style.display = "none";
			document.getElementById("logged").style.display = "inline";
			setTimeout(function (){show(currentpage);},4000);
		}
	}
	xhr.send(null);
	}
function logout(){
	global_username = "";
	global_passwd = "";
	document.getElementById("fail").style.display = "none";
	document.getElementById("valid").style.display = "none";
	document.getElementById("logged").style.display = "none";
	document.getElementById("loggedin").style.display = "none";
	document.getElementById("login1").style.display = "inline";
	alert("You have been logged out. Thanks for using this broken service =]");	
}
//Could totally merge buybr and buybook, but thats too much thinking for this assignment. 
//Got 3 other courses of assignments to worry about, seriously dont give us such a long assignment with a week to do it thats crazy.
function buybr(i){
	var xmlRe = new XMLHttpRequest();
	var xhr = new XMLHttpRequest();
	var checkcred = new XMLHttpRequest();
	if( global_username == "" && global_passwd == ""){
		alert("Please login. Loading login...");
		currentpage = "br";
		setTimeout(function (){show("login");},2000);
		return;
	}
	var titlru = document.getElementById("title"+i).innerHTML;
	if(titlru.includes(":")){
		var sliceloc = titlru.indexOf(":");
		titlru = titlru.slice(sliceloc+1);
	}
	if(titlru.includes("'")){
		var sliceap = titlru.indexOf("'");
		titlru = titlru.slice(0,sliceap);
	}
	var url = closedSvc + "brbuy?id="; //"http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=";
	var link = (openSvc + "brsearch?term=" + titlru);//"http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + titlru);
	var credurl = closedSvc + "user";
	checkcred.open("GET", credurl, true, global_username, global_passwd);
	checkcred.setRequestHeader("Accept", "application/json");
	checkcred.onload = function(){
		if (checkcred.status == 401){
			alert("Login has been attempted. Try again? Loading login...");
			currentpage = "br";
			setTimeout(function (){show("login");},2000);
			return;}
	}
	checkcred.send(null);
	xmlRe.open("GET", link, true);
	xmlRe.setRequestHeader("Accept", "application/json");
	xmlRe.onload = function () {
		var responce = xmlRe.responseText;
		var fix = JSON.parse(responce);
		var newurl = url+fix[0].Id;
		xhr.open("GET", newurl, true, global_username, global_passwd);
		xhr.withCredentials = true;
		xhr.setRequestHeader("Accept",  "application/json;");
		xhr.onload = function () {
			alert(JSON.parse(xhr.responseText));
		}
		xhr.send(null);
	}
	xmlRe.send(null);
}
function buybook(i){
	var xhr = new XMLHttpRequest();
	var xmlRe = new XMLHttpRequest();
	var checkcred = new XMLHttpRequest();
	if( global_username == "" && global_passwd == ""){
		currentpage = "book";
		alert("Please login. Loading login...");
		setTimeout(function (){show("login");},2000);
		return;
	}
	var titlru = document.getElementById("title"+i).innerHTML;
	if(titlru.includes(":")){
		var sliceloc = titlru.indexOf(":");
		titlru = titlru.slice(sliceloc+1);
	}
	if(titlru.includes("'")){
		var sliceap = titlru.indexOf("'");
		titlru = titlru.slice(0,sliceap);
	}
	var url = closedSvc + "bookbuy?id="; //"http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=";
	var link = (openSvc + "booksearch?term=" + titlru); //("http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + titlru);
	var credurl = closedSvc + "user";
	checkcred.open("GET", credurl, true, global_username, global_passwd);
	checkcred.setRequestHeader("Accept", "application/json");
	checkcred.onload = function(){
		if (checkcred.status == 401){
			alert("Login has been attempted. Try again? Loading login...");
			currentpage = "book";
		setTimeout(function (){show("login");},2000);
		return;
		}
	}
	checkcred.send(null);
	xmlRe.open("GET", link, true);
	xmlRe.setRequestHeader("Accept", "application/json");
	xmlRe.onload = function () {
		var responce = xmlRe.responseText;
		var fix = JSON.parse(responce);
		var newurl = url+fix[0].Id;
		xhr.open("GET", newurl, true, global_username, global_passwd);
		xhr.withCredentials = true;
		xhr.setRequestHeader("Accept",  "application/json;");
		xhr.onload = function () {
			alert(JSON.parse(xhr.responseText));
		}
		xhr.send(null);
	}
	xmlRe.send(null);
}

function get(x) {
	var table = "";
	var request = new XMLHttpRequest();
	var uri = openSvc;//"http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/";
	request.open("GET", uri + x, true);
	request.setRequestHeader("Accept", "application/json");
	if(x == "brlist"){
		table = "<tr><th><h1>Blu-ray Disc</h1></th></tr>";
		request.onload = function () {
			var toshow = document.getElementById("showbr");
			var blurays = JSON.parse(request.responseText);
			for(i = 0; i < blurays.length; i++){
				var img = '<img src = "'+openSvc+'/brimg?id='+ blurays[i].Id + '" alt="pix" />';/**'<img src="http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=' */
				table += "<tr><td>" + img + "</td><td><div id='center'><span id = 'title"+i+"'>" + blurays[i].Title+ "</span><button onclick='buybr("+i+")'>Buy</button></div></td></tr>";
			}
				toshow.innerHTML = table;
		}
	}
	else if(x == "booklist"){
		table = "<tr><th><h1>Books</h1></th></tr>";
		request.onload = function () {
			var toshow = document.getElementById("showbook");
			var books = JSON.parse(request.responseText);
			for(i = 0; i < books.length; i++){
				var img = '<img src = "'+openSvc +'bookimg?id='+ books[i].Id + '" alt="pix" />'; //'<img src="http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id='
				table += "<tr><td>" + img + "</td><td><div id='center'><span id = 'title"+i+"'>" + books[i].Title+ "</span><button onclick='buybook("+i+")'>Buy</button></div></td></tr>";
			}
			toshow.innerHTML = table;
		}
	}
	else if(x == "htmlcomments"){
		request.onload = function () {
			var toshow = document.getElementById("showcomments");
			toshow.innerHTML = request.responseText;
			var comment = JSON.parse(request.responseText);
			var frame = '<iframe src="'+openSvc+'"htmlcomments" alt="pix" />'; //http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/
			table += "<tr><td>" + frame + "</td></tr>";
			toshow.innerHTML = table;
		}
	}
	request.send(null);
}
function search(itemtype){
	var searchtable = "";
	var xmlRe = new XMLHttpRequest();
	var link = (openSvc /**"http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/"*/ + itemtype + "search?term=" + document.getElementById(itemtype + "search_data").value);
	xmlRe.open("GET", link, true);
	xmlRe.setRequestHeader("Accept", "application/json");
	xmlRe.onload = function () {
		var searchfor = document.getElementById("show"+itemtype);
		var items = JSON.parse(xmlRe.responseText);
		if(items){
			if(itemtype == "br"){
				for(i = 0; i < items.length; i++){
					img = ('<img src="' + openSvc + itemtype +"img?id=" + items[i].Id + '" alt="pix" />'); //http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/
					searchtable += ("<tr><td>" + img + "</td><td><div id='center'><span id = 'title"+i+"'>" + items[i].Title+ "</span><button onclick='buybr("+i+")'>Buy</button></div></td></tr>");	
				}searchfor.innerHTML = searchtable;
			}
			else if(itemtype == "book"){
				for(i = 0; i < items.length; i++){
					img = ('<img src="'+ openSvc + itemtype +"img?id=" + items[i].Id + '" alt="pix" />'); //http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/
					searchtable += ("<tr><td>" + img + "</td><td><div id='center'><span id = 'title"+i+"'>" + items[i].Title+ "</span><button onclick='buybook("+i+")'>Buy</button></div></td></tr>");	
				}searchfor.innerHTML = searchtable;
			}
		}
	}
	xmlRe.send(null);	
}
function controlNav() {
	var nav = document.getElementById("nav");
	var main = document.getElementById("main");
	if(nav.style.width == "300px"){
		nav.style.width = "50px";
		main.style.marginLeft = "60px";
		document.getElementById("hidetog").style.display = "none";
	}
	else{
		nav.style.width = "300px";
		main.style.marginLeft = "310px";
		document.getElementById("hidetog").style.display = "block";
	}
}
function show(z){
	document.getElementById("home").style.display = "none";
    document.getElementById("br").style.display = "none";
    document.getElementById("book").style.display = "none";
	document.getElementById("comment").style.display = "none";
	document.getElementById("reg").style.display = "none";
	document.getElementById("login").style.display = "none";
    document.getElementById(z).style.display = "inline";
}
function postcomment() {
	var xmlRe = new XMLHttpRequest();
	var link = (openSvc + "comment?name=" + document.getElementById("commentname").value);		//http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/
	
	xmlRe.open("POST", link, true);
	xmlRe.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlRe.onload = function () {
		//alert("post is successful (^^)");
		get("htmlcomments");
		}
	var topost = document.getElementById("post_data").value;
	xmlRe.send(JSON.stringify(topost));
}
window.onload = function (){
	document.getElementById("hidetog").style.display = "none";
	document.getElementById("home").style.display = "inline";
	document.getElementById("br").style.display = "none";
    document.getElementById("book").style.display = "none";
	document.getElementById("comment").style.display = "none";
	document.getElementById("reg").style.display = "none";
	document.getElementById("login").style.display = "none";
	document.getElementById("valid").style.display = "none";
	document.getElementById("fail").style.display = "none";
	document.getElementById("main").style.marginLeft = "60px";
	}