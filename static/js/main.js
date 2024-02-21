$(document).ready(function(){
    console.log('javascript present')
    getPeople()

    // ------------ filter form ---------------
    $('#filter-btn').on("click",filterBtnToggle)
    $('#attribute').on("change",searchFilter)
    $('#searchtxt').keyup(searchFilter)

    //------------- create form ---------------
    var createbtn = $('#addpeoplebtn')
    var formdiv = $('#formdiv')

    formdiv.dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        width: 700,
        title: 'Add Person',
        buttons: {
            "Close": function() {
                $('#peopleform').trigger('reset');
                $(this).dialog("close");
                getPeople();
            }
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").hide();
        }
    })

    createbtn.on('click',function(){
        formdiv.dialog("open");
        $('#form-type').val("createform")
    })

    // ------------ Event Calling ------------
    $("#fname").blur(validate_fname)
    $("#lname").blur(validate_lname)
    $("#email").blur(validate_email)
    $("#mobno").blur(validate_mobno)
    $(".gen").blur(validate_gender)
    $(".hobb").blur(validate_hobbies)
    $("#country").blur(validate_country)
    $("#addr").blur(validate_addr)
    $('#pwd').blur(validate_password)

    $("#fname").keyup(validate_fname)
    $("#lname").keyup(validate_lname)
    $("#email").keyup(validate_email)
    $("#mobno").keyup(validate_mobno)
    $(".gen").keyup(validate_gender)
    $(".hobb").keyup(validate_hobbies)
    $("#country").keyup(validate_country)
    $("#addr").keyup(validate_addr)
    $('#pwd').keyup(validate_password)

    $("#email").blur(email_check)
    $("#email").keyup(email_check)

    // ---------- Validation Functions -----------
    function validate_fname(){
        var regex = /^[a-zA-Z]+$/
        var fname = $('#fname')
        var fname_help = $('#fname_help')

        if(fname.val().trim() == ""){
            fname_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }else if(!regex.test(fname.val())){
            fname_help.addClass('text-danger capitalize-text').text("only characters in this field")
            return false
        }else{
            fname_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_lname(){
        var regex = /^[a-zA-Z]+$/
        var lname = $('#lname')
        var lname_help = $('#lname_help')
        if(!regex.test(lname.val())){
            lname_help.addClass('text-danger capitalize-text').text("only characters in this field")
            return false
        }
        else if(lname.val().trim() === ""){
            lname_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }
        else{
            lname_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_email(){
        var regex = /^[_a-z_A-Z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
        var email = $('#email')
        var email_help = $('#email_help')

        if(email.val().trim() === ""){
            email_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }
        else if(!regex.test(email.val())){
            email_help.addClass('text-danger capitalize-text').text("enter valid email")
            return false
        }
        else{
            email_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function email_check(){
        var email = $('#email')
        var emailtaken_help = $("#emailtaken_help")
        if (validate_email()){
        $.ajax({
            url:'/emailCheck',
            type:'POST',
            data: {'email': email.val().trim()},
            success: function(response){
                var isSuccess = response.status;
                var message = response.message;

                if (isSuccess) {
                    // Handle success case
                    emailtaken_help.removeClass('text-danger capitalize-text').text("")
                    console.log('Email is available:', message);
                    return true
                } else {
                    // Handle failure case
                    emailtaken_help.addClass('text-danger capitalize-text').text(message)
                    console.log('Email is taken:', message);
                    return false
                }
            },
            error: function (error) {
                console.log(error)
                return false
             }
        })}
    }

    function validate_mobno(){
        var regex = /^\d{10}$/
        var mobno = $('#mobno')
        var mobno_help = $('#mobno_help')
        if(!regex.test(mobno.val())){
            mobno_help.addClass('text-danger capitalize-text').text("only 10 digits in this field")
            return false
        }
        else if(mobno.val().trim() === ""){
            mobno_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }
        else{
            mobno_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_gender(){
        var gen_help = $('#gen_help')
        if($('.gen:checked').length > 0){
            gen_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
        else{
            gen_help.addClass('text-danger capitalize-text').text("choose a gender")
            return false
        }
    }

    function validate_hobbies() {
        var hobb_help = $('#hobb_help');

        if ($('.hobb:checked').length > 0) {
            hobb_help.removeClass('text-danger capitalize-text').text("");
            return true
        } else {
            hobb_help.addClass('text-danger capitalize-text').text("Choose at least one hobby");
            return false
        }
    }

    function validate_country(){
        var country = $('#country')
        var country_help = $('#country_help')
        if(country.val() === ""){
            country_help.text("choose a country").addClass('text-danger capitalize-text')
            return false
        }
        else{
            country_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_addr(){
        var addr = $('#addr')
        var addr_help = $('#addr_help')
        if(addr.val().trim() === ""){
            addr_help.addClass('text-danger capitalize-text').text("dont leave the field empty")
            return false
        }
        else{
            addr_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    function validate_password(){
        var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/
        var pwd = $("#pwd")
        var pwd_help =$("#pwd_help")
        if(pwd.val().trim() === ""){
            pwd_help.addClass('text-danger capitalize-text').text("password field cannot be empty")
            return false
        }
        else if(!regex.test(pwd.val())){
            pwd_help.addClass('text-danger capitalize-text').text("password must contain: 8 characters, 1 sp. character, 1 uppercase character, 1 lowercase character & a number")
            return false
        }
        else{
            pwd_help.removeClass('text-danger capitalize-text').text("")
            return true
        }
    }

    // ---------- Status Switch Check -------------
    function switchValue(){
        var statusSwitch = $('.statusSwitch')
        var statusValue = $('#statusValue')
        if (statusSwitch.prop('checked')){
            statusValue.val('Active')
        }
        else{
            statusValue.val('Inactive')
        }
    }

    // ------------- Form Send and Ajax ---------------
    var form = $('#peopleform')

    form.submit(function(event){
        event.preventDefault();
        switchValue()
        if (validate_fname() && validate_lname() && validate_email() && validate_mobno() && validate_gender() && validate_hobbies() && validate_country() && validate_password() && validate_addr())
        {
            if($('#form-type').val()=='createform'){
                $.ajax({
                    url:'/addperson',
                    type:'POST',
                    data:form.serialize(),
                    success:function(response){
                        form[0].reset();
                        formdiv.dialog('close')
                        getPeople()
                        messageShow(response)
                    },
                    error:{function(error){
                        console.log(error)
                    }}
                })
            }
            else if($('#form-type').val()=='updateform'){
                $.ajax({
                    url:'/updateperson',
                    type:'POST',
                    data:form.serialize(),
                    success:function(response){
                        console.log(response)
                        $('#peopleform').trigger('reset');
                        formdiv.dialog('close')
                        getPeople()
                        messageShow(response)
                    },
                    error:{function(error){
                        console.log(error)
                    }}
                })
            }
        }
        else{
            console.log("Errors Present")
            console.log(validate_fname() , validate_lname() , validate_email() , validate_mobno() , validate_gender() , validate_hobbies() , validate_country() , validate_addr(), validate_password())
        }
    })
})
// ---------- Search Filter ------------
function filterBtnToggle(){
    var filterBtn = $("#filter-btn i")
    var filterOrder = $("#filter-order")

    // console.log('toggle entered',filterBtn,filterOrder)
    if (filterBtn.hasClass('fas fa-sort-amount-down-alt')){
        filterBtn.removeClass('fas fa-sort-amount-down-alt').addClass('fas fa-sort-amount-down')
        filterOrder.val('DESC')
    }
    else if(filterBtn.hasClass('fas fa-sort-amount-down')){
        filterBtn.removeClass('fas fa-sort-amount-down').addClass('fas fa-sort-amount-down-alt')
        filterOrder.val('ASC')
    }

    searchFilter()
}

function searchFilter(){
    $.ajax({
        url:'/searchFilter',
        type: 'POST',
        data: $('#filterForm').serialize(),
        success: function(response){
            // console.log(response)
            if (response.length == 0){
                // console.log('empty response')
                $('#peoplelist').text('No Such User Found')
            }
            else{
                showPeople(response)
            }
        },
        error:function(error){
            console.log(error.responseText)
        }
    })
}

// ---------- Status Change ------------
function statuschange(id){
    var stats = $(`#statusSwitch_${id}`).prop('checked') ? 'Active' : 'Inactive'
    data = {'id':id,'status': stats}
    console.log(data)

    $.ajax({
        url: '/updateStatus',
        type: 'POST',
        data: data,
        success: function(response){
            messageShow(response)
        },
        error: function(error){
            console.log(error)
        }
    })
}

// ---------- Message Render ------------
function messageShow(response){
    var messages = $('#messages')
    messages.show();
    messages.empty()
    messages.text(response).addClass('bg-info text-center')
    setTimeout(function(){
        messages.hide()
    },3000)
}

// ---------- Update Function ------------
function updatePerson(id){
    var data = {'id':id}
    $.ajax({
        url:'/getpeople',
        type:'POST',
        data:data,
        success: function (response) {
            console.log(response)
            $('#formdiv').dialog({
                autoOpen: false,
                modal: true,
                resizable: false,
                width: 700,
                title: 'Update Person',
                buttons: {
                    "Close": function() {
                        $('#peopleform').trigger('reset');
                        $(this).dialog("close");
                    }
                },
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close").hide();
                }
            })
            $('#formdiv').dialog("open")
            $('#form-type').val('updateform')
            $('#id').val(response[0])
            $("#fname").val(response[1])
            $("#lname").val(response[2])
            $("#email").val(response[3])
            $("#mobno").val(response[4])
            $("#pwd").val(response[11])
            $("#addr").val(response[8])
            $("#role").val(response[10])

            if (response[5] == 'Male'){
                $('#genm').prop("checked",true)
            }
            else{
                $("#genf").prop("checked",true)
            }

            var hobbies_str = response[6]
            var hobbies = hobbies_str.split(',')
            // console.log(hobbies)
            for (i=0;i<hobbies.length;i++){
                if (hobbies[i]==$('#hobb1').val()){
                    $('#hobb1').prop('checked',true)
                }
                else if(hobbies[i]==$('#hobb2').val()){
                    $('#hobb2').prop('checked',true)
                }
                else if(hobbies[i]==$('#hobb3').val()){
                    $('#hobb3').prop('checked',true)
                }
                else if(hobbies[i]==$('#hobb4').val()){
                    $('#hobb4').prop('checked',true)
                }
                else if(hobbies[i]==$('#hobb5').val()){
                    $('#hobb5').prop('checked',true)
                }
            }

            var countval = response[7]
            if(countval==$('#cntry1').val()){
                $('#cntry1').prop('selected',true)
            }
            else if(countval == $('#cntry2').val()){
                $("#cntry2").prop('selected',true)
            }
            else if(countval == $('#cntry3').val()){
                $("#cntry3").prop('selected',true)
            }
            else if(countval == $('#cntry4').val()){
                $("#cntry4").prop('selected',true)
            }
            else if(countval == $('#cntry5').val()){
                $("#cntry5").prop('selected',true)
            }

            if (response[9]=="Active")
            {
                $("#statusSwitch").prop('checked',true)
            }
            else{
                $("#statusSwitch").prop('checked',false)
            }

        }
    })
}

// ---------- Delete Function ------------
function deletePerson(id){
    var result = confirm('Are You Sure You Want to Delete User?')
    if (result){
        var data = {'id':id}
        $.ajax({
            url: '/deletePerson',
            type:'POST',
            data: data,
            success: function(response){
                messageShow(response)
                getPeople()
            },
            error: function(error){
                console.log(error)
            }
        })
    }
}

// ---------- List Render ----------
var peoplelist = $('#peoplelist')
function getPeople(){
    $.ajax({
        url: '/getpeople',
        type:'POST',
        data: {'id':""},
        success: function(response) {
            showPeople(response)
        },
        error:function(error){
            console.log(error)
        }
    })
}

function showPeople(response){
    var peoplelist = $('#peoplelist');
    peoplelist.empty();
    for (i=0;i<response.length;i++){
        var person = response[i]
        var tr = $('<tr>')

        for (j=1;j<9;j++){
            var td = $('<td>')
            td.text(person[j])
            tr.append(td);
        }

        tr.addClass('person-content')

        var statusSwitch = person[9] === 'Active' ? 'checked' : ''

        tr.append($('<td>').html(`
            <div class="mb-3 form-check form-switch text-left">
                <input class="form-check-input" type="checkbox" role="switch" id="statusSwitch_${person[0]}" onclick="statuschange(${person[0]})" onchange="statuschange(${person[0]})" name="statusSwitch" ${statusSwitch}>
            </div>
        `));

        var action = $('<td>').html(`<span onclick="updatePerson(${person[0]})"><i class="fas fa-edit"></i></span><span class="mx-2" onclick="deletePerson(${person[0]})"><i class="fa fa-trash" aria-hidden="true"></i></span>`)
        tr.append(action)
        peoplelist.append(tr)

        var currentPage = 1
        var numberOfPeople = 5
        var numberOfPages = Math.ceil((response.length)/5)
        updatePagination(numberOfPages,currentPage)
        showingPeople(numberOfPeople,currentPage)

        $("#pagination").on("click", "li.page-item:not(.disabled) a.page-link", function () {
            var pageNumber = parseInt($(this).data('page'));
            updatePagination(numberOfPages, pageNumber);
            showingPeople(numberOfPeople,pageNumber);
        });
    }
}

// ----------- Pagination functions ----------
function showingPeople(numberOfPeople,pageNumber){
    $('.person-content').hide()
    $('.person-content').each(function(n){
        if(n < numberOfPeople * pageNumber && n >= numberOfPeople * (pageNumber - 1)){
            $(this).show();
        }
    })
}

function updatePagination(numberOfPages, currentPage) {
    $('#pagination').empty();
    $('#pagination').append('<li class="page-item ' + (currentPage === 1 ? 'disabled' : '') + '"><a class="page-link" href="#" data-page="' + (currentPage - 1) + '">Previous</a></li>');
    for (var i = 1; i <= numberOfPages; i++) {
        $('#pagination').append('<li class="page-item ' + (currentPage === i ? 'active' : '') + '"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>');
    }
    $('#pagination').append('<li class="page-item ' + (currentPage === numberOfPages ? 'disabled' : '') + '"><a class="page-link" href="#" data-page="' + (currentPage + 1) + '">Next</a></li>');
}