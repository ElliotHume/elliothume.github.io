var active = false;
var sequence = 0;
var puzzle = null;
var skips = 0;

$(document).ready(function(){
	var $Q = $('.question-box');
	var $C = $('.command-box');
	var $P = $('.previous-commands')
	var $c = $('#input-box');
	puzzle = new Puzzle(0)

    $(document).keydown(function(key){
        vale = $c.val().toLowerCase();
		if (key.which == 13){
			$P.prepend('<p>> '+vale+': '+ action(vale)+'</p>');
			$c.val("");
		}
    });
});

function action(keyword){
	keyword = keyword.trim();

	if (!active){
        if (keyword == "start"){
    		active = true;
			$("h1").css("width", "5vw");
			$('.skip-button').css("display","inline");
			$('.button').css("display","inline");
			$('#command').css('color', 'rgb(5,200,5)');
			//$('#input-box').css('color', 'rgb(5,200,5)');
			//$('#title-bar').css('border-image', 'linear-gradient(to bottom, rgb(5,200,5), black) 1 100%');
			//$('h1').css('color', 'rgb(5,200,5)');
			//$('h1').css('text-shadow', '2px 2px darkgreen');
			//$('#title-bar').css('outline-color', 'rgb(5,200,5)');
			$('#title-bar').css('cursor', '');
			$('#title-bar').attr("onclick", "#");
			$("#google-icon").css("display", "inline");
			puzzle.display()
    		return "let the games begin, you may skip up to 3 puzzles with the keyword 'skip' or the button.";
        } else if (keyword == "enigma"){
            return "What do you need to do to finish a race?";
        }
    } else {
		if (puzzle.keys.indexOf(keyword) != -1){
			if (sequence < 24){
				sequence++;
				puzzle = new Puzzle(sequence);
				puzzle.display()
				return "Correct"
			}
			$("#google-icon").hide();
			$("#puzzle_name").css("text-align", "center");
			$("#puzzle_name").css("width", "100%");
			$("#puzzle_text").html("");
			$("#puzzle_image").attr("src", "");
			if (skips == 0){
				$("#puzzle_name").css("color","rgb(5,200,5)");
				$('h1').css('color', 'grey');
				$("#puzzle_name").html("You have solved the enigma");
				return "You have solved the enigma";
			} else {
				$("#puzzle_name").css("color","darkred");
				$("#title-bar").css("outline-color","darkred");
				$('h1').css('color', 'grey');
				$('h1').css('text-shadow', '2px 2px darkgrey');
				$('#title-bar').css('border-image', 'linear-gradient(to bottom, darkred, black) 1 100%');
				$("#puzzle_name").html("You failed to solve the enigma. Try again without skipping any questions");
				return "You failed to solve the enigma. Try again without skipping any questions";
			}
			
		} else if (keyword == "skip"){
			if (sequence < 24){
				return skipPuzzle(false);
			} else {
				return "You may not skip this question.";
			}
		} else {
			//console.log(decrypt(puzzle.alt_data));
			return "Incorrect";
		}
	}
}

class Puzzle {
	constructor(sequence){
		this.sequence = sequence;
		this.name = "";
		this.text = [];
		this.pic = null;
		this.google = false;
		this.keys = [];
		this.build();
	}

