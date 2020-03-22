
var regn;


function sign() {
	//turnds on sign in div and hides buttons
	$("#reigonal").show();
	
	$("#signinbuttons").toggle("slow");
	document.getElementById("head").innerText = "Select Reigonal";
	var d;

	var events = TBA.event.list(2020,function(s){
		
		var ul = document.getElementById('myUL');
	for (var i = s.length-1; i >= 0; i--) {
			console.log(s[i]);

			var node = document.createElement("li");
			node.setAttribute("uk-scrollspy","cls: uk-animation-fade; repeat: true");
			var a = document.createElement("a");
			var textnode = document.createTextNode(s[i].name);
			var n = s[i].name;
			var k = s[i].key;
			//"uk-link-heading"
			a.setAttribute("onclick", "getinfo("+"'"+s[i].key+"',"+"'"+s[i].name+"'"+ ")");

			node.setAttribute("class","uk-list uk-list-striped");
			a.appendChild(textnode);
			node.appendChild(a);
			ul.appendChild(node);
			
			
			

           
		}
	
	});

}

function search() {
	
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function search2() {
	
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myULs");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
window.onload = function(){
	//onload turns of sign in div
	$("#login_div").toggle();
	$("#reigonal").toggle();
	$("#match").toggle();
	$("#game").toggle();
	$("#locred").toggle();
	$("#locblue").toggle();
}
function getinfo(key,name){
regn = name;
t =false;
document.getElementById("head").innerText = "Enter Information";
$("#match").show();
$("#reigonal").hide("slow")
var ref = firebase.database().ref().child("matches");
ref.on("value",snap=>{
	var hol = ref.child(name.replace('#','').replace('.',''));
	if(!snap.hasChild(name.replace('#','').replace('.',''))){
		hol.child("key").set(key);
	}
	else{
		t = true;
	}

});
 

TBA.event.matches(key,function(s){
	var ul = document.getElementById('myULs');
	for (var i = s.length - 1; i >= 0; i--) {
			console.log(s[i]);
			var textnode = document.createTextNode(" ");
			if(s[i].comp_level == "qm"){
			var textnode = document.createTextNode("Qualification Match " + s[i].match_number);
		}
		if(s[i].comp_level == "qf"){
			var textnode = document.createTextNode("Quarter Finals " + s[i].set_number +" Match " + s[i].match_number);
		}
		if(s[i].comp_level == "sf"){
			var textnode = document.createTextNode("Semi Finals " + s[i].set_number +" Match " + s[i].match_number);
		}
		if(s[i].comp_level == "f"){
			var textnode = document.createTextNode("Finals " + s[i].set_number +" Match " + s[i].match_number);
		}
	
		
		// setter.child("Shot Balls").set(0);
		// setter.child("Missed").set(0);
		// setter.child("Upper Goal").set(0);
		// setter.child("Lower Goal").set(0);
		// setter.child("Inner Goal").set(0);
		// setter.child("Spin wheel").set(0);
		// setter.child("Set color").set(0);
		// setter.child("climb tries").set(0);
		// setter.child("fails").set(0);
		// setter.child("climb").set(0);
		// setter.child("auto").set(0);
		// setter.child("ballsauto").set(0)
		
	

			var node = document.createElement("li");
			node.setAttribute("uk-scrollspy","cls: uk-animation-fade; repeat: true");
			var a = document.createElement("a");
			
			//"uk-link-heading"
			a.setAttribute("onclick", "setTeams("+"'"+ name+"',"+"'"+ key+"',"+"'"+s[i].comp_level+"',"+"'"+s[i].set_number+"'"+ ","+"'"+s[i].match_number+"'"+")");

			node.setAttribute("class","uk-list uk-list-striped");
			a.appendChild(textnode);
			node.appendChild(a);
			ul.appendChild(node);
			

           
		}

});
}
function setTeams(name,key,level,set,num){
var ul = document.getElementById('teamselect');
	var ref = firebase.database().ref().child("matches").child(name.replace('#','').replace('.',''));
	TBA.event.matches(key,function(r){
		for (var i = r.length - 1; i >= 0; i--) {
		
			if(r[i].comp_level === level){
				if(r[i].set_number == set){
					if(r[i].match_number == num){
						r[i].alliances.blue.teams.forEach(function(item,index){
							console.log(item,index,level,set,num);
							var setter = ref.child(level+set+"m"+num);
							var node = document.createElement("li");
			node.setAttribute("uk-scrollspy","cls: uk-animation-fade; repeat: true");
			var a = document.createElement("a");
			var textnode = document.createTextNode(parseInt(item.replace("frc","")));
			a.setAttribute("onclick", "startmatch("+parseInt(item.replace("frc",""))+", 'Blue')");
node.setAttribute("class","uk-list uk-list-striped");
			a.appendChild(textnode);
			node.appendChild(a);
			ul.appendChild(node);
							
							var day = setter.child("Team").child(parseInt(item.replace("frc","")));
							// var d = bluer.child("Team").child(index);
							var ey = setter.child("Team").child(parseInt(item.replace("frc","")));
							var code = 0; 
// 							TBA.team.media(item,function(swq){

// code = swq[1].foreign_key;
// });
							var e = null;
							day.on("value", snap=>{
								
								e = snap.val();

							});
							if(e == null){
								day.child("Shot Balls").set(0);
								day.child("Missed").set(0);
								day.child("Upper Goal").set(0);
								day.child("Lower Goal").set(0);
								day.child("Inner Goal").set(0);
								day.child("Spin wheel").set(0);
								day.child("Set color").set(0);
								day.child("climb tries").set(0);
								day.child("fails").set(0);
								day.child("climb").set(0);
								day.child("auto").set(0);
								day.child("ballsauto").set(0);
								day.child("team").set("blue");
								day.child("img").set("https://i.imgur.com/"+code+".jpg");
							}
							
							 ey.on("value", snap=>{
							 	console.log(snap.val());
							 });

							// var e = null;
							// d.on("value", snap=>{
								
							// 	e = snap.val();

							// },rew=>{

							// });
							// console.log(e,e+1);
							//using firebase to increase incrimentaly


						});
						r[i].alliances.red.teams.forEach(function(item,index){
							console.log(item,index,level,set,num);
							var setter = ref.child(level+set+"m"+num);
							var roster = firebase.database().ref().child("Teams");
							var ay = roster.child(parseInt(item.replace("frc","")));
							var qw = null;
							
							var bluer = setter;
							var day = bluer.child("Team").child(parseInt(item.replace("frc","")));
							// var d = bluer.child("Team").child(index);
							var ey = bluer.child("Team").child(parseInt(item.replace("frc","")));
							var code = 0; 
							var node = document.createElement("li");
			node.setAttribute("uk-scrollspy","cls: uk-animation-fade; repeat: true");
			var a = document.createElement("a");
			var textnode = document.createTextNode(parseInt(item.replace("frc","")));
			a.setAttribute("onclick", "startmatch("+parseInt(item.replace("frc",""))+", 'Red')");
node.setAttribute("class","uk-list uk-list-striped");
			a.appendChild(textnode);
			node.appendChild(a);
			ul.appendChild(node)
// 							TBA.team.media(item,function(swq){

// code = swq[1].foreign_key;
// });
							var e = null;
							day.on("value", snap=>{
								
								e = snap.val();

							});
							if(e == null){
								day.child("Shot Balls").set(0);
								day.child("Missed").set(0);
								day.child("Upper Goal").set(0);
								day.child("Lower Goal").set(0);
								day.child("Inner Goal").set(0);
								day.child("Spin wheel").set(0);
								day.child("Set color").set(0);
								day.child("climb tries").set(0);
								day.child("fails").set(0);
								day.child("climb").set(0);
								day.child("auto").set(0);
								day.child("ballsauto").set(0);
								day.child("startpos").set(0);
								day.child("startcord").set(0);

								day.child("team").set("red");
								day.child("img").set("https://i.imgur.com/"+code+".jpg");
								var d = null;
								ay.on("value", snap=>{
									d = snap.val();
								});
								if(d == null){
								ay.child("startpos").set(0);
								ay.child("startcord").set(0);
								ay.child("Accuracy").set(0);
								ay.child("Shot Balls").set(0);
								ay.child("Missed").set(0);
								ay.child("Upper Goal").set(0);
								ay.child("Lower Goal").set(0);
								ay.child("Inner Goal").set(0);
								ay.child("Spin wheel").set(0);
								ay.child("Set color").set(0);
								ay.child("climb tries").set(0);
								ay.child("fails").set(0);
								ay.child("climb").set(0);
								ay.child("auto").set(0);
								ay.child("ballsauto").set(0);
								ay.child("team").set("blue");
								ay.child("img").set("https://i.imgur.com/"+code+".jpg");
							}
							}
							
							 ey.on("value", snap=>{
							 	console.log(snap.val());
							 });

							// var e = null;
							// d.on("value", snap=>{
								
							// 	e = snap.val();

							// },rew=>{

							// });
							// console.log(e,e+1);
							//using firebase to increase incrimentaly


						});
					}
				}
			}


		}


	});
document.getElementById("head").innerText = "Select the Team you are going to scout ";	
$("#match").hide("slow");
$('#game').show("slow");
		
	

}

function startmatch(num,ally){
console.log(ally);
$('#game').hide("slow");

if(ally === "Red"){
$("#locred").show("slow");
}
if(ally === "Blue"){
$("#locblue").show("slow");	
}	

}
function start(){
var name = document.getElementById('name').value;
var team = document.getElementById('team').value;
if(name === "" || team === ""){
console.error("Error")
alert("Please enter a name and a team number");
}
else{
	ref = firebase.database().ref().child()
}


}