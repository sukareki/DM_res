function ismob() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i)
	) {
		return true;
	} else {
		return false;
	}
}

function isSmallWindow() {
	if (window.innerWidth <= 800 && window.innerHeight <= 600) {
		return true;
	} else {
		return false;
	}
}

function isMobileOrSmallWindow(){
	return ismob() || isSmallWindow();
}

function returnTVHostIfIs(pname,tv){
	if(pname.indexOf(tv.toLowerCase()) == 0)
		return "d," + tv;
	else
		return "";
}

function isTVHoster(pname){
	return (pname.indexOf("Bixin".toLowerCase()) == 0 ||pname.indexOf("Douyu".toLowerCase()) == 0 || pname.indexOf("HuYa".toLowerCase()) == 0 || pname.indexOf("KSTV".toLowerCase()) == 0 || pname.indexOf("KS-".toLowerCase()) == 0 || pname.indexOf("Twitch".toLowerCase()) == 0 || pname.indexOf("Bilibili".toLowerCase()) == 0)
}

function getPlayerName(pname){
	if (pname == undefined || pname == "" || !isShowPlayerName)
		return "";
	else{
		pname = pname.toLowerCase();
		if(isShowAllPlayerName){
			if(isTVHoster(pname))
				return "d," + pname;
			if(pname.length > 6)
				pname = pname.substring(0,6);
			return pname;
		}
		if(isShowDangerPlayerName){			
			var ret;
			ret = returnTVHostIfIs(pname,"Douyu");
			if(ret != "") return ret;
			ret = returnTVHostIfIs(pname,"Bixin");
			if(ret != "") return ret;			
			ret = returnTVHostIfIs(pname,"HuYa");
			if(ret != "") return ret;
			ret = returnTVHostIfIs(pname,"HY-");
			if(ret != "") return "d,HuYa";			
			ret = returnTVHostIfIs(pname,"HY_");
			if(ret != "") return "d,HuYa";				
			ret = returnTVHostIfIs(pname,"KSTV");
			if(ret != "") return ret;
			ret = returnTVHostIfIs(pname,"KS-");
			if(ret != "") return "d,KSTV";		
			ret = returnTVHostIfIs(pname,"KS_");
			if(ret != "") return "d,KSTV";				
			ret = returnTVHostIfIs(pname,"Twitch");
			if(ret != "") return ret;		
			ret = returnTVHostIfIs(pname,"Bilibili");
			if(ret != "") return ret;				
		}
		
	}
	return "";
}

function onResize() {
	var height = window.innerHeight;
	var is_safari = navigator.userAgent.indexOf("Safari") > -1;

	if ((navigator.userAgent.match(/iPhone/i)) ||
		(navigator.userAgent.match(/iPod/i))) {
		if (is_safari) {
			height += 80;
		}
	}
	$('#radar').attr("width", window.innerWidth).attr("height", height);
}

function ping(ip, callback) {

	if (!this.inUse) {
		this.status = 'unchecked';
		this.inUse = true;
		this.callback = callback;
		this.ip = ip;
		var _that = this;
		this.img = new Image();
		this.img.onload = function () {
			_that.inUse = false;
			_that.callback('responded', _that.ip);
		};
		this.img.onerror = function (e) {
			if (_that.inUse) {
				_that.inUse = false;
				_that.callback('responded', _that.ip, e);
			}
		};
		this.start = new Date().getTime();
		this.img.src = ip;
		this.timer = setTimeout(function () {
			if (_that.inUse) {
				_that.inUse = false;
				_that.callback('timeout', _that.ip);
			}
		}, 300);
	}
}

