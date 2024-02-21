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

        var statusSwitch = person[9] === 'Active' ? 'checked' : ''

        tr.append($('<td>').html(`
            <div class="mb-3 form-check form-switch text-left">
                <input class="form-check-input" type="checkbox" role="switch" id="statusSwitch_${person[0]}" onclick="statuschange(${person[0]})" onchange="statuschange(${person[0]})" name="statusSwitch" ${statusSwitch}>
            </div>
        `));

        var action = $('<td>').html(`<span onclick="updatePerson(${person[0]})"><i class="fas fa-edit"></i></span><span class="mx-2" onclick="deletePerson(${person[0]})"><i class="fa fa-trash" aria-hidden="true"></i></span>`)
        tr.append(action)
        peoplelist.append(tr)
    }
}