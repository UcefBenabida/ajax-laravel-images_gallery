
function message(mess)
{
    $("#uploadStatus").text(mess);
    $("#uploadStatus").slideDown();
    setTimeout(function(){ $("#uploadStatus").slideUp();}, 2000);
}

function appMessage(message)
{

  $(document).ready(function(){

    $("#app-message").text(message);

    $("#app-message").animate({left: '5%', opacity: '1'}, "slow", function(){
      window.setTimeout(function (){
        $("#app-message").animate({left: '1%', opacity: '0'}, 1000); 
      },
      1500);
    });

  });

}

function deleteImage(id)
{
    var token = document.getElementsByName('_token')[0].value;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if(this.status == 200)
        {
            appMessage(this.responseText);
            if(this.responseText == "image deleted")
            {
                downloadContent();
            }
        }
    }
    xhttp.open("POST", "delete");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("_token=" + token + "&id="  + id);
}

function showContent(imagesJSON)
{
    const images = JSON.parse(imagesJSON);
    var token = document.getElementsByName('_token')[0].value;
    var content='';
    images.forEach(function(itemUncoded, index)
    {
        let item = JSON.parse(itemUncoded);
        content += '<div class="col s12 m6 l4 xl3">' ;
        content += '<div class="card medium hoverable" >' ;
        content += '<div class="card-img center-align" >' ;
        content += '<img width="95%" height="200"  class="center-align image" src="/../images/' + item.image + '" alt="image" /></div>' ;
        content += '<div class="card-content smaller"><span class="card-title">' + item.name + '</span></div>' ;
        content += '<div class="card-action"><button onclick="deleteImage(' + item.id + ')" class="material-icons add-to-cart z-depth-0"  >Delete</button>' ;
        content += '</div></div></div>' ;
    });
    document.getElementById('content').innerHTML = content ;
}

function downloadContent()
{
    var token = document.getElementsByName('_token')[0].value;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if(this.status == 200)
        {
            showContent(this.responseText);
        }
    }
    xhttp.open("POST", "getdata");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("_token=" + token );
}



$(document).ready(function(){

    downloadContent();

    $("#fileInput").change(function()
    {

        var allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg'];
        var file = this.files[0];
        var fileType ;
        var filename ;

        if(file != undefined)
        {
            fileType = file.type;
            if(!allowedTypes.includes(fileType))
            {
                message("Please select a valid file (image/jpg | jpeg | gif | svg) .");
                $("#fileInput").val('');
                return false;
            }
            else
            {
                //filename = getFileNameFromSrc(document.getElementById("fileInput").value);
                message("vous avez selectionné  " + file.name + " du type " + file.type);
            }
            var theVideoSource = $('#videoSource');
            theVideoSource[0].src = URL.createObjectURL(file) ;
        }


    });

    $("#uploadForm").on('submit', function(e)
    {

        e.preventDefault();

        const fileInput = document.getElementById("fileInput");
        const thefile = fileInput.files[0];
        if(thefile != undefined)
        {
            message("the uploading was started")
            // the request
            xhr = new XMLHttpRequest();
            xhr.open("post", "upload", true);
            // tne progress bar
            xhr.upload.addEventListener("progress", function(evt)
            {
                if(evt.lengthComputable)
                {
                    var percentComplete = ((evt.loaded / evt.total) * 100);
                    $(".progress-bar").width(percentComplete + '%');
                    $(".progress-bar").html(Math.floor(percentComplete) + '%');
                }
            }, false);

            xhr.onload = function()
            {
                if(this.status == 200)
                {
                    message(this.responseText);
                    if(this.responseText == "image uploaded successfully!")
                    {
                        downloadContent();
                    }
                }
            };
            xhr.send(new FormData(this));
        }
        else
        {
            message("select a file the first!");
        }
    });

});