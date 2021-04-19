$(document).ready(function(){
  $("#createAccount").click(function() {
      var temp = validateForm();
      if(temp == false)
      {
        alert("register failed due to validations")
        return false;
      }
      else
      {
        ajaxPostData();
        
      }   
  });
  });

function validateForm() {
    var fname =$("input[name='fname']").val();
    var lname = $("input[name='lname']").val();
    var ageValue = $("input[name='age']").val();
    var emailValue = $("input[name='email']").val();
    var phno = $("input[name='phoneNumber']").val();
    var passValue = $("input[name='password']").val();

    var re = /^[A-Za-z]+$/;
    var isnum = /^\d+$/;
    var reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var rephoneno = /^\d{7}$/;
    if (!re.test(fname)) {
      $( "#fnamedialog" ).dialog( "open" );  
      return false;
    }
    if (!re.test(lname)) {
      $( "#lnamedialog" ).dialog( "open" );
      return false;
    }
    if(!isnum.test(ageValue) || (ageValue > 120) || ageValue < 0)
    {
      $( "#agedialog" ).dialog( "open" );
      return false;
    }
    if(!reEmail.test(emailValue))
    {
      $( "#emaildialog" ).dialog( "open" );
      return false;
    }
    if(!rephoneno.test(phno))
    {
      $( "#phoneNumberdialog" ).dialog( "open" );
      return false;
    }
    if(passValue.length < 6)
    {
      $( "#passworddialog" ).dialog( "open" );
      return false;
    }
  }


  function ajaxPostData(){

    var serialData = $("#myForm").serialize();
    
    // Variable to hold request
    var request;
    result = $.ajax({
        url: "/register",
        type: "post",
        data: serialData,
        success: function(response) {
          console.log(response);
      },
      complete: function(xhr, textStatus) {
        if (xhr.status == 200)
        {
          alert("Registeration Succesfull");
          window.location.href ="/signin";
        }
        if(xhr.status == 400)
        {
          alert("User Already Exists"+ xhr);
          console.log(textStatus +" register failed")
        }
        
        

    }  
    });

    

  
  }
 