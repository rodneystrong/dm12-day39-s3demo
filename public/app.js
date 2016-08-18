angular.module('s3Demo', [])
.directive('fileRead', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.on('change', function(changeEvent) {
        var reader = new FileReader();

        //the line below is what converts the file to base64. IMPORTANT
        //this happens asynchronously. important cause some images
        //are fuckin huge. 
        reader.readAsDataURL(changeEvent.target.files[0]);
      })
    }
  }

})
.service('dataService', function($http) {

})
