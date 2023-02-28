let list = [];

$(document).ready(function () {
    $("#submit").click(function () {
        let name = $("#getname").val();
        let number = $("#getnumber").val();
        let email = $("#getemail").val();
        let mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let gender = $('input[name="gender"]:checked').val();
        let status = $("#getstatus").val();
        let address = $("#getaddress").val();
        let id = $("#id").val();

        if (name == "") {
            $("#alert").html("Please enter your name!");
        } else {
            $("#alert").html("");
        }

        if (number.length != 10) {
            $("#alertnum").html("Number must be 10 character!");
        } else if (number.length > 10) {
            $("#alertnum").html("Number must be 10 character!");
        }
        else {
            $("#alertnum").html("");
        }

        if (mailformat.test(email)) {
            $("#alertmail").html("");

        } else {
            $("#alertmail").html("You have entered an invalid email address!");
        }

        if (gender) {
            $("#alertgender").html("");
        } else {
            $("#alertgender").html("Please select your gender!");
        }

        // let language = new Array();
        // let check =$("#getlang:checked").length;
        // $("#getlang:checked").each(function () {
        //     language.push($(this).val());
        // });

        // if (check == 0) {
        //     $("#alertlang").html("Please select your language!");
        // } else {
        //     $("#alertlang").html("");
        // }


        if (status == "") {
            $("#alertstatus").html("You must select status!");
        } else {
            $("#alertstatus").html("");
        }

        if (address == "") {
            $("#alertaddress").html("Please enter your address!");
        } else {
            $("#alertaddress").html("");
        }

        let data = {"id":id, "name": name, "mobileNumber": number, "emailId": email, "gender": gender, "status": status, "address": address };
        console.log(id)
        if(id){
            putfunction(data)
        }else{
        if (name && number && email && gender && status && address) {
            console.log(data);
            //list.push(data)
            //localStorage.setitem("resultvalue", JSON.stringify(list));
            $.post("https://635bbe8caa7c3f113dc51060.mockapi.io/student", { "name": name, "mobileNumber": number, "emailId": email, "gender": gender, "status": status, "address": address },
                function (data) { }
            );
            alert("submit successfully");
            window.location.href = "http://127.0.0.1:5501/table.html"
        } else {
            console.log("");
        }
    }
    });

    $("#reset").click(function () {
        $("#alert,#alertnum,#alertmail,#alertgender,#alertlang,#alertstatus,#alertaddress").html("");
        // document.getElementById("myform").reset();
    });
});

function getUrlParameter(name) {
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        console.log(results);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var qsp = 'id',
    para = getUrlParameter(qsp);
// alert(para);

dataedit(para)
function dataedit(id) {
    $.ajax({
        url: "https://635bbe8caa7c3f113dc51060.mockapi.io/student/" + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $("#getname").val(data.name);
            $("#getnumber").val(data.mobileNumber);
            $("#getemail").val(data.emailId);
            if (data.gender == "male") {
                $("#male").prop("checked", true)
            }
            else if(data.gender == "female") {
                $("#female").prop("checked", true)
             }         
            $("#getstatus").val(data.status);
            $("#getaddress").val(data.address);
            edit_id = data.id
            $('#id').val(data.id);
        },
    });
}

function putfunction(student) {
    $.ajax({
        url: "https://635bbe8caa7c3f113dc51060.mockapi.io/student/" + student.id,
        method: 'PUT',
        dataType: 'json',
        data: student,
        success: function () {
            alert("record edited");
            window.location.href = "http://127.0.0.1:5501/table.html"
        }
    });
}

function deletefun(id) {
    $.ajax({
        url: "https://635bbe8caa7c3f113dc51060.mockapi.io/student/" + id,
        method: 'DELETE',
        success: function () {
            alert('record has been deleted');
            window.location.href = "http://127.0.0.1:5501/table.html"
        }
    });
};

buildFunction()

function buildFunction() {
    $.ajax({
        url: "https://635bbe8caa7c3f113dc51060.mockapi.io/student",
        type: "GET",
        success: function (data) {
            console.log(data)
            var tabledata = ' ';

            for (i = 0; i < data.length; i++) {
                tabledata +=
                    '<tr><td>' + data[i].name +
                    '</td><td>' + data[i].mobileNumber +
                    '</td><td>' + data[i].emailId +
                    '</td><td>' + data[i].gender +
                    '</td><td>' + data[i].status +
                    '</td><td>' + data[i].address +
                    '</td><td>' + '<a href="http://127.0.0.1:5501/index.html?id=' + data[i].id + '" class="btn  btn-outline-success " style="text-decoration:none;">Edit</a>' +
                    '</td><td>' + '<button class="btn  btn-outline-danger " onclick="deletefun(' + data[i].id + ')">Delete</button>' +
                    '</td></tr>';
                //$("#studentdata").html =tabledata;
            };
            $("#studentdata1").append(tabledata);
        }
    });
};