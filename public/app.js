angular.module('s3Demo', [])
.directive('fileRead', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.on('change', function(changeEvent) {
        var reader = new FileReader();

        reader.readAsDataURL()
      })
    }
  }

})
.service('dataService', function($http) {

})
