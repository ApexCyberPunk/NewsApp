// API used : http://newsapi.org/s/india-news

const container = document.querySelector('.container')

const optionsContainer = document.querySelector('.options-container')
// in stands for India... 
const country = 'us'

// const countryOptions = [ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za]

const options = ['general', 'entertainment', 'health', 'science', 'sports',
'technology']

// 100 requests per day

let requestURL;

// Create cards from data

const generateUI = (articles) => {
    for(let item of articles) {
        let card = document.createElement("div")
        card.classList.add('news-card')
        card.innerHTML = `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="">
        </div>
        <div class="news-content">
        <div class="news-title">
            ${item.title}
        </div>
            <div class="news-description">
                ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Read More</a>
        </div>`;
        container.appendChild(card);
        // have your own NEWSPAPER JPG IMAGE... CHANGE THAT..!!!!
    }

}

// news API call

const getNews = async () => {
    container.innerHTML = ""

    let response = await fetch(requestURL)

    if (!response.ok) {
        alert("Data unavailable. Try again later")
        return false
    }
    let data = await response.json();
    generateUI(data.articles)
}

const selectCategory = (e, category) => {
    let options = document.querySelectorAll('.option')
    options.forEach((element) => {
        element.classList.remove('active')
    })
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    e.target.classList.add('active')
    getNews()
}

const createOptions = () => {
    for(let i of options) {
        optionsContainer.innerHTML += `
        <button 
        class="options ${i == "general" ? "active" : ""}
        " onclick="selectCategory(event, '${i}')">${i}</button> ;
        `
    }
}

const init=()=> {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`
    init();

}




