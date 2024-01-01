function formAction() {
    var myForm = document.getElementById("myForm");

    if (myForm.style.display === "none" || myForm.style.display === "") {
        myForm.style.display = "block";
        
    } else {
        var fileInput = document.getElementById("file-input"); // Replace with the actual ID of your file input element
        fileInput.value = ""; // Reset the input by setting its value to an empty string
        var preview = document.getElementById("file-ip-1-preview");
        preview.style.display = "none";
        myForm.style.display = "none";
        document.getElementById('file-input-label').innerHTML = 'Select a File';
        document.getElementById('file-input-label').style.display = 'flex';
    }
}

function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
      document.getElementById('file-input-label').innerHTML = '';
      document.getElementById('file-input-label').style.display = 'none';

    }
  }
