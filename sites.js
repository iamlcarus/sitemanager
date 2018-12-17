var siteCount = 0;

var siteArray = [];

function siteCreate() {
	document.getElementById('content-wrap').innerHTML += '<div class="popin maintext" id="focusBox"><span id="warningTop" style="color: red"></span><form id="dataInput" onsubmit="addSite(); return false;">Designation <input id="designationInput" type="text" name="designation"> Location <input id="locationInput" type="text" name="location"><input type="submit" value="Add Site"></form></div>';
}

function addSite() {
	if (document.getElementById('designationInput').value !== '') {
		var desig = document.getElementById('designationInput').value;
		var location = document.getElementById('locationInput').value;
		var desigTaken = document.getElementById(desig);
		if (desigTaken) {
			document.getElementById('warningTop').innerHTML = 'Designation is already in use!<br><br>';
		} else {
			siteCount++;
			var d = new Date();
			siteArray[siteCount-1] = {
				designation: desig,
				date: ((d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()),
				location: location,
				contained: ''
			};
			document.getElementById('siteTable').innerHTML += ('<tr id="' + siteArray[siteCount-1].designation + '"><td>' + siteArray[siteCount-1].designation + '</td><td>' + siteArray[siteCount-1].date + '</td><td>' + location + '</td><td id="' + siteArray[siteCount-1].designation + '-containment">'+ siteArray[siteCount-1].contained + '</td></tr>');
			document.getElementById('warningTop').innerHTML = '';
			document.getElementById('focusBox').parentNode.removeChild(document.getElementById('focusBox'));
		}
	} else {
		document.getElementById('warningTop').innerHTML = 'Designation field must be filled!<br><br>';
	}
}

function siteDelete() {
	var siteList = '';
	for (i = 0; i < siteArray.length; i++) {
		siteList += ('<option value="' + siteArray[i].designation + '">' + siteArray[i].designation + '</option>');
	}
	document.getElementById('content-wrap').innerHTML += ('<div class="popin maintext" id="focusBox"><small>Site Count: ' + siteArray.length + '</small><form id="dataInput" onsubmit="delSite(); return false;">Select a Site <select id="siteSelection">' + siteList + '</select><br><input type="submit" value="Destroy Site"><button onclick="closeBox();">Cancel</button></form></div>');
}

function delSite() {
	var siteSel = document.getElementById('siteSelection').value;
	document.getElementById(siteSel).parentNode.removeChild(document.getElementById(siteSel));
	document.getElementById('focusBox').parentNode.removeChild(document.getElementById('focusBox'));
  siteCount--;
	for(var i = 0; i < siteArray.length; i++) {
		if(siteArray[i].designation == siteSel) {
			siteArray.splice(i, 1);
		}
	}
  for(var i = 0; i < anomArray.length; i++) {
		if(anomArray[i].contained == siteSel) {
			anomArray[i].contained = '-';
      document.getElementById(anomArray[i].designation + '-containment').innerHTML = anomArray[i].contained;
		}
	}
}

function closeBox() {
	document.getElementById('focusBox').parentNode.removeChild(document.getElementById('focusBox'));
}