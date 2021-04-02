
$(document).ready(function(){
  document.forms['signInForm'].onsubmit = function (event) {
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
    }
 
  });
  
  function validateForm() {
      var emailValue = document.forms["signInForm"]["email"].value;
      var passValue = document.forms["signInForm"]["psw"].value;

      var reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      document.getElementById('error-email').innerHTML = "";
      document.getElementById('error-psw').innerHTML = "";

      if(!reEmail.test(emailValue))
      {
      document.getElementById('error-email').innerHTML = "Invalid Email";
      return false;
      }
      if(passValue.length < 8)
      {
      document.getElementById('error-psw').innerHTML = "Password Should be of Minimum 8 length";
      return false;
      }
    }

    
  
  
    function ajaxPostData(event){
  
      var serialData = $("#signInForm").serialize();
      
      // Variable to hold request
      var request;
      result = $.ajax({
          url: "http://localhost:5501/signin",
          type: "post",
          data: serialData,
          success: function(response) {
              alert("Login Succesfull");
              console.log(response);
            
        } ,
        complete: function(xhr, textStatus) {
          if (xhr.status == 404)
          {
            alert("Sorry You should register first");
            window.location.href ="register.html";
          }
          if(xhr.status == 401)
        {
          alert("Invalid Password");
        }
        if(xhr.status == 200)
        { 
          window.location.href ="welcome.html";
        }
          

          console.log("hello");
      } 
        
      });

      
    }

    

      