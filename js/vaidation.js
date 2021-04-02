
$(document).ready(function(){
  $('form').submit(function (event) {
      var temp = validateForm();
      if(temp == false)
      {
        return false;
      }
      else
      {
        event.preventDefault();
        ajaxPostData(event);
        
      }   
  });
  });

function validateForm() {
    var fname = document.forms["myForm"]["firstName"].value;
    var lname = document.forms["myForm"]["lastName"].value;
    var ageValue = document.forms["myForm"]["age"].value;
    var emailValue = document.forms["myForm"]["email"].value;
    var phno = document.forms["myForm"]["phno"].value;
    var passValue = document.forms["myForm"]["psw"].value;

    var re = /^[A-Za-z]+$/;
    var isnum = /^\d+$/;
    var reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var rephoneno = /^\d{10}$/;
    document.getElementById('error-firstName').innerHTML ="";
    document.getElementById('error-lastName').innerHTML ="";
    document.getElementById('error-Age').innerHTML ="";
    document.getElementById('error-email').innerHTML = "";
    document.getElementById('error-phno').innerHTML = "";
    document.getElementById('error-psw').innerHTML = "";
    if (!re.test(fname)) {
      document.getElementById('error-firstName').innerHTML = "Invalid First Name";
      return false;
    }
    if (!re.test(lname)) {
      document.getElementById('error-lastName').innerHTML = "Invalid Last Name";
      return false;
    }
    if(!isnum.test(ageValue) || (ageValue > 120) || ageValue < 0)
    {
      document.getElementById('error-Age').innerHTML = "Invalid Age, Please enter between 1 to 120";
      return false;
    }
    if(!reEmail.test(emailValue))
    {
      document.getElementById('error-email').innerHTML = "Invalid Email";
      return false;
    }
    if(!rephoneno.test(phno))
    {
      document.getElementById('error-phno').innerHTML = "Phone no. Should contain 10 digits";
      return false;
    }
    if(passValue.length < 8)
    {
      document.getElementById('error-psw').innerHTML = "Password Should be of Minimum 8 length";
      return false;
    }
  }


  function ajaxPostData(event){

    var serialData = $("#myForm").serialize();
    
    // Variable to hold request
    var request;
    result = $.ajax({
        url: "http://localhost:5501/register",
        type: "post",
        data: serialData,
        success: function(response) {
          console.log(response);
      },
      complete: function(xhr, textStatus) {
        if (xhr.status == 200)
        {
          alert("Registeration Succesfull");
          window.location.href ="signin.html";
        }
        if(xhr.status == 409)
        {
          alert("User Already Exists");
        }
        
        

        console.log("hello");
    }  
    });

    

  
  }
 