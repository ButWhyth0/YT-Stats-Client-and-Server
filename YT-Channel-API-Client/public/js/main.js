const urlBody = document.getElementById('url_box').children[1];
const aboutBody = document.getElementById('description_box').children[1];

// If there is no custom channel url
if(urlBody.innerText === 'youtube.com/N/A') {
    urlBody.innerText = 'N/A'
    urlBody.classList.add('text-6xl');
    urlBody.classList.remove('font-normal');
};

// If there is no channel description
if(aboutBody.innerText==='N/A') {
   aboutBody.classList.add('text-6xl');
    aboutBody.classList.remove('font-normal');
} else {
    aboutBody.innerHTML = aboutText.split('__').join('<br>');
}
