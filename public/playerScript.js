var playbackType = "";

function checkPlaybackType() {
    console.log("requesting");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (playbackType !== "" && playbackType !== this.responseText) {
                location.reload();
            }
            playbackType = this.responseText;
        }
    };
    xhttp.open("GET", "/ajax_info.txt", true);
    xhttp.send();
    setTimeout(checkPlaybackType, 10000);
}

checkPlaybackType();