var active = false;
var sequence = 0;
var puzzle = null;
var skips = 0;
var turing_bonus = false;
var sequence_length = 30;
var command_list = [];
var command_index = 0;

$(document).ready(function(){
	var $Q = $('.question-box');
	var $C = $('.command-box');
	var $P = $('.previous-commands')
	var $c = $('#input-box');
	puzzle = new Puzzle(0)

	$(document).bind("contextmenu",function(e) {
		e.preventDefault();
	});

	$c.on('blur',function () { 
		setTimeout(function() {
			$c.focus()
			$c.SelectionStart = $c.text().length > 0 ? $c.text().length-1 : 0;
		}, 10);
	});

    $(document).keydown(function(key){
        vale = $c.val().toLowerCase();
		if (key.which == 13){
			if (vale.length > 0 || puzzle.keys[0]=="d41d8cd98f00b204e9800998ecf8427e"){
				$P.prepend('<p>> '+vale+': '+ action(vale)+'</p>');
				command_list.push(vale);
				command_index = 0;
				$c.val("");
			}
		} else if (key.which === 123){
       		return false;
    	} else if (key.which == 38){
			$c.val(command_list[(command_list.length - 1 - command_index)]);
			if (command_index < command_list.length-1){
				command_index++;
				$c.focus()
				$c.SelectionStart = $c.text().length > 0 ? $c.text().length-1 : 0;
			}
		} else if (key.which == 40){
			$c.val(command_list[(command_list.length - 1 - command_index)]);
			if (command_index >= 0){
				command_index--;
				$c.focus()
				$c.SelectionStart = $c.text().length > 0 ? $c.text().length-1 : 0;
			}
		} else if (key.which == 9){
			$P.prepend('<p>> hash: '+ sha256(vale) +'</p>');
		}
    });
});

