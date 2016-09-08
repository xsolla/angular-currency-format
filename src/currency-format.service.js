'use strict';

angular.module('currencyFormat.iso', [])
    .factory('currencyFormatService', ['$filter', function ($filter) {

        var currencies = @@includeCurrencyFormat; // Include displayFormatCurrency JSON using Gulp
        var languages = @@includeNumeralFormat; // Include displayFormatCurrency JSON using Gulp

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
            getCurrencies: function () {
                return currencies;
            },

            /**
             * Retrieves the object language: decimal, thousands.
             *
             * @param string code
             * @return object
             */
            getLanguageByCode: function (code) {
                if (!code) {
                    return;
                }

                return languages[code.toLocaleLowerCase()];
            },

            /**
             * Retrieves the object languages.
             *
             * @return object
             */
            getLanguages: function () {
                return languages;
            },

        };
    }]);