	build(){
		this._data = decrypt("    Fcnuj Qmsujcbg~Wdb qt I?~ymppvsu/ctqesu/shmqjcbg.ryse~jnms~xcabgqzzc*    Rcwwvs~Au q ujbgs cgucws q jnss, I'vv dsvy lbmn kbnwu bmjvcis jdss._Bmj cx lbm ymud ts qu I ujqgw, jds tbns I tbis jds vsuu I qt._ _Wdqj qt I?~gmvv~~q ysgzcv_ysgzcv*    Ayjcjmws jsuj~ Wdqj cu jds gsoj gmtasn cg jdcu ushmsgzs?_0 1 3 3 8 21 ?~gmvv~jnms~165*    Rcwwvs~Wdqj cu asjjsn jdqg ebw, kbnus jdqg jds wsicv,_wsqw ysbyvs sqj cj, amj cx lbm sqj cj lbm wcs?~gmvv~~gbjdcge*    ????~bwebibn rs rswgbujqiqg~gmvv~jnms~uctyvs*    Psnubgqv Rcwwvs (Equl)~_A yqvs udqwbk bg wqnf kqjsn,_Ybm'vv uss ts kdsg ucedj cu vbuj,_A dqvx bx ts cu qvv lbm'vv uss qgw sisg jdqj tql wcxxsn._ _Wdqj qt I?~gmvv~~jds tbbg_tbbg*    Psnubgqv Rcwwvs (Dcxxczmvj)~_I qt ecisg cg jctsu kdsg q emcwcge dqgw cu gsswsw,_Ybm kcvv gbj gssw ts cx lbm dqis ts,_amj kdsg lbm gssw ts, kcjd q ujnqgesn I kcvv as._ _Wdqj qt I?~~gmvv~wcnszjcbgu_q wcnszjcbg_wcnszjcbg*    Shmqnsu~Hbk tqgl uhmqnsu qns jdsns cg jdcu yczjmns?~ymppvsu/ctqesu/uhmqnsu.ryse~~40_41*    Wbnwu~Hbk tqgl tsqgcgeu wbsu jds kbnw \"Ogs\" dqis?~gmvv~jnms~3*    Wbnwu~Hbk tqgl tsqgcgeu wbsu jds kbnw \"Tdnss\" dqis?~gmvv~jnms~bgs*    Rcwwvs~Wdqj zqg bgs gbj dbvw, xsk fssy, qgw tqgl ansqf?~gmvv~~q usznsj_usznsju_usznsj*    Bnqcg jsqusn~Wdczd gmtasnu qns bg jds fslabqnw?~~gmvv~qvv bx jdst_qvv_cgxcgcjs_cgxcgcjl*    Tnczf~Wdqj wbsu bgs wb kdsg jdsl qns zbtcge cgjb q nbbt, bn zbtcge aqzf jb q nbbt~gmvv~~*    Qmsujcbg ncwwvs~Wdqj enbku kdsg cj sqju, amj wcsu kdsg cj wncgfu?~gmvv~~q xcns_xcns_q xvqts_xvqtsu_jssgqesnu*    Rcwwvs~I dqis q dsqw, q jqcv, qgw gbjdcge tbns._Wdqj qt I?~gmvv~~q zbcg_zbcg_zbcgu*    Wdqj qt I?~051409071301~gmvv~~sgcetq*    Bnqcg jsqusn~Sbts tbgjdu dqis 30 wqlu, ubts dqis 31 wqlu._Hbk tqgl tbgjdu dqis 28 wqlu?~gmvv~~12_qvv_qvv bx jdst*    Rcwwvs~Mqgl dqis dsqnw ts,_amj gbabwl dqu ussg ts,_qgw I kcvv gbj uysqf aqzf mgjcv uybfsg jb._Wdqj qt I?~gmvv~~qg szdb_szdb_szdbsu*    Sjbnl~THE Tncas vsqwsn Iegcjsw dcu sgstl'u zvbjdsu qu dcu Tncas Lcujsgsw jb jds ubmgw_bx jdscn yncubgEn'u yvsqwcge, kcjdbmj tsnzl bn nstbnus._Ig jdcu jqvs kcvv lbm xcgw jds qguksn~gmvv~~ujbnl*    Hcujbnl~Wdqj cu jds 6jd gqts ecisg jb jds Lqwl bx jds Lqfs?~gmvv~jnms~gcicqg*    Rcwwvs~A gqjmnqv ujqjs, I't ubmedj al qvv._Gb kcjdbmj ts, qgw lbm udqvv xqvv._Ybm wb ts kdsg lbm uysgw,_qgw mus ts kdsg lbm sqj jb gb sgw._Wdqj qt I?~gmvv~~aqvqgzs*    Vcanqjcge ybvsqnt~Wdqj cu ds jdqj amcvwu ujnbgesn jdqg scjdsn jds tqubg, jds udcykncedj, bn jds zqnysgjsn?~gmvv~jnms~jds enqiswceesn_q enqiswceesn_enqiswceesn_q enqis wceesn_jds enqis wceesn_enqis wceesn*    Rcwwvs~Wdb tqfsu cj wbsu gbj kqgj cj,_kdb amlu cj wbsu gbj gssw cj,_qgw kdb gsswu cj wbsu gbj fgbk cj_Wdqj cu cj?~gmvv~~q zbxxcg_zbxxcg_zbxxcgu*    Psnubgqv Rcwwvs~I dqis tqgl xqzsu qgw tqgl xcemnsu,_ub lbm kcvv gsisn emsuu kdqj tl zbvvszjcbg mgzbisnu._Wdcvs nsemvqn I tql as, I zqg nba lbm kcjd evss_xbn tl jnms ujnsgejd vcsu cg jds eqtavs_Wdqj qt c?~gmvv~~zqnwu_q zqnw_zqnw_q wszf bx zqnwu_wszf bx zqnwu*    Fcgqv hmsujcbg~Tdcu jdcge qvv jdcgeu wsibmnu:_Bcnwu, asquju, jnssu, xvbksnu;_Ggqku cnbg, acjsu ujssv;_Gncgwu dqnw ujbgsu jb tsqv;_Svqlu fcge, nmcgu jbkg,_Agw asqju dced tbmgjqcg wbkg._ _Wdqj qt I?~gmvv~~jcts*    ");
		this.lines = this._data.split("*");
		this.contentsList = this.lines[this.sequence].split("~");
		this.name = this.contentsList[0];
		this.text = this.contentsList[1].split("_");
		this.pic = (this.contentsList[2] != "null") ? this.contentsList[2] : null;
		this.google = (this.contentsList[3] == "true")? true:false ;
		this.keys = this.contentsList[4].split("_");
	}

