'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (root) {

  // svg for all
  svg4everybody();

  var sliderOptions = {
    'banner': {
      freeScroll: false,
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      pageDots: true,
      prevNextButtons: false,
      lazyLoad: true
    },
    'full': {
      freeScroll: false,
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      pageDots: false,
      prevNextButtons: false,
      adaptiveHeight: true
    },
    'six-items': {
      items: 6,
      freeScroll: false,
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      pageDots: false,
      prevNextButtons: false,
      adaptiveHeight: true
    },
    'reviews': {
      autoPlay: 3000,
      contain: true,
      wrapAround: true,
      controls: false,
      prevNextButtons: false,
      adaptiveHeight: true
    },
    'gallery': {
      cellAlign: 'left',
      prevNextButtons: false,
      pageDots: false
    }
  };

  document.querySelectorAll('[data-slider]').forEach(function (slider, i) {
    var slides = slider.querySelector('[data-slider-slides]'),
        slidesCount = slides.children.length,
        slideWidth = slides.children[0].offsetWidth,
        sliderWidth = slider.offsetWidth,
        slidesCapacity = Math.round(sliderWidth / slideWidth),
        controls = slider.querySelector('[data-slider-controls]'),
        controlsPrev = controls.querySelector('[data-slider-controls-prev]'),
        controlsNext = controls.querySelector('[data-slider-controls-next]');

    if (slidesCount > slidesCapacity) {
      var flkty = new Flickity(slides, sliderOptions[slider.dataset.slider]);

      controlsPrev.addEventListener('click', function (e) {
        e.preventDefault();
        flkty.previous();
      });

      controlsNext.addEventListener('click', function (e) {
        e.preventDefault();
        flkty.next();
      });
    } else {
      controls.remove();
    }

    if (sliderOptions[slider.dataset.slider].controls === false) {
      controls.remove();
    }
  });

  document.querySelectorAll('[data-more]').forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      var container = el.closest('[data-more-action]');
      container.classList.toggle('show-more');
    });
  });

  document.querySelectorAll('[data-toggle]').forEach(function (el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      var text = el.dataset.toggle;
      var t = el;

      if (t.tagName == 'BUTTON') {
        var span = t.querySelector('span');
        t.dataset.toggle = t.textContent.trim();
        t = span;
      }

      t.textContent = text;
    });
  });

  document.querySelectorAll('[data-tabs]').forEach(function (tabs, i) {
    var data = tabs.dataset.tabs,
        content = document.querySelector('[data-tabs-content=' + data + ']');

    tabs.querySelectorAll('[data-tab]').forEach(function (tab, k) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();

        var index = tab.dataset.tab,
            showing = content.querySelector('.showing'),
            selected = tabs.querySelector('.selected');

        if (showing) showing.classList.remove('showing');
        if (selected) selected.classList.remove('selected');

        tab.classList.add('selected');
        content.querySelector('[data-tab="' + index + '"]').classList.add('showing');
      });
    });

    tabs.querySelector('[data-tab]').click();
  });

  // select
  document.querySelectorAll('select').forEach(function (select, i) {
    new CustomSelect({
      elem: select
    });
  });

  document.querySelectorAll('[data-drop]').forEach(function (select, i) {

    select.querySelector('.js-Dropdown-title').addEventListener('click', function (e) {
      e.preventDefault();

      if ([].concat(_toConsumableArray(select.classList)).includes('select_open')) {
        select.classList.remove('select_open');
      } else {
        document.querySelectorAll('.select_open').forEach(function (select, k) {
          select.classList.remove('select_open');
        });
        select.classList.add('select_open');
      }
    });
  });

  // datepickers
  var calendar = document.querySelector('.calendar');

  if (calendar) {
    var months = calendar.querySelectorAll('.calendar__item .month'),
        controls = calendar.querySelectorAll('[data-calendar-controls]'),
        monthsList = calendar.querySelector('.calendar__months-list').children;

    months.forEach(function (month, i) {
      var now = new Date(),
          date = new Date(now.getFullYear(), now.getMonth() + i);

      var customOptions = {
        rangeFrom: null,
        rangeTo: null
      };

      var datepicker = $(month).datepicker({
        startDate: date,
        selectOtherMonths: !1,
        keyboardNav: !1,
        multipleDatesSeparator: '',
        navTitles: {
          days: 'MM',
          months: 'yyyy',
          years: 'yyyy1 - yyyy2'
        },

        onRenderCell: function onRenderCell(date, cellType) {
          var y = date.getFullYear(),
              m = date.getMonth(),
              d = date.getDate(),
              day = date.getDay(),
              from = calendar.dataset.from,
              to = calendar.dataset.to,
              fromCell = month.querySelector('.-range-from-'),
              toCell = month.querySelector('.-range-to-'),
              rangeCells = month.querySelectorAll('.-in-range-');

          if (fromCell) {
            fromCell.classList.remove('-range-from-');
          }

          if (toCell) {
            toCell.classList.remove('-range-to-');
          }

          rangeCells.forEach(function (cell, i) {
            cell.classList.remove('-in-range-');
          });

          if (date.getTime() == from) {
            return {
              classes: '-range-from-'
            };
          } else if (date.getTime() == to) {
            return {
              classes: '-range-to-'
            };
          } else if (date.getTime() > from && date.getTime() < to) {
            return {
              classes: '-in-range-'
            };
          }
        },
        onSelect: function onSelect(formattedDate, date, inst) {
          var y = date.getFullYear(),
              m = date.getMonth(),
              d = date.getDate(),
              day = date.getDay();

          var from = calendar.dataset.from,
              to = calendar.dataset.to,
              timeStamp = date.getTime();

          if (from && !to) {
            if (from > timeStamp) {
              calendar.dataset.to = from;
              calendar.dataset.from = timeStamp;
            } else {
              calendar.dataset.to = timeStamp;
            }
          } else {
            calendar.dataset.from = timeStamp;
            calendar.removeAttribute('data-to');
          }
        }
      }).data('datepicker');

      controls.forEach(function (button, i) {
        button.addEventListener('click', function (e) {
          e.preventDefault();

          var direction = Number(button.closest('[data-calendar-controls]').dataset.calendarControls),
              currentDate = datepicker.currentDate;
          switch (direction) {
            case 0:
              datepicker.date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3);
              break;
            case 1:
              datepicker.prev();
              break;
            case 2:
              datepicker.next();
              break;
            case 3:
              datepicker.date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3);
              break;
          }
        });
      });

      if (i == 0) {
        var monthIndex = datepicker.currentDate.getMonth();
        var monthLocale = datepicker.loc.monthsShort;

        for (var k = 0; k < 12; k++) {
          if (monthLocale[monthIndex] == undefined) monthIndex = 0;
          monthsList[k].textContent = monthLocale[monthIndex];
          ++monthIndex;
        }
      }

      datepicker.rangeOptions = customOptions;

      document.querySelector('[data-calendar-clear]').addEventListener('click', function (e) {
        e.preventDefault();
        calendar.removeAttribute('data-from');
        calendar.removeAttribute('data-to');
        datepicker.clear();
      });

      calendar.addEventListener('click', function (e) {
        datepicker.update();
      });
    });

    controls.forEach(function (button, i) {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        var direction = Number(button.closest('[data-calendar-controls]').dataset.calendarControls),
            progress = calendar.querySelector('.calendar__progress'),
            monthsItems = calendar.querySelector('.calendar__months-list').children.length - 3,
            monthWidth = calendar.querySelector('.calendar__months-item').offsetWidth,
            progressLeft = progress.style.left == '' ? 0 : parseInt(progress.style.left),
            progressEnd = monthWidth * monthsItems;

        switch (direction) {
          case 0:
            progress.style.left = progressEnd + 'px';
            button.closest('[data-calendar-controls]').dataset.calendarControls = 1;
            calendar.querySelector('[data-calendar-controls="2"]').dataset.calendarControls = 3;
            break;
          case 1:
            if (progressLeft == monthWidth) {
              button.closest('[data-calendar-controls]').dataset.calendarControls = 0;
            }
            progress.style.left = progressLeft - monthWidth + 'px';
            calendar.querySelector('[data-calendar-controls="3"]').dataset.calendarControls = 2;
            break;
          case 2:
            if (progressLeft == progressEnd - monthWidth) {
              button.closest('[data-calendar-controls]').dataset.calendarControls = 3;
            }
            progress.style.left = progressLeft + monthWidth + 'px';
            calendar.querySelector('[data-calendar-controls="0"]').dataset.calendarControls = 1;
            break;
          case 3:
            progress.style.left = 0;
            button.closest('[data-calendar-controls]').dataset.calendarControls = 2;
            calendar.querySelector('[data-calendar-controls="1"]').dataset.calendarControls = 0;
            break;
        }
      });
    });
  }

  // selector

  document.querySelectorAll('[data-selector]').forEach(function (selector, i) {
    var list = selector.querySelector('.selector__list'),
        input = selector.querySelector('.selector__input');

    var count = list.children.length;

    input.value = count;

    selector.querySelectorAll('[data-value]').forEach(function (item, k) {
      item.addEventListener('click', function (e) {
        e.preventDefault();

        var value = item.dataset.value,
            selectorItem = document.createElement('li');

        count = list.children.length;

        selectorItem.classList.add('selector__item');
        selectorItem.innerHTML = '<span>' + value + '</span><button class="selector__remove"></button>';

        list.append(selectorItem);
        input.value = ++count;
      });
    });
  });

  // toggle
  document.querySelectorAll('.toggle__header').forEach(function (toggle, i) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();

      toggle.closest('.toggle').classList.toggle('toggle_open');
    });
  });

  //counter
  document.querySelectorAll('.counter').forEach(function (counter, i) {
    document.querySelectorAll('[data-counter-control]').forEach(function (button, k) {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        var counterValue = counter.querySelector('[data-counter-value]'),
            currentValue = Number(counterValue.dataset.counterValue);

        switch (Number(button.dataset.counterControl)) {
          case 0:
            if (currentValue != 0) counterValue.dataset.counterValue = --currentValue;
            break;
          case 1:
            counterValue.dataset.counterValue = ++currentValue;
            break;
        }
      });
    });
  });

  //reviews
  document.querySelectorAll('[data-limit]').forEach(function (container, i) {
    var limit = container.dataset.limit,
        list = container.querySelector('[data-limit-list]'),
        button = container.querySelector('[data-limit-disable]');

    Array.from(list.children).forEach(function (el, k) {
      if (k >= limit) el.style.display = 'none';
    });

    if (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        Array.from(list.children).forEach(function (el, k) {
          if (k >= limit) el.style.display = '';
        });

        button.remove();
      });
    }
  });

  //total click
  document.addEventListener('click', function (e) {
    var select = e.target.closest('.select_open'),
        galleryItem = e.target.closest('.gallery__item');

    if (!select && ![].concat(_toConsumableArray(e.target.classList)).includes('selector__remove') && ![].concat(_toConsumableArray(e.target.classList)).includes('datepicker--cell')) {
      document.querySelectorAll('.select_open').forEach(function (select, i) {
        select.classList.remove('select_open');
      });
    }

    if ([].concat(_toConsumableArray(e.target.classList)).includes('selector__remove')) {
      e.preventDefault();

      var input = e.target.closest('.selector').querySelector('.selector__input');

      input.value = --input.value;

      e.target.parentNode.remove();
    }

    if (!e.target.closest('.drop_show')) {
      if (!e.target.closest('[data-droping]')) {
        var show = document.querySelector('.drop_show');
        if (show) show.classList.remove('drop_show');
      }
    }

    // gallery
    if (galleryItem) {
      var gallery = galleryItem.closest('.gallery'),
          view = gallery.querySelector('.gallery__view'),
          image = galleryItem.dataset.image,
          selected = gallery.querySelector('.gallery__item_selected'),
          count = gallery.querySelector('.gallery__count');

      if (selected) selected.classList.remove('gallery__item_selected');
      galleryItem.classList.add('gallery__item_selected');
      view.querySelector('img').src = image;

      if (count) {
        count.dataset.galleryCountCurrent = Number(galleryItem.dataset.index) + 1;
      }
    }
  });

  // gallery count

  // gallery trigger
  document.querySelectorAll('.gallery').forEach(function (gallery, i) {
    var count = gallery.querySelector('.gallery__count'),
        galleryListCount = gallery.querySelector('.gallery__list').children.length;

    if (count) {
      count.dataset.galleryCountAll = galleryListCount;

      gallery.querySelector('[data-gallery-controls]').addEventListener('click', function (e) {
        var direction = Number(e.target.closest('[data-gallery-controls]').dataset.galleryControls);
        var index = gallery.querySelector('.gallery__item_selected').dataset.index;

        switch (direction) {
          case 0:
            if (index == 0) {
              index = galleryListCount - 1;
            } else {
              --index;
            }
            break;
          case 1:
            if (index == galleryListCount - 1) {
              index = 0;
            } else {
              ++index;
            }
            break;
        }

        gallery.querySelector('.gallery__item[data-index="' + index + '"]').click();
      });
    }

    gallery.querySelector('.gallery__item:first-child').click();
  });

  document.querySelectorAll('[data-gallery-contols]').forEach(function (controls, i) {
    var gallery = controls.closest('.gallery'),
        galleryList = gallery.querySelector('.gallery__list');
    controls.querySelector('[data-gallery-controls-prev]');
  });

  document.querySelectorAll('[data-modal-open]').forEach(function (trigger, i) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      var t = e.target.closest('[data-modal-open]'),
          data = t.dataset.modalOpen,
          modalElement = document.querySelector('[data-modal="' + data + '"]');

      var modalContent = modalElement.innerHTML;

      if (data == 'gallery') {
        modalContent = t.innerHTML;
      }

      var modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function onClose() {
          this.remove();
        },
        cssClass: modalElement.classList
      });

      modal.setContent(modalContent);
      modal.open();

      var forms = modal.modalBoxContent.querySelectorAll('form');

      forms.forEach(function (form, i) {
        form.querySelectorAll('select').forEach(function (select, i) {
          new CustomSelect({
            elem: select
          });
        });
      });

      try {
        document.querySelector('.modal__close').addEventListener('click', function (e) {
          e.preventDefault();
          modal.close();
        });
      } catch (e) {}
    });
  });

  //drop
  document.querySelectorAll('[data-droping]').forEach(function (drop, i) {
    drop.addEventListener('click', function (e) {
      e.preventDefault();

      var data = drop.dataset.droping,
          dropped = document.querySelector('[data-dropped="' + data + '"]');

      dropped.classList.add('drop_show');
    });
  });

  //rating
  var trip = document.querySelector('.rating_trip');

  if (trip) {
    var tripValue = Number(trip.querySelector('[data-value]').dataset.value) * 10 * 2,
        tripProgress = trip.querySelector('.rating__progress');

    tripProgress.style.width = tripValue + '%';
  }

  //Имитация загрузки
  var loading = document.querySelector('.loading');

  if (loading) {
    var valueElement = loading.querySelector('.loading__value');
    var value = 0;

    loading.classList.add('loading_process');

    var process = setInterval(function () {
      value += Math.floor(Math.random() * Math.floor(5));
      valueElement.innerHTML = value >= 100 ? 100 : value;

      if (value >= 100) {
        clearInterval(process);
        loading.classList.add('loading_finish');
        document.querySelectorAll('.loading-process').forEach(function (el, i) {
          el.classList.add('loading-process_finish');
        });
      }
    }, 100);
  }
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNsaWRlck9wdGlvbnMiLCJmcmVlU2Nyb2xsIiwiY2VsbEFsaWduIiwiY29udGFpbiIsIndyYXBBcm91bmQiLCJwYWdlRG90cyIsInByZXZOZXh0QnV0dG9ucyIsImxhenlMb2FkIiwiYWRhcHRpdmVIZWlnaHQiLCJpdGVtcyIsImF1dG9QbGF5IiwiY29udHJvbHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInByZXZpb3VzIiwibmV4dCIsInJlbW92ZSIsImVsIiwiY29udGFpbmVyIiwiY2xvc2VzdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRleHQiLCJ0IiwidGFnTmFtZSIsInNwYW4iLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJrIiwiaW5kZXgiLCJzaG93aW5nIiwic2VsZWN0ZWQiLCJhZGQiLCJjbGljayIsInNlbGVjdCIsIkN1c3RvbVNlbGVjdCIsImVsZW0iLCJpbmNsdWRlcyIsImNhbGVuZGFyIiwibW9udGhzIiwibW9udGhzTGlzdCIsIm1vbnRoIiwibm93IiwiRGF0ZSIsImRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiY3VzdG9tT3B0aW9ucyIsInJhbmdlRnJvbSIsInJhbmdlVG8iLCJkYXRlcGlja2VyIiwiJCIsInN0YXJ0RGF0ZSIsInNlbGVjdE90aGVyTW9udGhzIiwia2V5Ym9hcmROYXYiLCJtdWx0aXBsZURhdGVzU2VwYXJhdG9yIiwibmF2VGl0bGVzIiwiZGF5cyIsInllYXJzIiwib25SZW5kZXJDZWxsIiwiY2VsbFR5cGUiLCJ5IiwibSIsImQiLCJnZXREYXRlIiwiZGF5IiwiZ2V0RGF5IiwiZnJvbSIsInRvIiwiZnJvbUNlbGwiLCJ0b0NlbGwiLCJyYW5nZUNlbGxzIiwiY2VsbCIsImdldFRpbWUiLCJjbGFzc2VzIiwib25TZWxlY3QiLCJmb3JtYXR0ZWREYXRlIiwiaW5zdCIsInRpbWVTdGFtcCIsInJlbW92ZUF0dHJpYnV0ZSIsImJ1dHRvbiIsImRpcmVjdGlvbiIsIk51bWJlciIsImNhbGVuZGFyQ29udHJvbHMiLCJjdXJyZW50RGF0ZSIsInByZXYiLCJtb250aEluZGV4IiwibW9udGhMb2NhbGUiLCJsb2MiLCJtb250aHNTaG9ydCIsInVuZGVmaW5lZCIsInJhbmdlT3B0aW9ucyIsImNsZWFyIiwidXBkYXRlIiwicHJvZ3Jlc3MiLCJtb250aHNJdGVtcyIsIm1vbnRoV2lkdGgiLCJwcm9ncmVzc0xlZnQiLCJzdHlsZSIsImxlZnQiLCJwYXJzZUludCIsInByb2dyZXNzRW5kIiwic2VsZWN0b3IiLCJsaXN0IiwiaW5wdXQiLCJjb3VudCIsInZhbHVlIiwiaXRlbSIsInNlbGVjdG9ySXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJhcHBlbmQiLCJjb3VudGVyIiwiY291bnRlclZhbHVlIiwiY3VycmVudFZhbHVlIiwiY291bnRlckNvbnRyb2wiLCJsaW1pdCIsIkFycmF5IiwiZGlzcGxheSIsInRhcmdldCIsImdhbGxlcnlJdGVtIiwicGFyZW50Tm9kZSIsInNob3ciLCJnYWxsZXJ5IiwidmlldyIsImltYWdlIiwic3JjIiwiZ2FsbGVyeUNvdW50Q3VycmVudCIsImdhbGxlcnlMaXN0Q291bnQiLCJnYWxsZXJ5Q291bnRBbGwiLCJnYWxsZXJ5Q29udHJvbHMiLCJnYWxsZXJ5TGlzdCIsInRyaWdnZXIiLCJtb2RhbE9wZW4iLCJtb2RhbEVsZW1lbnQiLCJtb2RhbENvbnRlbnQiLCJtb2RhbCIsInRpbmdsZSIsImNsb3NlTWV0aG9kcyIsIm9uQ2xvc2UiLCJjc3NDbGFzcyIsInNldENvbnRlbnQiLCJvcGVuIiwiZm9ybXMiLCJtb2RhbEJveENvbnRlbnQiLCJmb3JtIiwiY2xvc2UiLCJkcm9wIiwiZHJvcGluZyIsImRyb3BwZWQiLCJ0cmlwIiwidHJpcFZhbHVlIiwidHJpcFByb2dyZXNzIiwid2lkdGgiLCJsb2FkaW5nIiwidmFsdWVFbGVtZW50IiwicHJvY2VzcyIsInNldEludGVydmFsIiwiZmxvb3IiLCJyYW5kb20iLCJjbGVhckludGVydmFsIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxJQUFULEVBQWU7O0FBRWQ7QUFDQUM7O0FBRUEsTUFBTUMsZ0JBQWdCO0FBQ3BCLGNBQVU7QUFDUkMsa0JBQVksS0FESjtBQUVSQyxpQkFBVyxNQUZIO0FBR1JDLGVBQVMsSUFIRDtBQUlSQyxrQkFBWSxJQUpKO0FBS1JDLGdCQUFVLElBTEY7QUFNUkMsdUJBQWlCLEtBTlQ7QUFPUkMsZ0JBQVU7QUFQRixLQURVO0FBVXBCLFlBQVE7QUFDTk4sa0JBQVksS0FETjtBQUVOQyxpQkFBVyxNQUZMO0FBR05DLGVBQVMsSUFISDtBQUlOQyxrQkFBWSxJQUpOO0FBS05DLGdCQUFVLEtBTEo7QUFNTkMsdUJBQWlCLEtBTlg7QUFPTkUsc0JBQWdCO0FBUFYsS0FWWTtBQW1CcEIsaUJBQWE7QUFDWEMsYUFBTyxDQURJO0FBRVhSLGtCQUFZLEtBRkQ7QUFHWEMsaUJBQVcsTUFIQTtBQUlYQyxlQUFTLElBSkU7QUFLWEMsa0JBQVksSUFMRDtBQU1YQyxnQkFBVSxLQU5DO0FBT1hDLHVCQUFpQixLQVBOO0FBUVhFLHNCQUFnQjtBQVJMLEtBbkJPO0FBNkJwQixlQUFXO0FBQ1RFLGdCQUFVLElBREQ7QUFFVFAsZUFBUyxJQUZBO0FBR1RDLGtCQUFZLElBSEg7QUFJVE8sZ0JBQVUsS0FKRDtBQUtUTCx1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QUFpQixHQUFqQixHQUF1QkEsS0FBaEQ7O0FBRUEsVUFBSUEsU0FBUyxHQUFiLEVBQWtCO0FBQ2hCc0Qsc0JBQWNKLE9BQWQ7QUFDQUYsZ0JBQVExSSxTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0E5QyxpQkFBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDQyxPQUE5QyxDQUFzRCxVQUFDeUIsRUFBRCxFQUFLdkIsQ0FBTCxFQUFXO0FBQy9EdUIsYUFBR0csU0FBSCxDQUFhZ0IsR0FBYixDQUFpQix3QkFBakI7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQVhhLEVBV1gsR0FYVyxDQUFkO0FBWUQ7QUFFRixDQS9sQkQsRUErbEJHaUksTUEvbEJIIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihyb290KSB7XG5cbiAgLy8gc3ZnIGZvciBhbGxcbiAgc3ZnNGV2ZXJ5Ym9keSgpO1xuXG4gIGNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgJ2Jhbm5lcic6IHtcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIHBhZ2VEb3RzOiB0cnVlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGxhenlMb2FkOiB0cnVlXG4gICAgfSxcbiAgICAnZnVsbCc6IHtcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIHBhZ2VEb3RzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ3NpeC1pdGVtcyc6IHtcbiAgICAgIGl0ZW1zOiA2LFxuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAncmV2aWV3cyc6IHtcbiAgICAgIGF1dG9QbGF5OiAzMDAwLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdnYWxsZXJ5Jzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVXaWR0aCA9IHNsaWRlcy5jaGlsZHJlblswXS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZXNDYXBhY2l0eSA9IE1hdGgucm91bmQoc2xpZGVyV2lkdGgvc2xpZGVXaWR0aCksXG4gICAgICAgICAgY29udHJvbHMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIGNvbnRyb2xzUHJldiA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1wcmV2XScpLFxuICAgICAgICAgIGNvbnRyb2xzTmV4dCA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1uZXh0XScpXG5cbiAgICBpZiAoc2xpZGVzQ291bnQgPiBzbGlkZXNDYXBhY2l0eSkge1xuICAgICAgY29uc3QgZmxrdHkgPSBuZXcgRmxpY2tpdHkoc2xpZGVzLCBzbGlkZXJPcHRpb25zW3NsaWRlci5kYXRhc2V0LnNsaWRlcl0pO1xuXG4gICAgICBjb250cm9sc1ByZXZcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBmbGt0eS5wcmV2aW91cygpXG4gICAgICAgIH0pXG5cbiAgICAgIGNvbnRyb2xzTmV4dFxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGZsa3R5Lm5leHQoKVxuICAgICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRyb2xzLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgaWYgKHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXS5jb250cm9scyA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnRyb2xzLnJlbW92ZSgpXG4gICAgfVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vcmVdJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgY29udGFpbmVyID0gZWwuY2xvc2VzdCgnW2RhdGEtbW9yZS1hY3Rpb25dJylcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vcmUnKVxuXG4gICAgfSlcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGVdJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQudG9nZ2xlXG4gICAgICBsZXQgdCA9IGVsXG5cbiAgICAgIGlmICh0LnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcbiAgICAgICAgY29uc3Qgc3BhbiA9IHQucXVlcnlTZWxlY3Rvcignc3BhbicpXG4gICAgICAgIHQuZGF0YXNldC50b2dnbGUgPSB0LnRleHRDb250ZW50LnRyaW0oKVxuICAgICAgICB0ID0gc3BhblxuICAgICAgfVxuXG4gICAgICB0LnRleHRDb250ZW50ID0gdGV4dFxuICAgIH0pXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFic10nKS5mb3JFYWNoKCh0YWJzLCBpKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHRhYnMuZGF0YXNldC50YWJzLFxuICAgICAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YWJzLWNvbnRlbnQ9JHtkYXRhfV1gKVxuXG4gICAgdGFicy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJykuZm9yRWFjaCgodGFiLCBrKSA9PiB7XG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBjb25zdCBpbmRleCA9IHRhYi5kYXRhc2V0LnRhYixcbiAgICAgICAgICAgICAgc2hvd2luZyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcignLnNob3dpbmcnKSxcbiAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0YWJzLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpXG5cbiAgICAgICAgaWYgKHNob3dpbmcpIHNob3dpbmcuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd2luZycpXG4gICAgICAgIGlmIChzZWxlY3RlZCkgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuXG4gICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIGNvbnRlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPVwiJHtpbmRleH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzaG93aW5nJylcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRhYnMucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiXScpLmNsaWNrKClcbiAgfSlcblxuICAvLyBzZWxlY3RcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgbmV3IEN1c3RvbVNlbGVjdCh7XG4gICAgICBlbGVtOiBzZWxlY3RcbiAgICB9KTtcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wXScpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuXG4gICAgc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5qcy1Ecm9wZG93bi10aXRsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBpZiAoWy4uLnNlbGVjdC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rfb3BlbicpKSB7XG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X29wZW4nKS5mb3JFYWNoKChzZWxlY3QsIGspID0+IHtcbiAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgICB9KVxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZCgnc2VsZWN0X29wZW4nKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gZGF0ZXBpY2tlcnNcbiAgY29uc3QgY2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXInKVxuXG4gIGlmIChjYWxlbmRhcikge1xuICAgIGNvbnN0IG1vbnRocyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxlbmRhcl9faXRlbSAubW9udGgnKSxcbiAgICAgICAgICBjb250cm9scyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIG1vbnRoc0xpc3QgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1saXN0JykuY2hpbGRyZW5cblxuICAgIG1vbnRocy5mb3JFYWNoKChtb250aCwgaSkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCkraSk7XG5cbiAgICAgIGxldCBjdXN0b21PcHRpb25zID0ge1xuICAgICAgICByYW5nZUZyb206IG51bGwsXG4gICAgICAgIHJhbmdlVG86IG51bGwsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSAkKG1vbnRoKS5kYXRlcGlja2VyKHtcbiAgICAgICAgc3RhcnREYXRlOiBkYXRlLFxuICAgICAgICBzZWxlY3RPdGhlck1vbnRoczogITEsXG4gICAgICAgIGtleWJvYXJkTmF2OiAhMSxcbiAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJycsXG4gICAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgICAgZGF5czogJ01NJyxcbiAgICAgICAgICAgIG1vbnRoczogJ3l5eXknLFxuICAgICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVuZGVyQ2VsbChkYXRlLCBjZWxsVHlwZSkge1xuICAgICAgICAgIGNvbnN0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBmcm9tID0gY2FsZW5kYXIuZGF0YXNldC5mcm9tLFxuICAgICAgICAgICAgICAgIHRvID0gY2FsZW5kYXIuZGF0YXNldC50byxcbiAgICAgICAgICAgICAgICBmcm9tQ2VsbCA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3IoJy4tcmFuZ2UtZnJvbS0nKSxcbiAgICAgICAgICAgICAgICB0b0NlbGwgPSBtb250aC5xdWVyeVNlbGVjdG9yKCcuLXJhbmdlLXRvLScpLFxuICAgICAgICAgICAgICAgIHJhbmdlQ2VsbHMgPSBtb250aC5xdWVyeVNlbGVjdG9yQWxsKCcuLWluLXJhbmdlLScpXG5cbiAgICAgICAgICAgIGlmIChmcm9tQ2VsbCkge1xuICAgICAgICAgICAgICBmcm9tQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctcmFuZ2UtZnJvbS0nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9DZWxsKSB7XG4gICAgICAgICAgICAgIHRvQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctcmFuZ2UtdG8tJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmFuZ2VDZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnLWluLXJhbmdlLScpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gZnJvbSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctcmFuZ2UtZnJvbS0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gdG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiAnLXJhbmdlLXRvLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+IGZyb20gJiYgZGF0ZS5nZXRUaW1lKCkgPCB0bykge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBvblNlbGVjdChmb3JtYXR0ZWREYXRlLCBkYXRlLCBpbnN0KSB7XG4gICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERheSgpXG5cbiAgICAgICAgICBsZXQgZnJvbSA9IGNhbGVuZGFyLmRhdGFzZXQuZnJvbSxcbiAgICAgICAgICAgICAgdG8gPSBjYWxlbmRhci5kYXRhc2V0LnRvLFxuICAgICAgICAgICAgICB0aW1lU3RhbXAgPSBkYXRlLmdldFRpbWUoKVxuXG4gICAgICAgICAgaWYgKGZyb20gJiYgIXRvKSB7XG4gICAgICAgICAgICBpZiAoZnJvbSA+IHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LnRvID0gZnJvbVxuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LmZyb20gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQudG8gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC5mcm9tID0gdGltZVN0YW1wXG4gICAgICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG8nKVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9KS5kYXRhKCdkYXRlcGlja2VyJylcblxuICAgICAgY29udHJvbHMuZm9yRWFjaCgoYnV0dG9uLCBpKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyksXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUgPSBkYXRlcGlja2VyLmN1cnJlbnREYXRlXG4gICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRlID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKS0zKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLnByZXYoKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLm5leHQoKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLmRhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpKzMpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICBsZXQgbW9udGhJbmRleCA9IGRhdGVwaWNrZXIuY3VycmVudERhdGUuZ2V0TW9udGgoKVxuICAgICAgICBjb25zdCBtb250aExvY2FsZSA9IGRhdGVwaWNrZXIubG9jLm1vbnRoc1Nob3J0XG5cbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMjsgaysrKSB7XG4gICAgICAgICAgaWYgKG1vbnRoTG9jYWxlW21vbnRoSW5kZXhdID09IHVuZGVmaW5lZCkgbW9udGhJbmRleCA9IDBcbiAgICAgICAgICBtb250aHNMaXN0W2tdLnRleHRDb250ZW50ID0gbW9udGhMb2NhbGVbbW9udGhJbmRleF1cbiAgICAgICAgICArK21vbnRoSW5kZXhcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkYXRlcGlja2VyLnJhbmdlT3B0aW9ucyA9IGN1c3RvbU9wdGlvbnNcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY2xlYXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY2FsZW5kYXIucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZyb20nKVxuICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG8nKVxuICAgICAgICBkYXRlcGlja2VyLmNsZWFyKClcbiAgICAgIH0pXG5cbiAgICAgIGNhbGVuZGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGF0ZXBpY2tlci51cGRhdGUoKVxuICAgICAgfSlcblxuICAgIH0pXG5cbiAgICBjb250cm9scy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX3Byb2dyZXNzJyksXG4gICAgICAgICAgICAgIG1vbnRoc0l0ZW1zID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19tb250aHMtbGlzdCcpLmNoaWxkcmVuLmxlbmd0aCAtIDMsXG4gICAgICAgICAgICAgIG1vbnRoV2lkdGggPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1pdGVtJykub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgIHByb2dyZXNzTGVmdCA9IChwcm9ncmVzcy5zdHlsZS5sZWZ0ID09ICcnKSA/IDAgOiBwYXJzZUludChwcm9ncmVzcy5zdHlsZS5sZWZ0KSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFbmQgPSBtb250aFdpZHRoICogbW9udGhzSXRlbXNcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSBwcm9ncmVzc0VuZCArICdweCdcbiAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAxXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjJcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc0xlZnQgPT0gbW9udGhXaWR0aCkge1xuICAgICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChwcm9ncmVzc0xlZnQgLSBtb250aFdpZHRoKSArICdweCdcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiM1wiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgaWYgKHByb2dyZXNzTGVmdCA9PSBwcm9ncmVzc0VuZCAtIG1vbnRoV2lkdGgpIHtcbiAgICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAocHJvZ3Jlc3NMZWZ0ICsgbW9udGhXaWR0aCkgKyAncHgnXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjBcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAxXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAwXG4gICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMlxuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIxXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cblxuICAvLyBzZWxlY3RvclxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdG9yXScpLmZvckVhY2goKHNlbGVjdG9yLCBpKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IHNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rvcl9fbGlzdCcpLFxuICAgICAgICAgIGlucHV0ID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19pbnB1dCcpXG5cbiAgICBsZXQgY291bnQgPSBsaXN0LmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgaW5wdXQudmFsdWUgPSBjb3VudFxuXG4gICAgc2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmFsdWVdJykuZm9yRWFjaCgoaXRlbSwgaykgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlLFxuICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgY291bnQgPSBsaXN0LmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgICAgIHNlbGVjdG9ySXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rvcl9faXRlbScpXG4gICAgICAgIHNlbGVjdG9ySXRlbS5pbm5lckhUTUwgPSBgPHNwYW4+JHt2YWx1ZX08L3NwYW4+PGJ1dHRvbiBjbGFzcz1cInNlbGVjdG9yX19yZW1vdmVcIj48L2J1dHRvbj5gXG5cbiAgICAgICAgbGlzdC5hcHBlbmQoc2VsZWN0b3JJdGVtKVxuICAgICAgICBpbnB1dC52YWx1ZSA9ICsrY291bnRcbiAgICAgIH0pXG5cbiAgICB9KVxuXG5cbiAgfSlcblxuICAvLyB0b2dnbGVcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZ2dsZV9faGVhZGVyJykuZm9yRWFjaCgodG9nZ2xlLCBpKSA9PiB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICB0b2dnbGUuY2xvc2VzdCgnLnRvZ2dsZScpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZV9vcGVuJylcbiAgICB9KVxuICB9KVxuXG4gIC8vY291bnRlclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY291bnRlcicpLmZvckVhY2goKGNvdW50ZXIsIGkpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb3VudGVyLWNvbnRyb2xdJykuZm9yRWFjaCgoYnV0dG9uLCBrKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBsZXQgY291bnRlclZhbHVlID0gY291bnRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyLXZhbHVlXScpLFxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gTnVtYmVyKGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSlcblxuICAgICAgICBzd2l0Y2ggKE51bWJlcihidXR0b24uZGF0YXNldC5jb3VudGVyQ29udHJvbCkpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9IDApIGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSA9IC0tY3VycmVudFZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSA9ICsrY3VycmVudFZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICAvL3Jldmlld3NcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbGltaXRdJykuZm9yRWFjaCgoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBjb250YWluZXIuZGF0YXNldC5saW1pdCxcbiAgICAgICAgICBsaXN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpbWl0LWxpc3RdJyksXG4gICAgICAgICAgYnV0dG9uID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpbWl0LWRpc2FibGVdJylcblxuXG4gICAgQXJyYXkuZnJvbShsaXN0LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgaWYgKGsgPj0gbGltaXQpIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9KVxuXG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgQXJyYXkuZnJvbShsaXN0LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICAgIGlmIChrID49IGxpbWl0KSBlbC5zdHlsZS5kaXNwbGF5ID0gJydcbiAgICAgICAgfSlcblxuICAgICAgICBidXR0b24ucmVtb3ZlKClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIC8vdG90YWwgY2xpY2tcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3Rfb3BlbicpLFxuICAgICAgICAgIGdhbGxlcnlJdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnLmdhbGxlcnlfX2l0ZW0nKVxuXG4gICAgaWYgKCFzZWxlY3QgJiYgIVsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rvcl9fcmVtb3ZlJykgJiYgIVsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdkYXRlcGlja2VyLS1jZWxsJykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rfb3BlbicpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdG9yX19yZW1vdmUnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGlucHV0ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdG9yJykucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19pbnB1dCcpXG5cbiAgICAgIGlucHV0LnZhbHVlID0gLS1pbnB1dC52YWx1ZVxuXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuZHJvcF9zaG93JykpIHtcbiAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZHJvcGluZ10nKSkge1xuICAgICAgICBjb25zdCBzaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bfc2hvdycpXG4gICAgICAgIGlmKHNob3cpIHNob3cuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcF9zaG93JylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnYWxsZXJ5XG4gICAgaWYgKGdhbGxlcnlJdGVtKSB7XG4gICAgICBjb25zdCBnYWxsZXJ5ID0gZ2FsbGVyeUl0ZW0uY2xvc2VzdCgnLmdhbGxlcnknKSxcbiAgICAgICAgICAgIHZpZXcgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X192aWV3JyksXG4gICAgICAgICAgICBpbWFnZSA9IGdhbGxlcnlJdGVtLmRhdGFzZXQuaW1hZ2UsXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgIGNvdW50ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fY291bnQnKVxuXG4gICAgICBpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKVxuICAgICAgZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICB2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IGltYWdlXG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBjb3VudC5kYXRhc2V0LmdhbGxlcnlDb3VudEN1cnJlbnQgPSBOdW1iZXIoZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbmRleCkrMVxuICAgICAgfVxuICAgIH1cblxuICB9KVxuXG4gIC8vIGdhbGxlcnkgY291bnRcblxuICAvLyBnYWxsZXJ5IHRyaWdnZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKS5mb3JFYWNoKChnYWxsZXJ5LCBpKSA9PiB7XG4gICAgY29uc3QgY291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19jb3VudCcpLFxuICAgICAgICAgIGdhbGxlcnlMaXN0Q291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19saXN0JykuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGNvdW50LmRhdGFzZXQuZ2FsbGVyeUNvdW50QWxsID0gZ2FsbGVyeUxpc3RDb3VudFxuXG4gICAgICBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWdhbGxlcnktY29udHJvbHNdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5kYXRhc2V0LmdhbGxlcnlDb250cm9scylcbiAgICAgICAgbGV0IGluZGV4ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpLmRhdGFzZXQuaW5kZXhcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gZ2FsbGVyeUxpc3RDb3VudCAtIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC0taW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBnYWxsZXJ5TGlzdENvdW50IC0gMSkge1xuICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICsraW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKGAuZ2FsbGVyeV9faXRlbVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKS5jbGljaygpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW06Zmlyc3QtY2hpbGQnKS5jbGljaygpXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ2FsbGVyeS1jb250b2xzXScpLmZvckVhY2goKGNvbnRyb2xzLCBpKSA9PiB7XG4gICAgY29uc3QgZ2FsbGVyeSA9IGNvbnRyb2xzLmNsb3Nlc3QoJy5nYWxsZXJ5JyksXG4gICAgICAgICAgZ2FsbGVyeUxpc3QgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19saXN0JylcbiAgICBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzLXByZXZdJylcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1vcGVuXScpLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHtcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCB0ID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtbW9kYWwtb3Blbl0nKSxcbiAgICAgICAgICAgIGRhdGEgPSB0LmRhdGFzZXQubW9kYWxPcGVuLFxuICAgICAgICAgICAgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYClcblxuICAgICAgbGV0IG1vZGFsQ29udGVudCA9IG1vZGFsRWxlbWVudC5pbm5lckhUTUxcblxuICAgICAgaWYgKGRhdGEgPT0gJ2dhbGxlcnknKSB7XG4gICAgICAgIG1vZGFsQ29udGVudCA9IHQuaW5uZXJIVE1MXG4gICAgICB9XG5cbiAgICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgICB9LFxuICAgICAgICBjc3NDbGFzczogbW9kYWxFbGVtZW50LmNsYXNzTGlzdFxuICAgICAgfSk7XG5cbiAgICAgIG1vZGFsLnNldENvbnRlbnQobW9kYWxDb250ZW50KVxuICAgICAgbW9kYWwub3BlbigpXG5cbiAgICAgIGNvbnN0IGZvcm1zID0gbW9kYWwubW9kYWxCb3hDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKVxuXG4gICAgICBmb3Jtcy5mb3JFYWNoKChmb3JtLCBpKSA9PiB7XG4gICAgICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgICAgICAgbmV3IEN1c3RvbVNlbGVjdCh7XG4gICAgICAgICAgICBlbGVtOiBzZWxlY3RcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBtb2RhbC5jbG9zZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vZHJvcFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9waW5nXScpLmZvckVhY2goKGRyb3AsIGkpID0+IHtcbiAgICBkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBkYXRhID0gZHJvcC5kYXRhc2V0LmRyb3BpbmcsXG4gICAgICAgICAgICBkcm9wcGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcHBlZD1cIiR7ZGF0YX1cIl1gKVxuXG4gICAgICBkcm9wcGVkLmNsYXNzTGlzdC5hZGQoJ2Ryb3Bfc2hvdycpXG4gICAgfSlcbiAgfSlcblxuICAvL3JhdGluZ1xuICBjb25zdCB0cmlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGluZ190cmlwJylcblxuICBpZiAodHJpcCkge1xuICAgIGNvbnN0IHRyaXBWYWx1ZSA9IChOdW1iZXIodHJpcC5xdWVyeVNlbGVjdG9yKCdbZGF0YS12YWx1ZV0nKS5kYXRhc2V0LnZhbHVlKSAqIDEwKSAqIDIsXG4gICAgICAgICAgdHJpcFByb2dyZXNzID0gdHJpcC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nX19wcm9ncmVzcycpXG5cbiAgICB0cmlwUHJvZ3Jlc3Muc3R5bGUud2lkdGggPSBgJHt0cmlwVmFsdWV9JWBcbiAgfVxuXG4gIC8v0JjQvNC40YLQsNGG0LjRjyDQt9Cw0LPRgNGD0LfQutC4XG4gIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZycpO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgY29uc3QgdmFsdWVFbGVtZW50ID0gbG9hZGluZy5xdWVyeVNlbGVjdG9yKCcubG9hZGluZ19fdmFsdWUnKTtcbiAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nX3Byb2Nlc3MnKVxuXG4gICAgbGV0IHByb2Nlc3MgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB2YWx1ZSArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDUpKVxuICAgICAgdmFsdWVFbGVtZW50LmlubmVySFRNTCA9ICh2YWx1ZSA+PSAxMDApID8gMTAwIDogdmFsdWVcblxuICAgICAgaWYgKHZhbHVlID49IDEwMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHByb2Nlc3MpXG4gICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgnbG9hZGluZ19maW5pc2gnKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9hZGluZy1wcm9jZXNzJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nLXByb2Nlc3NfZmluaXNoJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCAxMDApXG4gIH1cblxufSkod2luZG93KTtcbiJdfQ==
