const url = '../../static/img/logo_simplon_news.png';

// Header
let header = document.querySelector('header');
let headerHTML = `
<div class="container">
    <div class="logo">
        <a href="/index.html">
            <img src="${url}" alt="logo simplon news">
        </a>
    </div>
    <div class="profil">
        <span class="affiche-profil" >Profil <i class="fas fa-user-circle" title="profil"></i><i class="fas fa-circle" title="en ligne"></i></span>
        <div class="display-profil">
            <ul>
                <li><i class="fas fa-user-circle"></i><a href="#">Paramètres</a></li>
                <li><i class="fas fa-home"></i><a href="./home.html">Acceuil</a></li>
                <li><i class="fas fa-plus-circle"></i><a href="./nouvel_article.html">Nouvel Article</a></li>
                <li><i class="fas fa-comment"></i><a href="#">Messages</a></li>
                <li class="deconnexion"><i class="fas fa-sign-out-alt"></i><a href="/index.html">Déconnexion</a></li>
            </ul>
        </div>
    </div>
</div>
`;
header.innerHTML = headerHTML;

// Footer
let footer = document.querySelector('footer');
let footerHTML = `
<div class="container">
    <div class="social-media">
        <ul>
            <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="#"><i class="fab fa-github-square"></i></a></li>
            <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
        </ul>
    </div>
    <div class="copyright">
        <p>All Right Reserved &copy; 2021</p>
    </div>
</div>
`;
footer.innerHTML = footerHTML;

// dispaly profile
let faUserCircle = document.querySelector('.profil > .affiche-profil');
faUserCircle.addEventListener('click', () => {
    let displayProfil = document.querySelector('.display-profil');
    if (displayProfil.style.display === 'flex') {
        displayProfil.style.display = "none";
    } else {
        displayProfil.style.display = "flex";
    }
})

// on line if token true
let tokenStorageHeader = sessionStorage.getItem('token');
let onLine = document.querySelector('.profil span .fa-circle');
if (tokenStorageHeader) {
    onLine.style.display = "flex"
} else {
    onLine.style.display = "none";
}


// Déconnexion
window.onload = function () {
    let deconnexionBtn = document.querySelector('.deconnexion');
    deconnexionBtn.addEventListener('click', function () {
        sessionStorage.removeItem('token');
        window.location.href = "../index.html";
    })
}


// favicon 

let head = document.querySelector('head');
let li = document.createElement('link')
li.rel = 'icon';
li.href = '../img/favicon.png';
li.type ='image/png';
head.appendChild(li)


// // notification nouveau article disponible

// function checkNotification(totalArticles) {
//     let articlesDisponible = document.querySelectorAll('article').length;
//     console.log(articlesDisponible);
//     if (totalArticles > articlesDisponible) {
//         alert('ok')
//     }
// }

// function notificationNewPost() {
//     let main = document.querySelector('main');
//     setInterval(() => {
//         fetch("https://simplonews.brianboudrioux.fr/articles", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + tokenStorage
//             }
//         })
//         .then(response => {
//             response.json()
//             .then(data => {
//                 let totalArticles = data.articles.length;
//                 console.log("c'est bon");
//                 checkNotification(totalArticles);
//             })
//         })
//     }, 10000)

//     console.log('new post');
// }
// notificationNewPost()


