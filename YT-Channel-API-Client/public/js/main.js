const urlBody = document.getElementById('url_box').lastElementChild;
const aboutBody = document.getElementById('description_box').lastElementChild;
const boxContainer = document.getElementById('box_container');
const channelBox = document.getElementById('channel_box');

if(showError===false) {
    document.getElementById('error_message').remove();
}

if(showBoxes) {
    // If there is no custom channel url
    if(urlBody.innerText === 'youtube.com/N/A') {
        urlBody.innerText = 'N/A';
        urlBody.classList.add('text-6xl');
        urlBody.classList.remove('font-normal');
    }
    
    // If there is no channel description
    if(aboutBody.innerText==='N/A') {
        aboutBody.classList.add('text-6xl');
        aboutBody.classList.remove('font-normal');
    } else {
        aboutBody.innerHTML = aboutText.split('__').join('<br>');
    }
} else {
    boxContainer.remove();
    channelBox.remove();
}

