function daysBetween(date1, date2) {
    var differenceInMilliseconds = date2 - date1;
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

function closeAlert() {
    let message = document.getElementById('alert');
    message.style.display = "none";
}

function removeText() {
    document.getElementById("search").value = "";
}

function activeOption() {
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        option.classList.remove('selected');
    })
}

function checkConfirm() {
    const confirmMessage = 'delete'
    const inputToConfirm = document.getElementById('toConfirm');
    let text = inputToConfirm.value;
    if(text.toLowerCase() === confirmMessage) {
        const buttonToDelete = document.getElementById('deleteClient');
        buttonToDelete.style.opacity = 1;
        buttonToDelete.removeAttribute('disabled');
    } else {
        const buttonToDelete = document.getElementById('deleteClient');
        buttonToDelete.style.opacity = .5;
        buttonToDelete.disabled = true;
    }
}

function increaseTimes() {
    const times = document.getElementById('timesClient');
    const currentValue = times.value;
    times.value = parseInt(currentValue) + 1;
}

function decreaseTimes() {
    const times = document.getElementById('timesClient');
    const currentValue = times.value;
    times.value = parseInt(currentValue) - 1;
}