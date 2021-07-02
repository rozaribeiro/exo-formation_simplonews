// get token from localstorage
let tokenStorage = sessionStorage.getItem('token');
if (!tokenStorage) {
    window.location.href = "../index.html"
}

function generateSelectHtml(responseCategories) {
    let selectOption = document.querySelector('select[name=categorie]');
    let outCat = '<option>-- Catégories --</option>';
    responseCategories.forEach(categorie => {
        outCat += `<option value="${categorie.id}" >${categorie.name}</option>`;
    });
    selectOption.innerHTML = outCat;
}

fetch("https://simplonews.brianboudrioux.fr/categories", {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + tokenStorage,
    }
})
    .then(function (response) {
        response.json()
            .then(function (response) {
                if (response.status === 400) {
                    // window.location.href = "/kilk";
                } else if (response.status === 403) {
                    // window.location.href = "/link";
                } else {
                    generateSelectHtml(response.categories);
                }
            })
    })
    .catch(err => {
        console.log(err);
    })


let envoyerArticle = document.querySelector('input[name=envoyer-article]');
envoyerArticle.addEventListener('click', function (e) {
    e.preventDefault();
    let titreArticle = document.querySelector('input[name=titre]').value;
    let resumeArticle = document.querySelector('input[name=resume]').value;
    let contenueArticle = document.querySelector('textarea[name=contenue]').value;
    let imageArticle = document.querySelector('input[name=image]').value;
    let categorieArticle = document.querySelector('select[name=categorie]').value;

    let inputsAll = [titreArticle, resumeArticle, contenueArticle, imageArticle, categorieArticle];
    getData(titreArticle, resumeArticle, contenueArticle, "Hassan", imageArticle, categorieArticle);
    checkInputValue(inputsAll);
})

function checkInputValue(inputs) {
    inputs.forEach(input => {
        if (input === '' || input === null) {
            console.log('error champ vide');
            window.location.href = "";
        }
    });
}

function getData(titre, resume, content, author, img, cat) {
    fetch("https://simplonews.brianboudrioux.fr/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenStorage
            },
            body: JSON.stringify({
            "title": titre,
            "resume": resume,
            "content": content,
            "author": author,
            "img": img,
            "category_id": cat
        })
    })
    .then((response) => {
        response.json()
        .then((data => {
            console.log(data);
            window.location.href = "./home.html"
        }))
    })
    
}


// top users 

function genereteListUsers(usersArray) {

    if(usersArray.length > 10) {
        usersArray = usersArray.slice(usersArray.length -10)
    }

    // let newUsersArray = usersArray.len
    let ul = document.querySelector('.aside-contenue div ul');
    let listOut = `<li class="info-users">Utilisateur<span>Id</span></li>`;
    usersArray.reverse().forEach(user => {
        let userName = user.email.split('@')[0];
        listOut += `<li>${userName}<span>${user.id}</span></li>`;
    })
    ul.innerHTML = listOut;
}

function requeteUsers() {
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + tokenStorage
        }
    }
    fetch("https://simplonews.brianboudrioux.fr/users", options)
    .then(response => {
        // console.log(response);
        response.json()
        .then(data => {
            // console.log(data.users);
            genereteListUsers(data.users)
        })
    })
}
requeteUsers()
