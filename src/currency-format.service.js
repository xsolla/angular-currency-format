'use strict';

angular.module('currencyFormat.iso', [])
    .factory('currencyFormatService', [function () {

        var currencies = @@includeCurrencyFormat; // Include displayFormatCurrency JSON using Gulp
        var languages = @@includeCurrencyNumberFormat; // Include displayFormatCurrency JSON using Gulp

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

                var currency = currencies[code.toUpperCase()];

                if (!currency) {
                    currency = {
                        "name": code,
                        "fractionSize": 2,
                        "symbol": {
                            "grapheme": code,
                            "template": null,
                            "rtl": false
                        },
                        "uniqSymbol": null
                    };
                }

                return currency;
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

                code = [code.substr(0, 2).toLowerCase(), code.substr(3, 2).toUpperCase()].join('_');

                return languages[code] || languages['en_US'];
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