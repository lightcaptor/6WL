
var KEY     ='AIzaSyCIgsuz2ChPmvvwZgIOB4D0x9obSnitSpk';
var file1   = "0B_H_JyuY3R5EZXktOFRBSkNCOTg";    //1000MEDIA.txt
var file2   = "0B_H_JyuY3R5EYWZCcVJPYm1CMm8";     //2000POETRY.txt
var file3   = "0B_H_JyuY3R5EdlFCWldBYjJlUVk";   //5000BNC.txt
var file4   = "0B_H_JyuY3R5ESW14RG9wcXpWOGs";   //10000GUT.txt
var file5   = "0B_H_JyuY3R5EeEwwV1hvb09Kd3M";   //40000MEDIA.txt
var file6   = "0B_H_JyuY3R5ELTRiLUdWbFU1aWs";   //80000PLUS.txt
var file7   = "0B_H_JyuY3R5EX182SkZuMnFRWTg";   //600000PLUS.txt
var url     ='https://www.googleapis.com/drive/v3/files/';
var tag     ='?alt=media&key=';
var bookselected='book1';
var BOOK = [];
var pagekey=0;
var ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


function selectbookHTML(x){
    return "<div id=\"bookbox\"><ul id=\"bookmenu"+String(x)+"\"  class=\"book\">"+
"<li id=\"bookselection\" onclick=\"dropdown($(this).parent().attr('id'))\" >1,000 most common words</li>"+
"<li id=\"book1\" class=\"options\" onclick=\"selectbook(this.id)\">1,000 most common words</li>"+
"<li id=\"book2\" class=\"options\" onclick=\"selectbook(this.id)\">2,000 from contemporary poetry</li>"+
"<li id=\"book3\" class=\"options\" onclick=\"selectbook(this.id)\">5,000+ top BNC</li>"+
"<li id=\"book4\" class=\"options\" onclick=\"selectbook(this.id)\">10,000 Project Gutenberg</li>"+
"<li id=\"book5\" class=\"options\" onclick=\"selectbook(this.id)\">40,000 common words</li>"+
"<li id=\"book6\" class=\"options\" onclick=\"selectbook(this.id)\">80,000+ word collection</li>"+
"<li id=\"book7\" class=\"options\" onclick=\"selectbook(this.id)\">600,000+ comprehensive vocabulary</li></ul>"+
"<input type=\"button\" id=\"dropbutton\" value=\"⥥\" onclick=\"dropdown($(this).prev('.book').attr('id'))\"></div>";
}

var searchHTML ="Search <a onclick=\"closebutton('search')\" class=\"exit\">✖</a>"+
"<div id=\"searchform\"><br>"+
"<label>To perform a search, first select a book:</label><br>"+selectbookHTML(1)+"<br>"+
"<label>Type in a six word story then hit the search button:</label><br><div id=\"text\">"+
"<textarea id=\"storyInput\" placeholder=\"enter your story here...\" maxlength='97'></textarea>"+
"<input type=\"button\" id=\"searchbutton\" value=\"⌕\" onclick=\""+
"outputHTML(searchstory(sanitize($('#storyInput').val())),$('#searchOutput'))\"></div>"+
"</div><br><div id=\"searchOutput\" class=\"output\"></div>"; 

var randomHTML = "Random <a onclick=\"closebutton('random')\" class=\"exit\">✖</a>"+
"<div id=\"randomizer\"><br><div id=\"actionform\">"+selectbookHTML(2)+"<br>"+
"<label>Randomize: </label><input id=\"randomize\" type=\"button\" value=\"▼\" onclick=\""+
"outputHTML(randomize(),$('#randomOutput'))\">"+
"</div></div><br><div id=\"randomOutput\" class=\"output\"></div>"; 

