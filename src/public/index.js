function daysBetween(date1, date2) {
    var differenceInMilliseconds = date2 - date1;
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

function closeAlert () {
    let message = document.getElementById('alert');
    message.style.display = "none";
}

function removeText() {
    document.getElementById("search").value = "";
}