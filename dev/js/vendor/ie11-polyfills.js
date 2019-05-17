// Functions to make IE support
(function() {

  // Create Element.forEach() function if not exist
  if (typeof NodeList.prototype.forEach === "function")
      return false;
  else
      NodeList.prototype.forEach = Array.prototype.forEach;

  // Create Element.remove() function if not exist
  if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
          if (this.parentNode) {
              this.parentNode.removeChild(this);
          }
      };
  }

  // Create Element.matches() function if not exist
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

  // Create Element.closest() function if not exist
  if (!Element.prototype.closest) {

    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

  Object.defineProperty(Array.prototype, 'includes', {
		configurable: true,
		value: function includes (searchElement /*, fromIndex*/) {
			'use strict';
			var O = Object(this);
			var len = parseInt(O.length) || 0;
			if (len === 0) {
				return false;
			}
			var n = parseInt(arguments[1]) || 0;
			var k;
			if (n >= 0) {
				k = n;
			} else {
				k = len + n;
				if (k < 0) {
					k = 0;
				}
			}
			var currentElement;
			while (k < len) {
				currentElement = O[k];
				if (searchElement === currentElement ||
					(searchElement !== searchElement && currentElement !== currentElement)) {
					return true;
				}
				k++;
			}
			return false;
		},
		writable: true
	});

})();

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