var lookupHTML = "Lookup <a onclick=\"closebutton('lookup')\" class=\"exit\">✖</a>"+
"<div id=\"lookupform\"><br>"+selectbookHTML(3)+"<br>"+
"<label>Paste your saved page number:</label><br><div id=\"text\">"+
"<textarea id=\"pageInput\" placeholder=\"enter page here...\"/ maxlength='24'></textarea>"+
"<input type=\"button\"  id=\"searchbutton\" value=\"⌕\" onclick=\""+
"outputHTML(pagelookup(sanitize($('#pageInput').val())),$('#lookupOutput'))\"></div>"+
"</div><br><div id=\"lookupOutput\" class=\"output\"></div>"; 

var aboutHTML = "About <a onclick=\"closebutton('about')\" class=\"exit\">✖</a>"+
"<div id=\"aboutText\"><br> This library came about from a thought experiment; I wanted to create a place that held within it all the six word stories that words could offer. You can read about this <a href=\"http://moonlit-daydream.deviantart.com/art/A-study-on-six-word-stories-560420860\">thought experiment here</a>. <br><br>In this library you will first have to select a book to read from. I have arranged word books of various lengths to choose from. Once you've made your choice you can search through the book by typing a six word story in and seeing if it exists in that book. If it doesn't, you can always choose a larger book. Though I've found the 2000 word book to be the most fun to randomly browse, you do have better chances of finding a specific story with more words. And once you've found a story that you want to share, you can make note of the book and page number, and return to it by entering that information in the lookup section of the library.<br><br>This library was partly inspired by the <a href=\"https://libraryofbabel.info/\">Library of Babel</a> and I highly recommend visiting. <br><br>Searching the largest books here will let you find the most possibilities, with more six word stories than there are stars in the observable universe, more than all the atoms on planet Earth. You can search for a story describing what you did this day, or today's date itself, or what you plan on doing next. Search for stories that you've written yourself, or the first six words of your favorite books, movies, songs, and games.  You may even use it to finish your sentences, just type in the last word you've written and see what five words will follow.<br><br> Whether it is for inspiration, awe, fun, or introspection, I hope you enjoy your stay in the six word library.<br><br></div>"; 

var infoHTML = "Info <a onclick=\"closebutton('info')\" class=\"exit\">✖</a>"+
"<div id=\"infoText\"><br> Word books were formatted to have one word <br>per line and ordered by frequency.<br><br>1,000 most common words and 40,000 most common words-<br> taken from tv and movie scipts found on <a href=\"https://en.wiktionary.org/wiki/Wiktionary%3aFrequency_lists#English\">Wiktionary</a> <br><br> 2,000 words from contemporary poetry <br>also found at <a href=\"https://en.wiktionary.org/wiki/Wiktionary%3aFrequency_lists#English\">Wiktionary</a> <br><br> 5,000 top BNC from the British National Corpus <br>thanks to <a href=\"https://www.kilgarriff.co.uk/bnc-readme.html\">Adam Kilgarriff</a> <br><br> 10,000 words from Project Gutenberg <br>also found on <a href=\"https://en.wiktionary.org/wiki/Wiktionary%3aFrequency_lists#English\">Wiktionary</a> <br><br>The 80,000+ word collection was taken from <br>various sources but mostly thanks to the word lists found in<br> <a href=\"https://github.com/first20hours/google-10000-english/\">This GitHub Repository</a> about Google's Trillion Word Corpus <br><br>Finally the 600,000+ comprehensive vocabulary is an<br> amalgamation of word lists, some mentioned above, <br>but mostly found in <a href=\"https://github.com/dwyl/english-words\">This GitHub Repository</a> which were gotten from elsewhere <br><br><br> This site is still very much a work in progress, however it is at a point that I am pleased with at the moment. If there is any problems or suggestions you'd like to report, contact me at the link below.<br><br> I would love to try and expand this concept, maybe even include other languages.<br><br>Published under the MIT license<br>Copyright © 2016 <a href=\"http://moonlit-daydream.deviantart.com/\">moonlit-daydream</a></div>"; 



function downloadFile(fileID, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET',url+fileID+tag+KEY,true);
    xhr.onload = function() {
      callback(xhr.responseText.split("\n"),fileID);
      console.log("XMLHttpRequest Success");
    };
    xhr.onerror = function() {
      callback(null);
      console.log("XMLHttpRequest Fail");
    };
    xhr.send();
}

