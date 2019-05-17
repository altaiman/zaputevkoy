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

        // new SimpleBar(select.querySelector('.select__dropdown'))
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
          try {
            this.remove();
          } catch (e) {}
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

      if (!e.target.dataset.droping) return;

      var data = drop.dataset.droping,
          dropped = document.querySelector('[data-dropped="' + data + '"]');

      dropped.classList.toggle('drop_show');
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
          try {
            this.remove();
          } catch (e) {}
        },
        cssClass: ['modal', 'modal_gallery']
      });

      modal.setContent(img);
      modal.open();
    });
  });

  // Шаги


  document.querySelectorAll('[data-step-button]').forEach(function (button, i) {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      var data = button.dataset.stepButton,
          current = document.querySelector('.step-content_current'),
          step = document.querySelectorAll('[data-step]');

      current.classList.remove('step-content_current');
      var index = Number(current.dataset.stepContent);

      switch (data) {
        case 'next':
          document.querySelector('[data-step-content="' + ++index + '"]').classList.add('step-content_current');
          break;
        case 'prev':
          document.querySelector('[data-step-content="' + --index + '"]').classList.add('step-content_current');
          break;
      }

      step.forEach(function (step, k) {
        step.dataset.step = index;
      });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInBob25lTWFzayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsImsiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0cmltIiwiVk1hc2tlciIsInRvUGF0dGVybiIsInBhdHRlcm4iLCJzbGlkZXJPcHRpb25zIiwiZnJlZVNjcm9sbCIsImNlbGxBbGlnbiIsImNvbnRhaW4iLCJ3cmFwQXJvdW5kIiwicGFnZURvdHMiLCJwcmV2TmV4dEJ1dHRvbnMiLCJsYXp5TG9hZCIsImFkYXB0aXZlSGVpZ2h0IiwiaXRlbXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJyZW1vdmUiLCJlbCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0IiwidCIsInRhZ05hbWUiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJpbmRleCIsInNob3dpbmciLCJzZWxlY3RlZCIsImFkZCIsImNsaWNrIiwic2VsZWN0IiwiQ3VzdG9tU2VsZWN0IiwiZWxlbSIsImluY2x1ZGVzIiwiY2FsZW5kYXIiLCJtb250aHMiLCJtb250aHNMaXN0IiwibW9udGgiLCJub3ciLCJEYXRlIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJjdXN0b21PcHRpb25zIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImRhdGVwaWNrZXIiLCIkIiwic3RhcnREYXRlIiwic2VsZWN0T3RoZXJNb250aHMiLCJrZXlib2FyZE5hdiIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJuYXZUaXRsZXMiLCJkYXlzIiwieWVhcnMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsInkiLCJtIiwiZCIsImdldERhdGUiLCJkYXkiLCJnZXREYXkiLCJmcm9tIiwidG8iLCJmcm9tQ2VsbCIsInRvQ2VsbCIsInJhbmdlQ2VsbHMiLCJjZWxsIiwiZ2V0VGltZSIsImNsYXNzZXMiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJpbnN0IiwidGltZVN0YW1wIiwicmVtb3ZlQXR0cmlidXRlIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwiTnVtYmVyIiwiY2FsZW5kYXJDb250cm9scyIsImN1cnJlbnREYXRlIiwicHJldiIsIm1vbnRoSW5kZXgiLCJtb250aExvY2FsZSIsImxvYyIsIm1vbnRoc1Nob3J0IiwidW5kZWZpbmVkIiwicmFuZ2VPcHRpb25zIiwiY2xlYXIiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsIm1vbnRoc0l0ZW1zIiwibW9udGhXaWR0aCIsInByb2dyZXNzTGVmdCIsInN0eWxlIiwibGVmdCIsInBhcnNlSW50IiwicHJvZ3Jlc3NFbmQiLCJzZWxlY3RvciIsImxpc3QiLCJjb3VudCIsIml0ZW0iLCJzZWxlY3Rvckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiY291bnRlciIsImNvdW50ZXJWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsImNvdW50ZXJDb250cm9sIiwibGltaXQiLCJBcnJheSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJnYWxsZXJ5SXRlbSIsInBhcmVudE5vZGUiLCJzaG93IiwiZ2FsbGVyeSIsInZpZXciLCJpbWFnZSIsInNyYyIsImdhbGxlcnlDb3VudEN1cnJlbnQiLCJnYWxsZXJ5TGlzdENvdW50IiwiZ2FsbGVyeUNvdW50QWxsIiwiZ2FsbGVyeUNvbnRyb2xzIiwiZ2FsbGVyeUxpc3QiLCJ0cmlnZ2VyIiwibW9kYWxPcGVuIiwibW9kYWxFbGVtZW50IiwibW9kYWxDb250ZW50IiwibW9kYWwiLCJ0aW5nbGUiLCJjbG9zZU1ldGhvZHMiLCJvbkNsb3NlIiwiY3NzQ2xhc3MiLCJzZXRDb250ZW50Iiwib3BlbiIsImZvcm1zIiwibW9kYWxCb3hDb250ZW50IiwiZm9ybSIsImNsb3NlIiwiZHJvcCIsImRyb3BpbmciLCJkcm9wcGVkIiwidHJpcCIsInRyaXBWYWx1ZSIsInRyaXBQcm9ncmVzcyIsIndpZHRoIiwiaW1nIiwic3RlcEJ1dHRvbiIsImN1cnJlbnQiLCJzdGVwIiwic3RlcENvbnRlbnQiLCJsb2FkaW5nIiwidmFsdWVFbGVtZW50IiwicHJvY2VzcyIsInNldEludGVydmFsIiwiZmxvb3IiLCJyYW5kb20iLCJjbGVhckludGVydmFsIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxJQUFULEVBQWU7O0FBRWQ7QUFDQUM7O0FBRUEsV0FBU0MsU0FBVCxHQUFxQjtBQUNuQkMsYUFBU0MsZ0JBQVQsQ0FBMEIsbUJBQTFCLEVBQStDQyxPQUEvQyxDQUF1RCxVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBYztBQUNuRUQsWUFBTUUsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3JDLFlBQUlDLElBQUlKLE1BQU1LLEtBQU4sQ0FBWUMsT0FBWixDQUFvQixJQUFwQixFQUEwQixFQUExQixFQUE4QkMsSUFBOUIsRUFBUjtBQUNBUCxjQUFNSyxLQUFOLEdBQWNHLFFBQVFDLFNBQVIsQ0FBa0JMLENBQWxCLEVBQXFCLEVBQUNNLFNBQVMsb0JBQVYsRUFBckIsQ0FBZDtBQUNELE9BSEQ7QUFJRCxLQUxEO0FBTUQ7O0FBRURkOztBQUVBO0FBQ0EsTUFBTWUsZ0JBQWdCO0FBQ3BCLGNBQVU7QUFDUkMsa0JBQVksS0FESjtBQUVSQyxpQkFBVyxNQUZIO0FBR1JD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YyxHQUFsQixDQUFzQixpQkFBdEI7O0FBRUEsUUFBSStILFVBQVVDLFlBQVksWUFBTTtBQUM5QnpMLGVBQVM2QixLQUFLNkosS0FBTCxDQUFXN0osS0FBSzhKLE1BQUwsS0FBZ0I5SixLQUFLNkosS0FBTCxDQUFXLENBQVgsQ0FBM0IsQ0FBVDtBQUNBSCxtQkFBYWxELFNBQWIsR0FBMEJySSxTQUFTLEdBQVYsR0FBaUIsR0FBakIsR0FBdUJBLEtBQWhEOztBQUVBLFVBQUlBLFNBQVMsR0FBYixFQUFrQjtBQUNoQjRMLHNCQUFjSixPQUFkO0FBQ0FGLGdCQUFRM0ksU0FBUixDQUFrQmMsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FqRSxpQkFBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDQyxPQUE5QyxDQUFzRCxVQUFDOEMsRUFBRCxFQUFLckIsQ0FBTCxFQUFXO0FBQy9EcUIsYUFBR0csU0FBSCxDQUFhYyxHQUFiLENBQWlCLHdCQUFqQjtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBWGEsRUFXWCxHQVhXLENBQWQ7QUFZRDtBQUVGLENBL3FCRCxFQStxQkdvSSxNQS9xQkgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KCk7XG5cbiAgZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKS5mb3JFYWNoKChpbnB1dCwgaykgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBsZXQgdiA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJys3JywgJycpLnRyaW0oKVxuICAgICAgICBpbnB1dC52YWx1ZSA9IFZNYXNrZXIudG9QYXR0ZXJuKHYsIHtwYXR0ZXJuOiBcIis3ICg5OTkpIDk5OS05OS05OVwifSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHBob25lTWFzaygpXG5cbiAgLy8gc2xpZGVyIG9wdGlvbnNcbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnYmFubmVyJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IHRydWUsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgbGF6eUxvYWQ6IHRydWVcbiAgICB9LFxuICAgICdmdWxsJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAnc2l4LWl0ZW1zJzoge1xuICAgICAgaXRlbXM6IDYsXG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdyZXZpZXdzJzoge1xuICAgICAgYXV0b1BsYXk6IDMwMDAsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ2dhbGxlcnknOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJylcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXSk7XG5cbiAgICAgIGNvbnRyb2xzUHJldlxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGZsa3R5LnByZXZpb3VzKClcbiAgICAgICAgfSlcblxuICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoc2xpZGVyT3B0aW9uc1tzbGlkZXIuZGF0YXNldC5zbGlkZXJdLmNvbnRyb2xzID09PSBmYWxzZSkge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9yZV0nKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLW1vcmUtYWN0aW9uXScpXG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb3JlJylcblxuICAgIH0pXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlXScpLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LnRvZ2dsZVxuICAgICAgbGV0IHQgPSBlbFxuXG4gICAgICBpZiAodC50YWdOYW1lID09ICdCVVRUT04nKSB7XG4gICAgICAgIGNvbnN0IHNwYW4gPSB0LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICAgICAgICB0LmRhdGFzZXQudG9nZ2xlID0gdC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgdCA9IHNwYW5cbiAgICAgIH1cblxuICAgICAgdC50ZXh0Q29udGVudCA9IHRleHRcbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnNdJykuZm9yRWFjaCgodGFicywgaSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB0YWJzLmRhdGFzZXQudGFicyxcbiAgICAgICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFicy1jb250ZW50PSR7ZGF0YX1dYClcblxuICAgIHRhYnMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpLmZvckVhY2goKHRhYiwgaykgPT4ge1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0YWIuZGF0YXNldC50YWIsXG4gICAgICAgICAgICAgIHNob3dpbmcgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG93aW5nJyksXG4gICAgICAgICAgICAgIHNlbGVjdGVkID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKVxuXG4gICAgICAgIGlmIChzaG93aW5nKSBzaG93aW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dpbmcnKVxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcblxuICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYj1cIiR7aW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc2hvd2luZycpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0YWJzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYl0nKS5jbGljaygpXG4gIH0pXG5cbiAgLy8gc2VsZWN0XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAgIG5ldyBDdXN0b21TZWxlY3Qoe1xuICAgICAgZWxlbTogc2VsZWN0XG4gICAgfSk7XG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcF0nKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcblxuICAgIHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuanMtRHJvcGRvd24tdGl0bGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKFsuLi5zZWxlY3QuY2xhc3NMaXN0XS5pbmNsdWRlcygnc2VsZWN0X29wZW4nKSkge1xuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9vcGVuJykuZm9yRWFjaCgoc2VsZWN0LCBrKSA9PiB7XG4gICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9vcGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdF9vcGVuJylcblxuICAgICAgICAvLyBuZXcgU2ltcGxlQmFyKHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19kcm9wZG93bicpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gZGF0ZXBpY2tlcnNcbiAgY29uc3QgY2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXInKVxuXG4gIGlmIChjYWxlbmRhcikge1xuICAgIGNvbnN0IG1vbnRocyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxlbmRhcl9faXRlbSAubW9udGgnKSxcbiAgICAgICAgICBjb250cm9scyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIG1vbnRoc0xpc3QgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1saXN0JykuY2hpbGRyZW5cblxuICAgIG1vbnRocy5mb3JFYWNoKChtb250aCwgaSkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCkraSk7XG5cbiAgICAgIGxldCBjdXN0b21PcHRpb25zID0ge1xuICAgICAgICByYW5nZUZyb206IG51bGwsXG4gICAgICAgIHJhbmdlVG86IG51bGwsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSAkKG1vbnRoKS5kYXRlcGlja2VyKHtcbiAgICAgICAgc3RhcnREYXRlOiBkYXRlLFxuICAgICAgICBzZWxlY3RPdGhlck1vbnRoczogITEsXG4gICAgICAgIGtleWJvYXJkTmF2OiAhMSxcbiAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJycsXG4gICAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgICAgZGF5czogJ01NJyxcbiAgICAgICAgICAgIG1vbnRoczogJ3l5eXknLFxuICAgICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVuZGVyQ2VsbChkYXRlLCBjZWxsVHlwZSkge1xuICAgICAgICAgIGNvbnN0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBmcm9tID0gY2FsZW5kYXIuZGF0YXNldC5mcm9tLFxuICAgICAgICAgICAgICAgIHRvID0gY2FsZW5kYXIuZGF0YXNldC50byxcbiAgICAgICAgICAgICAgICBmcm9tQ2VsbCA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3IoJy4tcmFuZ2UtZnJvbS0nKSxcbiAgICAgICAgICAgICAgICB0b0NlbGwgPSBtb250aC5xdWVyeVNlbGVjdG9yKCcuLXJhbmdlLXRvLScpLFxuICAgICAgICAgICAgICAgIHJhbmdlQ2VsbHMgPSBtb250aC5xdWVyeVNlbGVjdG9yQWxsKCcuLWluLXJhbmdlLScpXG5cbiAgICAgICAgICAgIGlmIChmcm9tQ2VsbCkge1xuICAgICAgICAgICAgICBmcm9tQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctcmFuZ2UtZnJvbS0nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9DZWxsKSB7XG4gICAgICAgICAgICAgIHRvQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctcmFuZ2UtdG8tJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmFuZ2VDZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnLWluLXJhbmdlLScpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gZnJvbSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctcmFuZ2UtZnJvbS0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gdG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiAnLXJhbmdlLXRvLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+IGZyb20gJiYgZGF0ZS5nZXRUaW1lKCkgPCB0bykge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBvblNlbGVjdChmb3JtYXR0ZWREYXRlLCBkYXRlLCBpbnN0KSB7XG4gICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERheSgpXG5cbiAgICAgICAgICBsZXQgZnJvbSA9IGNhbGVuZGFyLmRhdGFzZXQuZnJvbSxcbiAgICAgICAgICAgICAgdG8gPSBjYWxlbmRhci5kYXRhc2V0LnRvLFxuICAgICAgICAgICAgICB0aW1lU3RhbXAgPSBkYXRlLmdldFRpbWUoKVxuXG4gICAgICAgICAgaWYgKGZyb20gJiYgIXRvKSB7XG4gICAgICAgICAgICBpZiAoZnJvbSA+IHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LnRvID0gZnJvbVxuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LmZyb20gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQudG8gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC5mcm9tID0gdGltZVN0YW1wXG4gICAgICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG8nKVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9KS5kYXRhKCdkYXRlcGlja2VyJylcblxuICAgICAgY29udHJvbHMuZm9yRWFjaCgoYnV0dG9uLCBpKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyksXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUgPSBkYXRlcGlja2VyLmN1cnJlbnREYXRlXG4gICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRlID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKS0zKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLnByZXYoKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLm5leHQoKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLmRhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpKzMpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICBsZXQgbW9udGhJbmRleCA9IGRhdGVwaWNrZXIuY3VycmVudERhdGUuZ2V0TW9udGgoKVxuICAgICAgICBjb25zdCBtb250aExvY2FsZSA9IGRhdGVwaWNrZXIubG9jLm1vbnRoc1Nob3J0XG5cbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMjsgaysrKSB7XG4gICAgICAgICAgaWYgKG1vbnRoTG9jYWxlW21vbnRoSW5kZXhdID09IHVuZGVmaW5lZCkgbW9udGhJbmRleCA9IDBcbiAgICAgICAgICBtb250aHNMaXN0W2tdLnRleHRDb250ZW50ID0gbW9udGhMb2NhbGVbbW9udGhJbmRleF1cbiAgICAgICAgICArK21vbnRoSW5kZXhcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkYXRlcGlja2VyLnJhbmdlT3B0aW9ucyA9IGN1c3RvbU9wdGlvbnNcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY2xlYXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY2FsZW5kYXIucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZyb20nKVxuICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG8nKVxuICAgICAgICBkYXRlcGlja2VyLmNsZWFyKClcbiAgICAgIH0pXG5cbiAgICAgIGNhbGVuZGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGF0ZXBpY2tlci51cGRhdGUoKVxuICAgICAgfSlcblxuICAgIH0pXG5cbiAgICBjb250cm9scy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX3Byb2dyZXNzJyksXG4gICAgICAgICAgICAgIG1vbnRoc0l0ZW1zID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19tb250aHMtbGlzdCcpLmNoaWxkcmVuLmxlbmd0aCAtIDMsXG4gICAgICAgICAgICAgIG1vbnRoV2lkdGggPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1pdGVtJykub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgIHByb2dyZXNzTGVmdCA9IChwcm9ncmVzcy5zdHlsZS5sZWZ0ID09ICcnKSA/IDAgOiBwYXJzZUludChwcm9ncmVzcy5zdHlsZS5sZWZ0KSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFbmQgPSBtb250aFdpZHRoICogbW9udGhzSXRlbXNcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSBwcm9ncmVzc0VuZCArICdweCdcbiAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAxXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjJcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc0xlZnQgPT0gbW9udGhXaWR0aCkge1xuICAgICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChwcm9ncmVzc0xlZnQgLSBtb250aFdpZHRoKSArICdweCdcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiM1wiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgaWYgKHByb2dyZXNzTGVmdCA9PSBwcm9ncmVzc0VuZCAtIG1vbnRoV2lkdGgpIHtcbiAgICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAocHJvZ3Jlc3NMZWZ0ICsgbW9udGhXaWR0aCkgKyAncHgnXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjBcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAxXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAwXG4gICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMlxuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIxXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cblxuICAvLyBzZWxlY3RvclxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdG9yXScpLmZvckVhY2goKHNlbGVjdG9yLCBpKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IHNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rvcl9fbGlzdCcpLFxuICAgICAgICAgIGlucHV0ID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19pbnB1dCcpXG5cbiAgICBsZXQgY291bnQgPSBsaXN0LmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgaW5wdXQudmFsdWUgPSBjb3VudFxuXG4gICAgc2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmFsdWVdJykuZm9yRWFjaCgoaXRlbSwgaykgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlLFxuICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgY291bnQgPSBsaXN0LmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgICAgIHNlbGVjdG9ySXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rvcl9faXRlbScpXG4gICAgICAgIHNlbGVjdG9ySXRlbS5pbm5lckhUTUwgPSBgPHNwYW4+JHt2YWx1ZX08L3NwYW4+PGJ1dHRvbiBjbGFzcz1cInNlbGVjdG9yX19yZW1vdmVcIj48L2J1dHRvbj5gXG5cbiAgICAgICAgbGlzdC5hcHBlbmQoc2VsZWN0b3JJdGVtKVxuICAgICAgICBpbnB1dC52YWx1ZSA9ICsrY291bnRcbiAgICAgIH0pXG5cbiAgICB9KVxuXG5cbiAgfSlcblxuICAvLyB0b2dnbGVcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZ2dsZV9faGVhZGVyJykuZm9yRWFjaCgodG9nZ2xlLCBpKSA9PiB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICB0b2dnbGUuY2xvc2VzdCgnLnRvZ2dsZScpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZV9vcGVuJylcbiAgICB9KVxuICB9KVxuXG4gIC8vY291bnRlclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY291bnRlcicpLmZvckVhY2goKGNvdW50ZXIsIGkpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb3VudGVyLWNvbnRyb2xdJykuZm9yRWFjaCgoYnV0dG9uLCBrKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBsZXQgY291bnRlclZhbHVlID0gY291bnRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyLXZhbHVlXScpLFxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gTnVtYmVyKGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSlcblxuICAgICAgICBzd2l0Y2ggKE51bWJlcihidXR0b24uZGF0YXNldC5jb3VudGVyQ29udHJvbCkpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9IDApIGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSA9IC0tY3VycmVudFZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSA9ICsrY3VycmVudFZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICAvL3Jldmlld3NcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbGltaXRdJykuZm9yRWFjaCgoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBjb250YWluZXIuZGF0YXNldC5saW1pdCxcbiAgICAgICAgICBsaXN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpbWl0LWxpc3RdJyksXG4gICAgICAgICAgYnV0dG9uID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpbWl0LWRpc2FibGVdJylcblxuXG4gICAgQXJyYXkuZnJvbShsaXN0LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgaWYgKGsgPj0gbGltaXQpIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9KVxuXG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgQXJyYXkuZnJvbShsaXN0LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICAgIGlmIChrID49IGxpbWl0KSBlbC5zdHlsZS5kaXNwbGF5ID0gJydcbiAgICAgICAgfSlcblxuICAgICAgICBidXR0b24ucmVtb3ZlKClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIC8vdG90YWwgY2xpY2tcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3Rfb3BlbicpLFxuICAgICAgICAgIGdhbGxlcnlJdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnLmdhbGxlcnlfX2l0ZW0nKVxuXG4gICAgaWYgKCFzZWxlY3QgJiYgIVsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rvcl9fcmVtb3ZlJykgJiYgIVsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdkYXRlcGlja2VyLS1jZWxsJykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rfb3BlbicpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdG9yX19yZW1vdmUnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGlucHV0ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdG9yJykucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19pbnB1dCcpXG5cbiAgICAgIGlucHV0LnZhbHVlID0gLS1pbnB1dC52YWx1ZVxuXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuZHJvcF9zaG93JykpIHtcbiAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZHJvcGluZ10nKSkge1xuICAgICAgICBjb25zdCBzaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bfc2hvdycpXG4gICAgICAgIGlmKHNob3cpIHNob3cuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcF9zaG93JylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnYWxsZXJ5XG4gICAgaWYgKGdhbGxlcnlJdGVtKSB7XG4gICAgICBjb25zdCBnYWxsZXJ5ID0gZ2FsbGVyeUl0ZW0uY2xvc2VzdCgnLmdhbGxlcnknKSxcbiAgICAgICAgICAgIHZpZXcgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X192aWV3JyksXG4gICAgICAgICAgICBpbWFnZSA9IGdhbGxlcnlJdGVtLmRhdGFzZXQuaW1hZ2UsXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgIGNvdW50ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fY291bnQnKVxuXG4gICAgICBpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKVxuICAgICAgZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICB2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IGltYWdlXG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBjb3VudC5kYXRhc2V0LmdhbGxlcnlDb3VudEN1cnJlbnQgPSBOdW1iZXIoZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbmRleCkrMVxuICAgICAgfVxuICAgIH1cblxuICB9KVxuXG4gIC8vIGdhbGxlcnkgY291bnRcblxuICAvLyBnYWxsZXJ5IHRyaWdnZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKS5mb3JFYWNoKChnYWxsZXJ5LCBpKSA9PiB7XG4gICAgY29uc3QgY291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19jb3VudCcpLFxuICAgICAgICAgIGdhbGxlcnlMaXN0Q291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19saXN0JykuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGNvdW50LmRhdGFzZXQuZ2FsbGVyeUNvdW50QWxsID0gZ2FsbGVyeUxpc3RDb3VudFxuXG4gICAgICBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWdhbGxlcnktY29udHJvbHNdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5kYXRhc2V0LmdhbGxlcnlDb250cm9scylcbiAgICAgICAgbGV0IGluZGV4ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpLmRhdGFzZXQuaW5kZXhcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gZ2FsbGVyeUxpc3RDb3VudCAtIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC0taW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBnYWxsZXJ5TGlzdENvdW50IC0gMSkge1xuICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICsraW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKGAuZ2FsbGVyeV9faXRlbVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKS5jbGljaygpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW06Zmlyc3QtY2hpbGQnKS5jbGljaygpXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ2FsbGVyeS1jb250b2xzXScpLmZvckVhY2goKGNvbnRyb2xzLCBpKSA9PiB7XG4gICAgY29uc3QgZ2FsbGVyeSA9IGNvbnRyb2xzLmNsb3Nlc3QoJy5nYWxsZXJ5JyksXG4gICAgICAgICAgZ2FsbGVyeUxpc3QgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19saXN0JylcbiAgICBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzLXByZXZdJylcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1vcGVuXScpLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHtcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCB0ID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtbW9kYWwtb3Blbl0nKSxcbiAgICAgICAgICAgIGRhdGEgPSB0LmRhdGFzZXQubW9kYWxPcGVuLFxuICAgICAgICAgICAgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYClcblxuICAgICAgbGV0IG1vZGFsQ29udGVudCA9IG1vZGFsRWxlbWVudC5pbm5lckhUTUxcblxuICAgICAgaWYgKGRhdGEgPT0gJ2dhbGxlcnknKSB7XG4gICAgICAgIG1vZGFsQ29udGVudCA9IHQuaW5uZXJIVE1MXG4gICAgICB9XG5cbiAgICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0XG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChtb2RhbENvbnRlbnQpXG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgICAgY29uc3QgZm9ybXMgPSBtb2RhbC5tb2RhbEJveENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpXG5cbiAgICAgIGZvcm1zLmZvckVhY2goKGZvcm0sIGkpID0+IHtcbiAgICAgICAgZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcbiAgICAgICAgICBuZXcgQ3VzdG9tU2VsZWN0KHtcbiAgICAgICAgICAgIGVsZW06IHNlbGVjdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBwaG9uZU1hc2soKVxuXG4gICAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy9kcm9wXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BpbmddJykuZm9yRWFjaCgoZHJvcCwgaSkgPT4ge1xuICAgIGRyb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmICghZS50YXJnZXQuZGF0YXNldC5kcm9waW5nKSByZXR1cm5cblxuICAgICAgY29uc3QgZGF0YSA9IGRyb3AuZGF0YXNldC5kcm9waW5nLFxuICAgICAgICAgICAgZHJvcHBlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3BwZWQ9XCIke2RhdGF9XCJdYClcblxuICAgICAgZHJvcHBlZC5jbGFzc0xpc3QudG9nZ2xlKCdkcm9wX3Nob3cnKVxuICAgIH0pXG4gIH0pXG5cbiAgLy9yYXRpbmdcbiAgY29uc3QgdHJpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmdfdHJpcCcpXG5cbiAgaWYgKHRyaXApIHtcbiAgICBjb25zdCB0cmlwVmFsdWUgPSAoTnVtYmVyKHRyaXAucXVlcnlTZWxlY3RvcignW2RhdGEtdmFsdWVdJykuZGF0YXNldC52YWx1ZSkgKiAxMCkgKiAyLFxuICAgICAgICAgIHRyaXBQcm9ncmVzcyA9IHRyaXAucXVlcnlTZWxlY3RvcignLnJhdGluZ19fcHJvZ3Jlc3MnKVxuXG4gICAgdHJpcFByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7dHJpcFZhbHVlfSVgXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pbWFnZV0nKS5mb3JFYWNoKChpbWFnZSwgaSkgPT4ge1xuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBzcmMgPSBpbWFnZS5kYXRhc2V0LmltYWdlLFxuICAgICAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblxuICAgICAgaW1nLnNyYyA9IHNyY1xuXG4gICAgICBsZXQgbW9kYWwgPSBuZXcgdGluZ2xlLm1vZGFsKHtcbiAgICAgICAgY2xvc2VNZXRob2RzOiBbJ292ZXJsYXknLCAnZXNjYXBlJ10sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjc3NDbGFzczogWydtb2RhbCcsICdtb2RhbF9nYWxsZXJ5J10sXG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChpbWcpO1xuICAgICAgbW9kYWwub3BlbigpXG5cbiAgICB9KVxuICB9KVxuXG4gIC8vINCo0LDQs9C4XG5cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdGVwLWJ1dHRvbl0nKS5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSBidXR0b24uZGF0YXNldC5zdGVwQnV0dG9uLFxuICAgICAgICAgICAgY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGVwLWNvbnRlbnRfY3VycmVudCcpLFxuICAgICAgICAgICAgc3RlcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0ZXBdJylcblxuICAgICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLWNvbnRlbnRfY3VycmVudCcpXG4gICAgICBsZXQgaW5kZXggPSBOdW1iZXIoY3VycmVudC5kYXRhc2V0LnN0ZXBDb250ZW50KVxuXG4gICAgICBzd2l0Y2ggKGRhdGEpIHtcbiAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc3RlcC1jb250ZW50PVwiJHsrK2luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtY29udGVudF9jdXJyZW50JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdwcmV2JzpcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zdGVwLWNvbnRlbnQ9XCIkey0taW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc3RlcC1jb250ZW50X2N1cnJlbnQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIHN0ZXAuZm9yRWFjaCgoc3RlcCwgaykgPT4ge1xuICAgICAgICBzdGVwLmRhdGFzZXQuc3RlcCA9IGluZGV4XG4gICAgICB9KVxuXG4gICAgfSlcbiAgfSlcblxuICAvL9CY0LzQuNGC0LDRhtC40Y8g0LfQsNCz0YDRg9C30LrQuFxuICBjb25zdCBsb2FkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRpbmcnKTtcblxuICBpZiAobG9hZGluZykge1xuICAgIGNvbnN0IHZhbHVlRWxlbWVudCA9IGxvYWRpbmcucXVlcnlTZWxlY3RvcignLmxvYWRpbmdfX3ZhbHVlJyk7XG4gICAgbGV0IHZhbHVlID0gMDtcblxuICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgnbG9hZGluZ19wcm9jZXNzJylcblxuICAgIGxldCBwcm9jZXNzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdmFsdWUgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcig1KSlcbiAgICAgIHZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSAodmFsdWUgPj0gMTAwKSA/IDEwMCA6IHZhbHVlXG5cbiAgICAgIGlmICh2YWx1ZSA+PSAxMDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9jZXNzKVxuICAgICAgICBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmdfZmluaXNoJylcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvYWRpbmctcHJvY2VzcycpLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbG9hZGluZy1wcm9jZXNzX2ZpbmlzaCcpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSwgMTAwKVxuICB9XG5cbn0pKHdpbmRvdyk7XG4iXX0=
