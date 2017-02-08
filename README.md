# Angular Currency Format

[![npm version](https://badge.fury.io/js/angular-currency-format.svg)](https://badge.fury.io/js/angular-currency-format) [![bower version](https://badge.fury.io/bo/angular-currency-format.svg)](https://badge.fury.io/bo/angular-currency-format)

This project is module for AngularJS. It provides:

- A service (factory) that retrieves currency information (name, symbol, fraction and formating) according to ISO 4217 currency codes
- A filter to print formatted currency (-100 USD -> -$100.00)

## Installation

This library is available with the bower package manager, you can either:

- Execute the following command: `bower install angular-currency-format`

- Add `'currencyFormat'` to your angular.module dependency, usually in app.js

```javascript
angular.module('myApp', ['currencyFormat']);
```

## Demo

https://livedemo.xsolla.com/angular-currency-format/

## Usage

### Factory

In the factory there are two methods that return information about the currencies.

```javascript
// Declare the factory as dependency
angular.module('myApp')
  .controller('MyCtrl', function (currencyFormatService) {
    // Get the information about the currencies
    console.log(currencyFormatService.getCurrencies());
    // outputs:
    // {
    //    'AMD': {
    //          'name': 'Armenian Dram',
    //          'fractionSize': 2,
    //          'symbol': {
    //              'grapheme': 'դր.',
    //              'template': '1 $',
    //              'rtl': false
    //          },
    //          'uniqSymbol': {
    //              'grapheme': 'դր.',
    //              'template': '1 $',
    //              'rtl': false
    //          }
    //    },
    //    ...
    // }

    // Get the information about currency by ISO 4217 currency code
    console.log(currencyFormatService.getByCode('EUR'));
    // outputs:
    // {
    //    'name': 'Euro',
    //    'fractionSize': 2,
    //    'symbol': {
    //        'grapheme': '€',
    //        'template': '$1',
    //        'rtl': false
    //    },
    //    'uniqSymbol': {
    //        'grapheme': '€',
    //        'template': '$1',
    //        'rtl': false
    //    }
    // }
    
    // Get the information about the delimiters
    console.log(currencyFormatService.getLanguages());
    // outputs:
    // {
    //    'ar_AE': {
    //        'decimal': '.',
    //        'thousands': ','
    //    },
    //    ...
    // }

    // Get the information about the delimiters by locale ID
    console.log(currencyFormatService.getLanguageByCode('en_US'));
    // outputs:
    // {
    // {
    //    'en_US': {
    //        'decimal': '.',
    //        'thousands': ','
    //    }
    // }
  });
```

Information about currencies is an object which has the structure:

```javascript
{
  'AMD': {                          // ISO 4217 currency code.
     'name': 'Armenian Dram',       // Currency name.
     'fractionSize': 2,             // Fraction size, a number of decimal places.
     'symbol': {                    // Currency symbol information.
         'grapheme': 'դր.',         // Currency symbol.
         'template': '1 $',         // Template showing where the currency symbol should be located
                                    // (before or after amount).
         'rtl': false               // Writing direction.
     },
     'uniqSymbol': {                // Alternative currency symbol information. We recommend to use it
                                    // when you want to exclude a repetition of symbols in different
                                    // currencies.
         'grapheme': 'դր.',         // Alternative currency symbol.
         'template': '1 $',         // Template showing where the alternative currency symbol should be
                                    // located (before or after amount).
         'rtl': false               // Writing direction.
     }
  },
  ...
}
```

Symbol/uniqSymbol field is `null`, when the currency has no symbol/alternative symbol. 

Information about languages is an object which has the structure:

```javascript
{
    "en_US": {                      // Locale ID
        "decimal": ".",             // Decimal delimiter
        "thousands": ","            // Thousands delimiter
    },
    ...
}
```

### Filter

Instead of directly using the currency symbol, you only need the 3 char long currency code (e.g. USD or JPY).
It will take the right symbol, format and fraction size. The fraction can be set up by providing a number of decimal places after the currency field:

```javascript
// in controller
$scope.amount = -1234.56;
$scope.isoCode = 'USD';
$rootScope.currencyLanguage = 'en_US'; // Can be set through the parameter of the filter. Default 'en_US'.    

// in template
{{ amount | currencyFormat:isoCode }} // -$1,234.56
{{ amount | currencyFormat:isoCode:0 }} // -$1,235
{{ amount | currencyFormat:'RUR':null:true:'ru_RU' }} // -1 234,56 ₽
```

If there is no currency symbol, then the filter will return the value in the following format: formated amount + ISO code. For example `-1,234.56 USD`.

## Currency reference

The component uses the JSON with currencies and languages information from https://github.com/xsolla/currency-format.

The list of currency codes was taken from https://en.wikipedia.org/wiki/ISO_4217.

## License

The MIT License.

See [LICENSE](https://github.com/xsolla/angular-currency-format/blob/master/LICENSE)