function tableController($scope) {

    $scope.columnLimit = 6;
    $scope.enabledHeaders = [];
    $scope.disabledHeaders = [];
    $scope.lastFixedHeader = 0;

    // Yeah yeah, don't modify DOM in controllers. :-)
    // This is just a quick prototype anyways.
    function prependCheckboxes() {
        $('.mdl-checkbox').each(function(index) {
            var $cb = $(this);
            $cb.parent().prependTo($cb.parent().parent());
        });
    }

    $scope.getHeaderIndex = function(header, array) {
        return array.findIndex(function(item) {
            return header.key == item.key;
        })
    };

    $scope.enableHeader = function(header) {
        var enabledIndex = $scope.getHeaderIndex(header, $scope.enabledHeaders);
        var disabledIndex = $scope.getHeaderIndex(header, $scope.disabledHeaders);

        if (enabledIndex >= 0) return;

        header.enabled = true;

        if (header.alwaysVisible) {
            $scope.enabledHeaders.splice($scope.lastFixedHeader, 0, header);
            $scope.lastFixedHeader++;
        } else {
            $scope.enabledHeaders.push(header);
        }

        $scope.disabledHeaders.splice(disabledIndex, 1);
    }

    $scope.disableHeader = function(header) {
        var enabledIndex = $scope.getHeaderIndex(header, $scope.enabledHeaders);
        var disabledIndex = $scope.getHeaderIndex(header, $scope.disabledHeaders);

        if (disabledIndex >= 0) return;

        header.enabled = false;
        $scope.disabledHeaders.push(header);
        $scope.enabledHeaders.splice(enabledIndex, 1);
    }

    $scope.selectMenuItem = function(header) {
        console.log("selected = ", header.key);
        console.log("enabled = ", $scope.enabledHeaders);
        if (header.enabled) return; // do nothing if header is visible

        var selectedIndex = $scope.getHeaderIndex(header, $scope.disabledHeaders);

        var disabledSliceStart = selectedIndex - $scope.columnLimit + 1;
        if (disabledSliceStart < 0) disabledSliceStart = 0;

        var disabledSlice = $scope.disabledHeaders.slice(disabledSliceStart, selectedIndex + 1);

        console.log('disabled slice = ', disabledSlice)

        disabledSlice.forEach(function(header) {
            $scope.enableHeader(header);
        });

        while ($scope.enabledHeaders.length > $scope.columnLimit) {
            $scope.disableHeader($scope.enabledHeaders[$scope.lastFixedHeader + 1]);
        }
        prependCheckboxes();
        console.log("new enabled = ", $scope.enabledHeaders);
    };

    // Bootstrap the table
    function init() {
        $scope.$ctrl.json.headers.forEach($scope.disableHeader);
        $scope.$ctrl.json.headers.forEach(function(header) {
            if ($scope.enabledHeaders.length >= $scope.columnLimit) return;
            $scope.enableHeader(header);
        })
    }

    $scope.$watch('json', function(newvalue) {
        // console.log($scope.json.data);
        //init();
    });

    $scope.$onChanges = function(changeObj) {
        console.log(changeObj);
    }

    $scope.$ctrl.$postLink = function() {
        // window.componentHandler.upgradeAllRegistered();
    }
    $scope.$ctrl.update = function(){
      // window.componentHandler.upgradeAllRegistered();
    }
    init();
}

angular
    .module('components')
    .controller('tableController', tableController);
