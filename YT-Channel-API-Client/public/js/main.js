const urlBody = document.getElementById('url_box').lastElementChild;
const aboutBody = document.getElementById('description_box').lastElementChild;
const boxContainer = document.getElementById('box_container');
const channelBox = document.getElementById('channel_box');
const subBox = document.getElementById('sub_box');
const webLink = document.getElementById('web_link');

// Client app says whether to keep this message on screen, or remove it
if(showError===false) {
    document.getElementById('error_message').remove();
}

// Client app says whether to keep the data boxes on screen, or remove them
if(showBoxes) {
    // If there is no custom channel url
    if(urlBody.innerText === 'youtube.com/N/A') {
        urlBody.innerText = `N/A`;
        urlBody.classList.add('text-6xl');
        urlBody.classList.remove('font-normal');
    } else if(channelUrl.length>15) {
        urlBody.classList.remove('break-words');
        urlBody.classList.add('break-all');
    }
    
    // If there is no channel description
    if(aboutBody.innerText==='N/A') {
        aboutBody.classList.add('text-6xl');
        aboutBody.classList.remove('font-normal');
    } else {
        aboutBody.innerHTML = aboutText.split('__').join('<br>');
    }

    if(channelSubs === 'Hidden') {
        subBox.lastElementChild.innerHTML = channelSubs;
    }

} else {
    boxContainer.remove();
    channelBox.remove();
}