function changeMap() {
	if (locations.c == undefined)
		return;
	mapid = locations.c.m;

	if (mapid == 0 && map != 0) {
		map = 0;
		radar.mapIdx = map;
		radar.setMap(maps[0]);
		redraw();
		return;
	}
	if (mapid == 1 && map != 1) {
		map = 1;
		radar.mapIdx = map;
		radar.setMap(maps[1]);
		redraw();
		return;
	}
	if (mapid == 2 && map != 2) {
		map = 2;
		radar.mapIdx = map;
		radar.setMap(maps[2]);
		redraw();
		return;
	}
	if (mapid == 3 && map != 3) {
		map = 3;
		radar.mapIdx = map;
		radar.setMap(maps[3]);
		redraw();
		return;
	}
	if (mapid == 4 && map != 4) {
		map = 4;
		radar.mapIdx = map;
		radar.setMap(maps[4]);
		redraw();
		return;
	}
	if (mapid == 5 && map != 5) {
		map = 5;
		radar.mapIdx = map;
		radar.setMap(maps[5]);
		redraw();
		return;
	}

}

var no_data_show_times = 0;

function redraw() {

	if (!locations.p && locations.p == undefined) {
		no_data_show_times++;

		var no_data_time = isLocal ? 800 : 150;
		if (no_data_show_times >= no_data_time) {
			$.ajaxSettings.async = false;
			getAllIps();
			for (var i = 0; i < a_ips.length; i++) {
				var this_ip = a_ips[i];
				var this_url = "http://" + this_ip + ":" + _port + "/api/" + cc;

				new ping(this_url, function (status, ip, e) {
					if (status == "responded") {
						apiURL_L = ip;
						apiURL_L_find = ip;
						console.log(apiURL_L);
						isLocal = true;
					}
				});
			}
			$.ajaxSettings.async = true;

			no_data_show_times = 0;
		}
		//	location.href = location.href;

		if (no_data_show_times > 10) {
			$('#nodata').css("display", "block");
			$('#zoomButtons').css("display", "none");

			if (ba == 1) {
				$('#BAMSG').css("display", "block");
				$('#nodatatext').css("display", "none");
			}
			return;
		}

	} else {
		$('#nodata').css("display", "none");
		$('#BAMSG').css("display", "none");
		if (isSmallWindow()) {
			$('#id_navbar').css("display", "none");
		}
		if (ismob()) {
			$('#zoomButtons').css("display", "block");
		}
	}

	radar.clear();

	if (locations.p) {
		dis_nearest_enmary = 1000;
		is_enamary_100_300 = false;
		dis_farest_enamary = 1;
		isInAir = false;
	}


	if (locations.p && locations.p[trackPlayerIndex]) {
		var player = locations.p[trackPlayerIndex];
		radar.setFocus(player0.x, player0.y);
	}

	if (!locations.p)
		return;

	var cfg = locations.c;
	fight = cfg.b;
	if (isInFinal)
		fight = 2;

	if(cfg.n != undefined){
		isShowPlayerName = cfg.n != 0;
		isShowDangerPlayerName = (cfg.n == 1 || cfg.n == 3);	
		isShowAllPlayerName = cfg.n == 2;	
		isShowKDOnly = cfg.n ==3;
	}
	showIcon = true;
	znz = cfg.c;
	drawLongLine = 1;
	//showLevel2 = cfg.l;
	showLevel2 = 1;
	
	is_compact_mod = isMobileOrSmallWindow();
	if(cfg.cu != undefined){
		is_compact_mod = cfg.cu;
	}
	
	if (cfg.r != undefined) {
		force_rotate = cfg.r == 1;
		if (force_rotate_not_set && force_rotate) {
			//console.log("set true");
			radar.setIsRotate(true);
			force_rotate_not_set = false;
			redraw();
		}

		if (!force_rotate_not_set && !force_rotate) {
			//console.log("set false");
			radar.setIsRotate(false);
			force_rotate_not_set = true;
			redraw();
		}

	}
	num_display_mod = 2;

	if (cfg.p != undefined) {
		aim_part = cfg.p;
		if (aim_part == 15) {
			part_text = "H";
		} else if (aim_part == 5) {
			part_text = "N";
		} else if (aim_part == 3) {
			part_text = "V";
		} else
			part_text = "";
		
		$('#id_aimbot_chk').prop({
			checked: (part_text != "")
		});
		if (part_text == "")
			$('#id_aimbot_lbl').text("Aimbot");
		else
			$('#id_aimbot_lbl').text("Aimbot[" + part_text + "]");
	}
	
	if (cfg.a != undefined){
		aim_target = cfg.a;
	}

	if (cfg.s != undefined) {
		$('#id_buddyShare').prop({
			checked: cfg.s
		});
		isShared = cfg.s;
	}

	if (cfg.a != undefined) {
		//is_auto_zoom = cfg.a;
		var fr = force_rotate == 1;
		$('#id_autoZoom').prop({
			checked: fr
		});


	}

	//if (cfg.z) {
	//	currZoom = parseInt(cfg.z);
	//}
	
	if (cfg.g != undefined){
		isShowRadarGay = 1;
	}
	
	//if (cfg.zm != undefined) {
	//	zoom_max = parseInt(cfg.zm);
	//}

	if (is_init == true) {
		is_init = false;
		lastZoom = currZoom;
	}

	radar.map(_R);
	if (fight == 1 && isEnemaryIn10m == false) {
		drawItems();
		drawwjds();
		drawVehicles();
	}
	drawZone();
	drawPlayers();
	isEnemaryIn10m = isEnemaryIn10m_curr_loop;

	if (z0 >= 150080) {
		draw_aircraft();
	}

	//radar.floatText(window.innerWidth/2,10, "info...", "lime", -150, -20, 350, 30, 15, 0.9)
}

