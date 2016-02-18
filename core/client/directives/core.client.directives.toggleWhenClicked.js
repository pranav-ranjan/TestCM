angular.module('customersApp').directive( function() {
    var scope = {
      toggleValue: false
    };
	function link(scope, iElement, iAttributes, dController, tElement) {
		iElement.bind("click", function(event) {
          scope.$apply(function() {
            scope.toggleValue = !scope.toggleValue;
          });
		});
	}
	return {
		link: link,
		restrict: "A",
        scope: scope
	};
});
