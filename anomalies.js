var anomCount = 0;

var anomArray = [];
var classArray = ["Safe", "Moderate", "Major", "Extreme"];

setTimeout(anomGeneration, 5000);

function anomGeneration() {
	document.getElementById('content-wrap').innerHTML += '<div class="popin maintext" id="focusBox"><span id="warningTop" style="color: red"></span>A new anomaly has been discovered!<br>Give it a designation.<br><form id="dataInput" onsubmit="addAnomaly(); return false;"><input id="designationInput" type="text" name="designation"><input type="submit" value="Confirm"></form></div>';
}

function addAnomaly() {
	anomCount++;
	var d = new Date();
	if (document.getElementById('designationInput').value !== '') {
		var desig = document.getElementById('designationInput').value;
		var desigTaken = document.getElementById(desig);
		if (desigTaken) {
			document.getElementById('warningTop').innerHTML = 'Designation is already in use!<br><br>';
		} else {
			anomArray[anomCount-1] = {
				designation: desig,
				date: ((d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()),
				class: classArray[Math.floor(Math.random() * classArray.length)],
				contained: "-"
			};
			document.getElementById('anomTable').innerHTML += ('<tr id="' + anomArray[anomCount-1].designation + '"><td>' + anomArray[anomCount-1].designation + '</td><td>' + anomArray[anomCount-1].date + '</td><td>' + anomArray[anomCount-1].class + '</td><td id="' + anomArray[anomCount-1].designation + '-containment">'+ anomArray[anomCount-1].contained + '</td></tr>');
			document.getElementById('warningTop').innerHTML = '';
			document.getElementById('focusBox').parentNode.removeChild(document.getElementById('focusBox'));
			setTimeout(anomGeneration, Math.random() * (15000 - 10000) + 10000);
		}
	}
}

function transferAnomaly() {
	var siteList = '';
	for (i = 0; i < siteArray.length; i++) {
		siteList += ('<option value="' + siteArray[i].designation + '">' + siteArray[i].designation + '</option>');
	}
  var anomList = '';
	for (i = 0; i < anomArray.length; i++) {
		anomList += ('<option value="' + anomArray[i].designation + '">' + anomArray[i].designation + '</option>');
	}
  document.getElementById('content-wrap').innerHTML += '<div class="popin maintext" id="focusBox">Transfer Anomaly<br><br><form id="dataInput" onsubmit="transAnom(); return false;">Transfer <select id="anomSelect">' + anomList + '</select><br>to <select id="siteSelect">' + siteList + '</select><br><br><input type="submit" value="Attempt Transfer"><button onclick="closeBox();">Cancel</button></form></div>'
}

function transAnom() {
  var siteSel = document.getElementById('siteSelect').value;
  var anomSel = document.getElementById('anomSelect').value;
  for(i = 0; i < siteArray.length; i++) {
		if(siteArray[i].designation == siteSel) {
      if(siteArray[i].contained.includes(anomSel)) {
        break;
      } else {
        for(i = 0; i < siteArray.length; i++) {
          if(siteArray[i].contained.includes(anomSel)) {
            var oldCont = siteArray[i].contained;
            var newCont = oldCont.replace(anomSel + '<br>', '');
            siteArray[i].contained = newCont;
            document.getElementById(siteArray[i].designation + '-containment').innerHTML = siteArray[i].contained;
          }
        }
        for(i = 0; i < siteArray.length; i++) {
		      if(siteArray[i].designation == siteSel) {
		      	siteArray[i].contained += anomSel + '<br>';
           document.getElementById(siteArray[i].designation + '-containment').innerHTML = siteArray[i].contained;
		      	break;
	      	}
      	}
        for(i = 0; i < anomArray.length; i++) {
	      	if(anomArray[i].designation == anomSel) {
	      		anomArray[i].contained = siteSel;
           document.getElementById(anomArray[i].designation + '-containment').innerHTML = anomArray[i].contained;
		      	break;
		      }
	      }
      }
    }
  }
}