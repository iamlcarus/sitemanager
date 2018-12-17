var agencyName;
function setName() {
	agencyName = document.getElementById('nameInput').value;
	document.getElementById('content-wrap').innerHTML = '<div class="popin maintext">Confirming. Is the name <span style="color:lightblue">"' + agencyName + '"</span> correct?<br><button style="width: 100px;" onclick="confirmName();">Yes</button> <button style="width: 100px;" onclick="denyName();">No</button></div>';
}

function confirmName() {
	document.getElementById('content-wrap').innerHTML = mainScreen + '<div class="popin maintext" id="focusBox" style="margin-top: 15%">Welcome.<hr>' + agencyName + ' is still in its early stages, but it will grow with time. Your agents will slowly discover new anomalies, which will need to be contained. You can do this by building new sites and equipping them with ample resources. You can hire more agents to discover anomalies quicker and contain them more easily.<br><br> Good luck.<br><button onclick="document.getElementById(\'focusBox\').parentNode.removeChild(document.getElementById(\'focusBox\'));">Close</button>';
}

function denyName() {
	document.getElementById('content-wrap').innerHTML = '<div class="popin maintext">Welcome, Director. Enter your agency\'s name.<br><form onsubmit="setName();"><input type="text" id="nameInput" name="agencyname"><input type="submit" value="Submit"></form></div>';
}

// -----------------

var mainScreen = ('<div id=\"infoView\"><div id=\"sites\"><h2>Sites<\/h2><button onclick=\"siteCreate();\">Create Site<\/button> <button onclick=\"siteDelete();\">Destroy Site<\/button><br><br><table id=\"siteTable\"><tr><th>Site Designation<\/th><th>Date Created<\/th><th>Location<\/th><th>Anomalies Contained<\/th><\/tr><\/table><\/div><\/div>');