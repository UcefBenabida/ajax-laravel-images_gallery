<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Images</title>
    <link type="text/css" rel="stylesheet" href="/../materialize/css/materialize.css"  media="screen,projection"/>
    <!--
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    -->
    <link href="/../css/home.css" rel="stylesheet">
    <link href="/../css/home2.css" rel="stylesheet">

    <script src="/../jquery/jquery.js"></script>

</head>
<body> 
<div class="container">

  <div id="app-message">c'est le message, ne me supprime pas je suis pas là par hazard</div>

    <div id="videoWrapper" class="center-align">
      <img   id="videoSource" src="" alt="image" width="40%" height="230" />
    </div><br>
    
    <!-- File Upload Form -->
    <form class="center-align" id="uploadForm" enctype="multipart/form-data">
        @csrf
        <input type="file" name="image" id="fileInput" multiple />
        <input type="submit" name="submit" value="UPLOAD" />
        <br><br><br>
        <input type="text" name="name" id="form_name" placeholder="image name" />
    </form>
    <!-- Progress Bar -->
    <div class="progress" >
        <div class="progress-bar" > </div>
    </div>
    <!-- Display upload status -->
    <div id="uploadStatus"></div>

    @for ($i=0;$i<30;$i++)
      <br>
    @endfor
    
    <div id="content" class="row" ></div>

</div>
<script src="/../js/manage_upload.js"></script>
</body>
</html>