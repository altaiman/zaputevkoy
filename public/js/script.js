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
    if (select.closest('.modal')) {
      return;
    }

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

  document.querySelectorAll('[data-modal-open]').forEach(function (trigger, i) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      var t = e.target.closest('[data-modal-open]'),
          data = t.dataset.modalOpen,
          modalElement = document.querySelector('[data-modal="' + data + '"]'),
          scroll = $(window).scrollTop();

      if (data == 'gallery') {
        modalElement.querySelector('.modal__content').innerHTML = t.innerHTML;
      }

      var modalContent = modalElement.innerHTML;

      var modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function onClose() {
          $(window).scrollTop(scroll);

          try {
            this.remove();
          } catch (e) {}
        },
        cssClass: modalElement.classList
      });

      modal.setContent(modalContent);
      modal.open();

      if (data == 'map') {
        var coords = t.dataset.coords;

        new ymaps.Map($('.modal__content_map').get(0), {
          center: coords.split(','),
          zoom: 16,
          controls: []
        });
      }

      if (data == 'gallery') {
        var g = e.target.closest('.gallery');

        modal.modalBoxContent.querySelectorAll('[data-gallery-controls]').forEach(function (arrow, k) {
          arrow.addEventListener('click', function (e) {
            var direction = Number(e.target.closest('[data-gallery-controls]').dataset.galleryControls),
                selected = g.querySelector('.gallery__item_selected');
            var newSelected = void 0;

            switch (direction) {
              case 0:
                newSelected = selected.previousElementSibling;

                if (!newSelected) {
                  newSelected = selected.parentNode.children[selected.parentNode.children.length - 1];
                }
                break;

              case 1:
                newSelected = selected.nextElementSibling;

                if (!newSelected) {
                  newSelected = selected.parentNode.children[0];
                }
                break;
            }

            var img = newSelected.dataset.img;
            modal.modalBoxContent.querySelector('img').src = img;
            selected.classList.remove('gallery__item_selected');
            newSelected.classList.add('gallery__item_selected');
          });
        });
      }

      var forms = modal.modalBoxContent.querySelectorAll('form');

      forms.forEach(function (form, i) {
        form.querySelectorAll('select').forEach(function (select, i) {

          new CustomSelect({
            elem: select
          });

          form.querySelector('.select button').addEventListener('click', function (e) {
            e.preventDefault();
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
        printContainer.innerHTML = '';
      }, 0);
    });
  });

  // address search
  var addressSearchForm = $('#address-search');

  if (addressSearchForm) {
    var field = $(addressSearchForm).find('input');

    $(field).on('keyup', function (e) {
      var value = $(this).val().toLowerCase();

      $('[data-address]').each(function (i, address) {
        if ($(address).text().toLowerCase().includes(value)) {
          $(address).closest('.office').show();
        } else {
          $(address).closest('.office').hide();
        }
      });

      $('[data-tab="0"]').trigger('click');
    });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInBob25lTWFzayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsImsiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0cmltIiwiVk1hc2tlciIsInRvUGF0dGVybiIsInBhdHRlcm4iLCJzbGlkZXJPcHRpb25zIiwiZnJlZVNjcm9sbCIsImNlbGxBbGlnbiIsImNvbnRhaW4iLCJ3cmFwQXJvdW5kIiwicGFnZURvdHMiLCJwcmV2TmV4dEJ1dHRvbnMiLCJsYXp5TG9hZCIsImFkYXB0aXZlSGVpZ2h0IiwiaXRlbXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJyZW1vdmUiLCJlbCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0IiwidCIsInRhZ05hbWUiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJwYXJlbnROb2RlIiwidGFic0NvbnRlbnQiLCJpbmRleCIsInNob3dpbmciLCJzZWxlY3RlZCIsImFkZCIsImNsaWNrIiwic2VsZWN0IiwiQ3VzdG9tU2VsZWN0IiwiZWxlbSIsImluY2x1ZGVzIiwiY2FsZW5kYXIiLCJtb250aHMiLCJtb250aHNMaXN0IiwibW9udGgiLCJub3ciLCJEYXRlIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJjdXN0b21PcHRpb25zIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImRhdGVwaWNrZXIiLCIkIiwic3RhcnREYXRlIiwic2VsZWN0T3RoZXJNb250aHMiLCJrZXlib2FyZE5hdiIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJuYXZUaXRsZXMiLCJkYXlzIiwieWVhcnMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsInkiLCJtIiwiZCIsImdldERhdGUiLCJkYXkiLCJnZXREYXkiLCJmcm9tIiwidG8iLCJmcm9tQ2VsbCIsInRvQ2VsbCIsInJhbmdlQ2VsbHMiLCJjZWxsIiwiZ2V0VGltZSIsImNsYXNzZXMiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJpbnN0IiwidGltZVN0YW1wIiwicmVtb3ZlQXR0cmlidXRlIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwiTnVtYmVyIiwiY2FsZW5kYXJDb250cm9scyIsImN1cnJlbnREYXRlIiwicHJldiIsIm1vbnRoSW5kZXgiLCJtb250aExvY2FsZSIsImxvYyIsIm1vbnRoc1Nob3J0IiwidW5kZWZpbmVkIiwicmFuZ2VPcHRpb25zIiwiY2xlYXIiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsIm1vbnRoc0l0ZW1zIiwibW9udGhXaWR0aCIsInByb2dyZXNzTGVmdCIsInN0eWxlIiwibGVmdCIsInBhcnNlSW50IiwicHJvZ3Jlc3NFbmQiLCJzZWxlY3RvciIsImxpc3QiLCJjb3VudCIsIml0ZW0iLCJzZWxlY3Rvckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiY291bnRlciIsImNvdW50ZXJWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsImNvdW50ZXJDb250cm9sIiwibGltaXQiLCJBcnJheSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJnYWxsZXJ5SXRlbSIsInNob3ciLCJnYWxsZXJ5IiwidmlldyIsImltYWdlIiwiaW1nIiwic3JjIiwiZ2FsbGVyeUNvdW50Q3VycmVudCIsImdhbGxlcnlMaXN0Q291bnQiLCJnYWxsZXJ5Q291bnRBbGwiLCJnYWxsZXJ5Q29udHJvbHMiLCJ0cmlnZ2VyIiwibW9kYWxPcGVuIiwibW9kYWxFbGVtZW50Iiwic2Nyb2xsIiwid2luZG93Iiwic2Nyb2xsVG9wIiwibW9kYWxDb250ZW50IiwibW9kYWwiLCJ0aW5nbGUiLCJjbG9zZU1ldGhvZHMiLCJvbkNsb3NlIiwiY3NzQ2xhc3MiLCJzZXRDb250ZW50Iiwib3BlbiIsImNvb3JkcyIsInltYXBzIiwiTWFwIiwiZ2V0IiwiY2VudGVyIiwic3BsaXQiLCJ6b29tIiwiZyIsIm1vZGFsQm94Q29udGVudCIsImFycm93IiwibmV3U2VsZWN0ZWQiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZm9ybXMiLCJmb3JtIiwiY2xvc2UiLCJkcm9wIiwiZHJvcGluZyIsImRyb3BwZWQiLCJ0cmlwIiwidHJpcFZhbHVlIiwidHJpcFByb2dyZXNzIiwid2lkdGgiLCJzdGVwQnV0dG9uIiwiY3VycmVudCIsInN0ZXAiLCJzdGVwQ29udGVudCIsInByaW50IiwicHJpbnRIVE1MIiwicHJpbnRDb250YWluZXIiLCJzZXRUaW1lb3V0IiwiYWRkcmVzc1NlYXJjaEZvcm0iLCJmaWVsZCIsImZpbmQiLCJvbiIsInZhbCIsInRvTG93ZXJDYXNlIiwiZWFjaCIsImFkZHJlc3MiLCJoaWRlIiwibG9hZGluZyIsInZhbHVlRWxlbWVudCIsInByb2Nlc3MiLCJzZXRJbnRlcnZhbCIsImZsb29yIiwicmFuZG9tIiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsSUFBVCxFQUFlOztBQUVkO0FBQ0FDOztBQUVBLFdBQVNDLFNBQVQsR0FBcUI7QUFDbkJDLGFBQVNDLGdCQUFULENBQTBCLG1CQUExQixFQUErQ0MsT0FBL0MsQ0FBdUQsVUFBQ0MsS0FBRCxFQUFRQyxDQUFSLEVBQWM7QUFDbkVELFlBQU1FLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUND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QUFFQSxNQUFJNkwsT0FBSixFQUFhO0FBQ1gsUUFBTUMsZUFBZUQsUUFBUTdMLGFBQVIsQ0FBc0IsaUJBQXRCLENBQXJCO0FBQ0EsUUFBSXJCLFFBQVEsQ0FBWjs7QUFFQWtOLFlBQVF2SyxTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0IsaUJBQXRCOztBQUVBLFFBQUl5SixVQUFVQyxZQUFZLFlBQU07QUFDOUJyTixlQUFTNkIsS0FBS3lMLEtBQUwsQ0FBV3pMLEtBQUswTCxNQUFMLEtBQWdCMUwsS0FBS3lMLEtBQUwsQ0FBVyxDQUFYLENBQTNCLENBQVQ7QUFDQUgsbUJBQWE1RSxTQUFiLEdBQTBCdkksU0FBUyxHQUFWLEdBQWlCLEdBQWpCLEdBQXVCQSxLQUFoRDs7QUFFQSxVQUFJQSxTQUFTLEdBQWIsRUFBa0I7QUFDaEJ3TixzQkFBY0osT0FBZDtBQUNBRixnQkFBUXZLLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQixnQkFBdEI7QUFDQW5FLGlCQUFTQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENDLE9BQTlDLENBQXNELFVBQUM4QyxFQUFELEVBQUtyQixDQUFMLEVBQVc7QUFDL0RxQixhQUFHRyxTQUFILENBQWFnQixHQUFiLENBQWlCLHdCQUFqQjtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBWGEsRUFXWCxHQVhXLENBQWQ7QUFZRDtBQUVGLENBMXdCRCxFQTB3QkdxRyxNQTF3QkgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KCk7XG5cbiAgZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKS5mb3JFYWNoKChpbnB1dCwgaykgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBsZXQgdiA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJys3JywgJycpLnRyaW0oKVxuICAgICAgICBpbnB1dC52YWx1ZSA9IFZNYXNrZXIudG9QYXR0ZXJuKHYsIHtwYXR0ZXJuOiBcIis3ICg5OTkpIDk5OS05OS05OVwifSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHBob25lTWFzaygpXG5cbiAgLy8gc2xpZGVyIG9wdGlvbnNcbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnYmFubmVyJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IHRydWUsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgbGF6eUxvYWQ6IHRydWVcbiAgICB9LFxuICAgICdmdWxsJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAnc2l4LWl0ZW1zJzoge1xuICAgICAgaXRlbXM6IDYsXG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdyZXZpZXdzJzoge1xuICAgICAgYXV0b1BsYXk6IDMwMDAsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ2dhbGxlcnknOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJylcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXSk7XG5cbiAgICAgIGNvbnRyb2xzUHJldlxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGZsa3R5LnByZXZpb3VzKClcbiAgICAgICAgfSlcblxuICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoc2xpZGVyT3B0aW9uc1tzbGlkZXIuZGF0YXNldC5zbGlkZXJdLmNvbnRyb2xzID09PSBmYWxzZSkge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9yZV0nKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLW1vcmUtYWN0aW9uXScpXG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb3JlJylcblxuICAgIH0pXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlXScpLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LnRvZ2dsZVxuICAgICAgbGV0IHQgPSBlbFxuXG4gICAgICBpZiAodC50YWdOYW1lID09ICdCVVRUT04nKSB7XG4gICAgICAgIGNvbnN0IHNwYW4gPSB0LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICAgICAgICB0LmRhdGFzZXQudG9nZ2xlID0gdC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgdCA9IHNwYW5cbiAgICAgIH1cblxuICAgICAgdC50ZXh0Q29udGVudCA9IHRleHRcbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnNdJykuZm9yRWFjaCgodGFicywgaSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB0YWJzLmRhdGFzZXQudGFicyxcbiAgICAgICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFicy1jb250ZW50PSR7ZGF0YX1dYClcblxuICAgIHRhYnMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpLmZvckVhY2goKHRhYiwgaykgPT4ge1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgaWYgKHRhYi5wYXJlbnROb2RlLmRhdGFzZXQudGFic0NvbnRlbnQpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFiLmRhdGFzZXQudGFiLFxuICAgICAgICAgICAgICBzaG93aW5nID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCcuc2hvd2luZycpLFxuICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRhYnMucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJylcblxuICAgICAgICBpZiAoc2hvd2luZykgc2hvd2luZy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93aW5nJylcbiAgICAgICAgaWYgKHNlbGVjdGVkKSBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIGNvbnRlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPVwiJHtpbmRleH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzaG93aW5nJylcbiAgICAgIH0pXG5cbiAgICB9KVxuICAgIHRhYnMucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPVwiMFwiXWApLmNsaWNrKClcbiAgfSlcblxuICAvLyBzZWxlY3RcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgaWYgKHNlbGVjdC5jbG9zZXN0KCcubW9kYWwnKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbmV3IEN1c3RvbVNlbGVjdCh7XG4gICAgICBlbGVtOiBzZWxlY3RcbiAgICB9KTtcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wXScpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuXG4gICAgc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5qcy1Ecm9wZG93bi10aXRsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBpZiAoWy4uLnNlbGVjdC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rfb3BlbicpKSB7XG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X29wZW4nKS5mb3JFYWNoKChzZWxlY3QsIGspID0+IHtcbiAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgICB9KVxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZCgnc2VsZWN0X29wZW4nKVxuXG4gICAgICAgIC8vIG5ldyBTaW1wbGVCYXIoc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2Ryb3Bkb3duJykpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyBkYXRlcGlja2Vyc1xuICBjb25zdCBjYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcicpXG5cbiAgaWYgKGNhbGVuZGFyKSB7XG4gICAgY29uc3QgbW9udGhzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyX19pdGVtIC5tb250aCcpLFxuICAgICAgICAgIGNvbnRyb2xzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJyksXG4gICAgICAgICAgbW9udGhzTGlzdCA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWxpc3QnKS5jaGlsZHJlblxuXG4gICAgbW9udGhzLmZvckVhY2goKG1vbnRoLCBpKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKStpKTtcblxuICAgICAgbGV0IGN1c3RvbU9wdGlvbnMgPSB7XG4gICAgICAgIHJhbmdlRnJvbTogbnVsbCxcbiAgICAgICAgcmFuZ2VUbzogbnVsbCxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZXBpY2tlciA9ICQobW9udGgpLmRhdGVwaWNrZXIoe1xuICAgICAgICBzdGFydERhdGU6IGRhdGUsXG4gICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiAhMSxcbiAgICAgICAga2V5Ym9hcmROYXY6ICExLFxuICAgICAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnJyxcbiAgICAgICAgbmF2VGl0bGVzOiB7XG4gICAgICAgICAgICBkYXlzOiAnTU0nLFxuICAgICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgICB5ZWFyczogJ3l5eXkxIC0geXl5eTInXG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZW5kZXJDZWxsKGRhdGUsIGNlbGxUeXBlKSB7XG4gICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGZyb20gPSBjYWxlbmRhci5kYXRhc2V0LmZyb20sXG4gICAgICAgICAgICAgICAgdG8gPSBjYWxlbmRhci5kYXRhc2V0LnRvLFxuICAgICAgICAgICAgICAgIGZyb21DZWxsID0gbW9udGgucXVlcnlTZWxlY3RvcignLi1yYW5nZS1mcm9tLScpLFxuICAgICAgICAgICAgICAgIHRvQ2VsbCA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3IoJy4tcmFuZ2UtdG8tJyksXG4gICAgICAgICAgICAgICAgcmFuZ2VDZWxscyA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3JBbGwoJy4taW4tcmFuZ2UtJylcblxuICAgICAgICAgICAgaWYgKGZyb21DZWxsKSB7XG4gICAgICAgICAgICAgIGZyb21DZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1yYW5nZS1mcm9tLScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b0NlbGwpIHtcbiAgICAgICAgICAgICAgdG9DZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1yYW5nZS10by0nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5nZUNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctaW4tcmFuZ2UtJylcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkYXRlLmdldFRpbWUoKSA9PSBmcm9tKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1yYW5nZS1mcm9tLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA9PSB0bykge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctcmFuZ2UtdG8tJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID4gZnJvbSAmJiBkYXRlLmdldFRpbWUoKSA8IHRvKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG9uU2VsZWN0KGZvcm1hdHRlZERhdGUsIGRhdGUsIGluc3QpIHtcbiAgICAgICAgICBjb25zdCB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF5KClcblxuICAgICAgICAgIGxldCBmcm9tID0gY2FsZW5kYXIuZGF0YXNldC5mcm9tLFxuICAgICAgICAgICAgICB0byA9IGNhbGVuZGFyLmRhdGFzZXQudG8sXG4gICAgICAgICAgICAgIHRpbWVTdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG5cbiAgICAgICAgICBpZiAoZnJvbSAmJiAhdG8pIHtcbiAgICAgICAgICAgIGlmIChmcm9tID4gdGltZVN0YW1wKSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQudG8gPSBmcm9tXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQuZnJvbSA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC50byA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LmZyb20gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10bycpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH0pLmRhdGEoJ2RhdGVwaWNrZXInKVxuXG4gICAgICBjb250cm9scy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZSA9IGRhdGVwaWNrZXIuY3VycmVudERhdGVcbiAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLmRhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLTMpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIucHJldigpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIubmV4dCgpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIuZGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCkrMylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgIGxldCBtb250aEluZGV4ID0gZGF0ZXBpY2tlci5jdXJyZW50RGF0ZS5nZXRNb250aCgpXG4gICAgICAgIGNvbnN0IG1vbnRoTG9jYWxlID0gZGF0ZXBpY2tlci5sb2MubW9udGhzU2hvcnRcblxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDEyOyBrKyspIHtcbiAgICAgICAgICBpZiAobW9udGhMb2NhbGVbbW9udGhJbmRleF0gPT0gdW5kZWZpbmVkKSBtb250aEluZGV4ID0gMFxuICAgICAgICAgIG1vbnRoc0xpc3Rba10udGV4dENvbnRlbnQgPSBtb250aExvY2FsZVttb250aEluZGV4XVxuICAgICAgICAgICsrbW9udGhJbmRleFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRhdGVwaWNrZXIucmFuZ2VPcHRpb25zID0gY3VzdG9tT3B0aW9uc1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jbGVhcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZnJvbScpXG4gICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10bycpXG4gICAgICAgIGRhdGVwaWNrZXIuY2xlYXIoKVxuICAgICAgfSlcblxuICAgICAgY2FsZW5kYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkYXRlcGlja2VyLnVwZGF0ZSgpXG4gICAgICB9KVxuXG4gICAgfSlcblxuICAgIGNvbnRyb2xzLmZvckVhY2goKGJ1dHRvbiwgaSkgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gTnVtYmVyKGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMpLFxuICAgICAgICAgICAgICBwcm9ncmVzcyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fcHJvZ3Jlc3MnKSxcbiAgICAgICAgICAgICAgbW9udGhzSXRlbXMgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1saXN0JykuY2hpbGRyZW4ubGVuZ3RoIC0gMyxcbiAgICAgICAgICAgICAgbW9udGhXaWR0aCA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWl0ZW0nKS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NMZWZ0ID0gKHByb2dyZXNzLnN0eWxlLmxlZnQgPT0gJycpID8gMCA6IHBhcnNlSW50KHByb2dyZXNzLnN0eWxlLmxlZnQpLFxuICAgICAgICAgICAgICBwcm9ncmVzc0VuZCA9IG1vbnRoV2lkdGggKiBtb250aHNJdGVtc1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IHByb2dyZXNzRW5kICsgJ3B4J1xuICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDFcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMlwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKHByb2dyZXNzTGVmdCA9PSBtb250aFdpZHRoKSB7XG4gICAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKHByb2dyZXNzTGVmdCAtIG1vbnRoV2lkdGgpICsgJ3B4J1xuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIzXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3NMZWZ0ID09IHByb2dyZXNzRW5kIC0gbW9udGhXaWR0aCkge1xuICAgICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChwcm9ncmVzc0xlZnQgKyBtb250aFdpZHRoKSArICdweCdcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMFwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDFcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IDBcbiAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAyXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjFcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAwXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuXG4gIC8vIHNlbGVjdG9yXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VsZWN0b3JdJykuZm9yRWFjaCgoc2VsZWN0b3IsIGkpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19saXN0JyksXG4gICAgICAgICAgaW5wdXQgPSBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2lucHV0JylcblxuICAgIGxldCBjb3VudCA9IGxpc3QuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICBpbnB1dC52YWx1ZSA9IGNvdW50XG5cbiAgICBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12YWx1ZV0nKS5mb3JFYWNoKChpdGVtLCBrKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWUsXG4gICAgICAgICAgICAgIHNlbGVjdG9ySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBjb3VudCA9IGxpc3QuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICAgICAgc2VsZWN0b3JJdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdG9yX19pdGVtJylcbiAgICAgICAgc2VsZWN0b3JJdGVtLmlubmVySFRNTCA9IGA8c3Bhbj4ke3ZhbHVlfTwvc3Bhbj48YnV0dG9uIGNsYXNzPVwic2VsZWN0b3JfX3JlbW92ZVwiPjwvYnV0dG9uPmBcblxuICAgICAgICBsaXN0LmFwcGVuZChzZWxlY3Rvckl0ZW0pXG4gICAgICAgIGlucHV0LnZhbHVlID0gKytjb3VudFxuICAgICAgfSlcblxuICAgIH0pXG5cblxuICB9KVxuXG4gIC8vIHRvZ2dsZVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9nZ2xlX19oZWFkZXInKS5mb3JFYWNoKCh0b2dnbGUsIGkpID0+IHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIHRvZ2dsZS5jbG9zZXN0KCcudG9nZ2xlJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlX29wZW4nKVxuICAgIH0pXG4gIH0pXG5cbiAgLy9jb3VudGVyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3VudGVyJykuZm9yRWFjaCgoY291bnRlciwgaSkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvdW50ZXItY29udHJvbF0nKS5mb3JFYWNoKChidXR0b24sIGspID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGxldCBjb3VudGVyVmFsdWUgPSBjb3VudGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXItdmFsdWVdJyksXG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBOdW1iZXIoY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlKVxuXG4gICAgICAgIHN3aXRjaCAoTnVtYmVyKGJ1dHRvbi5kYXRhc2V0LmNvdW50ZXJDb250cm9sKSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT0gMCkgY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlID0gLS1jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlID0gKytjdXJyZW50VmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIC8vcmV2aWV3c1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1saW1pdF0nKS5mb3JFYWNoKChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IGNvbnRhaW5lci5kYXRhc2V0LmxpbWl0LFxuICAgICAgICAgIGxpc3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGltaXQtbGlzdF0nKSxcbiAgICAgICAgICBidXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGltaXQtZGlzYWJsZV0nKVxuXG5cbiAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICBpZiAoayA+PSBsaW1pdCkgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0pXG5cbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgICAgaWYgKGsgPj0gbGltaXQpIGVsLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGJ1dHRvbi5yZW1vdmUoKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgLy90b3RhbCBjbGlja1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdF9vcGVuJyksXG4gICAgICAgICAgZ2FsbGVyeUl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KCcuZ2FsbGVyeV9faXRlbScpXG5cbiAgICBpZiAoIXNlbGVjdCAmJiAhWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdG9yX19yZW1vdmUnKSAmJiAhWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ2RhdGVwaWNrZXItLWNlbGwnKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9vcGVuJykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChbLi4uZS50YXJnZXQuY2xhc3NMaXN0XS5pbmNsdWRlcygnc2VsZWN0b3JfX3JlbW92ZScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgaW5wdXQgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0b3InKS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2lucHV0JylcblxuICAgICAgaW5wdXQudmFsdWUgPSAtLWlucHV0LnZhbHVlXG5cbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wX3Nob3cnKSkge1xuICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1kcm9waW5nXScpKSB7XG4gICAgICAgIGNvbnN0IHNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcF9zaG93JylcbiAgICAgICAgaWYoc2hvdykgc2hvdy5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wX3Nob3cnKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdhbGxlcnlcbiAgICBpZiAoZ2FsbGVyeUl0ZW0pIHtcbiAgICAgIGNvbnN0IGdhbGxlcnkgPSBnYWxsZXJ5SXRlbS5jbG9zZXN0KCcuZ2FsbGVyeScpLFxuICAgICAgICAgICAgdmlldyA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX3ZpZXcnKSxcbiAgICAgICAgICAgIGltYWdlID0gZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbWcsXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgIGNvdW50ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fY291bnQnKVxuXG4gICAgICBpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKVxuICAgICAgZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICB2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IGltYWdlXG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBjb3VudC5kYXRhc2V0LmdhbGxlcnlDb3VudEN1cnJlbnQgPSBOdW1iZXIoZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbmRleCkrMVxuICAgICAgfVxuICAgIH1cblxuICB9KVxuXG4gIC8vIGdhbGxlcnkgdHJpZ2dlclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeScpLmZvckVhY2goKGdhbGxlcnksIGkpID0+IHtcbiAgICBjb25zdCBjb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2NvdW50JyksXG4gICAgICAgICAgZ2FsbGVyeUxpc3RDb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2xpc3QnKS5jaGlsZHJlbi5sZW5ndGhcblxuICAgIGlmIChjb3VudCkge1xuICAgICAgY291bnQuZGF0YXNldC5nYWxsZXJ5Q291bnRBbGwgPSBnYWxsZXJ5TGlzdENvdW50XG5cbiAgICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzXScpLmRhdGFzZXQuZ2FsbGVyeUNvbnRyb2xzKVxuICAgICAgICBsZXQgaW5kZXggPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19pdGVtX3NlbGVjdGVkJykuZGF0YXNldC5pbmRleFxuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgaW5kZXggPSBnYWxsZXJ5TGlzdENvdW50IC0gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLS1pbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKGluZGV4ID09IGdhbGxlcnlMaXN0Q291bnQgLSAxKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gMFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgKytpbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoYC5nYWxsZXJ5X19pdGVtW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApLmNsaWNrKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbTpmaXJzdC1jaGlsZCcpLmNsaWNrKClcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1vcGVuXScpLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHtcbiAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCB0ID0gZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtbW9kYWwtb3Blbl0nKSxcbiAgICAgICAgICAgIGRhdGEgPSB0LmRhdGFzZXQubW9kYWxPcGVuLFxuICAgICAgICAgICAgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYCksXG4gICAgICAgICAgICBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcblxuICAgICAgaWYgKGRhdGEgPT0gJ2dhbGxlcnknKSB7XG4gICAgICAgIG1vZGFsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2NvbnRlbnQnKS5pbm5lckhUTUwgPSB0LmlubmVySFRNTFxuICAgICAgfVxuXG4gICAgICBsZXQgbW9kYWxDb250ZW50ID0gbW9kYWxFbGVtZW50LmlubmVySFRNTFxuXG4gICAgICBsZXQgbW9kYWwgPSBuZXcgdGluZ2xlLm1vZGFsKHtcbiAgICAgICAgY2xvc2VNZXRob2RzOiBbJ292ZXJsYXknLCAnZXNjYXBlJ10sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQod2luZG93KS5zY3JvbGxUb3Aoc2Nyb2xsKVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0XG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChtb2RhbENvbnRlbnQpXG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgICAgaWYgKGRhdGEgPT0gJ21hcCcpIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gdC5kYXRhc2V0LmNvb3Jkc1xuXG4gICAgICAgIG5ldyB5bWFwcy5NYXAoJCgnLm1vZGFsX19jb250ZW50X21hcCcpLmdldCgwKSwge1xuICAgICAgICAgICAgY2VudGVyOiBjb29yZHMuc3BsaXQoJywnKSxcbiAgICAgICAgICAgIHpvb206IDE2LFxuICAgICAgICAgICAgY29udHJvbHM6IFtdXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YSA9PSAnZ2FsbGVyeScpIHtcbiAgICAgICAgY29uc3QgZyA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5nYWxsZXJ5JylcblxuICAgICAgICBtb2RhbC5tb2RhbEJveENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5mb3JFYWNoKChhcnJvdywgaykgPT4ge1xuICAgICAgICAgIGFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzXScpLmRhdGFzZXQuZ2FsbGVyeUNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICAgICAgICBsZXQgbmV3U2VsZWN0ZWRcblxuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGVkID0gc2VsZWN0ZWQucHJldmlvdXNFbGVtZW50U2libGluZ1xuXG4gICAgICAgICAgICAgICAgaWYgKCFuZXdTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlLmNoaWxkcmVuW3NlbGVjdGVkLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoLTFdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG5ld1NlbGVjdGVkID0gc2VsZWN0ZWQubmV4dEVsZW1lbnRTaWJsaW5nXG5cbiAgICAgICAgICAgICAgICBpZiAoIW5ld1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICBuZXdTZWxlY3RlZCA9IHNlbGVjdGVkLnBhcmVudE5vZGUuY2hpbGRyZW5bMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3U2VsZWN0ZWQuZGF0YXNldC5pbWdcbiAgICAgICAgICAgIG1vZGFsLm1vZGFsQm94Q29udGVudC5xdWVyeVNlbGVjdG9yKCdpbWcnKS5zcmMgPSBpbWdcbiAgICAgICAgICAgIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKVxuICAgICAgICAgICAgbmV3U2VsZWN0ZWQuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG5cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBmb3JtcyA9IG1vZGFsLm1vZGFsQm94Q29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJylcblxuICAgICAgZm9ybXMuZm9yRWFjaCgoZm9ybSwgaSkgPT4ge1xuICAgICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuXG4gICAgICAgICAgbmV3IEN1c3RvbVNlbGVjdCh7XG4gICAgICAgICAgICBlbGVtOiBzZWxlY3RcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgZm9ybS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0IGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIHBob25lTWFzaygpXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgbW9kYWwuY2xvc2UoKVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvL2Ryb3BcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGluZ10nKS5mb3JFYWNoKChkcm9wLCBpKSA9PiB7XG4gICAgZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKCFlLnRhcmdldC5kYXRhc2V0LmRyb3BpbmcpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0gZHJvcC5kYXRhc2V0LmRyb3BpbmcsXG4gICAgICAgICAgICBkcm9wcGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcHBlZD1cIiR7ZGF0YX1cIl1gKVxuXG4gICAgICBkcm9wcGVkLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3Bfc2hvdycpXG4gICAgfSlcbiAgfSlcblxuICAvL3JhdGluZ1xuICBjb25zdCB0cmlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGluZ190cmlwJylcblxuICBpZiAodHJpcCkge1xuICAgIGNvbnN0IHRyaXBWYWx1ZSA9IChOdW1iZXIodHJpcC5xdWVyeVNlbGVjdG9yKCdbZGF0YS12YWx1ZV0nKS5kYXRhc2V0LnZhbHVlKSAqIDEwKSAqIDIsXG4gICAgICAgICAgdHJpcFByb2dyZXNzID0gdHJpcC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nX19wcm9ncmVzcycpXG5cbiAgICB0cmlwUHJvZ3Jlc3Muc3R5bGUud2lkdGggPSBgJHt0cmlwVmFsdWV9JWBcbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWltYWdlXScpLmZvckVhY2goKGltYWdlLCBpKSA9PiB7XG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHNyYyA9IGltYWdlLmRhdGFzZXQuaW1hZ2UsXG4gICAgICAgICAgICBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXG4gICAgICBpbWcuc3JjID0gc3JjXG5cbiAgICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBbJ21vZGFsJywgJ21vZGFsX2dhbGxlcnknXSxcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zZXRDb250ZW50KGltZyk7XG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgIH0pXG4gIH0pXG5cbiAgLy8g0KjQsNCz0LhcblxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0ZXAtYnV0dG9uXScpLmZvckVhY2goKGJ1dHRvbiwgaSkgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgZGF0YSA9IGJ1dHRvbi5kYXRhc2V0LnN0ZXBCdXR0b24sXG4gICAgICAgICAgICBjdXJyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0ZXAtY29udGVudF9jdXJyZW50JyksXG4gICAgICAgICAgICBzdGVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3RlcF0nKVxuXG4gICAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtY29udGVudF9jdXJyZW50JylcbiAgICAgIGxldCBpbmRleCA9IE51bWJlcihjdXJyZW50LmRhdGFzZXQuc3RlcENvbnRlbnQpXG5cbiAgICAgIHN3aXRjaCAoZGF0YSkge1xuICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zdGVwLWNvbnRlbnQ9XCIkeysraW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc3RlcC1jb250ZW50X2N1cnJlbnQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3ByZXYnOlxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXN0ZXAtY29udGVudD1cIiR7LS1pbmRleH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzdGVwLWNvbnRlbnRfY3VycmVudCcpXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgc3RlcC5mb3JFYWNoKChzdGVwLCBrKSA9PiB7XG4gICAgICAgIHN0ZXAuZGF0YXNldC5zdGVwID0gaW5kZXhcbiAgICAgIH0pXG5cbiAgICB9KVxuICB9KVxuXG4gIC8vINCf0LXRh9Cw0YLRjFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmludF0nKS5mb3JFYWNoKChwcmludCwgaSkgPT4ge1xuICAgIHByaW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHByaW50SFRNTCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXByaW50LWNvbnRlbnRdJykuaW5uZXJIVE1MLFxuICAgICAgICAgICAgcHJpbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJpbnRTZWxlY3Rpb24nKVxuXG4gICAgICBwcmludENvbnRhaW5lci5pbm5lckhUTUwgPSBwcmludEhUTUxcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCdwcmludFNlbGVjdGVkJylcblxuICAgICAgd2luZG93LnByaW50KCk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgncHJpbnRTZWxlY3RlZCcpXG4gICAgICAgIHByaW50Q29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgICB9LCAwKVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gYWRkcmVzcyBzZWFyY2hcbiAgY29uc3QgYWRkcmVzc1NlYXJjaEZvcm0gPSAkKCcjYWRkcmVzcy1zZWFyY2gnKVxuXG4gIGlmIChhZGRyZXNzU2VhcmNoRm9ybSkge1xuICAgIGNvbnN0IGZpZWxkID0gJChhZGRyZXNzU2VhcmNoRm9ybSkuZmluZCgnaW5wdXQnKVxuXG4gICAgJChmaWVsZCkub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgY29uc3QgdmFsdWUgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKClcblxuICAgICAgJCgnW2RhdGEtYWRkcmVzc10nKS5lYWNoKGZ1bmN0aW9uKGksIGFkZHJlc3MpIHtcbiAgICAgICAgaWYgKCQoYWRkcmVzcykudGV4dCgpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgJChhZGRyZXNzKS5jbG9zZXN0KCcub2ZmaWNlJykuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYWRkcmVzcykuY2xvc2VzdCgnLm9mZmljZScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgJCgnW2RhdGEtdGFiPVwiMFwiXScpLnRyaWdnZXIoJ2NsaWNrJylcbiAgICB9KVxuICB9XG5cbiAgLy/QmNC80LjRgtCw0YbQuNGPINC30LDQs9GA0YPQt9C60LhcbiAgY29uc3QgbG9hZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nJyk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICBjb25zdCB2YWx1ZUVsZW1lbnQgPSBsb2FkaW5nLnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nX192YWx1ZScpO1xuICAgIGxldCB2YWx1ZSA9IDA7XG5cbiAgICBsb2FkaW5nLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmdfcHJvY2VzcycpXG5cbiAgICBsZXQgcHJvY2VzcyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHZhbHVlICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoNSkpXG4gICAgICB2YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gKHZhbHVlID49IDEwMCkgPyAxMDAgOiB2YWx1ZVxuXG4gICAgICBpZiAodmFsdWUgPj0gMTAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwocHJvY2VzcylcbiAgICAgICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nX2ZpbmlzaCcpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sb2FkaW5nLXByb2Nlc3MnKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmctcHJvY2Vzc19maW5pc2gnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIDEwMClcbiAgfVxuXG59KSh3aW5kb3cpO1xuIl19
