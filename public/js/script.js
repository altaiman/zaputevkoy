'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (root) {

  // svg for all
  svg4everybody();

  function phoneMask() {
    document.querySelectorAll('input[type="tel"]').forEach(function (input, k) {
      input.addEventListener('input', function (e) {
        var v = input.value.replace('+7', '').trim();
        input.value = VMasker.toPattern(v, { pattern: "+7 (999) 999-99-99" });
      });
    });
  }

  phoneMask();

  // slider options
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

      phoneMask();

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

  document.querySelectorAll('[data-image]').forEach(function (image, i) {
    image.addEventListener('click', function (e) {
      e.preventDefault();

      var src = image.dataset.image,
          img = document.createElement('img');

      img.src = src;

      var modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function onClose() {
          this.remove();
        },
        cssClass: ['modal', 'modal_gallery']
      });

      modal.setContent(img);
      modal.open();
    });
  });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInBob25lTWFzayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsImsiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0cmltIiwiVk1hc2tlciIsInRvUGF0dGVybiIsInBhdHRlcm4iLCJzbGlkZXJPcHRpb25zIiwiZnJlZVNjcm9sbCIsImNlbGxBbGlnbiIsImNvbnRhaW4iLCJ3cmFwQXJvdW5kIiwicGFnZURvdHMiLCJwcmV2TmV4dEJ1dHRvbnMiLCJsYXp5TG9hZCIsImFkYXB0aXZlSGVpZ2h0IiwiaXRlbXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJyZW1vdmUiLCJlbCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0IiwidCIsInRhZ05hbWUiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJpbmRleCIsInNob3dpbmciLCJzZWxlY3RlZCIsImFkZCIsImNsaWNrIiwic2VsZWN0IiwiQ3VzdG9tU2VsZWN0IiwiZWxlbSIsImluY2x1ZGVzIiwiY2FsZW5kYXIiLCJtb250aHMiLCJtb250aHNMaXN0IiwibW9udGgiLCJub3ciLCJEYXRlIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJjdXN0b21PcHRpb25zIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImRhdGVwaWNrZXIiLCIkIiwic3RhcnREYXRlIiwic2VsZWN0T3RoZXJNb250aHMiLCJrZXlib2FyZE5hdiIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJuYXZUaXRsZXMiLCJkYXlzIiwieWVhcnMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsInkiLCJtIiwiZCIsImdldERhdGUiLCJkYXkiLCJnZXREYXkiLCJmcm9tIiwidG8iLCJmcm9tQ2VsbCIsInRvQ2VsbCIsInJhbmdlQ2VsbHMiLCJjZWxsIiwiZ2V0VGltZSIsImNsYXNzZXMiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJpbnN0IiwidGltZVN0YW1wIiwicmVtb3ZlQXR0cmlidXRlIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwiTnVtYmVyIiwiY2FsZW5kYXJDb250cm9scyIsImN1cnJlbnREYXRlIiwicHJldiIsIm1vbnRoSW5kZXgiLCJtb250aExvY2FsZSIsImxvYyIsIm1vbnRoc1Nob3J0IiwidW5kZWZpbmVkIiwicmFuZ2VPcHRpb25zIiwiY2xlYXIiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsIm1vbnRoc0l0ZW1zIiwibW9udGhXaWR0aCIsInByb2dyZXNzTGVmdCIsInN0eWxlIiwibGVmdCIsInBhcnNlSW50IiwicHJvZ3Jlc3NFbmQiLCJzZWxlY3RvciIsImxpc3QiLCJjb3VudCIsIml0ZW0iLCJzZWxlY3Rvckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiY291bnRlciIsImNvdW50ZXJWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsImNvdW50ZXJDb250cm9sIiwibGltaXQiLCJBcnJheSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJnYWxsZXJ5SXRlbSIsInBhcmVudE5vZGUiLCJzaG93IiwiZ2FsbGVyeSIsInZpZXciLCJpbWFnZSIsInNyYyIsImdhbGxlcnlDb3VudEN1cnJlbnQiLCJnYWxsZXJ5TGlzdENvdW50IiwiZ2FsbGVyeUNvdW50QWxsIiwiZ2FsbGVyeUNvbnRyb2xzIiwiZ2FsbGVyeUxpc3QiLCJ0cmlnZ2VyIiwibW9kYWxPcGVuIiwibW9kYWxFbGVtZW50IiwibW9kYWxDb250ZW50IiwibW9kYWwiLCJ0aW5nbGUiLCJjbG9zZU1ldGhvZHMiLCJvbkNsb3NlIiwiY3NzQ2xhc3MiLCJzZXRDb250ZW50Iiwib3BlbiIsImZvcm1zIiwibW9kYWxCb3hDb250ZW50IiwiZm9ybSIsImNsb3NlIiwiZHJvcCIsImRyb3BpbmciLCJkcm9wcGVkIiwidHJpcCIsInRyaXBWYWx1ZSIsInRyaXBQcm9ncmVzcyIsIndpZHRoIiwiaW1nIiwibG9hZGluZyIsInZhbHVlRWxlbWVudCIsInByb2Nlc3MiLCJzZXRJbnRlcnZhbCIsImZsb29yIiwicmFuZG9tIiwiY2xlYXJJbnRlcnZhbCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsSUFBVCxFQUFlOztBQUVkO0FBQ0FDOztBQUVBLFdBQVNDLFNBQVQsR0FBcUI7QUFDbkJDLGFBQVNDLGdCQUFULENBQTBCLG1CQUExQixFQUErQ0MsT0FBL0MsQ0FBdUQsVUFBQ0MsS0FBRCxFQUFRQyxDQUFSLEVBQWM7QUFDbkVELFlBQU1FLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUNDLENBQUQsRUFBTztBQUNyQyxZQUFJQyxJQUFJSixNQUFNSyxLQUFOLENBQVlDLE9BQVosQ0FBb0IsSUFBcEIsRUFBMEIsRUFBMUIsRUFBOEJDLElBQTlCLEVBQVI7QUFDQVAsY0FBTUssS0FBTixHQUFjRyxRQUFRQyxTQUFSLENBQWtCTCxDQUFsQixFQUFxQixFQUFDTSxTQUFTLG9CQUFWLEVBQXJCLENBQWQ7QUFDRCxPQUhEO0FBSUQsS0FMRDtBQU1EOztBQUVEZDs7QUFFQTtBQUNBLE1BQU1lLGdCQUFnQjtBQUNwQixjQUFVO0FBQ1JDLGtCQUFZLEtBREo7QUFFUkMsaUJBQVcsTUFGSDtBQUdSQyxlQUFTLElBSEQ7QUFJUkMsa0JBQVksSUFKSjtBQUtSQyxnQkFBVSxJQUxG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S0FBTCxDQUFXekosS0FBSzBKLE1BQUwsS0FBZ0IxSixLQUFLeUosS0FBTCxDQUFXLENBQVgsQ0FBM0IsQ0FBVDtBQUNBSCxtQkFBYTlDLFNBQWIsR0FBMEJySSxTQUFTLEdBQVYsR0FBaUIsR0FBakIsR0FBdUJBLEtBQWhEOztBQUVBLFVBQUlBLFNBQVMsR0FBYixFQUFrQjtBQUNoQndMLHNCQUFjSixPQUFkO0FBQ0FGLGdCQUFRdkksU0FBUixDQUFrQmMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FqRSxpQkFBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDQyxPQUE5QyxDQUFzRCxVQUFDOEMsRUFBRCxFQUFLckIsQ0FBTCxFQUFXO0FBQy9EcUIsYUFBR0csU0FBSCxDQUFhYyxHQUFiLENBQWlCLHdCQUFqQjtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBWGEsRUFXWCxHQVhXLENBQWQ7QUFZRDtBQUVGLENBcG9CRCxFQW9vQkdnSSxNQXBvQkgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KCk7XG5cbiAgZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKS5mb3JFYWNoKChpbnB1dCwgaykgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBsZXQgdiA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJys3JywgJycpLnRyaW0oKVxuICAgICAgICBpbnB1dC52YWx1ZSA9IFZNYXNrZXIudG9QYXR0ZXJuKHYsIHtwYXR0ZXJuOiBcIis3ICg5OTkpIDk5OS05OS05OVwifSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHBob25lTWFzaygpXG5cbiAgLy8gc2xpZGVyIG9wdGlvbnNcbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnYmFubmVyJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IHRydWUsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgbGF6eUxvYWQ6IHRydWVcbiAgICB9LFxuICAgICdmdWxsJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAnc2l4LWl0ZW1zJzoge1xuICAgICAgaXRlbXM6IDYsXG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdyZXZpZXdzJzoge1xuICAgICAgYXV0b1BsYXk6IDMwMDAsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ2dhbGxlcnknOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJylcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXSk7XG5cbiAgICAgIGNvbnRyb2xzUHJldlxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGZsa3R5LnByZXZpb3VzKClcbiAgICAgICAgfSlcblxuICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoc2xpZGVyT3B0aW9uc1tzbGlkZXIuZGF0YXNldC5zbGlkZXJdLmNvbnRyb2xzID09PSBmYWxzZSkge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9yZV0nKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBjb250YWluZXIgPSBlbC5jbG9zZXN0KCdbZGF0YS1tb3JlLWFjdGlvbl0nKVxuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9yZScpXG5cbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZV0nKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC50b2dnbGVcbiAgICAgIGxldCB0ID0gZWxcblxuICAgICAgaWYgKHQudGFnTmFtZSA9PSAnQlVUVE9OJykge1xuICAgICAgICBjb25zdCBzcGFuID0gdC5xdWVyeVNlbGVjdG9yKCdzcGFuJylcbiAgICAgICAgdC5kYXRhc2V0LnRvZ2dsZSA9IHQudGV4dENvbnRlbnQudHJpbSgpXG4gICAgICAgIHQgPSBzcGFuXG4gICAgICB9XG5cbiAgICAgIHQudGV4dENvbnRlbnQgPSB0ZXh0XG4gICAgfSlcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzXScpLmZvckVhY2goKHRhYnMsIGkpID0+IHtcbiAgICBjb25zdCBkYXRhID0gdGFicy5kYXRhc2V0LnRhYnMsXG4gICAgICAgICAgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYnMtY29udGVudD0ke2RhdGF9XWApXG5cbiAgICB0YWJzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKS5mb3JFYWNoKCh0YWIsIGspID0+IHtcbiAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFiLmRhdGFzZXQudGFiLFxuICAgICAgICAgICAgICBzaG93aW5nID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCcuc2hvd2luZycpLFxuICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRhYnMucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJylcblxuICAgICAgICBpZiAoc2hvd2luZykgc2hvd2luZy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93aW5nJylcbiAgICAgICAgaWYgKHNlbGVjdGVkKSBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG5cbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgY29udGVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YWI9XCIke2luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ3Nob3dpbmcnKVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGFicy5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWJdJykuY2xpY2soKVxuICB9KVxuXG4gIC8vIHNlbGVjdFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcbiAgICBuZXcgQ3VzdG9tU2VsZWN0KHtcbiAgICAgIGVsZW06IHNlbGVjdFxuICAgIH0pO1xuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BdJykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG5cbiAgICBzZWxlY3QucXVlcnlTZWxlY3RvcignLmpzLURyb3Bkb3duLXRpdGxlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmIChbLi4uc2VsZWN0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdF9vcGVuJykpIHtcbiAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9vcGVuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rfb3BlbicpLmZvckVhY2goKHNlbGVjdCwgaykgPT4ge1xuICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICAgIH0pXG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyBkYXRlcGlja2Vyc1xuICBjb25zdCBjYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcicpXG5cbiAgaWYgKGNhbGVuZGFyKSB7XG4gICAgY29uc3QgbW9udGhzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyX19pdGVtIC5tb250aCcpLFxuICAgICAgICAgIGNvbnRyb2xzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJyksXG4gICAgICAgICAgbW9udGhzTGlzdCA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWxpc3QnKS5jaGlsZHJlblxuXG4gICAgbW9udGhzLmZvckVhY2goKG1vbnRoLCBpKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKStpKTtcblxuICAgICAgbGV0IGN1c3RvbU9wdGlvbnMgPSB7XG4gICAgICAgIHJhbmdlRnJvbTogbnVsbCxcbiAgICAgICAgcmFuZ2VUbzogbnVsbCxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZXBpY2tlciA9ICQobW9udGgpLmRhdGVwaWNrZXIoe1xuICAgICAgICBzdGFydERhdGU6IGRhdGUsXG4gICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiAhMSxcbiAgICAgICAga2V5Ym9hcmROYXY6ICExLFxuICAgICAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnJyxcbiAgICAgICAgbmF2VGl0bGVzOiB7XG4gICAgICAgICAgICBkYXlzOiAnTU0nLFxuICAgICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgICB5ZWFyczogJ3l5eXkxIC0geXl5eTInXG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZW5kZXJDZWxsKGRhdGUsIGNlbGxUeXBlKSB7XG4gICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGZyb20gPSBjYWxlbmRhci5kYXRhc2V0LmZyb20sXG4gICAgICAgICAgICAgICAgdG8gPSBjYWxlbmRhci5kYXRhc2V0LnRvLFxuICAgICAgICAgICAgICAgIGZyb21DZWxsID0gbW9udGgucXVlcnlTZWxlY3RvcignLi1yYW5nZS1mcm9tLScpLFxuICAgICAgICAgICAgICAgIHRvQ2VsbCA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3IoJy4tcmFuZ2UtdG8tJyksXG4gICAgICAgICAgICAgICAgcmFuZ2VDZWxscyA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3JBbGwoJy4taW4tcmFuZ2UtJylcblxuICAgICAgICAgICAgaWYgKGZyb21DZWxsKSB7XG4gICAgICAgICAgICAgIGZyb21DZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1yYW5nZS1mcm9tLScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b0NlbGwpIHtcbiAgICAgICAgICAgICAgdG9DZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1yYW5nZS10by0nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5nZUNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctaW4tcmFuZ2UtJylcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkYXRlLmdldFRpbWUoKSA9PSBmcm9tKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1yYW5nZS1mcm9tLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA9PSB0bykge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctcmFuZ2UtdG8tJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID4gZnJvbSAmJiBkYXRlLmdldFRpbWUoKSA8IHRvKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG9uU2VsZWN0KGZvcm1hdHRlZERhdGUsIGRhdGUsIGluc3QpIHtcbiAgICAgICAgICBjb25zdCB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF5KClcblxuICAgICAgICAgIGxldCBmcm9tID0gY2FsZW5kYXIuZGF0YXNldC5mcm9tLFxuICAgICAgICAgICAgICB0byA9IGNhbGVuZGFyLmRhdGFzZXQudG8sXG4gICAgICAgICAgICAgIHRpbWVTdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG5cbiAgICAgICAgICBpZiAoZnJvbSAmJiAhdG8pIHtcbiAgICAgICAgICAgIGlmIChmcm9tID4gdGltZVN0YW1wKSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQudG8gPSBmcm9tXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQuZnJvbSA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC50byA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LmZyb20gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10bycpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH0pLmRhdGEoJ2RhdGVwaWNrZXInKVxuXG4gICAgICBjb250cm9scy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZSA9IGRhdGVwaWNrZXIuY3VycmVudERhdGVcbiAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLmRhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLTMpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIucHJldigpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIubmV4dCgpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIuZGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCkrMylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgIGxldCBtb250aEluZGV4ID0gZGF0ZXBpY2tlci5jdXJyZW50RGF0ZS5nZXRNb250aCgpXG4gICAgICAgIGNvbnN0IG1vbnRoTG9jYWxlID0gZGF0ZXBpY2tlci5sb2MubW9udGhzU2hvcnRcblxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDEyOyBrKyspIHtcbiAgICAgICAgICBpZiAobW9udGhMb2NhbGVbbW9udGhJbmRleF0gPT0gdW5kZWZpbmVkKSBtb250aEluZGV4ID0gMFxuICAgICAgICAgIG1vbnRoc0xpc3Rba10udGV4dENvbnRlbnQgPSBtb250aExvY2FsZVttb250aEluZGV4XVxuICAgICAgICAgICsrbW9udGhJbmRleFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRhdGVwaWNrZXIucmFuZ2VPcHRpb25zID0gY3VzdG9tT3B0aW9uc1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jbGVhcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZnJvbScpXG4gICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10bycpXG4gICAgICAgIGRhdGVwaWNrZXIuY2xlYXIoKVxuICAgICAgfSlcblxuICAgICAgY2FsZW5kYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkYXRlcGlja2VyLnVwZGF0ZSgpXG4gICAgICB9KVxuXG4gICAgfSlcblxuICAgIGNvbnRyb2xzLmZvckVhY2goKGJ1dHRvbiwgaSkgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gTnVtYmVyKGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMpLFxuICAgICAgICAgICAgICBwcm9ncmVzcyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fcHJvZ3Jlc3MnKSxcbiAgICAgICAgICAgICAgbW9udGhzSXRlbXMgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1saXN0JykuY2hpbGRyZW4ubGVuZ3RoIC0gMyxcbiAgICAgICAgICAgICAgbW9udGhXaWR0aCA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWl0ZW0nKS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NMZWZ0ID0gKHByb2dyZXNzLnN0eWxlLmxlZnQgPT0gJycpID8gMCA6IHBhcnNlSW50KHByb2dyZXNzLnN0eWxlLmxlZnQpLFxuICAgICAgICAgICAgICBwcm9ncmVzc0VuZCA9IG1vbnRoV2lkdGggKiBtb250aHNJdGVtc1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IHByb2dyZXNzRW5kICsgJ3B4J1xuICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDFcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMlwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKHByb2dyZXNzTGVmdCA9PSBtb250aFdpZHRoKSB7XG4gICAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKHByb2dyZXNzTGVmdCAtIG1vbnRoV2lkdGgpICsgJ3B4J1xuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIzXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3NMZWZ0ID09IHByb2dyZXNzRW5kIC0gbW9udGhXaWR0aCkge1xuICAgICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChwcm9ncmVzc0xlZnQgKyBtb250aFdpZHRoKSArICdweCdcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMFwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDFcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IDBcbiAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAyXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjFcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAwXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuXG4gIC8vIHNlbGVjdG9yXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VsZWN0b3JdJykuZm9yRWFjaCgoc2VsZWN0b3IsIGkpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19saXN0JyksXG4gICAgICAgICAgaW5wdXQgPSBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2lucHV0JylcblxuICAgIGxldCBjb3VudCA9IGxpc3QuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICBpbnB1dC52YWx1ZSA9IGNvdW50XG5cbiAgICBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12YWx1ZV0nKS5mb3JFYWNoKChpdGVtLCBrKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWUsXG4gICAgICAgICAgICAgIHNlbGVjdG9ySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBjb3VudCA9IGxpc3QuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICAgICAgc2VsZWN0b3JJdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdG9yX19pdGVtJylcbiAgICAgICAgc2VsZWN0b3JJdGVtLmlubmVySFRNTCA9IGA8c3Bhbj4ke3ZhbHVlfTwvc3Bhbj48YnV0dG9uIGNsYXNzPVwic2VsZWN0b3JfX3JlbW92ZVwiPjwvYnV0dG9uPmBcblxuICAgICAgICBsaXN0LmFwcGVuZChzZWxlY3Rvckl0ZW0pXG4gICAgICAgIGlucHV0LnZhbHVlID0gKytjb3VudFxuICAgICAgfSlcblxuICAgIH0pXG5cblxuICB9KVxuXG4gIC8vIHRvZ2dsZVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9nZ2xlX19oZWFkZXInKS5mb3JFYWNoKCh0b2dnbGUsIGkpID0+IHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIHRvZ2dsZS5jbG9zZXN0KCcudG9nZ2xlJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlX29wZW4nKVxuICAgIH0pXG4gIH0pXG5cbiAgLy9jb3VudGVyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3VudGVyJykuZm9yRWFjaCgoY291bnRlciwgaSkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvdW50ZXItY29udHJvbF0nKS5mb3JFYWNoKChidXR0b24sIGspID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGxldCBjb3VudGVyVmFsdWUgPSBjb3VudGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXItdmFsdWVdJyksXG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBOdW1iZXIoY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlKVxuXG4gICAgICAgIHN3aXRjaCAoTnVtYmVyKGJ1dHRvbi5kYXRhc2V0LmNvdW50ZXJDb250cm9sKSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT0gMCkgY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlID0gLS1jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlID0gKytjdXJyZW50VmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIC8vcmV2aWV3c1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1saW1pdF0nKS5mb3JFYWNoKChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IGNvbnRhaW5lci5kYXRhc2V0LmxpbWl0LFxuICAgICAgICAgIGxpc3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGltaXQtbGlzdF0nKSxcbiAgICAgICAgICBidXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGltaXQtZGlzYWJsZV0nKVxuXG5cbiAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICBpZiAoayA+PSBsaW1pdCkgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0pXG5cbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgICAgaWYgKGsgPj0gbGltaXQpIGVsLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGJ1dHRvbi5yZW1vdmUoKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgLy90b3RhbCBjbGlja1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdF9vcGVuJyksXG4gICAgICAgICAgZ2FsbGVyeUl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KCcuZ2FsbGVyeV9faXRlbScpXG5cbiAgICBpZiAoIXNlbGVjdCAmJiAhWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdG9yX19yZW1vdmUnKSAmJiAhWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ2RhdGVwaWNrZXItLWNlbGwnKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9vcGVuJykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChbLi4uZS50YXJnZXQuY2xhc3NMaXN0XS5pbmNsdWRlcygnc2VsZWN0b3JfX3JlbW92ZScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgaW5wdXQgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0b3InKS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2lucHV0JylcblxuICAgICAgaW5wdXQudmFsdWUgPSAtLWlucHV0LnZhbHVlXG5cbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wX3Nob3cnKSkge1xuICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1kcm9waW5nXScpKSB7XG4gICAgICAgIGNvbnN0IHNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcF9zaG93JylcbiAgICAgICAgaWYoc2hvdykgc2hvdy5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wX3Nob3cnKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdhbGxlcnlcbiAgICBpZiAoZ2FsbGVyeUl0ZW0pIHtcbiAgICAgIGNvbnN0IGdhbGxlcnkgPSBnYWxsZXJ5SXRlbS5jbG9zZXN0KCcuZ2FsbGVyeScpLFxuICAgICAgICAgICAgdmlldyA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX3ZpZXcnKSxcbiAgICAgICAgICAgIGltYWdlID0gZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbWFnZSxcbiAgICAgICAgICAgIHNlbGVjdGVkID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpLFxuICAgICAgICAgICAgY291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19jb3VudCcpXG5cbiAgICAgIGlmIChzZWxlY3RlZCkgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtX3NlbGVjdGVkJylcbiAgICAgIHZpZXcucXVlcnlTZWxlY3RvcignaW1nJykuc3JjID0gaW1hZ2VcblxuICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgIGNvdW50LmRhdGFzZXQuZ2FsbGVyeUNvdW50Q3VycmVudCA9IE51bWJlcihnYWxsZXJ5SXRlbS5kYXRhc2V0LmluZGV4KSsxXG4gICAgICB9XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gZ2FsbGVyeSBjb3VudFxuXG4gIC8vIGdhbGxlcnkgdHJpZ2dlclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeScpLmZvckVhY2goKGdhbGxlcnksIGkpID0+IHtcbiAgICBjb25zdCBjb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2NvdW50JyksXG4gICAgICAgICAgZ2FsbGVyeUxpc3RDb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2xpc3QnKS5jaGlsZHJlbi5sZW5ndGhcblxuICAgIGlmIChjb3VudCkge1xuICAgICAgY291bnQuZGF0YXNldC5nYWxsZXJ5Q291bnRBbGwgPSBnYWxsZXJ5TGlzdENvdW50XG5cbiAgICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzXScpLmRhdGFzZXQuZ2FsbGVyeUNvbnRyb2xzKVxuICAgICAgICBsZXQgaW5kZXggPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19pdGVtX3NlbGVjdGVkJykuZGF0YXNldC5pbmRleFxuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgaW5kZXggPSBnYWxsZXJ5TGlzdENvdW50IC0gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLS1pbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKGluZGV4ID09IGdhbGxlcnlMaXN0Q291bnQgLSAxKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gMFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgKytpbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoYC5nYWxsZXJ5X19pdGVtW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApLmNsaWNrKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbTpmaXJzdC1jaGlsZCcpLmNsaWNrKClcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1nYWxsZXJ5LWNvbnRvbHNdJykuZm9yRWFjaCgoY29udHJvbHMsIGkpID0+IHtcbiAgICBjb25zdCBnYWxsZXJ5ID0gY29udHJvbHMuY2xvc2VzdCgnLmdhbGxlcnknKSxcbiAgICAgICAgICBnYWxsZXJ5TGlzdCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2xpc3QnKVxuICAgIGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWdhbGxlcnktY29udHJvbHMtcHJldl0nKVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLW9wZW5dJykuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4ge1xuICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHQgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1tb2RhbC1vcGVuXScpLFxuICAgICAgICAgICAgZGF0YSA9IHQuZGF0YXNldC5tb2RhbE9wZW4sXG4gICAgICAgICAgICBtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tb2RhbD1cIiR7ZGF0YX1cIl1gKVxuXG4gICAgICBsZXQgbW9kYWxDb250ZW50ID0gbW9kYWxFbGVtZW50LmlubmVySFRNTFxuXG4gICAgICBpZiAoZGF0YSA9PSAnZ2FsbGVyeScpIHtcbiAgICAgICAgbW9kYWxDb250ZW50ID0gdC5pbm5lckhUTUxcbiAgICAgIH1cblxuICAgICAgbGV0IG1vZGFsID0gbmV3IHRpbmdsZS5tb2RhbCh7XG4gICAgICAgIGNsb3NlTWV0aG9kczogWydvdmVybGF5JywgJ2VzY2FwZSddLFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0XG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChtb2RhbENvbnRlbnQpXG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgICAgY29uc3QgZm9ybXMgPSBtb2RhbC5tb2RhbEJveENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpXG5cbiAgICAgIGZvcm1zLmZvckVhY2goKGZvcm0sIGkpID0+IHtcbiAgICAgICAgZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcbiAgICAgICAgICBuZXcgQ3VzdG9tU2VsZWN0KHtcbiAgICAgICAgICAgIGVsZW06IHNlbGVjdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBwaG9uZU1hc2soKVxuXG4gICAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy9kcm9wXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BpbmddJykuZm9yRWFjaCgoZHJvcCwgaSkgPT4ge1xuICAgIGRyb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSBkcm9wLmRhdGFzZXQuZHJvcGluZyxcbiAgICAgICAgICAgIGRyb3BwZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wcGVkPVwiJHtkYXRhfVwiXWApXG5cbiAgICAgIGRyb3BwZWQuY2xhc3NMaXN0LmFkZCgnZHJvcF9zaG93JylcbiAgICB9KVxuICB9KVxuXG4gIC8vcmF0aW5nXG4gIGNvbnN0IHRyaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nX3RyaXAnKVxuXG4gIGlmICh0cmlwKSB7XG4gICAgY29uc3QgdHJpcFZhbHVlID0gKE51bWJlcih0cmlwLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZhbHVlXScpLmRhdGFzZXQudmFsdWUpICogMTApICogMixcbiAgICAgICAgICB0cmlwUHJvZ3Jlc3MgPSB0cmlwLnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmdfX3Byb2dyZXNzJylcblxuICAgIHRyaXBQcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3RyaXBWYWx1ZX0lYFxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW1hZ2VdJykuZm9yRWFjaCgoaW1hZ2UsIGkpID0+IHtcbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3Qgc3JjID0gaW1hZ2UuZGF0YXNldC5pbWFnZSxcbiAgICAgICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cbiAgICAgIGltZy5zcmMgPSBzcmNcblxuICAgICAgbGV0IG1vZGFsID0gbmV3IHRpbmdsZS5tb2RhbCh7XG4gICAgICAgIGNsb3NlTWV0aG9kczogWydvdmVybGF5JywgJ2VzY2FwZSddLFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBbJ21vZGFsJywgJ21vZGFsX2dhbGxlcnknXSxcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zZXRDb250ZW50KGltZyk7XG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgIH0pXG4gIH0pXG5cbiAgLy/QmNC80LjRgtCw0YbQuNGPINC30LDQs9GA0YPQt9C60LhcbiAgY29uc3QgbG9hZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nJyk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICBjb25zdCB2YWx1ZUVsZW1lbnQgPSBsb2FkaW5nLnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nX192YWx1ZScpO1xuICAgIGxldCB2YWx1ZSA9IDA7XG5cbiAgICBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmdfcHJvY2VzcycpXG5cbiAgICBsZXQgcHJvY2VzcyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHZhbHVlICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoNSkpXG4gICAgICB2YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gKHZhbHVlID49IDEwMCkgPyAxMDAgOiB2YWx1ZVxuXG4gICAgICBpZiAodmFsdWUgPj0gMTAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocHJvY2VzcylcbiAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nX2ZpbmlzaCcpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sb2FkaW5nLXByb2Nlc3MnKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmctcHJvY2Vzc19maW5pc2gnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIDEwMClcbiAgfVxuXG59KSh3aW5kb3cpO1xuIl19
