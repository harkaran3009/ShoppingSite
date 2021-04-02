$(document).ready(function(){
    document.forms['forgotPassForm'].onsubmit = function (event) {
        var temp = validateForgotForm();
        if(temp == false)
        {
          return false;
        }
        else
        {
          event.preventDefault();
          ajaxPostDataForgot(event);
          
        }   
    }
});

function validateForgotForm() {
    var emailValue = document.forms["forgotPassForm"]["email"].value;

    var reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    document.getElementById('error-email').innerHTML = "";

    if(!reEmail.test(emailValue))
    {
    document.getElementById('error-email').innerHTML = "Invalid Email";
    return false;
    }
  }


  function ajaxPostDataForgot(event){
  
    var serialData = $("#forgotPassForm").serialize();
    
    // Variable to hold request
    var request;
    result = $.ajax({
        url: "http://localhost:5501/checkEmail",
        type: "post",
        data: serialData,
        success: function(response) {
            console.log(response);
          
      } ,
      complete: function(xhr, textStatus) {
        if (xhr.status == 404)
        {
          alert("User Not Found");
        }
        if(xhr.status == 200)
      {
        //alert("Change Password");
        document.getElementById("changePassDiv").style.visibility = "visible";
        var y = document.getElementById("password");
        //var z = document.getElementById("forgotPassForm");
        
        y.setAttribute('type','text');
        //z.setAttribute("onSubmit","passValid()");
        document.querySelector('[name="forgotPassForm"]')
        .addEventListener('submit',
        passValid);
      }
        

        console.log("hello");
    } 
      
    });
  }
  
  function ajaxPostPasswordChange(event){
    event.preventDefault();
    var serialData = $("#forgotPassForm").serialize();
    
    // Variable to hold request
    var request;
    result = $.ajax({
        url: "http://localhost:5501/updatePassword",
        type: "post",
        data: serialData,
        success: function(response) {
            console.log(response);
          
      } ,
      complete: function(xhr, textStatus) {
        if (xhr.status == 404)
        {
          alert("User Not Found");
        }
        if(xhr.status == 200)
      {
        alert("Password Changed");
        window.location.href ="signin.html";
      }
        

        console.log("hello");
    } 
      
    });

  }
  function passValid(event){
    var passValue = document.forms["forgotPassForm"]["password"].value;

    document.getElementById('error-password').innerHTML = "";
    if(passValue.length < 8)
    {
      document.getElementById('error-password').innerHTML = "Password Should be of Minimum 8 length";
      return false;
    }
    else{
      event.preventDefault();
      ajaxPostPasswordChange(event);
    }

  }