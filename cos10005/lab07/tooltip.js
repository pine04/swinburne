function showTip() {
	var sidTip = document.getElementById("sidTip");
	sidTip.style.display = "inline";
}

function hideTip() { 
	var sidTip = document.getElementById("sidTip");
	sidTip.style.display = "none";
}

function showTipPassword() {
	var pwdTip = document.getElementById("pwd1Tip");
	pwdTip.style.display = "inline";
}

function hideTipPassword() {
	var pwdTip = document.getElementById("pwd1Tip");
	pwdTip.style.display = "none";
}

function init() {
	var sid = document.getElementById("sid");
	sid.onmouseover = showTip;
	sid.onmouseout = hideTip;
	sid.onfocus = showTip;
	sid.onblur = hideTip;

	var pwd = document.getElementById("pwd1");
	pwd.onmouseover = showTipPassword;
	pwd.onmouseout = hideTipPassword;
	pwd.onfocus = showTipPassword;
	pwd.onblur = hideTipPassword;
}

window.onload = init;