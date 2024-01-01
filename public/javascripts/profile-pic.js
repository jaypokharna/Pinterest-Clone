// -----Crop Image file upload with modal--

var $uploadCrop,
		tempFilename,
		rawImg,
		imageId;
		function readFile(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					$('.upload-demo').addClass('ready');
					$('#cropImagePop').modal('show');
					rawImg = e.target.result;
				}
				reader.readAsDataURL(input.files[0]);
			}
			else {
				console.log("Sorry - you're browser doesn't support the FileReader API");
			}
		}

		$uploadCrop = $('#upload-demo').croppie({
			viewport: {
				width: 160,
				height: 160,
				type: 'circle'
			},
			enforceBoundary: false,
			enableExif: true
		});
		$('#cropImagePop').on('shown.bs.modal', function(){
			$('.cr-slider-wrap').prepend('<p>Image Zoom</p>');
			$uploadCrop.croppie('bind', {
				url: rawImg
			}).then(function(){
				console.log('jQuery bind complete');
			});
		});

		$('#cropImagePop').on('hidden.bs.modal', function(){
			$('.item-img').val('');
			$('.cr-slider-wrap p').remove();
		});

		$('.item-img').on('change', function () { 
			readFile(this); 
		});

		$('.replacePhoto').on('click', function(){
			$('#cropImagePop').modal('hide');
			$('.item-img').trigger('click');
		})
		
		// $('#cropImageBtn').on('click', function (ev) {
		// 	$uploadCrop.croppie('result', {
		// 		type: 'base64',
		// 		// format: 'jpeg',
    //     backgroundColor : "#000000",
    //     format: 'png',
		// 		size: {width: 160, height: 160}
		// 	}).then(function (resp) {
		// 		$('#item-img-output').attr('src', resp);
		// 		$('#profile-pic').attr('value', resp);
		// 		$('#cropImagePop').modal('hide');
		// 		$('.item-img').val('');
		// 	});
		// });

    $('#cropImageBtn').on('click', function (ev) {
      $uploadCrop.croppie('result', {
          type: 'blob',  // Change type to 'blob' to get image as a Blob
          backgroundColor: "#000000",
          format: 'jpg',
          size: {width: 160, height: 160}
      }).then(function (blob) {
          // Create a FormData object and append the blob as a file
          var formData = new FormData();
          formData.append('imageData', blob, 'cropped_image.jpg');
  
          // Send the FormData to the server for further processing
          fetch('/save-profile-image', {
              method: 'POST',
              body: formData,
          })
          .then(response => response.json())
          .then(data => {
              // Handle the server response if needed
              console.log(data);
          })
          .catch(error => {
              console.error('Error sending cropped image data:', error);
          });
  
          // Update the frontend display
          $('#item-img-output').attr('src', URL.createObjectURL(blob));
          $('#cropImagePop').modal('hide');
          $('.item-img').val('');
      });
  });
  