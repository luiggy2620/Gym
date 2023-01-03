function daysBetween(date1, date2) {
    var differenceInMilliseconds = date2 - date1;
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

function closeMessage () {
    let message = document.querySelector('.message');
    message.style.display = "none";
}