/*
 * Copyright (C) 2013 Cliff Meyers (cliff.meyers@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*global Globalize*/
(function() {
	'use strict';

	var currentLocale = "en_US";

	angular.module('localize', []).
		factory('LocalizeConfig', ['$http', function($http) {
			return {

				/**
				 * @type {Array.<String>}
				 */
				supportedLocales: [],

				/**
				 *
				 * @param {Array.<String>} locales
				 */
				setSupportedLocales: function(locales) {
					this.supportedLocales = locales;
				},

				/**
				 * Load localization data for the specified locale
				 * @param {String} locale
				 */
				initialize: function(locale) {
					var url, config;

					if (locale) {
						if (this.supportedLocales.indexOf(locale) !== -1) {
							currentLocale = locale;
						} else {
							throw new Error("Unsupported locale");
						}
					}

					url = 'l10n/' + currentLocale + '/messages.json';
					config = {
						dataType: 'json'
					};

					$http.get(url, config)
						.then(function(response) {
							var messages = response.data;
							Globalize.addCultureInfo(currentLocale, {
								messages: messages
							});
							console.log(_.keys(messages).length + ' locale messages added for ' + currentLocale);
						});
				}
			};
		}]).
		filter('localize', function() {
			return function(key) {
				return Globalize.localize(key, currentLocale);
			};
		});

}());