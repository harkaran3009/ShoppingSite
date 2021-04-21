
$(document).ready(function(){
  $("#logIn").click(function () {
      var temp = validateForm();
      if(temp == false)
      {
        return false;
      }
      else
      {
        ajaxPostData();
        
      }   
  });
  });

function validateForm() {
    var emailValue = $("input[name='email']").val();
    var passValue = $("input[name='password']").val();

    var reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $("#one").text("");
    $("#two").text("");

    if(!reEmail.test(emailValue))
    {
    $("#one").text("Invalid Email");
    return false;
    }
    if(passValue.length < 6)
    {
    $("#two").text("Password Should be of Minimum 8 length");
    return false;
    }
  }


  function ajaxPostData(event){

    var serialData = $("#loginForm").serialize();
    
    // Variable to hold request
    var request;
    result = $.ajax({
        url: "/login",
        type: "post",
        data: serialData,
        success: function(response) {
            alert("Login Succesfull  "+ response.email);
            console.log(response);
            sessionStorage.setItem("user",response.email);     
            window.location.href="/";
          
      } ,
      complete: function(xhr, textStatus) {
        if (xhr.status == 400)
        {
          alert("Sorry,invalid credentials. please register");
        }
        
    } 
      
    });

    

  
  }
 