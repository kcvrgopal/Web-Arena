// JavaScript Library for Registration page
$(document).ready(function()
{
	if (Modernizr.localstorage) {
  alert("LocalStorage available");
} else {
  alert("LocalStorage not available");
}
	$('#pwd').keyup(function()
	{
		$('#result').html(checkStrength($('#pwd').val()))
	})	


	function checkStrength(pwd)
	{
			var strength = 0
			if(pwd.length<=24)
			{
		if (pwd.length < 6) { 
			updateProgress(pwd.length * 3)
			return
		}
		if (pwd.length > 7) strength += 1
		if (pwd.match(/(.*[A-Z].*[A-Z].*[A-Z])/))  strength += 3
		if (pwd.match(/(.*[a-z].*[a-z])/))  strength += 2
		if (pwd.match(/(.*[!,%,&,@,#,$,^,*,?,_,~]{6,})/))  strength += 3
		else if(pwd.match(/(.*[!,%,&,@,#,$,^,*,?,_,~]{3,5})/))  strength += 2
		else if(pwd.match(/(.*[!,%,&,@,#,$,^,*,?,_,~]{2})/))  strength += 1
		console.log(strength)
		
		if (strength < 7 )
		{
			$('#result').removeClass()
			$('#result').addClass('weak')
			updateProgress(25)
			return 'Weak'			
		}
		else if (strength == 7 )
		{
			$('#result').removeClass()
			$('#result').addClass('normal')
			updateProgress(50)
				return 'Normal'		
		}
		else if (strength == 8 )
		{
			$('#result').removeClass()
			$('#result').addClass('good')
			updateProgress(75)
				return 'Good'		
		}
		else if(strength == 9)
		{
			$('#result').removeClass()
			$('#result').addClass('strong')
			updateProgress(100)
			return 'Strong'
		}
			}
			else
			{
				updateProgress(0);
				return 'Password Limit Exeeded. Try again'	
			}
	}
	
	function updateProgress(percent)
	{
		document.getElementById('progress').value=parseInt(percent);
	}

});
function checkPasswordMatch()
	{
		console.log("hereee");
		console.log($('#pwd').val()+"--"+$('#cpwd').val());
		if($('#pwd').val()!=$('#cpwd').val())
		{
			console.log("No match");
				$('#cresult').html("password do not match")
		}
		else
		{
			$('#cresult').html("")
		}
	}
	
function goNow()
	{
		var regObj = {	
		firstName : document.getElementById('fn').value,
		lastName : document.getElementById('ln').value,
		email : document.getElementById('email').value,
		phone : document.getElementById('phone').value,
		ssn : document.getElementById('ssn').value,
		dob : document.getElementById('date').value,
		dobtime : document.getElementById('datetime').value,
		localdob : document.getElementById('local').value,
		ccnumber : document.getElementById('cc').value,
		pwd : document.getElementById('pwd').value,
		
		allEntered : function () { 
		if(regObj.ccnumber==""||regObj.firstName == "" ||regObj. lastName==""||regObj.email==""||regObj.phone==""||regObj.ssn==""||regObj.dobtime=="")
		{
			alert("All fields are Mandatory. Please enter all the values and try again");
			return 0;
		}
		},
		
		isValidEmail : function () { 
		var regex = new RegExp("[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}");
	  if(!regex.test(regObj.email))
	  {
		  alert("Please re-enter the email address in the correctformat");
		  return 0;
	  }
	  return 1;
		},
		
		isPhoneNumberFormatValid : function () { 
		regex = new RegExp("^\\d{3}-\\d{3}-\\d{4}$");
		  if(!regex.test(regObj.phone))
	  {
		  alert("Please re-enter the phone number in the correctformat");
		  return 0;
	  }
	  return 1;
	  },
	  
		isSSNFormatValid : function () { 
		regex = new RegExp("^\\d{3}-\\d{2}-\\d{4}$");
	  if(!regex.test(regObj.ssn))
	  {
		  alert("Please re-enter the SSN in the correctformat");
		  return 0;
	  }
	  return 1;
		},
		
		isCCFormatValid : function () { 
		regex = new RegExp("\\d{4}-\\d{4}-\\d{4}-\\d{4}");
	  if(!regex.test(regObj.ccnumber))
	  {
		  alert("Please re-enter the Credit card number in the correctformat");
		  return 0;
	  }
	  return 1;
		},
		
		toJSONString : function (json) { return JSON.stringify(json)},
		
		readFromJSONString :  function (string) { return JSON.parse(string)}
		};
		
	  if(regObj.allEntered()==0) return;
	  if(regObj.isValidEmail()==0) return;
	  if(regObj.isSSNFormatValid()==0) return;
	  if(regObj.isPhoneNumberFormatValid()==0) return;
	  if(regObj.isCCFormatValid()==0) return;
	  
	  saveToLocalStorage(regObj.email,regObj.toJSONString(regObj));
	  var result = regObj.readFromJSONString(readFromLocalStorage(regObj.email));
	  console.log(result);
	  for(var k in result)
	  {
		console.log(k,result[k]);  
	  }
	  console.log("********");
	  saveToSessionStorage(regObj.email,regObj.toJSONString(regObj));
	  var sresult = regObj.readFromJSONString(readFromSessionStorage(regObj.email));
	  console.log(sresult);
	  for(var k in sresult)
	  {
		console.log(k,sresult[k]);  
	  }
	}
	
	function saveToLocalStorage(key,obj)
	{
		window.localStorage.setItem(key,obj);
	}
	function saveToSessionStorage(key,obj)
	{
		window.sessionStorage.setItem(key,obj);
	}
	function readFromLocalStorage(key)
	{
		return window.localStorage.getItem(key);
	}
	function readFromSessionStorage(key)
	{
		return window.sessionStorage.getItem(key);
	}