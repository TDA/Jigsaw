(function(){
	var jigsawCont=document.getElementById('container');
	var timerDiv=document.getElementById('timer');
	var restart=document.getElementById('restart');
	restart.className='hidden';
	var result=document.getElementById('result');
	
	var questions={
		question_1:{
			img:'hawkeye.png',
			option_array:['Hawk Eye','Red Eye','Stork Eye','Mag Eye'],
			answer:1
		},
		question_2:{
			img:'AB.jpg',
			option_array:['Amitabh Bachan','Vijay Mallya','Dennis Ritchie','Marg Allen'],
			answer:1
		}
		
		
		};
		
	var answers={
	};
	
	//stopper.addEventListener('click',countPoints,false);
	
	var time=0;
	var timer=null;
	for(q in questions){
		var questionDiv=document.createElement('div');
		questionDiv.setAttribute('class','question');
		questionDiv.id=q;
		questionDiv.className+=' hidden';
		
		for(var i=0;i<3;i++)
		  for(var j=0;j<3;j++)
			{
			var smallDiv=document.createElement('div');
			var id=3*i+j+1;
			smallDiv.id=q+'-'+id;
			smallDiv.setAttribute('class','pieces unflipped');
			smallDiv.style.top=(i)*100+'px';
			smallDiv.style.left=(j)*100+'px';
			smallDiv.style.backgroundPosition=(-j)*100+'px'+' '+(-i)*100+'px';
			smallDiv.style.backgroundImage='url("Images\/'+questions[q].img+'")';
			smallDiv.onclick=function(){
				this.classList.remove('unflipped');
				this.classList.add('flipped');
	
			};
			var spanElt=document.createElement('span');
			spanElt.innerHTML=id;
			smallDiv.appendChild(spanElt);
			questionDiv.appendChild(smallDiv);
			}
		
		var ansForm=document.createElement('form');
		ansForm.id=q+'-form';
		
		for(var x=0;x<4;x++){
			var option=document.createElement('input');
			var label=document.createElement('label');
			var option_value=questions[q].option_array[x];
			
			option.type='radio';
			option.value=x+1;
			option.name=q+'-answer';
			option.checked='checked';
			
			ansForm.appendChild(label);
			label.appendChild(option);
			//label.id='option'+(x+1)
			label.innerHTML+=option_value;
			
			
				
		}
		var submitButton=document.createElement('input');
		submitButton.setAttribute('class','submit');
		submitButton.type='button';
		submitButton.value='Answer';
		submitButton.dataset.qno=q;
		submitButton.addEventListener('click',checkAns,false);
		ansForm.appendChild(submitButton);
		questionDiv.appendChild(ansForm);
		jigsawCont.appendChild(questionDiv);
	}
	
	
function checkAns(){
	clearInterval(timer);
	var qno=this.dataset.qno;
	var questString=qno.split('_')[0];
	var questInt=qno.split('_')[1];
	++questInt;
	var formId=qno+'-form';
	var points=100;
	var flipped=0;
	var selected=document.querySelector('#'+formId+' input[type="radio"]:checked');
	var flippedDivs=document.querySelectorAll('#'+qno+' .flipped');
	flipped=flippedDivs.length;
	
	if(questions[qno].answer==selected.value){
		
		points=points-(10*flipped)-(Math.ceil(time/5));
		result.innerHTML='You are right, you get '+points+' points';
		answers[qno]=points+','+time;
	}
	else{
		result.innerHTML='Uh Oh, Wrong Answer :(';
		answers[qno]=0+','+time;
	}
	
	document.getElementById(qno).classList.remove('visible')
	document.getElementById(qno).classList.add('hidden');
	
	
	var x=countPoints();
	var total=x.split(',')[0];
	var totalTime=x.split(',')[1];
	
	if(document.getElementById(questString+'_'+questInt)==null){
	var final=document.getElementById('total');
	final.innerHTML+='Game Over!!<br> Your Final Score is '+total+'<br>';
	final.setAttribute('class','visible');
	jigsawCont.classList.remove('visible');
	jigsawCont.classList.add('hidden');
	jigsawCont.style.height=0;
	document.getElementById('timer').innerHTML=totalTime+'(total)';
	document.getElementById('restart').className='visible';
	}
	else{
		document.getElementById(questString+'_'+questInt).classList.remove('hidden')
		document.getElementById(questString+'_'+questInt).classList.add('visible');
		time=0;
		timer=setInterval(function(){timerDiv.innerHTML=time++},950);
	}
	window.localStorage.setItem('total',total);
	window.localStorage.setItem('totalTime',totalTime);
	
	if(window.localStorage.high){
		var high=parseInt(window.localStorage.high);
		if(total>high){
		window.localStorage.setItem('high',total);
		}
	}
	else{
		window.localStorage.setItem('high',1);
	}
	
	if(window.localStorage.total){
		total=Number(localStorage.total);
		totalTime=Number(localStorage.totalTime);
		document.getElementById('currentScore').innerHTML="Your score is : "+total+". Time so far is : "+totalTime+" secs";
	}
	
}


function countPoints(){
	var total=0;
	var totalTime=0;
	for(points in answers){
		var pts=answers[points].split(',')[0];
		var time=answers[points].split(',')[1];
		
		total+=parseInt(pts);
		totalTime+=parseInt(time);
	}
	return total+','+totalTime;
	
}	
	
	document.getElementById('start').onclick=function(){
		this.className='hidden';
		jigsawCont.classList.remove('hidden');
		jigsawCont.classList.add('visible');
		document.getElementById('timetext').className='visible';
		document.getElementById('question_1').setAttribute('class','question visible');
		timer=setInterval(function(){timerDiv.innerHTML=time++},910);
		
		if(window.localStorage.high){
		total=Number(localStorage.total);
		totalTime=Number(localStorage.totalTime);
		document.getElementById('currentScore').innerHTML="Your High Score is : "+total;
		}
	
	};
	
	restart.onclick=function(){
		window.location='';
		document.getElementById('start').click();
	};
	
})();

