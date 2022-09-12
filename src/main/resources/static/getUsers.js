const url = 'http://localhost:8080/api/admin/users'
let roleList
let roles = []
fetch('http://localhost:8080/api/admin/roles').then(res => res.json()).then(res => roleList = res);


async function getAllUsers() {
    await fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                let temp = "";
                data.forEach((user) => {
                    temp += '<tr>'
                    temp += "<td>" + user.id
                    temp += "<td>" + user.firstName
                    temp += "<td>" + user.lastName
                    temp += "<td>" + user.age
                    temp += "<td>" + user.email
                    temp += "<td>" + user.roles.map(r => ' ' + r.role)
                    temp += "<td>" + '<button type="button" onclick="modalEdit(' + user.id + ')" '
                        + 'class="btn btn-info">Edit</button>';
                    temp += "<td>" + '<button type="button" onclick="modalDelete(' + user.id + ')" '
                        + 'class="btn btn-danger delete-user">Delete</button>';

                })
                document.querySelector('#table').innerHTML = temp
                $('select').empty()
                roleList.forEach(role => {
                    $('select').append($('<option>').val(role.id).text(role.role));
                })
                console.log(roleList)
            }
        })
}

function modalEdit(id){
    console.log('Модальное окно Edit')
    fetch('http://localhost:8080/api/admin/users/' +id)
        .then(res => res.json())
        .then(user => {
            $("#modalEdit").modal()
            document.getElementById("id").value = user.id
            document.getElementById("firstName").value = user.firstName
            document.getElementById("lastName").value = user.lastName
            document.getElementById("age").value = user.age
            document.getElementById("email").value = user.email
            document.getElementById("password").value.hidden = user.password
            roles = user.roles
            $("#roles").empty()
            let listRol = roleList.map(r => '<option>' + r.role + '</option>')
            $("#roles").append(listRol)

        })
}


function editUser() {
    let id = document.getElementById("id").value
    console.log('EDIT получено  id=' + id)
    let editRole = document.getElementById("roles").value
    console.log("editRole  " + editRole)

    for (let r of roleList) {
            if (r.role === editRole) {
                roles.pop()
                roles.push(r)
            }
    }
    console.log(roles)

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            "id": document.getElementById("id").value,
            "firstName": document.getElementById("firstName").value,
            "lastName": document.getElementById("lastName").value,
            "age": document.getElementById("age").value,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value,
            "roles": roles
        }),
        headers: { 'Content-Type': 'application/json'}
    }).then(() => getAllUsers())
    $('#modalEdit').modal('hide')
}

function modalDelete(id){
    console.log('Модальное окно DELETE: ID = ' + id)
    fetch('http://localhost:8080/api/admin/users/' +id)
        .then(resp => resp.json())
        .then(user => {
            $("#modalDelete").modal()
            document.getElementById("delId").value = user.id
            document.getElementById("delFirstname").value = user.firstName
            document.getElementById("delLastName").value = user.lastName
            document.getElementById("delAge").value = user.age
            document.getElementById("delEmail").value = user.email
            $("#delRoles").empty()
            let listRol = user.roles.map(r => '<option>' + r.role + '</option>')
            $("#delRoles").append(listRol)
        })
}

function deleteUser(){
    let id = window.document.getElementById("delId").value
    console.log('DELETE получено  id=' + id)
    fetch('http://localhost:8080/api/admin/users/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then(() => getAllUsers())
    $('#modalDelete').modal('hide')
}

function createNewUser() {
    console.log('new User')
    let idRole = document.getElementById("newRoles").value
    console.log(roleList)
    let newRole = []
    for (let r of roleList) {
        if (r.id == idRole) {
            newRole.push(r)
        }
    }
    console.log("idRole   " + idRole)
    console.log("role" + newRole)
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "firstName": document.getElementById("newFirstname").value,
            "lastName": document.getElementById("newLastName").value,
            "age": document.getElementById("newAge").value,
            "email": document.getElementById("newEmail").value,
            "password": document.getElementById("newPassword").value,
            "roles": newRole
        })
    }).then(response => response.json())
        .then(() => getAllUsers())
        .then($('#myTab a[href="#usersTable"]').tab('show'))
        .then(() => {
                document.getElementById("newFirstname").value = null
                document.getElementById("newLastName").value = null
                document.getElementById("newAge").value = null
                document.getElementById("newEmail").value = null
                document.getElementById("newPassword").value = null
        })
}