	display(){
		$("#puzzle_name").html(this.name);
		$("#puzzle_text").html("");
		for (var i = 0; i < this.text.length; i++){
			$("#puzzle_text").append("<p>"+this.text[i]+"</p>");
		} 
		$("#puzzle_image").attr("src", this.pic);
		if (this.google) {
			$("#google-icon").attr("src", "puzzles/images/googlecheck.png");
		} else {
			$("#google-icon").attr("src", "puzzles/images/googlex.png");
		}
	}
}

function skipPuzzle(bol) {
	if (skips < 3) {
		if(bol){
			if (sequence < 24){
				skips++;
				sequence++;
				$('.previous-commands').prepend('<p>> skip: Skipped </p>');
				puzzle = new Puzzle(sequence);
				puzzle.display();
			} else {
				$('.previous-commands').prepend('<p>> skip: You may not skip this question. </p>');
			}
		} else {
			skips++;
			sequence++;
			puzzle = new Puzzle(sequence);
			puzzle.display();
			return "Skipped";
		}
	} else if (bol) {
		$('.previous-commands').prepend('<p>> skip: You have used up all available skips. </p>');
	} else {
		return "You have used up all available skips";
	}
}

function titleClick(){
	$("#input-box").val("Enigma");
}

function decrypt(message){
	alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	U_alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    keys = "qazwsxedcrfvtgbyhnujmikolp".split("");
	U_keys = "qazwsxedcrfvtgbyhnujmikolp".toUpperCase().split("");


    keydict = {};
    for(var i=0; i < alphabet.length; i++){
		keydict[keys[i]] = alphabet[i];
	}

    U_keydict = {};
    for(var i=0; i < U_alphabet.length; i++){
		U_keydict[U_keys[i]] = U_alphabet[i];
	}

    loc = message.split("");
    for (var i=0; i < loc.length; i++){
		if($.inArray(loc[i], alphabet) != -1 ){
			if(loc[i] == loc[i].toLowerCase()){
				loc[i] = keydict[loc[i]];
			} else {
				loc[i] = U_keydict[loc[i]];
			}
		}
	}
    return loc.join("");
}