function cus_zoom_in(scale) {
	//if(zooming) return;
	while (radar.scaledFactor - 0.3 > scale) {
		zooming = true;
		radar.setZoom(0.7);
	}
	zooming = false;
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay)
	;
}

function cus_zoom_out(scale) {
	//if(zooming) return;
	while (radar.scaledFactor + 0.3 < scale) {
		zooming = true;
		radar.setZoom(1.2);
	}
	zooming = false;

	// var interval;
	// interval = setInterval(function () {
	// 	if(radar.scaledFactor + 0.01 < scale)
	// 		radar.setZoom(1.01);
	// }, 10); 
	// clearInterval(interval); 

}

function set_cus_zoom(scale) {
	if (!scale)
		return;

	var isZoomOut = false;

	while (radar.scaledFactor < scale + 0.05) {
		isZoomOut = true;
		radar.setZoom(1.01);
	}

	// if (radar.scaledFactor <= scale + 0.5 && radar.scaledFactor >= scale - 0.5) {} else {
	// 	if (radar.scaledFactor >= scale)
	// 		radar.setZoom(0.99);
	// 	else
	// 		radar.setZoom(1.01);
	// }
}

var lastScale = 0;

function auto_zoom() {
	if (is_auto_zoom) {
		last_zoom_status = 1;
		var sc = BA.get_to_scale();
		//if (sc != lastScale) {
		if (Math.abs(sc) + 0.3 > radar.scaleFactor && radar.scaleFactor > Math.abs(sc) + 0.3)
			return;
		if (sc > 0)
			cus_zoom_out(sc);
		else
			cus_zoom_in(-sc);
		lastScale = sc;
		//}


		//set_cus_zoom(BA.get_to_scale());
	} else {
		if (last_zoom_status != -1) {
			if (is_auto_zoom == false && (last_zoom_status == 1)) {
				while (radar.scaledFactor > Math.abs(BA.get_scale_default())) {
					radar.setZoom(0.99);
				}
			}
		}
		last_zoom_status = 0;
	}

	//var b_last_zoom = (last_zoom_status == 1);

}

var isIn8v8 = false;

function is_in_range(v1, v2) {
	return (v2 >= Math.abs(v1) - 0.2 && v2 <= Math.abs(v1) + 0.2);
}

