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

/*global I18n*/
(function() {
	'use strict';

	/**
	 *
	 * @param locales
	 * @param defaultLocale
	 * @constructor
	 */
	var I18nAdapter = function I18nAdapter(locales, defaultLocale) {
		this.locales = this._formatLocales(locales);
		this.defaultLocale = this._formatLocale(defaultLocale);

		I18n.locale = I18n.defaultLocale = this.defaultLocale;
	};

	/**
	 * Change the current locale and load the specified resource files.
	 *
	 * @param {String} locale
	 * @param {Array.<String>} urls
	 * @return {Promise}
	 */
	I18nAdapter.prototype.setLocale = function(locale, urls) {
		var promise, promises = [],
			i, url;

		locale = I18nAdapter.prototype._formatLocale(locale);

		if (!I18n.translations[locale]) {
			for (i = 0; i < urls.length; i++) {
				url = urls[i];
				promise = this._loadBundle(locale, url);
				promises.push(promise);
			}

			// when all bundles have loaded, update the locale
			promise = $.when.apply(this, promises);
			return promise.then(function() {
				console.log('set locale to: ' + locale);
				I18n.locale = locale;
			});
		}

		I18n.locale = locale;
		return $.Deferred().resolve().promise();
	};

	/**
	 * Load a resource bundle into the specified locale
	 * @param locale
	 * @param url
	 * @return {Promise}
	 */
	I18nAdapter.prototype._loadBundle = function(locale, url) {
		var config = {
			dataType: 'json'
		};

		locale = this._formatLocale(locale);
		I18n.translations[locale] = {};

		return $.ajax(url, config)
			.then(function(data) {
				_.extend(I18n.translations[locale], data);
				console.log(_.keys(data).length + ' messages added to locale: ' + locale + ' from url: ' + url);
			});
	};

	/**
	 * Get translation for key.
	 * @param {String} key
	 * @param {Object} options
	 * @return {String}
	 */
	I18nAdapter.prototype.translate = function(key, options) {
		return I18n.t(key, options);
	};

	/**
	 * Format number.
	 * @param value
	 * @param options
	 * @return {String}
	 */
	I18nAdapter.prototype.formatNumber = function(value, options) {
		return I18n.toNumber(value, options);
	};

	/**
	 * Format currency.
	 * @param value
	 * @param options
	 * @return {String}
	 */
	I18nAdapter.prototype.formatCurrency = function(value, options) {
		return I18n.toCurrency(value, options);
	};

	/**
	 * Format date.
	 * @param date
	 * @param format
	 * @return {String}
	 */
	I18nAdapter.prototype.formatDate = function(date, format) {
		return I18n.strftime(date, format);
	};

	/**
	 * Convert locale name to hyphenated / all lowercase format.
	 * @param {String} locale
	 * @return {String}
	 * @private
	 */
	I18nAdapter.prototype._formatLocale = function(locale) {
		return locale.replace("_", "-").toLowerCase();
	};

	/**
	 * Convert array of locale names to hyphenated / all lowercase format.
	 * @param {Array.<String>} locales
	 * @return {Array.<String>}
	 * @private
	 */
	I18nAdapter.prototype._formatLocales = function(locales) {
		var i;

		for (i = 0; i < locales.length; i++) {
			locales[i] = this._formatLocale(locales[i]);
		}

		return locales;
	};

	window.I18nAdapter = I18nAdapter;
}());