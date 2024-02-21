$(document).ready(function(){

    var loginForm = $('#loginForm')

    // ------- validation function --------
    $('#email').blur(validate_email)
    $('#email').keyup(validate_email)
    $("#pwd").blur(validate_password)
    $("#pwd").keyup(validate_password)

    loginForm.submit(function (e){
        e.preventDefault()
        if(validate_email() & validate_password()){
            $.ajax({
                url:'/',
                type: 'POST',
                data: loginForm.serialize(),
                success: function(response){
                    var response = JSON.parse(response)
                    if (response.status == 'success'){
                        $('#messages').show();
                        $("#messages").text(response.message).addClass('bg-success text-center');
                        setTimeout(() => {
                            $("#messages").text('').removeClass('bg-success text-center');
                            window.location.href= '/home';
                        }, 1000);
                    }
                    else if(response.status == 'error'){
                        $('#messages').show()
                        $("#messages").text(response.message).addClass('bg-warning text-center')
                        setTimeout(() => {
                            $("#messages").text('').removeClass('bg-warning text-center')
                        }, 3000);
                    }
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            })
        }
    })
    function validate_email(){
        var regex = /^[_a-z_A-Z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
        var email = $('#email')
        var email_help = $('#email_help')
        if(!regex.test(email.val())){
            email_help.addClass('text-danger capitalize-text').text("enter valid email")
            return false
        }
        else if(email.val().trim() === ""){
            email_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }
        else{
            email_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_password(){
        var pwd = $("#pwd")
        var pwd_help =$("#pwd_help")
        if(pwd.val().trim() === ""){
            pwd_help.addClass('text-danger capitalize-text').text("password field cannot be empty")
            return false
        }
        else{
            pwd_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }
})