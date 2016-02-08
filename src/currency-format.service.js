'use strict';

angular.module('currencyFormat.iso', [])
    .factory('currencyFormatService', ['$filter', function ($filter) {

        var currencies = @@includeJSON; // Include displayFormatCurrency JSON using Gulp

        return {

            /**
             * Retrieves the object holding currency: name, symbol, fraction information and formating.
             *
             * @param string code
             * @return object
             */
            getByCode: function (code) {
                if (!code) {
                    return;
                }

                return currencies[code.toUpperCase()];
            },

            /**
             * Retrieves the object currencies.
             *
             * @return object
             */
            getAll: function () {
                return currencies;
            }

        };
    }]);