function action(keyword){
	keyword = keyword.trim();

	switch(keyword){
		case "rules":
			ruleClick();
			return "The rules are as follows:";
		case "clear":
			clearPrevious();
			return "Cleared previous commands.";
		case "alan turing":
			if (!turing_bonus){
				skips--;
				turing_bonus = true;
				return "Welcome sir, +1 skip unlocked";
			} else {
				return "You have already logged in sir, no further identification is required.";
			}
		case "restart":
			history.go(0)
			return "RESTARTING..."
		case "skips":
			return "You have "+(8 - skips)+" skips remaining."
	}

	if (!active){
        if (keyword == "start"){
    		active = true;
			$("h1").css("width", "0");
			$('.skip-button').css("display","inline");
			$('.button').css("display","inline");
			$('#command').css('color', 'rgb(5,200,5)');
			$('#title-bar').css('cursor', '');
			$('#title-bar').attr("onclick", "#");
			$("#google-icon").css("display", "inline");
			puzzle.display()
    		return "let the games begin, you may skip up to 8 puzzles with the keyword 'skip' or the button.";
        } else if (keyword == "enigma"){
            return "What do you need to do to finish a race?";
        }
    } else {
		if (puzzle.keys.indexOf(sha256(keyword)) != -1){
			if (sequence < sequence_length){
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
			if (skips == 0 || skips == -1){
				$("#puzzle_name").css("color","rgb(5,200,5)");
				$('h1').css('color', 'grey');
				$("#puzzle_name").html("You have solved the enigma");
				return "You have solved the enigma";
			} else if (skips < -1){
				$("#puzzle_name").css("color","darkred");
				$("#title-bar").css("outline-color","darkred");
				$('h1').css('color', 'grey');
				$('h1').css('text-shadow', '2px 2px darkgrey');
				$('#title-bar').css('border-image', 'linear-gradient(to bottom, darkred, black) 1 100%');
				$("#puzzle_name").html("You have been identified as a cheater. Your IP address has been recorded.");
				return "You have been identified as a cheater. Your IP address has been recorded.";
			} else {
				$("#puzzle_name").css("color","darkred");
				$('h1').css('color', 'grey');
				$('h1').css('text-shadow', '2px 2px darkgrey');
				$("#puzzle_name").html("You have finished but not solved the Enigma. Try again without skipping any questions in order to acheive victory.");
				return "You have not completely solved the enigma. Try again without skipping any questions.";
			}
			
		} else if (keyword == "skip"){
			if (sequence < sequence_length){
				return skipPuzzle(false);
			} else {
				return "You may not skip this question.";
			}
		} else {
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
		function decrypt(message){
			var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
			var U_alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
			var keys = "qazwsxedcrfvtgbyhnujmikolp".split("");
			var U_keys = "qazwsxedcrfvtgbyhnujmikolp".toUpperCase().split("");


			var keydict = {};
			for(var i=0; i < alphabet.length; i++){
				keydict[keys[i]] = alphabet[i];
			}

			var U_keydict = {};
			for(var i=0; i < U_alphabet.length; i++){
				U_keydict[U_keys[i]] = U_alphabet[i];
			}

			var loc = message.split("");
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
		this._data = decrypt(
			"Fcnuj Qmsujcbg~Wdb qt I?~ymppvsu/ctqesu/shmqjcbg.ryse~jnms~~sx15w8sww00q6960z9z16937zax14212*    Rcwwvs~Au q ujbgs cgucws q jnss, I'vv dsvy lbmn kbnwu bmjvcis jdss._Bmj cx lbm ymud ts qu I ujqgw, jds tbns I tbis jds vsuu I qt._ _Wdqj qt I?~gmvv~xqvus~~00499s004zqq2w15x5x0q8swq6028axw_q8x6830azs790q8q67xz2s84s12093aq*    Ayjcjmws jsuj~ Wdqj cu jds gsoj gmtasn cg jdcu ushmsgzs?_0 1 3 3 8 21 ?~gmvv~jnms~~9766527x2a5w3s95w4q733xzxa77aw7s*    Rcwwvs~Wdqj cu asjjsn jdqg ebw, kbnus jdqg jds wsicv,_wsqw ysbyvs sqj cj, amj cx lbm sqj cj lbm wcs?~gmvv~xqvus~~3s47a75000a0924a6z9aq5759q7zx15w*     ~bwebibn rs rswgbujqiqg~gmvv~jnms~~8wawwq48xa8748w6746x1965824s966q*    Psnubgqv Dnsqt Rcwwvs (Equl)~_A yqvs udqwbk bg wqnf kqjsn,_Ybm'vv uss ts kdsg ucedj cu vbuj,_A dqvx bx ts cu qvv lbm'vv uss qgw sisg jdqj tql wcxxsn._ _Wdqj qt I?~gmvv~jnms~q wnsqt~51a612238858s47a46z9xq0a0zwq96q2_6w4wa5xx0z117864q02827aqw3z361a9*    Psnubgqv Rcwwvs (Vsnl Dcxxczmvj)~_I qt ecisg cg jctsu kdsg q emcwcge dqgw cu gsswsw,_Ybm kcvv gbj gssw ts cx lbm dqis ts,_amj kdsg lbm gssw ts, kcjd q ujnqgesn I kcvv as._ _Wdqj qt I?~gmvv~xqvus~~q3s7qzaw8880q80wz69swa0w729q9467_wa0937wqswaq837saq1322q2sx38739s_sx72z37as9w1a9s6s5aaw6sx09448qas*Shmqnsu~Hbk tqgl uhmqnsu qns jdsns cg jdcu yczjmns?~ymppvsu/ctqesu/uhmqnsu.ryse~xqvus~~w645920s395xswqw7aaasw0szq3xs2s0_3416q75x4zsq9109507zqzw8s2x2qsxz*    Psnubgqv Rcwwvs (Dcxxczmvj)~I qt jds ensqj bgs-slsw asquj jdqj wsujnblu qvv cg tl yqjd,_A wstbg kcjd gb xbnt amj q abwl bx knqjd,_I qt abng al jds svstsgju qgw zbts xnbt jds usq,_Tdnbmed gqjmns I tqfs zdqbu jdqj uynsqwu qznbuu vsqemsu._Wdqj qt I?~gmvv~jnms~~z5285qaw05w46q954151wwx9a8128114_830x61aaza93qzwzq35642z109404sw5_w46wx44zxz456w22737x04166aa7xx01_a2561qw3z865x13ssa1x34ww8x8x08w3_4w14zz253z29926302a8z36434ax140z_6qw75551525qaz2ss2x3375x5w0x436q_x91463a65x69s395s352qa7701q2q5xz_17zz49112z36617738aa1601499qs56w_w1385498x95a8x188s4125090xsz2qs5*    Wbnwu~Hbk tqgl tsqgcgeu wbsu jds kbnw 'Ogs' dqis?~gmvv~xqvus~~szzaz87s4a5zs2xs28308xw9x2q7aqx3*    Wbnwu~Hbk tqgl tsqgcgeu wbsu jds kbnw 'Tdnss' dqis?~gmvv~jnms~~x97z5w29941axa1a2xwqa0874906qa82*    Rcwwvs~Kssy ts jb lbmnusvx qgw I kcvv as dsvw, udqns ts kcjd xsk qgw I zqg as fsyj, ecis ts jb tqgl qgw I kcvv as anbfsg_Wdqj qt I?~gmvv~xqvus~~8a32185212x8625w1752a360x224xaq2_7ws38x3z3w3aqq7zq58q366x09577586_5sas2294szw0s0x08sqa7690w2q6ss69*    Bnqcg jsqusn~Wdczd gmtasnu qns bg jds fslabqnw?~gmvv~xqvus~~188a053xxw60axw92x51w9q7s7a4xs3q_q181q603769z1x98qw927s7367z7qq51_9973653azazzss1az5a133a43978979x_x2xwss93271556s428ww9507a3wq7235_09188qss7q21sz8ws13841x13ss24ww1_61984575q0006372x2018aaw0036wz76_9qa4675q0926zs6s5036072wxa35a3a7_7443915q32x21a1zzxa80034q809a5qz*    Tnczf~Wdqj wbsu bgs wb kdsg jdsl qns zbtcge cgjb q nbbt, bn zbtcge aqzf jb q nbbt~gmvv~xqvus~~w41w8zw98x00a204s9800998szx8427s*    Rcwwvs~Wdqj enbku kdsg cj sqju, amj wcsu kdsg cj wncgfu?~gmvv~xqvus~~1z5wa503wq362140s05xxq4wx0z9z7w1_015x28a9wx1aww36427ww976xa73a29w_q951w6az8a6sa3843106qw8204s8a3xa_63xx9z4w9zx5w1q68q63wssa74a034sx_0sx915272537z8350qwa7498a2q3a45x*    Rcwwvs~I dqis q dsqw, q jqcv, qgw gbjdcge tbns._Wdqj qt I?~gmvv~xqvus~~xzzaq33s6z3795z2q4a8q0q343849aa8_96q9519a8xwww17s8zz4aaq0408xxxxw_68849520s7za551715aa507436sz4605*    Wdqj qt I?~051409071301~gmvv~xqvus~~90954349q0s42w8s4426q4672aws16a9*    Psnubgqv Rcwwvs (Dcxxczmvj)~Sbts uql lbm'vv uss cj ubbg, bjdsnu uql cj kcvv gsisn zbts._Avv kcvv uysqf bx cj, kcjd dbysu bn cg xsqn._Ij kcvv fcvv sisnl ascge qgw ancge sisnl zdcvw jb vcxs._Ij kcvv qvkqlu socuj qgw gsisn as jbmzdsw, xbn cj'u gqjmns cu tlujsnl qgw cj'u ybksn cu tmzd._Wdqj cu cj?~gmvv~jnms~~z23946z050885a2ws6860x47x2ax6787_x06s6z0x78921810zqxx863szwq9258w_50s36a3z086sw878141z5458s1az7qx5_wq907q1a8x74s6922w93a025sszxa852*    Gsbtsjnl~Wdczd jncqgevs kcjd jds ecisg ucws vsgejdu dqu q utqvvsn umnxqzs?_A: 300, 400, 700_B: 100, 200, 300~gmvv~jnms~~swqa649646q4z3saw9770awxz29534a5_x6za3s816496528w4187wa53az66567x_0741x547519389xqs3x31wsw1s0093wa_334z4q4z42xwa79w7saz3s73a517s6x8_187sx4436122w1zz2x40wz2a92x0saq0*    Bnqcg jsqusn~Sbts tbgjdu dqis 30 wqlu, ubts dqis 31 wqlu._Hbk tqgl tbgjdu dqis 28 wqlu?~gmvv~xqvus~~z20qw4w76xs97759qq27q0z99axx6710_q181q603769z1x98qw927s7367z7qq51_188a053xxw60axw92x51w9q7s7a4xs3q_09188qss7q21sz8ws13841x13ss24ww1_859042wsx3a34w98zq624aq06a50xz80_6qz49x36170w2s0758z07w698x119w75_q2xsx65xw38q9829x6667698x756swq1*    Rcwwvs~Mqgl dqis dsqnw ts,_amj gbabwl dqu ussg ts,_qgw I kcvv gbj uysqf aqzf mgjcv uybfsg jb._Wdqj qt I?~gmvv~xqvus~~829qw2769zaa2x9496q415909q5959z9_zaa11sw87wz8q95w81400z7x33z7z171_14799awzaq036a954q4w10sx95x3743x*    Sjbnl~THE Tncas vsqwsn Iegcjsw dcu sgstl'u zvbjdsu qu dcu Tncas Lcujsgsw jb jds ubmgw_bx jdscn yncubgEn'u yvsqwcge, kcjdbmj tsnzl, kcjdbmj nstbnus._Ig jdcu jqvs kcvv lbm xcgw jds qguksn.~gmvv~xqvus~~asz670s5q55424w840wa8636szz28828*    Tnczfl Hcujbnl~Wdqj cu jds 6jd gqts ecisg jb jds Lqwl bx jds Lqfs?~gmvv~jnms~~188sx6z096w5zs17345z95w88aqx06s6*    Psnubgqv Rcwwvs (Mswcmt)~I dqis slsu amj wb gbj uss,_A tbmjd amj zqg gbj uysqf,_Hqgwu jdqj kcvv gbj dbvw,_Lseu jdqj kcvv gbj nmg,_Agw q dsqnj jdqj zqg gbj xssv._Wdqj qt I?~gmvv~xqvus~~8636194a8z0w76a465z9z14a08swa800_s89196x1za52069sxs1x4ax0942aza7x_w82wzwx6w5032az0a0368qws6s0wzwa4_3s82s64845a10037aw44w1221464x16w_s8z3s3q625qs8z53q3z3xzx239a74wz0_w4s7a0w9xzxq2a42w825a9a68xwaw33x_6w339s073891s18x256wwswa91a1zqx7_75xw989981509958777zwxzwz66s21a5_841q2w689qw86aw1611447453z22z6xz*    Dssy jdbmedju~101010_kdqj qt I?~gmvv~jnms~~q1w0z6s83x027327w8461063x4qz58q6_252588064zsz7qza70q91a18800wwx34_0qqxz4z0s23s89xzz10720ssa317q9z6*    Rcwwvs~A gqjmnqv ujqjs, I't ubmedj al qvv._Gb kcjdbmj ts, qgw lbm udqvv xqvv._Ybm wb ts kdsg lbm uysgw,_qgw mus ts kdsg lbm sqj jb gb sgw._Wdqj qt I?~gmvv~xqvus~~2069zq795w8s10q6x9q92ww57w01qx10*    Vcanqjcge ybvsqnt~Wdqj cu ds jdqj amcvwu ujnbgesn jdqg scjdsn jds tqubg, jds udcykncedj, bn jds zqnysgjsn?~gmvv~jnms~~q02450s3197568891787zw885q8q2090_199z002z1a038qq1x13498048z19873a_173x4311a87xssaz270z1q94q3sa13q5_a4qs67w7993aa93a5z72q78sw3a3z97z_s3042488343432628a6q45w2812z9a51_zaa859xswx3zx3245x8x7qz76z5z8qa4*    Rcwwvs~Wdb tqfsu cj wbsu gbj kqgj cj,_kdb amlu cj wbsu gbj gssw cj,_qgw kdb gsswu cj wbsu gbj fgbk cj._Wdqj cu cj?~gmvv~xqvus~Msedqg Wbg~a29a3642a3126184s1q0aq9837w94361_7sqz63x9261a7240s96a43zsa575w249_44894w235713a353x49ax59z028xx750*    Psnubgqv Rcwwvs (Vsnl Equl)~I dqis tqgl xqzsu qgw tqgl xcemnsu,_ub lbm kcvv gsisn emsuu kdqj tl zbvvszjcbg mgzbisnu._Wdcvs nsemvqn I tql as, I zqg nba lbm kcjd evss_xbn tl jnms ujnsgejd vcsu cg jds eqtavs_Wdqj qt c?~gmvv~xqvus~~492s6640145a729207q5816a2xwa47x3_428432946s12wx5q57a115373ws7a779_5ww2199qw68327zz76w583a057qss7w5_80x1s8q1waa3455q0141qw626wxq8z60_524s6z3szwz6zs069795s0a11xs673s1*    A Gbvvmt'u xbvvl~Wdqj dqis I ebj cg tl ybzfsj?~gmvv~jnms~/m/SgqfsSsgwsn~3zx41s3a5956qx172994sx725a422s82_3s2z4x0z77sz4sw3149w8280q624zax0_1q5wx958s0x29w35594z7zx057xs4aw1_62xsa7sx6z52526560a3x9qx23276x6z*    Fcgqv hmsujcbg~Tdcu jdcge qvv jdcgeu wsibmnu:_Bcnwu, asquju, jnssu, xvbksnu;_Ggqku cnbg, acjsu ujssv;_Gncgwu dqnw ujbgsu jb tsqv;_Svqlu fcge, nmcgu jbkg,_Agw asqju dced tbmgjqcg wbkg._ _Wdqj qu cj?~gmvv~xqvus~~07zz694a9a3xz636710xq08a6922z42a"
		);
		this.lines = this._data.split("*");
		sequence_length = this.lines.length - 1;
		this.contentsList = this.lines[this.sequence].split("~");
		this.name = this.contentsList[0];
		this.text = this.contentsList[1].split("_");
		this.pic = (this.contentsList[2] != "null") ? this.contentsList[2] : null;
		this.google = (this.contentsList[3] == "true") ? true:false ;
		this.victor = (this.contentsList[4] != "") ? this.contentsList[4] : null;
		this.keys = this.contentsList[5].split("_");
		this._data = null;
		this.lines = null;
		this.contentsList = null;
	}

	display(){
		$("#puzzle_name").html(this.name);
		$("#puzzle_text").html("");
		for (var i = 0; i < this.text.length; i++){
			$("#puzzle_text").append("<p>"+this.text[i]+"</p>");
		} 

		if (this.google) {
			$("#google-icon").attr("src", "puzzles/images/googlecheck.png");
		} else {
			$("#google-icon").attr("src", "puzzles/images/googlex.png");
		}

		if (this.victor != null){
			$("#victor").show();
			$("#victor").text("from: "+this.victor);
		} else {
			$("#victor").hide();
		}

		if (this.pic != null) {
			$("#puzzle_image").attr("src", this.pic);
			$("#puzzle_image").css("display", "block");
		} else {
			$("#puzzle_image").hide();
		}
	}
}

function skipPuzzle(bol) {
	if (skips < 8) {
		if(bol){
			if (sequence < sequence_length){
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

function ruleClick(){
	$('.previous-commands').prepend('<p>> 7: All victors may submit a puzzle to be added to the Enigma. If you do solve the Enigma, send me an email with a screen shot of the victory screen and your puzzle that you wish to add, I will check the log files to make sure your victory is legitimate and then will add your puzzle to the game so long as I find it to be well fit for the Enigma. Your submitted puzzle must include the puzzle\'s title, the puzzle question, all acceptable answers, an image(if it is a visual puzzle), and a true/false for if the player can use google. Please keep the puzzle answers to a maximum of 3-4 words (no sentences or complex theories). Email: xelerayte@gmail.com </p>');
	$('.previous-commands').prepend('<p>> 6: Have fun! Please do not take the game too seriously, it is designed to be a fun challenge for those who enjoy puzzles and brain teasers. </p>');
	$('.previous-commands').prepend('<p>> 5: At any time you may restart by pressing the restart button in the top right corner, there is no limit to the amount of attempts you have. </p>');
	$('.previous-commands').prepend('<p>> 4: Do not cheat. This game uses an honor system. I am aware that there are ways to cheat and I ask that you would please not use them. I use log files and will be able to see if/when your victory is legitimate. </p>');
	$('.previous-commands').prepend('<p>> 3: You may use google for questions that have a green check mark in the top left corner, you may not if there is a red x. </p>');
	$('.previous-commands').prepend('<p>> 2: You may skip up to 8(?) questions by using the keyword "skip" or by pressing the skip button in the top right corner. HOWEVER, using skips forfeits your ability to acheive true victory. View the number of available skips with the "skips" command.</p>');
	$('.previous-commands').prepend('<p>> 1: Answer the puzzles by typing in the command box and pressing enter to submit. </p>');
}

function clearPrevious(){
	$('.previous-commands').html('');
}

function sha256 ( str ) {

    var RotateLeft = function(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        };

    var AddUnsigned = function(lX,lY) {
            var lX4,lY4,lX8,lY8,lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        };

    var F = function(x,y,z) { return (x & y) | ((~x) & z); };
    var G = function(x,y,z) { return (x & z) | (y & (~z)); };
    var H = function(x,y,z) { return (x ^ y ^ z); };
    var I = function(x,y,z) { return (y ^ (x | (~z))); };

    var FF = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var GG = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var HH = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var II = function(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

    var ConvertToWordArray = function(str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
        };

    var WordToHex = function(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                lByte = (lValue>>>(lCount*8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
        };

	var utf8_encode = function(argString) { // eslint-disable-line camelcase
		//  discuss at: http://locutus.io/php/utf8_encode/
		// original by: Webtoolkit.info (http://www.webtoolkit.info/)
		// improved by: Kevin van Zonneveld (http://kvz.io)
		// improved by: sowberry
		// improved by: Jack
		// improved by: Yves Sucaet
		// improved by: kirilloid
		// bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
		// bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
		// bugfixed by: Ulrich
		// bugfixed by: Rafał Kukawski (http://blog.kukawski.pl)
		// bugfixed by: kirilloid
		//   example 1: utf8_encode('Kevin van Zonneveld')
		//   returns 1: 'Kevin van Zonneveld'
		if (argString === null || typeof argString === 'undefined') {
			return ''
		}
		// .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		var string = (argString + '')
		var utftext = ''
		var start
		var end
		var stringl = 0
		start = end = 0
		stringl = string.length
		for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n)
			var enc = null
			if (c1 < 128) {
			end++
			} else if (c1 > 127 && c1 < 2048) {
			enc = String.fromCharCode(
				(c1 >> 6) | 192, (c1 & 63) | 128
			)
			} else if ((c1 & 0xF800) !== 0xD800) {
			enc = String.fromCharCode(
				(c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
			)
			} else {
			// surrogate pairs
			if ((c1 & 0xFC00) !== 0xD800) {
				throw new RangeError('Unmatched trail surrogate at ' + n)
			}
			var c2 = string.charCodeAt(++n)
			if ((c2 & 0xFC00) !== 0xDC00) {
				throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
			}
			c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
			enc = String.fromCharCode(
				(c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
			)
			}
			if (enc !== null) {
			if (end > start) {
				utftext += string.slice(start, end)
			}
			utftext += enc
			start = end = n + 1
			}
		}
		if (end > start) {
			utftext += string.slice(start, stringl)
		}
		return utftext
	}

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    str = utf8_encode(str);
    x = ConvertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}

