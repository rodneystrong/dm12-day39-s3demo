angular.module('s3Demo', [])
// .directive('fileRead', function() {
//   return {
//     restrict: 'A',
//     link: function(scope, elem, attrs) {
//       elem.on('change', function(changeEvent) {
//         var reader = new FileReader();
//
//         //the line below is what converts the file to base64. IMPORTANT
//         //this happens asynchronously. important cause some images
//         //are fuckin huge.
//         reader.readAsDataURL(changeEvent.target.files[0]);
//
//         //code below is goign to take in event, convert it and
//         reader.onload=function(loadEvent) {
//           //loadEvent is your image in binary/object
//           var rawData = loadEvent.target.result;
//           console.log(rawData);
//         }
//       })
//     }
//   }
//
// })
//
.directive('fileRead', function(dataService) {
  return {
       restrict: 'A',
       link: function(scope, elem, attrs) {
           elem.on('change', function(changeEvent){
               var reader = new FileReader();
               reader.readAsDataURL(changeEvent.target.files[0])
               reader.onload = function(loadEvent) {
                   var rawData = loadEvent.target.result;
                   console.log(rawData);
               }
           })
       }
   }
})
.service('dataService', function($http) {
  this.storgeImage = function(rawData, fileName) {
    //we gotta do basic string manipulation to grab that data:image text and
    //send it to AWS. so we gotta create newImage object

    var imageExtension = imageData.split(';')[0].split('/')
    imageExtension = imageExtension[imageExtension.length-1];

    var newImage = {
      imageName: fileName,
      imageBody: rawData,
      imageExtension: imageExtension,
      userEmail: 'akang2@gmail.com'
    }
    return $http.post('/api/newimage', newImage);
  }

})
