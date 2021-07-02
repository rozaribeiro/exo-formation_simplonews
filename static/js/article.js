// ******************** verification du token ******************** //

let tokenStorage = sessionStorage.getItem('token');
if (!tokenStorage) {
    window.location.href = "/index.html"
}

// ******************** declara manip dom ************************ //

var articleTitle = document.getElementById("articleTitle");
var articleResume = document.getElementById("articleResume");
var articleText = document.getElementById("articleText");
var articleAuthor = document.getElementById("articleAuthor");
var articleImg = document.querySelector("article > div");
var articleImg = document.querySelector("article > div");
var btsNextPrev = document.querySelector(".btsNextPrev");

// ******************** autres variables ************************ //

let lienCurrent = window.location.href;
let lienId = lienCurrent.split("id=")[1]


// ******************** function generateArticle ************************ //

function generateArticle(artArray) {
    
    var url = window.location.search;
    var splitUrl = url.split("=");
    var idChoix = parseInt(splitUrl[1]);
    
    var indexChoix = artArray.map(function(x) {return x.id; }).indexOf(idChoix);
    var objChoisi = artArray[indexChoix];
    
    articleTitle.textContent = objChoisi.title;
    articleResume.textContent = objChoisi.resume; 
    articleImg.innerHTML = `<img src=${objChoisi.img} alt=${objChoisi.title}>`;
    articleText.textContent = objChoisi.content;
    articleAuthor.textContent = objChoisi.author;
    
    let nextIndex = "";
    let prevIndex = "";

    function createBtsNextPrev(i){
        if (i == 0){
            nextIndex = 1;
            prevIndex = artArray.length-1;
       }
        else if (i == artArray.length-1){
            nextIndex = 0;
            prevIndex = artArray.length-2;
        }   
        else{
            nextIndex = indexChoix+1;
            prevIndex = indexChoix-1;
        }
    }
    createBtsNextPrev(indexChoix);

    let nextId = artArray[nextIndex].id;
    let prevId = artArray[prevIndex].id;

    btsNextPrev.innerHTML = `<a href="./article.html?id=${prevId}">&laquo; Article précédant</a>
    <a href="./article.html?id=${nextId}">Article suivant &raquo;</a>`

}

// ******************** function generateAside ************************ //

function generateAside(asideView) {

    let newAside = document.querySelector("aside");
    let outputAside = '';
    let count = 0;

    asideView.forEach(article => {
        if (count < 5) {
            outputAside += `
            <a href="./article.html?id=${article.id}"><img id="asideImg" src="${article.img}" alt="${article.title}"></a>
            <a href="./article.html?id=${article.id}"><h4 id="asideTitle">${article.title}</h4></a>
            `;
            count += 1;
        }
    })
    newAside.innerHTML = outputAside;
}
fetch("https://simplonews.brianboudrioux.fr/articles", {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + tokenStorage,
    }
})
    .then(function (response) {
        response.json()
            .then(function (response) {
                if (response.status === 400) {
                } else if (response.status === 403) {
                } else {
                    let arrayReversed = response.articles.reverse();
                    if (!arrayReversed) {
                        document.querySelector('.container').innerHTML = "attent !";
                    }
                    generateAside(response.articles);
                    generateArticle(response.articles.reverse());
                }
            })
    })
    .catch(err => {
        console.log(err);
    })