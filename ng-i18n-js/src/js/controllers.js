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

/*global i18nAdapter*/
var RootController = function($scope) {
	'use strict';

	function safeApply() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}

	$scope.locales = [
		{ label: 'English', code: 'en-us' },
		{ label: 'Deutsch', code: 'de-de' }
	];

	$scope.selectedLocale = $scope.locales[0];

	$scope.changeLocale = function() {
		var locale = $scope.selectedLocale.code;
		i18nAdapter.setLocale(locale, ['i18n/' + locale + '/messages.json', 'i18n/' + locale + '/messages2.json'])
			.then(safeApply);
	};
};

RootController.$inject = ['$scope'];



var HomeController = function($scope) {
	'use strict';

	$scope.now = new Date();
	$scope.number = 123.45;
	$scope.money = 420.42;
};

HomeController.$inject = ['$scope'];