function addText(txt,fileID){
    BOOK=txt;
    pagekey = 0;
    pagekey = encode(BOOK.length).length;
}

function load(fileID){        //--------------------to be run when page loads
    $(about).hide();
    $(search).hide();
    $(random).hide();
    $(lookup).hide();
    $(info).hide();
    
    downloadFile(fileID,addText);
  
    loadTimer();
}

$(document).ready(function(){ load(file1); });

function loadTimer(){
    var loadbox = $('#loading');
    var loadbase = loadbox.html().slice(0,-3);
    var dots='';
    for(var i=3;i>0;i--){
        dots+="<span class=\"dot\">.</span>";
    }
    loadbox.html(loadbase+dots);
  var timer = setTimeout(function(){ 
        var m = 1;
  	    $(".dot").each(function (){
            m++;
    	    $(this).delay(300*m).fadeOut('slow').fadeIn('slow');
        });
        if(BOOK.length >0){ //-----------condition for page to load----------------//
            clearTimeout(timer);
            loadbox.html("Please wait while the page loads...");
            callWelcome();
        }
        timer = setTimeout(arguments.callee,3000);
    }, 10);
}
function callWelcome(){
    $(loading).fadeOut(1000);
    $(welcome).delay(1000).fadeIn(1000);
    $(selection).show();
    
    $(about).delay(2000).fadeIn('slow');
    $(search).delay(2500).fadeIn('slow');
    $(random).delay(3000).fadeIn('slow');
    $(lookup).delay(3500).fadeIn('slow');
    $(info).delay(4000).fadeIn('slow');
}
function callLoading(){
    BOOK=[];
    $(loading).show();
    $(welcome).hide();
    $(selection).hide();
}

function menupress(button){
    document.getElementById(button).outerHTML = "<li id='"+button+"' class='container'>"+buttonHTML(button)+"</li>";
    document.getElementById(button).scrollIntoView({block: "start", behavior: "smooth"});
    updatebooks();
}

function closebutton(button){
    document.getElementById(button).outerHTML = "<li class='menu' id=\""+button+"\" onclick=\"menupress('"+button+"')\"><span class=\"menuspan\">"+button[0].toUpperCase()+button.slice(1)+"</span></li>";
}

function buttonHTML(button){
    if(button=="search"){ return searchHTML;}
    if(button=="random"){ return randomHTML;}
    if(button=="lookup"){ return lookupHTML;}
    if(button=="about"){ return aboutHTML;}
    if(button=="info"){ return infoHTML;}
    else{ return null;}
}

function resetoutputs(){
    $('.output').each(function () {
        $(this).html("");
    });
}

function updatebooks(){
        if(bookselected=='book1'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book1').html() );});
        }
        else if(bookselected=='book2'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book2').html() );});
        }
        else if(bookselected=='book3'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book3').html() );});
        }
        else if(bookselected=='book4'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book4').html() );});
        }
        else if(bookselected=='book5'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book5').html() );});
        }
        else if(bookselected=='book6'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book6').html() );});
        }
        else if(bookselected=='book7'){
            $('[id="bookselection"]').each(function () {$(this).html( $('#book7').html() );});
        }
}
function selectbook(booknum){
    var fileID=file1;
    var b=bookselected;
    bookselected=booknum;
    if (booknum==b){
        $('[class="book"]').css('overflow','hidden');
        return;
    }
    else if(booknum=='book1'){ fileID = file1; }
    else if(booknum=='book2'){ fileID = file2; }
    else if(booknum=='book3'){ fileID = file3; }
    else if(booknum=='book4'){ fileID = file4; }
    else if(booknum=='book5'){ fileID = file5; }
    else if(booknum=='book6'){ fileID = file6; }
    else if(booknum=='book7'){ fileID = file7; }
    else{
        bookselected=b;
        $('[class="book"]').css('overflow','hidden');
        return;
    }
    $('[class="book"]').css('overflow','hidden');
    updatebooks();
    resetoutputs();
    callLoading();
    load(fileID);
}
function dropdown(ID){
    if ( $("#"+ID).css('overflow')=='hidden'){
        $("#"+ID).css('overflow','visible');
    }
    else{
        $("#"+ID).css('overflow','hidden');
    }
}

