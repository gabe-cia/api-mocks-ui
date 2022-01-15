(function(){
  'use strict';

  /**
   * Filter responsible for converting javascript objects in a string representation
   */
   angular.module('app.common.filters').filter('string', function($filter) {
        return function(input) {
            // object to be returned
            var stringRepresentation = "";

            // if the input is not a list, do nothing and return the element
            if (!angular.isArray(input)){
               // verify if input is boolean
               if ( typeof(input) === "boolean"){
                    stringRepresentation = $filter('translate')('general.option.' + input);     
               } else {
                    stringRepresentation = input;    
               }               
            } else {
               // if the element is a list, iterate over the list and add comma as separator
               for (var i = 0; i < input.length; i++) { 
                    // add individual element to the list
                    stringRepresentation += input[i];

                    // decide if a comma will be appended
                    if ((i + 1) < input.length) {
                        stringRepresentation += ", ";
                    } 
               }
            }       

            return stringRepresentation;
        };  
     });

     angular.module('app.common.filters').filter('separateByComma', function($filter) {
        return function(input) {
          var separatedValue = '';

          if(input instanceof Array) {
            for(var element in input) {
              separatedValue += (element + ', ');
            }
          } else {
            // Get all properties on map          
            for(var property in input) {
              separatedValue += (property + ': ' + input[property] + ', ');
            }
          }

          return separatedValue ? separatedValue.substring(0, separatedValue.length - 2) : '';
        };  
     });
     
    angular.module('app.common.filters').filter('currency', function($filter) {
        return function(input) {
            var value =  '$' + input.toString();
            if(value.lastIndexOf('.') < 0) {
                value += '.00';
            }
            return value;
        };  
    });
    
    angular.module('app.common.filters').filter('limit', function($filter) {
        return function(input,size) {
            if(!size)
                size = input.length;
            return input.substring(0, size) + (input.length !== size ? '...' : '');
        };  
    });
     
    angular.module('app.common.filters').filter('usDate', function($filter) {
        return function(input) {
            return new Date(input).toLocaleDateString();
        };  
     });

     angular.module('app.common.filters').filter('parseEntityName', function($filter, CustomAttributeServices) {
        this.$inject = ['CustomAttributeServices'];
        return function(input) {
            // Important: The find function was changed to filter because Citrix had an old version of Chrome that did not implement it.
            var filtered = CustomAttributeServices.getAllEntities().filter(function(entity) {
                return (entity.id === input);
            });
            return filtered.length > 0 ? filtered[0].name : '';
        };  
     });
     
     angular.module('app.common.filters').filter('removeSpaces', function($filter) {
        return function(input) {
            if (!angular.isString(input)) {
                return input;
            }
            return input.replace(/[\s]/g, '');
         };
     });
})();
