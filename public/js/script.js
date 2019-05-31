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

        if (tab.parentNode.dataset.tabsContent) return;

        var index = tab.dataset.tab,
            showing = content.querySelector('.showing'),
            selected = tabs.querySelector('.selected');

        if (showing) showing.classList.remove('showing');
        if (selected) selected.classList.remove('selected');
        tab.classList.add('selected');
        content.querySelector('[data-tab="' + index + '"]').classList.add('showing');
      });
    });
    tabs.querySelector('[data-tab="0"]').click();
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
          image = galleryItem.dataset.img,
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
        console.log(e.target);

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

  // Печать
  document.querySelectorAll('[data-print]').forEach(function (print, i) {
    print.addEventListener('click', function (e) {
      var printHTML = e.target.closest('[data-print-content]').innerHTML,
          printContainer = document.querySelector('.printSelection');

      printContainer.innerHTML = printHTML;
      document.querySelector('body').classList.add('printSelected');

      window.print();

      setTimeout(function () {
        document.querySelector('body').classList.remove('printSelected');
      }, 0);
    });
  });

  document.querySelectorAll('[data-map]').forEach(function (btn, i) {
    btn.addEventListener('click', function (e) {
      document.querySelector('button[data-tab="1"]').click();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInBob25lTWFzayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsImsiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0cmltIiwiVk1hc2tlciIsInRvUGF0dGVybiIsInBhdHRlcm4iLCJzbGlkZXJPcHRpb25zIiwiZnJlZVNjcm9sbCIsImNlbGxBbGlnbiIsImNvbnRhaW4iLCJ3cmFwQXJvdW5kIiwicGFnZURvdHMiLCJwcmV2TmV4dEJ1dHRvbnMiLCJsYXp5TG9hZCIsImFkYXB0aXZlSGVpZ2h0IiwiaXRlbXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJyZW1vdmUiLCJlbCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0IiwidCIsInRhZ05hbWUiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJwYXJlbnROb2RlIiwidGFic0NvbnRlbnQiLCJpbmRleCIsInNob3dpbmciLCJzZWxlY3RlZCIsImFkZCIsImNsaWNrIiwic2VsZWN0IiwiQ3VzdG9tU2VsZWN0IiwiZWxlbSIsImluY2x1ZGVzIiwiY2FsZW5kYXIiLCJtb250aHMiLCJtb250aHNMaXN0IiwibW9udGgiLCJub3ciLCJEYXRlIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJjdXN0b21PcHRpb25zIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImRhdGVwaWNrZXIiLCIkIiwic3RhcnREYXRlIiwic2VsZWN0T3RoZXJNb250aHMiLCJrZXlib2FyZE5hdiIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJuYXZUaXRsZXMiLCJkYXlzIiwieWVhcnMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsInkiLCJtIiwiZCIsImdldERhdGUiLCJkYXkiLCJnZXREYXkiLCJmcm9tIiwidG8iLCJmcm9tQ2VsbCIsInRvQ2VsbCIsInJhbmdlQ2VsbHMiLCJjZWxsIiwiZ2V0VGltZSIsImNsYXNzZXMiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJpbnN0IiwidGltZVN0YW1wIiwicmVtb3ZlQXR0cmlidXRlIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwiTnVtYmVyIiwiY2FsZW5kYXJDb250cm9scyIsImN1cnJlbnREYXRlIiwicHJldiIsIm1vbnRoSW5kZXgiLCJtb250aExvY2FsZSIsImxvYyIsIm1vbnRoc1Nob3J0IiwidW5kZWZpbmVkIiwicmFuZ2VPcHRpb25zIiwiY2xlYXIiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsIm1vbnRoc0l0ZW1zIiwibW9udGhXaWR0aCIsInByb2dyZXNzTGVmdCIsInN0eWxlIiwibGVmdCIsInBhcnNlSW50IiwicHJvZ3Jlc3NFbmQiLCJzZWxlY3RvciIsImxpc3QiLCJjb3VudCIsIml0ZW0iLCJzZWxlY3Rvckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiY291bnRlciIsImNvdW50ZXJWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsImNvdW50ZXJDb250cm9sIiwibGltaXQiLCJBcnJheSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJnYWxsZXJ5SXRlbSIsInNob3ciLCJnYWxsZXJ5IiwidmlldyIsImltYWdlIiwiaW1nIiwic3JjIiwiZ2FsbGVyeUNvdW50Q3VycmVudCIsImdhbGxlcnlMaXN0Q291bnQiLCJnYWxsZXJ5Q291bnRBbGwiLCJnYWxsZXJ5Q29udHJvbHMiLCJjb25zb2xlIiwibG9nIiwiZ2FsbGVyeUxpc3QiLCJ0cmlnZ2VyIiwibW9kYWxPcGVuIiwibW9kYWxFbGVtZW50IiwibW9kYWxDb250ZW50IiwibW9kYWwiLCJ0aW5nbGUiLCJjbG9zZU1ldGhvZHMiLCJvbkNsb3NlIiwiY3NzQ2xhc3MiLCJzZXRDb250ZW50Iiwib3BlbiIsImZvcm1zIiwibW9kYWxCb3hDb250ZW50IiwiZm9ybSIsImNsb3NlIiwiZHJvcCIsImRyb3BpbmciLCJkcm9wcGVkIiwidHJpcCIsInRyaXBWYWx1ZSIsInRyaXBQcm9ncmVzcyIsIndpZHRoIiwic3RlcEJ1dHRvbiIsImN1cnJlbnQiLCJzdGVwIiwic3RlcENvbnRlbnQiLCJwcmludCIsInByaW50SFRNTCIsInByaW50Q29udGFpbmVyIiwid2luZG93Iiwic2V0VGltZW91dCIsImJ0biIsImxvYWRpbmciLCJ2YWx1ZUVsZW1lbnQiLCJwcm9jZXNzIiwic2V0SW50ZXJ2YWwiLCJmbG9vciIsInJhbmRvbSIsImNsZWFySW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTs7QUFFZDtBQUNBQzs7QUFFQSxXQUFTQyxTQUFULEdBQXFCO0FBQ25CQyxhQUFTQyxnQkFBVCxDQUEwQixtQkFBMUIsRUFBK0NDLE9BQS9DLENBQXVELFVBQUNDLEtBQUQsRUFBUUMsQ0FBUixFQUFjO0FBQ25FRCxZQUFNRSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFDckMsWUFBSUMsSUFBSUosTUFBTUssS0FBTixDQUFZQyxPQUFaLENBQW9CLElBQXBCLEVBQTBCLEVBQTFCLEVBQThCQyxJQUE5QixFQUFSO0FBQ0FQLGNBQU1LLEtBQU4sR0FBY0csUUFBUUMsU0FBUixDQUFrQkwsQ0FBbEIsRUFBcUIsRUFBQ00sU0FBUyxvQkFBVixFQUFyQixDQUFkO0FBQ0QsT0FIRDtBQUlELEtBTEQ7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QixDQUFzQixpQkFBdEI7O0FBRUEsUUFBSXNJLFVBQVVDLFlBQVksWUFBTTtBQUM5QmxNLGVBQVM2QixLQUFLc0ssS0FBTCxDQUFXdEssS0FBS3VLLE1BQUwsS0FBZ0J2SyxLQUFLc0ssS0FBTCxDQUFXLENBQVgsQ0FBM0IsQ0FBVDtBQUNBSCxtQkFBYXpELFNBQWIsR0FBMEJ2SSxTQUFTLEdBQVYsR0FBaUIsR0FBakIsR0FBdUJBLEtBQWhEOztBQUVBLFVBQUlBLFNBQVMsR0FBYixFQUFrQjtBQUNoQnFNLHNCQUFjSixPQUFkO0FBQ0FGLGdCQUFRcEosU0FBUixDQUFrQmdCLEdBQWxCLENBQXNCLGdCQUF0QjtBQUNBbkUsaUJBQVNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q0MsT0FBOUMsQ0FBc0QsVUFBQzhDLEVBQUQsRUFBS3JCLENBQUwsRUFBVztBQUMvRHFCLGFBQUdHLFNBQUgsQ0FBYWdCLEdBQWIsQ0FBaUIsd0JBQWpCO0FBQ0QsU0FGRDtBQUdEO0FBQ0YsS0FYYSxFQVdYLEdBWFcsQ0FBZDtBQVlEO0FBRUYsQ0F4c0JELEVBd3NCR2lJLE1BeHNCSCIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24ocm9vdCkge1xuXG4gIC8vIHN2ZyBmb3IgYWxsXG4gIHN2ZzRldmVyeWJvZHkoKTtcblxuICBmdW5jdGlvbiBwaG9uZU1hc2soKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRlbFwiXScpLmZvckVhY2goKGlucHV0LCBrKSA9PiB7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgIGxldCB2ID0gaW5wdXQudmFsdWUucmVwbGFjZSgnKzcnLCAnJykudHJpbSgpXG4gICAgICAgIGlucHV0LnZhbHVlID0gVk1hc2tlci50b1BhdHRlcm4odiwge3BhdHRlcm46IFwiKzcgKDk5OSkgOTk5LTk5LTk5XCJ9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcGhvbmVNYXNrKClcblxuICAvLyBzbGlkZXIgb3B0aW9uc1xuICBjb25zdCBzbGlkZXJPcHRpb25zID0ge1xuICAgICdiYW5uZXInOiB7XG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBwYWdlRG90czogdHJ1ZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBsYXp5TG9hZDogdHJ1ZVxuICAgIH0sXG4gICAgJ2Z1bGwnOiB7XG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdzaXgtaXRlbXMnOiB7XG4gICAgICBpdGVtczogNixcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIHBhZ2VEb3RzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ3Jldmlld3MnOiB7XG4gICAgICBhdXRvUGxheTogMzAwMCxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgY29udHJvbHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAnZ2FsbGVyeSc6IHtcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIHBhZ2VEb3RzOiBmYWxzZSxcbiAgICB9XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXJdJykuZm9yRWFjaCgoc2xpZGVyLCBpKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1zbGlkZXNdJyksXG4gICAgICAgICAgc2xpZGVzQ291bnQgPSBzbGlkZXMuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICAgIHNsaWRlV2lkdGggPSBzbGlkZXMuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgc2xpZGVyV2lkdGggPSBzbGlkZXIub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgc2xpZGVzQ2FwYWNpdHkgPSBNYXRoLnJvdW5kKHNsaWRlcldpZHRoL3NsaWRlV2lkdGgpLFxuICAgICAgICAgIGNvbnRyb2xzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9sc10nKSxcbiAgICAgICAgICBjb250cm9sc1ByZXYgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtcHJldl0nKSxcbiAgICAgICAgICBjb250cm9sc05leHQgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtbmV4dF0nKVxuXG4gICAgaWYgKHNsaWRlc0NvdW50ID4gc2xpZGVzQ2FwYWNpdHkpIHtcbiAgICAgIGNvbnN0IGZsa3R5ID0gbmV3IEZsaWNraXR5KHNsaWRlcywgc2xpZGVyT3B0aW9uc1tzbGlkZXIuZGF0YXNldC5zbGlkZXJdKTtcblxuICAgICAgY29udHJvbHNQcmV2XG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgZmxrdHkucHJldmlvdXMoKVxuICAgICAgICB9KVxuXG4gICAgICBjb250cm9sc05leHRcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBmbGt0eS5uZXh0KClcbiAgICAgICAgfSlcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb250cm9scy5yZW1vdmUoKVxuICAgIH1cblxuICAgIGlmIChzbGlkZXJPcHRpb25zW3NsaWRlci5kYXRhc2V0LnNsaWRlcl0uY29udHJvbHMgPT09IGZhbHNlKSB7XG4gICAgICBjb250cm9scy5yZW1vdmUoKVxuICAgIH1cbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb3JlXScpLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cblxuICAgICAgY29uc3QgY29udGFpbmVyID0gZWwuY2xvc2VzdCgnW2RhdGEtbW9yZS1hY3Rpb25dJylcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vcmUnKVxuXG4gICAgfSlcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGVdJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQudG9nZ2xlXG4gICAgICBsZXQgdCA9IGVsXG5cbiAgICAgIGlmICh0LnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcbiAgICAgICAgY29uc3Qgc3BhbiA9IHQucXVlcnlTZWxlY3Rvcignc3BhbicpXG4gICAgICAgIHQuZGF0YXNldC50b2dnbGUgPSB0LnRleHRDb250ZW50LnRyaW0oKVxuICAgICAgICB0ID0gc3BhblxuICAgICAgfVxuXG4gICAgICB0LnRleHRDb250ZW50ID0gdGV4dFxuICAgIH0pXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFic10nKS5mb3JFYWNoKCh0YWJzLCBpKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHRhYnMuZGF0YXNldC50YWJzLFxuICAgICAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YWJzLWNvbnRlbnQ9JHtkYXRhfV1gKVxuXG4gICAgdGFicy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdJykuZm9yRWFjaCgodGFiLCBrKSA9PiB7XG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAodGFiLnBhcmVudE5vZGUuZGF0YXNldC50YWJzQ29udGVudCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0YWIuZGF0YXNldC50YWIsXG4gICAgICAgICAgICAgIHNob3dpbmcgPSBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG93aW5nJyksXG4gICAgICAgICAgICAgIHNlbGVjdGVkID0gdGFicy5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKVxuXG4gICAgICAgIGlmIChzaG93aW5nKSBzaG93aW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dpbmcnKVxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcbiAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgY29udGVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YWI9XCIke2luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ3Nob3dpbmcnKVxuICAgICAgfSlcblxuICAgIH0pXG4gICAgdGFicy5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YWI9XCIwXCJdYCkuY2xpY2soKVxuICB9KVxuXG4gIC8vIHNlbGVjdFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcbiAgICBuZXcgQ3VzdG9tU2VsZWN0KHtcbiAgICAgIGVsZW06IHNlbGVjdFxuICAgIH0pO1xuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BdJykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG5cbiAgICBzZWxlY3QucXVlcnlTZWxlY3RvcignLmpzLURyb3Bkb3duLXRpdGxlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmIChbLi4uc2VsZWN0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdF9vcGVuJykpIHtcbiAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9vcGVuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rfb3BlbicpLmZvckVhY2goKHNlbGVjdCwgaykgPT4ge1xuICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICAgIH0pXG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rfb3BlbicpXG5cbiAgICAgICAgLy8gbmV3IFNpbXBsZUJhcihzZWxlY3QucXVlcnlTZWxlY3RvcignLnNlbGVjdF9fZHJvcGRvd24nKSlcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIGRhdGVwaWNrZXJzXG4gIGNvbnN0IGNhbGVuZGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyJylcblxuICBpZiAoY2FsZW5kYXIpIHtcbiAgICBjb25zdCBtb250aHMgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yQWxsKCcuY2FsZW5kYXJfX2l0ZW0gLm1vbnRoJyksXG4gICAgICAgICAgY29udHJvbHMgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKSxcbiAgICAgICAgICBtb250aHNMaXN0ID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19tb250aHMtbGlzdCcpLmNoaWxkcmVuXG5cbiAgICBtb250aHMuZm9yRWFjaCgobW9udGgsIGkpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCksIG5vdy5nZXRNb250aCgpK2kpO1xuXG4gICAgICBsZXQgY3VzdG9tT3B0aW9ucyA9IHtcbiAgICAgICAgcmFuZ2VGcm9tOiBudWxsLFxuICAgICAgICByYW5nZVRvOiBudWxsLFxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRlcGlja2VyID0gJChtb250aCkuZGF0ZXBpY2tlcih7XG4gICAgICAgIHN0YXJ0RGF0ZTogZGF0ZSxcbiAgICAgICAgc2VsZWN0T3RoZXJNb250aHM6ICExLFxuICAgICAgICBrZXlib2FyZE5hdjogITEsXG4gICAgICAgIG11bHRpcGxlRGF0ZXNTZXBhcmF0b3I6ICcnLFxuICAgICAgICBuYXZUaXRsZXM6IHtcbiAgICAgICAgICAgIGRheXM6ICdNTScsXG4gICAgICAgICAgICBtb250aHM6ICd5eXl5JyxcbiAgICAgICAgICAgIHllYXJzOiAneXl5eTEgLSB5eXl5MidcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlbmRlckNlbGwoZGF0ZSwgY2VsbFR5cGUpIHtcbiAgICAgICAgICBjb25zdCB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF5KCksXG4gICAgICAgICAgICAgICAgZnJvbSA9IGNhbGVuZGFyLmRhdGFzZXQuZnJvbSxcbiAgICAgICAgICAgICAgICB0byA9IGNhbGVuZGFyLmRhdGFzZXQudG8sXG4gICAgICAgICAgICAgICAgZnJvbUNlbGwgPSBtb250aC5xdWVyeVNlbGVjdG9yKCcuLXJhbmdlLWZyb20tJyksXG4gICAgICAgICAgICAgICAgdG9DZWxsID0gbW9udGgucXVlcnlTZWxlY3RvcignLi1yYW5nZS10by0nKSxcbiAgICAgICAgICAgICAgICByYW5nZUNlbGxzID0gbW9udGgucXVlcnlTZWxlY3RvckFsbCgnLi1pbi1yYW5nZS0nKVxuXG4gICAgICAgICAgICBpZiAoZnJvbUNlbGwpIHtcbiAgICAgICAgICAgICAgZnJvbUNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnLXJhbmdlLWZyb20tJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRvQ2VsbCkge1xuICAgICAgICAgICAgICB0b0NlbGwuY2xhc3NMaXN0LnJlbW92ZSgnLXJhbmdlLXRvLScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJhbmdlQ2VsbHMuZm9yRWFjaCgoY2VsbCwgaSkgPT4ge1xuICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1pbi1yYW5nZS0nKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKGRhdGUuZ2V0VGltZSgpID09IGZyb20pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiAnLXJhbmdlLWZyb20tJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID09IHRvKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1yYW5nZS10by0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPiBmcm9tICYmIGRhdGUuZ2V0VGltZSgpIDwgdG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiAnLWluLXJhbmdlLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TZWxlY3QoZm9ybWF0dGVkRGF0ZSwgZGF0ZSwgaW5zdCkge1xuICAgICAgICAgIGNvbnN0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXkoKVxuXG4gICAgICAgICAgbGV0IGZyb20gPSBjYWxlbmRhci5kYXRhc2V0LmZyb20sXG4gICAgICAgICAgICAgIHRvID0gY2FsZW5kYXIuZGF0YXNldC50byxcbiAgICAgICAgICAgICAgdGltZVN0YW1wID0gZGF0ZS5nZXRUaW1lKClcblxuICAgICAgICAgIGlmIChmcm9tICYmICF0bykge1xuICAgICAgICAgICAgaWYgKGZyb20gPiB0aW1lU3RhbXApIHtcbiAgICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC50byA9IGZyb21cbiAgICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC5mcm9tID0gdGltZVN0YW1wXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LnRvID0gdGltZVN0YW1wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQuZnJvbSA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgY2FsZW5kYXIucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfSkuZGF0YSgnZGF0ZXBpY2tlcicpXG5cbiAgICAgIGNvbnRyb2xzLmZvckVhY2goKGJ1dHRvbiwgaSkgPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gTnVtYmVyKGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlID0gZGF0ZXBpY2tlci5jdXJyZW50RGF0ZVxuICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIuZGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCktMylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgZGF0ZXBpY2tlci5wcmV2KClcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgZGF0ZXBpY2tlci5uZXh0KClcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRlID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSszKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgbGV0IG1vbnRoSW5kZXggPSBkYXRlcGlja2VyLmN1cnJlbnREYXRlLmdldE1vbnRoKClcbiAgICAgICAgY29uc3QgbW9udGhMb2NhbGUgPSBkYXRlcGlja2VyLmxvYy5tb250aHNTaG9ydFxuXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTI7IGsrKykge1xuICAgICAgICAgIGlmIChtb250aExvY2FsZVttb250aEluZGV4XSA9PSB1bmRlZmluZWQpIG1vbnRoSW5kZXggPSAwXG4gICAgICAgICAgbW9udGhzTGlzdFtrXS50ZXh0Q29udGVudCA9IG1vbnRoTG9jYWxlW21vbnRoSW5kZXhdXG4gICAgICAgICAgKyttb250aEluZGV4XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGF0ZXBpY2tlci5yYW5nZU9wdGlvbnMgPSBjdXN0b21PcHRpb25zXG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNsZWFyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mcm9tJylcbiAgICAgICAgY2FsZW5kYXIucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRvJylcbiAgICAgICAgZGF0ZXBpY2tlci5jbGVhcigpXG4gICAgICB9KVxuXG4gICAgICBjYWxlbmRhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGRhdGVwaWNrZXIudXBkYXRlKClcbiAgICAgIH0pXG5cbiAgICB9KVxuXG4gICAgY29udHJvbHMuZm9yRWFjaCgoYnV0dG9uLCBpKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyksXG4gICAgICAgICAgICAgIHByb2dyZXNzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19wcm9ncmVzcycpLFxuICAgICAgICAgICAgICBtb250aHNJdGVtcyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWxpc3QnKS5jaGlsZHJlbi5sZW5ndGggLSAzLFxuICAgICAgICAgICAgICBtb250aFdpZHRoID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19tb250aHMtaXRlbScpLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICBwcm9ncmVzc0xlZnQgPSAocHJvZ3Jlc3Muc3R5bGUubGVmdCA9PSAnJykgPyAwIDogcGFyc2VJbnQocHJvZ3Jlc3Muc3R5bGUubGVmdCksXG4gICAgICAgICAgICAgIHByb2dyZXNzRW5kID0gbW9udGhXaWR0aCAqIG1vbnRoc0l0ZW1zXG5cbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gcHJvZ3Jlc3NFbmQgKyAncHgnXG4gICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMVxuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIyXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gM1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3NMZWZ0ID09IG1vbnRoV2lkdGgpIHtcbiAgICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAocHJvZ3Jlc3NMZWZ0IC0gbW9udGhXaWR0aCkgKyAncHgnXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjNcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAyXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc0xlZnQgPT0gcHJvZ3Jlc3NFbmQgLSBtb250aFdpZHRoKSB7XG4gICAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKHByb2dyZXNzTGVmdCArIG1vbnRoV2lkdGgpICsgJ3B4J1xuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIwXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gMFxuICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDJcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMVwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDBcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG5cbiAgLy8gc2VsZWN0b3JcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWxlY3Rvcl0nKS5mb3JFYWNoKChzZWxlY3RvciwgaSkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2xpc3QnKSxcbiAgICAgICAgICBpbnB1dCA9IHNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rvcl9faW5wdXQnKVxuXG4gICAgbGV0IGNvdW50ID0gbGlzdC5jaGlsZHJlbi5sZW5ndGhcblxuICAgIGlucHV0LnZhbHVlID0gY291bnRcblxuICAgIHNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZhbHVlXScpLmZvckVhY2goKGl0ZW0sIGspID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBjb25zdCB2YWx1ZSA9IGl0ZW0uZGF0YXNldC52YWx1ZSxcbiAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgICAgIGNvdW50ID0gbGlzdC5jaGlsZHJlbi5sZW5ndGhcblxuICAgICAgICBzZWxlY3Rvckl0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0b3JfX2l0ZW0nKVxuICAgICAgICBzZWxlY3Rvckl0ZW0uaW5uZXJIVE1MID0gYDxzcGFuPiR7dmFsdWV9PC9zcGFuPjxidXR0b24gY2xhc3M9XCJzZWxlY3Rvcl9fcmVtb3ZlXCI+PC9idXR0b24+YFxuXG4gICAgICAgIGxpc3QuYXBwZW5kKHNlbGVjdG9ySXRlbSlcbiAgICAgICAgaW5wdXQudmFsdWUgPSArK2NvdW50XG4gICAgICB9KVxuXG4gICAgfSlcblxuXG4gIH0pXG5cbiAgLy8gdG9nZ2xlXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2dnbGVfX2hlYWRlcicpLmZvckVhY2goKHRvZ2dsZSwgaSkgPT4ge1xuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgdG9nZ2xlLmNsb3Nlc3QoJy50b2dnbGUnKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGVfb3BlbicpXG4gICAgfSlcbiAgfSlcblxuICAvL2NvdW50ZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvdW50ZXInKS5mb3JFYWNoKChjb3VudGVyLCBpKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY291bnRlci1jb250cm9sXScpLmZvckVhY2goKGJ1dHRvbiwgaykgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgbGV0IGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlci12YWx1ZV0nKSxcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IE51bWJlcihjb3VudGVyVmFsdWUuZGF0YXNldC5jb3VudGVyVmFsdWUpXG5cbiAgICAgICAgc3dpdGNoIChOdW1iZXIoYnV0dG9uLmRhdGFzZXQuY291bnRlckNvbnRyb2wpKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAhPSAwKSBjb3VudGVyVmFsdWUuZGF0YXNldC5jb3VudGVyVmFsdWUgPSAtLWN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjb3VudGVyVmFsdWUuZGF0YXNldC5jb3VudGVyVmFsdWUgPSArK2N1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgLy9yZXZpZXdzXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWxpbWl0XScpLmZvckVhY2goKGNvbnRhaW5lciwgaSkgPT4ge1xuICAgIGNvbnN0IGxpbWl0ID0gY29udGFpbmVyLmRhdGFzZXQubGltaXQsXG4gICAgICAgICAgbGlzdCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saW1pdC1saXN0XScpLFxuICAgICAgICAgIGJ1dHRvbiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saW1pdC1kaXNhYmxlXScpXG5cblxuICAgIEFycmF5LmZyb20obGlzdC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgIGlmIChrID49IGxpbWl0KSBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSlcblxuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIEFycmF5LmZyb20obGlzdC5jaGlsZHJlbikuZm9yRWFjaCgoZWwsIGspID0+IHtcbiAgICAgICAgICBpZiAoayA+PSBsaW1pdCkgZWwuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICAgIH0pXG5cbiAgICAgICAgYnV0dG9uLnJlbW92ZSgpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICAvL3RvdGFsIGNsaWNrXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0X29wZW4nKSxcbiAgICAgICAgICBnYWxsZXJ5SXRlbSA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5nYWxsZXJ5X19pdGVtJylcblxuICAgIGlmICghc2VsZWN0ICYmICFbLi4uZS50YXJnZXQuY2xhc3NMaXN0XS5pbmNsdWRlcygnc2VsZWN0b3JfX3JlbW92ZScpICYmICFbLi4uZS50YXJnZXQuY2xhc3NMaXN0XS5pbmNsdWRlcygnZGF0ZXBpY2tlci0tY2VsbCcpKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X29wZW4nKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcbiAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9vcGVuJylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKFsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rvcl9fcmVtb3ZlJykpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBpbnB1dCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3RvcicpLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rvcl9faW5wdXQnKVxuXG4gICAgICBpbnB1dC52YWx1ZSA9IC0taW5wdXQudmFsdWVcblxuICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKVxuICAgIH1cblxuICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnLmRyb3Bfc2hvdycpKSB7XG4gICAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWRyb3BpbmddJykpIHtcbiAgICAgICAgY29uc3Qgc2hvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wX3Nob3cnKVxuICAgICAgICBpZihzaG93KSBzaG93LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3Bfc2hvdycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2FsbGVyeVxuICAgIGlmIChnYWxsZXJ5SXRlbSkge1xuICAgICAgY29uc3QgZ2FsbGVyeSA9IGdhbGxlcnlJdGVtLmNsb3Nlc3QoJy5nYWxsZXJ5JyksXG4gICAgICAgICAgICB2aWV3ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fdmlldycpLFxuICAgICAgICAgICAgaW1hZ2UgPSBnYWxsZXJ5SXRlbS5kYXRhc2V0LmltZyxcbiAgICAgICAgICAgIHNlbGVjdGVkID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpLFxuICAgICAgICAgICAgY291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19jb3VudCcpXG5cbiAgICAgIGlmIChzZWxlY3RlZCkgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICBnYWxsZXJ5SXRlbS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtX3NlbGVjdGVkJylcbiAgICAgIHZpZXcucXVlcnlTZWxlY3RvcignaW1nJykuc3JjID0gaW1hZ2VcblxuICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgIGNvdW50LmRhdGFzZXQuZ2FsbGVyeUNvdW50Q3VycmVudCA9IE51bWJlcihnYWxsZXJ5SXRlbS5kYXRhc2V0LmluZGV4KSsxXG4gICAgICB9XG4gICAgfVxuXG4gIH0pXG5cbiAgLy8gZ2FsbGVyeSBjb3VudFxuXG4gIC8vIGdhbGxlcnkgdHJpZ2dlclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeScpLmZvckVhY2goKGdhbGxlcnksIGkpID0+IHtcbiAgICBjb25zdCBjb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2NvdW50JyksXG4gICAgICAgICAgZ2FsbGVyeUxpc3RDb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2xpc3QnKS5jaGlsZHJlbi5sZW5ndGhcblxuICAgIGlmIChjb3VudCkge1xuICAgICAgY291bnQuZGF0YXNldC5nYWxsZXJ5Q291bnRBbGwgPSBnYWxsZXJ5TGlzdENvdW50XG5cbiAgICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzXScpLmRhdGFzZXQuZ2FsbGVyeUNvbnRyb2xzKVxuICAgICAgICBsZXQgaW5kZXggPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19pdGVtX3NlbGVjdGVkJykuZGF0YXNldC5pbmRleFxuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gZ2FsbGVyeUxpc3RDb3VudCAtIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC0taW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBnYWxsZXJ5TGlzdENvdW50IC0gMSkge1xuICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICsraW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKGAuZ2FsbGVyeV9faXRlbVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKS5jbGljaygpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW06Zmlyc3QtY2hpbGQnKS5jbGljaygpXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ2FsbGVyeS1jb250b2xzXScpLmZvckVhY2goKGNvbnRyb2xzLCBpKSA9PiB7XG4gICAgY29uc3QgZ2FsbGVyeSA9IGNvbnRyb2xzLmNsb3Nlc3QoJy5nYWxsZXJ5JyksXG4gICAgICAgICAgZ2FsbGVyeUxpc3QgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19saXN0JylcbiAgICBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzLXByZXZdJylcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1vcGVuXScpLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHtcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCB0ID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtbW9kYWwtb3Blbl0nKSxcbiAgICAgICAgICAgIGRhdGEgPSB0LmRhdGFzZXQubW9kYWxPcGVuLFxuICAgICAgICAgICAgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYClcblxuICAgICAgbGV0IG1vZGFsQ29udGVudCA9IG1vZGFsRWxlbWVudC5pbm5lckhUTUxcblxuICAgICAgaWYgKGRhdGEgPT0gJ2dhbGxlcnknKSB7XG4gICAgICAgIG1vZGFsQ29udGVudCA9IHQuaW5uZXJIVE1MXG4gICAgICB9XG5cbiAgICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0XG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChtb2RhbENvbnRlbnQpXG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgICAgY29uc3QgZm9ybXMgPSBtb2RhbC5tb2RhbEJveENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpXG5cbiAgICAgIGZvcm1zLmZvckVhY2goKGZvcm0sIGkpID0+IHtcbiAgICAgICAgZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcbiAgICAgICAgICBuZXcgQ3VzdG9tU2VsZWN0KHtcbiAgICAgICAgICAgIGVsZW06IHNlbGVjdFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBwaG9uZU1hc2soKVxuXG4gICAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy9kcm9wXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BpbmddJykuZm9yRWFjaCgoZHJvcCwgaSkgPT4ge1xuICAgIGRyb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmICghZS50YXJnZXQuZGF0YXNldC5kcm9waW5nKSByZXR1cm5cblxuICAgICAgY29uc3QgZGF0YSA9IGRyb3AuZGF0YXNldC5kcm9waW5nLFxuICAgICAgICAgICAgZHJvcHBlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3BwZWQ9XCIke2RhdGF9XCJdYClcblxuICAgICAgZHJvcHBlZC5jbGFzc0xpc3QudG9nZ2xlKCdkcm9wX3Nob3cnKVxuICAgIH0pXG4gIH0pXG5cbiAgLy9yYXRpbmdcbiAgY29uc3QgdHJpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmdfdHJpcCcpXG5cbiAgaWYgKHRyaXApIHtcbiAgICBjb25zdCB0cmlwVmFsdWUgPSAoTnVtYmVyKHRyaXAucXVlcnlTZWxlY3RvcignW2RhdGEtdmFsdWVdJykuZGF0YXNldC52YWx1ZSkgKiAxMCkgKiAyLFxuICAgICAgICAgIHRyaXBQcm9ncmVzcyA9IHRyaXAucXVlcnlTZWxlY3RvcignLnJhdGluZ19fcHJvZ3Jlc3MnKVxuXG4gICAgdHJpcFByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7dHJpcFZhbHVlfSVgXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pbWFnZV0nKS5mb3JFYWNoKChpbWFnZSwgaSkgPT4ge1xuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBzcmMgPSBpbWFnZS5kYXRhc2V0LmltYWdlLFxuICAgICAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblxuICAgICAgaW1nLnNyYyA9IHNyY1xuXG4gICAgICBsZXQgbW9kYWwgPSBuZXcgdGluZ2xlLm1vZGFsKHtcbiAgICAgICAgY2xvc2VNZXRob2RzOiBbJ292ZXJsYXknLCAnZXNjYXBlJ10sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjc3NDbGFzczogWydtb2RhbCcsICdtb2RhbF9nYWxsZXJ5J10sXG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChpbWcpO1xuICAgICAgbW9kYWwub3BlbigpXG5cbiAgICB9KVxuICB9KVxuXG4gIC8vINCo0LDQs9C4XG5cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdGVwLWJ1dHRvbl0nKS5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSBidXR0b24uZGF0YXNldC5zdGVwQnV0dG9uLFxuICAgICAgICAgICAgY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGVwLWNvbnRlbnRfY3VycmVudCcpLFxuICAgICAgICAgICAgc3RlcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0ZXBdJylcblxuICAgICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLWNvbnRlbnRfY3VycmVudCcpXG4gICAgICBsZXQgaW5kZXggPSBOdW1iZXIoY3VycmVudC5kYXRhc2V0LnN0ZXBDb250ZW50KVxuXG4gICAgICBzd2l0Y2ggKGRhdGEpIHtcbiAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc3RlcC1jb250ZW50PVwiJHsrK2luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtY29udGVudF9jdXJyZW50JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdwcmV2JzpcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zdGVwLWNvbnRlbnQ9XCIkey0taW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc3RlcC1jb250ZW50X2N1cnJlbnQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIHN0ZXAuZm9yRWFjaCgoc3RlcCwgaykgPT4ge1xuICAgICAgICBzdGVwLmRhdGFzZXQuc3RlcCA9IGluZGV4XG4gICAgICB9KVxuXG4gICAgfSlcbiAgfSlcblxuICAvLyDQn9C10YfQsNGC0YxcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJpbnRdJykuZm9yRWFjaCgocHJpbnQsIGkpID0+IHtcbiAgICBwcmludC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBwcmludEhUTUwgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wcmludC1jb250ZW50XScpLmlubmVySFRNTCxcbiAgICAgICAgICAgIHByaW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW50U2VsZWN0aW9uJylcblxuICAgICAgcHJpbnRDb250YWluZXIuaW5uZXJIVE1MID0gcHJpbnRIVE1MXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgncHJpbnRTZWxlY3RlZCcpXG5cbiAgICAgIHdpbmRvdy5wcmludCgpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW50U2VsZWN0ZWQnKVxuICAgICAgfSwgMClcbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1hcF0nKS5mb3JFYWNoKChidG4sIGkpID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW2RhdGEtdGFiPVwiMVwiXScpLmNsaWNrKClcbiAgICB9KVxuICB9KVxuXG4gIC8v0JjQvNC40YLQsNGG0LjRjyDQt9Cw0LPRgNGD0LfQutC4XG4gIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZycpO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgY29uc3QgdmFsdWVFbGVtZW50ID0gbG9hZGluZy5xdWVyeVNlbGVjdG9yKCcubG9hZGluZ19fdmFsdWUnKTtcbiAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nX3Byb2Nlc3MnKVxuXG4gICAgbGV0IHByb2Nlc3MgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB2YWx1ZSArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDUpKVxuICAgICAgdmFsdWVFbGVtZW50LmlubmVySFRNTCA9ICh2YWx1ZSA+PSAxMDApID8gMTAwIDogdmFsdWVcblxuICAgICAgaWYgKHZhbHVlID49IDEwMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHByb2Nlc3MpXG4gICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgnbG9hZGluZ19maW5pc2gnKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9hZGluZy1wcm9jZXNzJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nLXByb2Nlc3NfZmluaXNoJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCAxMDApXG4gIH1cblxufSkod2luZG93KTtcbiJdfQ==