function drawPlayers() {
	// console.log("s:" + radar.scaledFactor);
	// console.log("w:" + window.innerWidth);
	// console.log("h:" + window.innerHeight);
	// console.log("r:" + zone.r);
	if(!is_compact_mod)
		radar.circle(player0.x, player0.y, 1000, 0.5, 'yellow', player0.r);
	
	isEnemaryIn10m_curr_loop = false;

	var players = locations.p;
	if (players.length == 0) {
		player0 = {
			x: 0,
			y: 0,
			z: 0,
			r: 0
		};
		return;
	}

	var alones = [];
	var teamids = [];

	var selfTeamIndex = 0;
	trackPlayerIndex = 0;
	isIn8v8 = false;
	
	var killNumbers = new Array();
	//player0 = players[0];
	
	var player_self = 0; 
	var is_self_found = false;
	var is_player0_found = false;
	for (var i = 0; i < players.length; i++) {
		if(players[i].m == 1){
			player_self = players[i];
			is_self_found = true;
			break;
		}			
	}
	
	if(is_self_found == false)
		player_self = players[0];
	
	if(ob_actor == 0) 
		player0 = player_self;
	else{
		for (var i = 0; i < players.length; i++) {
			var player = players[i];
			if(ob_actor == 1 || ob_actor == 2 || ob_actor == 3 || ob_actor == 4){
				if (player.t == player_self.t && ob_actor == player.tn){
					player0 = player;
					is_player0_found = true;
					break;
				}
			}else{
				if (player.n.toLowerCase().indexOf(ob_actor.toLowerCase()) == 0){
					player0 = player;
					is_player0_found = true;
					break;
				}			
			}
		}
	}	
	
	if(is_player0_found == false)
		player0 = player_self;

	var x0 = player0.x;
	var y0 = player0.y;
	var angle0 = player0.r;
	var h0 = (player0.h == undefined) ? 100 : player0.h;
	z0 = parseInt(player0.z);
	isP0InVech = (player0.i);

	var isInTeam = false;
	isInTeam = (player0 && player0.t <= 100 && player0.t >= 0);	

	var myTeamNumberCount = 1;
	for (var i = players.length - 1; i >= 0; i--) {
		var __t = players[i].t;
		var _player = players[i];
		var _h1 = (_player.h == undefined) ? 100 : _player.h;
		var _isAlive = (_h1 !== 0);
		var _isPlayerSelf = (i == trackPlayerIndex);
		var _isTeamMem = (players[i].t == player0.t && !_isPlayerSelf);
		if(_isTeamMem) myTeamNumberCount++;
		
		if ((players[0].z > 20000) && isInAir == false)
			isInAir = true;

		if (isInTeam) {
			var _isAlone = true;
			for (var j = players.length - 1; j >= 0; j--) {
				if (!teamids.indexOf(players[j].t) === -1 || (players[j].t == __t && j != i)) {
					_isAlone = false;
					teamids.unshift(__t);
					break;
				}
			}

			if (_isAlone) {
				alones.unshift(i);
			}
		}

		var _dis = radar.distance(player0, _player);
		if (_dis >= 100 && _dis <= 300)
			is_enamary_100_300 = true;
		if (!_isPlayerSelf && !_isTeamMem && _isAlive && (_dis < dis_nearest_enmary)) {
			dis_nearest_enmary = _dis;
		}
		if (!_isPlayerSelf && !_isTeamMem && _isAlive && (_dis >= dis_farest_enamary)) {
			dis_farest_enamary = _dis;
		}
		var k = (players[i].k || 0);
		killNumbers.push(k);
	}
	
	isIn8v8 = (players.length <= 20) && (myTeamNumberCount > 4);
	if(isIn8v8){
		killNumbers.sort(function(a, b){return a - b});
	}

	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		var color = "";
		var v_rotator = 0;
		var x1 = player.x;
		var y1 = player.y;
		
		var curActorAddr = (player.a == undefined) ? 0 : player.a;

		var h1 = (player.h == undefined) ? 100 : player.h;

		var hg = player.g;
		var isGroggy = (h1 == 0 && hg != 0);
		var isBox = (h1 == 0 && hg == 0);
		var isInVis = (player.v != undefined && player.v == "0");
		var isABot = (player.b != undefined && player.b == "1");
		var isAlive = (h1 !== 0);
		var pname = player.n;
		if(pname == undefined) pname = "";

		//console.log("h" + i + " " + h1);
		var t = player.t;
		var angle1 = player.r;

		var isPlayerSelf = false;
		
		if (player == player0)
			isPlayerSelf = true;
		
		var isTeamMem = (player.t == player0.t && !isPlayerSelf);

		var dis = radar.distance(player0, player);
		if (dis > 1000) continue;

		var showPlayerNumber = true;
		var kill = (player.k || 0);
		if (kill > 100 || kill < 0)
			isShowKill = false;

		var isAlone = isInTeam && !(alones.indexOf(i) === -1);
		var isInVehicle = false;

		var dot_r = 7;
		var radius = 4.5;
		var arrow_wid = 16;
		var arrow_hei = 6;
		_R = -(angle0);

		var rend_sc = false;
		var sc = (player0.c || 0);
		if (sc > 0) {
			rend_sc = true;
			$("#id_OB").text("OB:" + sc);
		} else {
			$("#id_OB").text("");
		}
		var is_radar_gay = false; //#800080
		//radar.text1(x1, y1, _R, dis, "red", -12, 12.8, 20, 12, 22, 8);
		
		var kd = kds[pname.toLowerCase()];
		if(kd == undefined) kd = "-1";
		if(kd.indexOf('^') == 0){
			is_radar_gay = true;
			kd = kd.substr(1);
		}
		
		if (isPlayerSelf) {

			var zone_blue = {
				x: zone.bx,
				y: zone.by
			};
			if (radar.distance(player0, zone_blue) > radar.game2Pix(zone.br) && zone.x > 0) {
				radar.longDashedLine(zone.bx, zone.by, x1, y1, _R, 10000, 1, "white");
			}

			color = rend_sc ? '#ff8000' : '#61c757';
			if (drawLongLine == 1) {
				radar.longLine(x1, y1, _R, 200, 2, player.r, "limegreen");
			}
			radar.text1(x1, x1, _R, "", "white", -15, 12.8, 0, 0, 22, 8, 0.9);
			if (znz == 1 && white_r > 5000) {
				radar.znz(x1, y1);
			}

			if (part_text != "") {
				radar.text2(x1, y1, _R, part_text, "white", -12, 12.8, 20, 12, 22, 8);
			}
		} else if (isTeamMem) {
			color = '#3496f7';
			if (team_member_show_lines == 1) {
				if (drawLongLine == 1) {
					radar.longLine(x1, y1, _R, 200, 1, player.r, color);
				}
			}
			if(kd != 0 && kd != -1 && isShowRadarGay)
				radar.text2(x1, y1, _R, "kd:" + kd, "white", 15, -27, 30, 12, -18, 8);
		} else {

			if (!isInAir && dis < 30 && isAlive) {
				isEnemaryIn10m_curr_loop = true;
				//radar.scaledFactor = 0.6;
			}

			if (drawLongLine == 1 && !isGroggy && !isBox && dis < 501 && !isEnemaryIn10m_curr_loop) {
				if (radar.isLookatU(x0, y0, x1, y1, player.r)) {
					let line_color = 'red';
					if (isInVis)
						line_color = 'white';
					radar.longLine(x1, y1, _R, 200, 1, player.r, line_color);
				}
			}

			color = '#ff303f';
			if (isAlive && !player.b) {
				var width = 22;
				var leftOffset = -12;
				var floorInfo = radar.getFloorNum(player0.z, player.z);
				if (dis > 300)
					floorInfo = '';

				//if ((radar.scaledFactor > 1.8 || isEnemaryIn10m_curr_loop) && floorInfo != '') {
				if (floorInfo != '') {
					width = 38;
					leftOffset = -20;
				}

				var str_info = dis + "" + floorInfo;

				if (isShowKill == true && kill >= 5) {
					str_info += "/" + kill;
					width = 40;
					leftOffset = -23;
				}
				y = y1;
				var str_color = "white";
				if(kd > 0 && kd <= 0.3) str_color = "lime";
				radar.text2(x1, y, _R, str_info, str_color, leftOffset, 12.8, width, 12, 22, 8);
				
				//name
				var p_nm = (player.b) ? "" : getPlayerName(pname);
				var nm_color = "white";
				if(p_nm != ""){					
					if(p_nm.indexOf("d,") == 0){
						p_nm = p_nm.substr(2);
						nm_color = "yellow";
					}
					var nm_w = p_nm.length * 5;
					var nm_lo = -nm_w / 2;
					
					if(kd > 0){
						if(isShowAllPlayerName)
							p_nm += "/kd:" + kd;
						else if(isShowDangerPlayerName && p_nm !="")
							p_nm += "/kd:" + kd;
							
					}					
				}else if(isShowKDOnly && kd > 0){
					p_nm = kd;
					nm_color = "yellow";
				}
				
				if(kd > 0 && kd <= 0.3) nm_color = "lime";				
				radar.text2(x1, y, _R, p_nm, nm_color, nm_lo, -27, nm_w, 12, -18, 8);
				

				var wstr = player.w;
				var wcolor = "limegreen";
				if (wstr == "TslBattleRoyalePlayerState") wstr = "";
				if (wstr != "") {
					if(wstr == "M249") wstr = "M249";
					if(wstr == "HK416") wstr = "M4";
					if(wstr == "StickyGrenade") wstr = "C4";
					if (wstr == "Kar98k") wstr = "98K";
					if (wstr == "Grenade") wstr = "GRD";			
					if (wstr == "Molotov") wstr = "FIR";		
					if (wstr == "SmokeBomb") wstr = "SMK";	
					if (wstr == "FNFal") wstr = "SLR";		
					if (wstr == "Apple" || wstr == "Rock") wstr = "";	
					if (wstr.indexOf("FBRCross") == 0) {wstr = "游侠"; wcolor = "yellow";}
					if (wstr.indexOf("FlareGun") == 0) {wstr = "巫师"; wcolor = "#15f2fd";}
					if (wstr.indexOf("Machete") == 0) {wstr = "野蛮"; wcolor = "#FF5733";}
					if (wstr.indexOf("Crowbar") == 0) {wstr = "圣骑"; wcolor = "lime";}
					
					if (wstr == "98K" || wstr == "M24" || wstr == "GRD" || wstr == "FIR" || wstr == "AWM") {
						wcolor = "red";
						radar.text2(x1, y, _R, wstr, wcolor, leftOffset - 5, 26, width + 10, 12, 35, 8);
					}else if(wstr == "游侠" || wstr == "巫师" || wstr == "野蛮" || wstr == "圣骑"){
						//radar.text2(x1, y, _R, wstr, wcolor, leftOffset - 5, 26, width + 10, 12, 35, 8);
					}
				}else if(dis <= 50 && !isIn8v8 && !is_compact_mod){
						wcolor = "yellow";
						radar.text2(x1, y, _R, "N/A", wcolor, leftOffset - 5, 26, width + 10, 12, 35, 8);
				}

			}
		}


		var isOldBrother = isIn8v8 ? (kill > 10 && (kill >= killNumbers[1]) && !isPlayerSelf && !isTeamMem) : ((kill >= 5 || kd >= 3) && !isPlayerSelf && !isTeamMem);
		var isLittleBrother = isIn8v8 ? (kill > 10 && (kill >= killNumbers[1]) && !isPlayerSelf && !isTeamMem) : (kd >= 2.5 && !isPlayerSelf && !isTeamMem);

		if (isShowKill) {
			if(isOldBrother){
				color = "#9933ff";
				if(kd >=3 && kd < 5){
					dot_r = 6 + (kd - 3) * 1.5;
				}else if(kd >=5)
					dot_r = 9;
				else if(kill >=5)
					dot_r = 8;			
								
				arrow_hei = dot_r - 1.2;
				arrow_wid = dot_r * 3;
			}else if(isLittleBrother){
				color = "#a733ff";
			}
		}

		if (isGroggy) {
			color = 'black';
			radar.lineWithAngle(x1, y1, _R, arrow_wid, arrow_hei, 0, color);
			radar.dot(x1, y1, _R, color, color, dot_r, radius);
			radar.pieChart(player.x, player.y, _R, ((100 - hg) / 100), 'gray', 5);
			radar.weapons(x1, y1, _R, "hp", 25);
			showPlayerNumber = false;
		} else if (isBox) {
			radar.weapons(x1, y1, _R, "sw", 25);
		} else {

			if (isAlone && !isPlayerSelf && !isOldBrother)
				color = "Tomato";

			if (isInVis && radar.isLookatU(x1, y1, x0, y0, player0.r) && !isPlayerSelf)
				color = "#641E16";
			
			if (isABot)
				color = "#641E16";
			
			if (isShowRadarGay && is_radar_gay && !isPlayerSelf){
				color = "#696969";
				dot_r = 9;
				arrow_wid = 27;
				arrow_hei = 7.7;
			}

			if (isTeamMem)
				color = '#3496f7';
			
			if (aim_target !=0 && curActorAddr !=0 && aim_target == curActorAddr){
				color = '#cc00cc';
			}			

			if(player.mx != undefined && player.mx > 0){				
				radar.lineWithAngle(player.mx, player.my, _R, arrow_wid, arrow_hei, 90, "yellow");
				radar.dot(player.mx, player.my, _R, "yellow", "gray", dot_r, radius);
			}
			
			radar.dot(x1, y1, _R, color, color, dot_r, radius);							
			radar.lineWithAngle(player.x, player.y, _R, arrow_wid, arrow_hei + 1.5, player.r, color); 
			radar.pieChart(player.x, player.y, _R, ((100 - h1) / 100), 'gray', 5);	

			if (showPlayerNumber && !isPlayerSelf) {
				var fontColor = isAlone ? "lime" : "white";
				if (t > 300) {
					if(kill == 0)
						radar.text(x1, y1, "", fontColor, _R, _R);
					else
						radar.text(x1, y1, kill, fontColor, _R, _R);
				} else {
					var t_n = 0;
					if (isTeamMem) {						
						if(player.tn != undefined && player.tn > 0 && player.tn < 5){
							t_n = player.tn;
						}else
							t_n = selfTeamIndex++;
					}
					var t2 = (t >= 200) ? t - 199 : t;
					var idx = isTeamMem ? t_n : t2;
					radar.text(x1, y1, idx, fontColor, _R, _R);
				}
			}
		}

		if (rend_sc && isPlayerSelf) {
			radar.text(x1, y1, sc, 'white', _R, _R);
		}
	}
}