$('html').bind('keypress', function(e)
{
   if(e.keyCode == 13)
   {
      return false;
   }
});
//-------------------------------------------magic starts here---------------//
function encode(num, code=ALPHABET){
    var arr = [];
    var base = code.length;
    while (num){
        var rem = num % base;
        num = Math.floor(num / base);
        arr.push(code[rem]);
    }
    if(pagekey){
        while (arr.length < pagekey){
            arr.push('0');
        }
    }
    arr.reverse();
    return arr.join('');
}

function decode(str, code=ALPHABET){
    var base = code.length;
    var strlen = str.length;
    var num = 0;
	var power;
    var char;
    for(var i=0;i<strlen;i++){
        power = (strlen - (i + 1));
        char = str.charAt(i);
        if(code.indexOf(char)<0){char='0';}
        num += code.indexOf(char) * Math.pow(base,power);
     }
    if(num>=BOOK.length|num<0){num=0;}
    return num;
}
 
function searchstory(storylist,WORDS=BOOK){
		var nums=[];
    var notfound=[];
    var story='';
    if(!(storylist instanceof Array)){
        story= storylist.toLowerCase();
    		storylist = story.split(" ");
    }
    if(storylist.length!=6){
        while (storylist.length<6){
            storylist.push(WORDS[ Math.floor( Math.random()*WORDS.length ) ]);
        }
        if(storylist.length>6){
            storylist = storylist.slice(0,6);
        }
    }
    for (var w=0;w<storylist.length;w++){
        	var inx= WORDS.indexOf(storylist[w].toLowerCase());
          if(inx<0){
            	notfound.push(storylist[w].toLowerCase());
            	continue;
          }
        	nums.push(inx);
    }
    if (notfound.length>0){
        return ["story not found", notfound];
    }
    var page = "";
    for (var i=0;i<nums.length;i++){
        page+=encode(nums[i]);
    }
    return [storylist,page];
}

function pagelookup(page,WORDS=BOOK){
		page+='000000000000000000000000'; //fill with zeros
    var address = [		page.slice(0,pagekey),
    					page.slice(pagekey,2*pagekey),
                        page.slice(2*pagekey,3*pagekey),
                        page.slice(3*pagekey,4*pagekey),
                        page.slice(4*pagekey,5*pagekey),
                        page.slice(5*pagekey,6*pagekey)
    ];
    var story = [];
    for(var i=0;i<6;i++){
    		story.push( WORDS[ decode( address[i] ) ] );
    }
    return [story,address.join('')];
}

function randomize(WORDS=BOOK){
		var story=[];
    for(var i=0;i<6;i++){
    		story.push( WORDS[ Math.floor( Math.random()*WORDS.length ) ] );
    }
    return searchstory(story);
}
 
 
function outputHTML(results, outElem){
    var text='';
    var story = results[0];
    if(story=="story not found"){
        text = "This story could not be found. <br>"+
        "These are the words from your story that<br> do not exist in this book:<br><br>"+
        results.pop().join(", ")+"<br><br><div></div><br>";
    }
    else{
    	var page = results.pop();
      text = "Page:<br> "+page+"<br>Story: <br><b>"+story.join(" ")+"</b><br><br><div></div><br>";
    }
    outElem.html(text);    
} 
function sanitize(text){
 		var char;
    var clean='';
    var ALLOWED = [" ","'","&"];
		for(var i=0;i<text.length;i++){
    		char = text.charAt(i);
    		if(ALLOWED.indexOf(char)>=0|ALPHABET.indexOf(char)>=0){
    		    clean+=char;
    		}
    }
    return clean;
}    
