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

(function() {

	Namespace.create('ngreddit.listing');

	/**
	 * Controller for list of top Reddit listings
	 * @param $scope
	 * @param listingRepository
	 * @constructor
	 */
	ngreddit.listing.IndexController = function($scope, listingRepository) {

		this.$scope = $scope;
		this.listingRepository = listingRepository;

		/**
		 * Setup default values for scope
		 */
		this.initScope = function() {
			this.$scope.loading = true;
			this.$scope.listings = [];
		};

		/**
		 * Prepare fetched listing data for display
		 * @param listings
		 */
		this.updateListings = function(listings) {
			_.each(listings, function(listing) {
				var url = listing.data.thumbnail;
				listing.data.created_utc = listing.data.created_utc * 1000;
				listing.thumbUrl = (url && url !== 'default' && url !== 'self' && url !== 'nsfw') ? url : 'listing/_/reddit.png';
			});

			this.$scope.loading = false;
			this.$scope.listings = listings;
		};

		this.initScope();

		this.listingRepository.fetchNewListings()
			.then(this.updateListings.bind(this));
	}

}());