function drawItems(an) {
	if (!locations.i) {
		return;
	}
	var items = locations.i;

	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i];
		var strN = "" + item.n;
		if (strN == "d") { //deathbox
			//radar.dot1(item.x, item.y, _R, 'Yellow');
			radar.weapons(item.x, item.y, _R, "sw", 30);
		}else if(strN.indexOf("db_") == 0 && !isIn8v8 && !is_compact_mod){ 
			var strItems = "";
			if(strN.indexOf(",300,")!=-1) strItems = "AWM";
			if(strN.indexOf(",22,")!=-1) strItems += ",98K";
			if(strN.indexOf(",21,")!=-1) strItems += ",M24";
			if(strN.indexOf(",72,")!=-1) strItems += ",M249";
			if(strN.indexOf(",2,")!=-1) strItems += ",H3";
			if(strN.indexOf(",4,")!=-1) strItems += ",A3";
			if(strN.indexOf(",6,")!=-1) strItems += "";
			if(strItems.indexOf(",") == 0) strItems = strItems.substring(1);
			radar.text2(item.x, item.y, _R, strItems, "yellow", -15, 12.8, 30, 12, 22, 8);
		}
		else {
			if(strN.indexOf("db_") == 0) return;
			if (item.n == "88")
				radar.weapons(item.x, item.y, _R, item.n, 45);
			else if (item.n == "22" || item.n == "72")
				radar.weapons(item.x, item.y, _R, item.n, 35);
			else
				radar.weapons(item.x, item.y, _R, item.n, 25);

			var floorInfo = radar.getFloorNum(locations.p[0].z, item.z);
			if (radar.scaledFactor > 1.8 && floorInfo != '')
				radar.text2(item.x, item.y, _R, radar.getFloorNum(locations.p[0].z, item.z), "white", -15, 12.8, 30, 12, 22, 8);

		}
	}
}

