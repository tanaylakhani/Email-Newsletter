﻿// JavaScript Document

function eemail_submit_ajax(url)
{
	txt_email_newsletter=document.getElementById("eemail_txt_email");
    if(txt_email_newsletter.value=="")
    {
        alert("Please enter the email address");
        txt_email_newsletter.focus();
        return false;    
    }
	if(txt_email_newsletter.value!="" && (txt_email_newsletter.value.indexOf("@",0)==-1 || txt_email_newsletter.value.indexOf(".",0)==-1))
    {
        alert("Please enter valid email")
        txt_email_newsletter.focus();
        txt_email_newsletter.select();
        return false;
    }
	document.getElementById("eemail_msg").innerHTML="loading...";
	var date_now = "";
    var mynumber = Math.random();
	var str= "txt_email_newsletter="+ encodeURI(txt_email_newsletter.value) + "&timestamp=" + encodeURI(date_now) + "&action=" + encodeURI(mynumber);
	eemail_submitpostrequest(url+'/eemail_subscribe.php', str);
}

var http_req = false;
function eemail_submitpostrequest(url, parameters) 
{
	http_req = false;
	if (window.XMLHttpRequest) 
	{
		http_req = new XMLHttpRequest();
		if (http_req.overrideMimeType) 
		{
			http_req.overrideMimeType('text/html');
		}
	} 
	else if (window.ActiveXObject) 
	{
		try 
		{
			http_req = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) 
		{
			try 
			{
				http_req = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) 
			{
				
			}
		}
	}
	if (!http_req) 
	{
		alert('Cannot create XMLHTTP instance');
		return false;
	}
	http_req.onreadystatechange = eemail_submitresult;
	http_req.open('POST', url, true);
	http_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_req.setRequestHeader("Content-length", parameters.length);
	http_req.setRequestHeader("Connection", "close");
	http_req.send(parameters);
}


function eemail_submitresult() 
{
	//alert(http_req.readyState);
	//alert(http_req.responseText); 
	if (http_req.readyState == 4) 
	{
		if (http_req.status == 200) 
		{
		 	if (http_req.readyState==4 || http_req.readyState=="complete")
			{ 
				if((http_req.responseText).trim()=="succ")
				{
					document.getElementById("eemail_msg").innerHTML="Subscribed successfully.";
					document.getElementById("eemail_txt_email").value="";
				}
				else if((http_req.responseText).trim()=="exs")
				{
					document.getElementById("eemail_msg").innerHTML="Email already exist.";
				}
				else
				{
					document.getElementById("eemail_msg").innerHTML="Please try after some time.";
					document.getElementById("eemail_txt_email").value="";
				}
			} 
		}
		else 
		{
			alert('There was a problem with the request.');
		}
	}
}