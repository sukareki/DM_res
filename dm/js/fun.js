function setU(){
	serverQueryURL = "http://dm.wxss.fun/s.php";
	kdURL = "http://kd.test88.top/kd.php";
}

function setM(){
    var domain = "http://t.test88.top/";
	maps = [domain + '1-min.jpg', domain + '2-min.jpg', domain + '3-min.jpg',domain + '4-min.jpg',domain + '5-min.jpg',domain + '6-min.jpg'];	
}

function getU(cc){	
	
	$.getJSON(serverQueryURL,{a:5,c:cc},
		 function (data){
			apiURL_R = data.server;
			ba = data.ba;
		 });
	
}

function getAllIps(){
	$.ajaxSettings.async = false;
	$.getJSON(serverQueryURL,{c:cc,a:'4'},			
	 function (data){
		a_ips = data.ips;
		//_port = data.p;
	 });
	 $.ajaxSettings.async = true;
}

var getUInterval_times = 0;
function getUInterval(cc){
		setInterval(function () {
		getUInterval_times++;
		if(apiURL_L == "" && apiURL_R == "" && getUInterval_times < 100){
			getU(cc);
		}
	}, 2000);
}

function postU(iClientT,cc){

}

function postS(cc){
	$.post(serverQueryURL,{a:"1",c:cc});
}