function drawV(v) {
	radar.text2(v.x, v.y - 4000 / radar.scaledFactor, _R, veh[v.v + ''], "lime", -15, 12.8, 30, 12, 30, 8);
}

function drawVehicles(an) {
	if (!locations.v) {
		return;
	}
	var vehicles = locations.v;
	for (var j = vehicles.length - 1; j >= 0; j--) {
		var vehicle = vehicles[j];

		if ($.inArray(vehicle.v+'', s_loots) != -1){
			continue;
		}
		var dis = radar.distance(player0, vehicle);

		if (vehicle.v == "a") {
			radar.feiji(vehicle.x, vehicle.y, _R);
		} else {
			//radar.dot1(vehicle.x, vehicle.y, _R, '#3131e8');
			if (vehicle.v == "117")
				radar.cars(vehicle.x, vehicle.y, _R, vehicle.v, 29, 20);
			else if (vehicle.v == "118")
				radar.cars(vehicle.x, vehicle.y, _R, vehicle.v, 39, 30);
			else
				radar.cars(vehicle.x, vehicle.y, _R, vehicle.v, 25, 17);
			if (!isNearFinal)
				drawV(vehicle);
		}
	}
}

function drawwjds(an) {
	if (!locations.a) {
		return;
	}
	var airdrop = locations.a;
	for (var i = airdrop.length - 1; i >= 0; i--) {
		var item = airdrop[i];
		radar.ktx(item.x, item.y, _R);
		if (item.v.indexOf("Mk14") >= 0) {
			radar.text2(item.x, item.y, _R, "M K 1 4", "#FF00FF", -20, 10, 40, 12, 19.5, 8, 0.8);
		} else if (item.v.indexOf("M249") >= 0) {
			radar.text2(item.x, item.y, _R, "M 2 4 9", "#FF00FF", -20, 10, 40, 12, 19.5, 8, 0.8);
		} else if (item.v.indexOf("M24") >= 0) {
			radar.text2(item.x, item.y, _R, "M 2 4", "#FF00FF", -18, 10, 32, 12, 19.5, 8, 0.8);
		} else if (item.v.indexOf("AWM") >= 0) {
			radar.text2(item.x, item.y, _R, "A W M", "#FF00FF", -18, 10, 36, 12, 19.5, 8, 0.8);
		} else if (item.v.indexOf("Groza") >= 0) {
			radar.text2(item.x, item.y, _R, "G o u z a", "#FF00FF", -21, 10, 42, 12, 19.5, 8, 0.8);
		} else if (item.v.indexOf("AUG") >= 0) {
			radar.text2(item.x, item.y, _R, "A U G", "#FF00FF", -18, 10, 32, 12, 19.5, 8, 0.8);
		} else {
			radar.text2(item.x, item.y, _R, "", "#FF00FF", -20, 10, 40, 12, 19.5, 8, 0.8);
		}
	}

}

function drawZone() {
	zone = locations.z;
	if (zone == undefined) return;

	if (zone.br > 0) {
		radar.blue(zone.bx, zone.by, zone.br, _R);
	}
	if (zone.r > 0) {
		white_r = zone.r;
		radar.white(zone.x, zone.y, zone.r, _R);
	}
	if(!is_compact_mod){
		if (zone.rr != undefined && zone.rr > 0) {
			radar.red(zone.rx, zone.ry, zone.rr, _R);
		}
		if (zone.bmr != undefined && zone.bmr > 0) {
			radar.bomb(zone.bmx, zone.bmy, zone.bmr, _R);
		}
	}	
	isInFinal = (zone.r < 10000 && zone.r > 0);
	isNearFinal = (zone.r < 20000 && zone.r > 0);
}

function draw_aircraft() {
	if (!locations.v) {
		return;
	}
	var vehicles = locations.v;
	for (var i = vehicles.length - 1; i >= 0; i--) {
		var vehicle = vehicles[i];
		var fjjd = -(120);
		if (vehicle.v.indexOf("Dum") >= 0) {
			radar.feiji(vehicle.x, vehicle.y, vehicle.r);
			return;
		}
	}

}