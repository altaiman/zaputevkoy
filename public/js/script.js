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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInBob25lTWFzayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsImsiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0cmltIiwiVk1hc2tlciIsInRvUGF0dGVybiIsInBhdHRlcm4iLCJzbGlkZXJPcHRpb25zIiwiZnJlZVNjcm9sbCIsImNlbGxBbGlnbiIsImNvbnRhaW4iLCJ3cmFwQXJvdW5kIiwicGFnZURvdHMiLCJwcmV2TmV4dEJ1dHRvbnMiLCJsYXp5TG9hZCIsImFkYXB0aXZlSGVpZ2h0IiwiaXRlbXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJyZW1vdmUiLCJlbCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0IiwidCIsInRhZ05hbWUiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJwYXJlbnROb2RlIiwidGFic0NvbnRlbnQiLCJpbmRleCIsInNob3dpbmciLCJzZWxlY3RlZCIsImFkZCIsImNsaWNrIiwic2VsZWN0IiwiQ3VzdG9tU2VsZWN0IiwiZWxlbSIsImluY2x1ZGVzIiwiY2FsZW5kYXIiLCJtb250aHMiLCJtb250aHNMaXN0IiwibW9udGgiLCJub3ciLCJEYXRlIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJjdXN0b21PcHRpb25zIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImRhdGVwaWNrZXIiLCIkIiwic3RhcnREYXRlIiwic2VsZWN0T3RoZXJNb250aHMiLCJrZXlib2FyZE5hdiIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJuYXZUaXRsZXMiLCJkYXlzIiwieWVhcnMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsInkiLCJtIiwiZCIsImdldERhdGUiLCJkYXkiLCJnZXREYXkiLCJmcm9tIiwidG8iLCJmcm9tQ2VsbCIsInRvQ2VsbCIsInJhbmdlQ2VsbHMiLCJjZWxsIiwiZ2V0VGltZSIsImNsYXNzZXMiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJpbnN0IiwidGltZVN0YW1wIiwicmVtb3ZlQXR0cmlidXRlIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwiTnVtYmVyIiwiY2FsZW5kYXJDb250cm9scyIsImN1cnJlbnREYXRlIiwicHJldiIsIm1vbnRoSW5kZXgiLCJtb250aExvY2FsZSIsImxvYyIsIm1vbnRoc1Nob3J0IiwidW5kZWZpbmVkIiwicmFuZ2VPcHRpb25zIiwiY2xlYXIiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsIm1vbnRoc0l0ZW1zIiwibW9udGhXaWR0aCIsInByb2dyZXNzTGVmdCIsInN0eWxlIiwibGVmdCIsInBhcnNlSW50IiwicHJvZ3Jlc3NFbmQiLCJzZWxlY3RvciIsImxpc3QiLCJjb3VudCIsIml0ZW0iLCJzZWxlY3Rvckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiY291bnRlciIsImNvdW50ZXJWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsImNvdW50ZXJDb250cm9sIiwibGltaXQiLCJBcnJheSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJnYWxsZXJ5SXRlbSIsInNob3ciLCJnYWxsZXJ5IiwidmlldyIsImltYWdlIiwiaW1nIiwic3JjIiwiZ2FsbGVyeUNvdW50Q3VycmVudCIsImdhbGxlcnlMaXN0Q291bnQiLCJnYWxsZXJ5Q291bnRBbGwiLCJnYWxsZXJ5Q29udHJvbHMiLCJjb25zb2xlIiwibG9nIiwiZ2FsbGVyeUxpc3QiLCJ0cmlnZ2VyIiwibW9kYWxPcGVuIiwibW9kYWxFbGVtZW50IiwibW9kYWxDb250ZW50IiwibW9kYWwiLCJ0aW5nbGUiLCJjbG9zZU1ldGhvZHMiLCJvbkNsb3NlIiwiY3NzQ2xhc3MiLCJzZXRDb250ZW50Iiwib3BlbiIsImZvcm1zIiwibW9kYWxCb3hDb250ZW50IiwiZm9ybSIsImNsb3NlIiwiZHJvcCIsImRyb3BpbmciLCJkcm9wcGVkIiwidHJpcCIsInRyaXBWYWx1ZSIsInRyaXBQcm9ncmVzcyIsIndpZHRoIiwic3RlcEJ1dHRvbiIsImN1cnJlbnQiLCJzdGVwIiwic3RlcENvbnRlbnQiLCJsb2FkaW5nIiwidmFsdWVFbGVtZW50IiwicHJvY2VzcyIsInNldEludGVydmFsIiwiZmxvb3IiLCJyYW5kb20iLCJjbGVhckludGVydmFsIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxJQUFULEVBQWU7O0FBRWQ7QUFDQUM7O0FBRUEsV0FBU0MsU0FBVCxHQUFxQjtBQUNuQkMsYUFBU0MsZ0JBQVQsQ0FBMEIsbUJBQTFCLEVBQStDQyxPQUEvQyxDQUF1RCxVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBYztBQUNuRUQsWUFBTUUsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3JDLFlBQUlDLElBQUlKLE1BQU1LLEtBQU4sQ0FBWUMsT0FBWixDQUFvQixJQUFwQixFQUEwQixFQUExQixFQUE4QkMsSUFBOUIsRUFBUjtBQUNBUCxjQUFNSyxLQUFOLEdBQWNHLFFBQVFDLFNBQVIsQ0FBa0JMLENBQWxCLEVBQXFCLEVBQUNNLFNBQVMsb0JBQVYsRUFBckIsQ0FBZDtBQUNELE9BSEQ7QUFJRCxLQUxEO0FBTUQ7O0FBRURkOztBQUVBO0FBQ0EsTUFBTWUsZ0JBQWdCO0FBQ3BCLGNBQVU7QUFDUkMsa0JB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O0FBRUEsTUFBSW9LLE9BQUosRUFBYTtBQUNYLFFBQU1DLGVBQWVELFFBQVFwSyxhQUFSLENBQXNCLGlCQUF0QixDQUFyQjtBQUNBLFFBQUlyQixRQUFRLENBQVo7O0FBRUF5TCxZQUFROUksU0FBUixDQUFrQmdCLEdBQWxCLENBQXNCLGlCQUF0Qjs7QUFFQSxRQUFJZ0ksVUFBVUMsWUFBWSxZQUFNO0FBQzlCNUwsZUFBUzZCLEtBQUtnSyxLQUFMLENBQVdoSyxLQUFLaUssTUFBTCxLQUFnQmpLLEtBQUtnSyxLQUFMLENBQVcsQ0FBWCxDQUEzQixDQUFUO0FBQ0FILG1CQUFhbkQsU0FBYixHQUEwQnZJLFNBQVMsR0FBVixHQUFpQixHQUFqQixHQUF1QkEsS0FBaEQ7O0FBRUEsVUFBSUEsU0FBUyxHQUFiLEVBQWtCO0FBQ2hCK0wsc0JBQWNKLE9BQWQ7QUFDQUYsZ0JBQVE5SSxTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0IsZ0JBQXRCO0FBQ0FuRSxpQkFBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDQyxPQUE5QyxDQUFzRCxVQUFDOEMsRUFBRCxFQUFLckIsQ0FBTCxFQUFXO0FBQy9EcUIsYUFBR0csU0FBSCxDQUFhZ0IsR0FBYixDQUFpQix3QkFBakI7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQVhhLEVBV1gsR0FYVyxDQUFkO0FBWUQ7QUFFRixDQWpyQkQsRUFpckJHcUksTUFqckJIIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihyb290KSB7XG5cbiAgLy8gc3ZnIGZvciBhbGxcbiAgc3ZnNGV2ZXJ5Ym9keSgpO1xuXG4gIGZ1bmN0aW9uIHBob25lTWFzaygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGVsXCJdJykuZm9yRWFjaCgoaW5wdXQsIGspID0+IHtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAgICAgbGV0IHYgPSBpbnB1dC52YWx1ZS5yZXBsYWNlKCcrNycsICcnKS50cmltKClcbiAgICAgICAgaW5wdXQudmFsdWUgPSBWTWFza2VyLnRvUGF0dGVybih2LCB7cGF0dGVybjogXCIrNyAoOTk5KSA5OTktOTktOTlcIn0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwaG9uZU1hc2soKVxuXG4gIC8vIHNsaWRlciBvcHRpb25zXG4gIGNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgJ2Jhbm5lcic6IHtcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIHBhZ2VEb3RzOiB0cnVlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGxhenlMb2FkOiB0cnVlXG4gICAgfSxcbiAgICAnZnVsbCc6IHtcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIHBhZ2VEb3RzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ3NpeC1pdGVtcyc6IHtcbiAgICAgIGl0ZW1zOiA2LFxuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAncmV2aWV3cyc6IHtcbiAgICAgIGF1dG9QbGF5OiAzMDAwLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdnYWxsZXJ5Jzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVXaWR0aCA9IHNsaWRlcy5jaGlsZHJlblswXS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZXNDYXBhY2l0eSA9IE1hdGgucm91bmQoc2xpZGVyV2lkdGgvc2xpZGVXaWR0aCksXG4gICAgICAgICAgY29udHJvbHMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIGNvbnRyb2xzUHJldiA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1wcmV2XScpLFxuICAgICAgICAgIGNvbnRyb2xzTmV4dCA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1uZXh0XScpXG5cbiAgICBpZiAoc2xpZGVzQ291bnQgPiBzbGlkZXNDYXBhY2l0eSkge1xuICAgICAgY29uc3QgZmxrdHkgPSBuZXcgRmxpY2tpdHkoc2xpZGVzLCBzbGlkZXJPcHRpb25zW3NsaWRlci5kYXRhc2V0LnNsaWRlcl0pO1xuXG4gICAgICBjb250cm9sc1ByZXZcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBmbGt0eS5wcmV2aW91cygpXG4gICAgICAgIH0pXG5cbiAgICAgIGNvbnRyb2xzTmV4dFxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGZsa3R5Lm5leHQoKVxuICAgICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRyb2xzLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgaWYgKHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXS5jb250cm9scyA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnRyb2xzLnJlbW92ZSgpXG4gICAgfVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vcmVdJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuXG4gICAgICBjb25zdCBjb250YWluZXIgPSBlbC5jbG9zZXN0KCdbZGF0YS1tb3JlLWFjdGlvbl0nKVxuICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9yZScpXG5cbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZV0nKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC50b2dnbGVcbiAgICAgIGxldCB0ID0gZWxcblxuICAgICAgaWYgKHQudGFnTmFtZSA9PSAnQlVUVE9OJykge1xuICAgICAgICBjb25zdCBzcGFuID0gdC5xdWVyeVNlbGVjdG9yKCdzcGFuJylcbiAgICAgICAgdC5kYXRhc2V0LnRvZ2dsZSA9IHQudGV4dENvbnRlbnQudHJpbSgpXG4gICAgICAgIHQgPSBzcGFuXG4gICAgICB9XG5cbiAgICAgIHQudGV4dENvbnRlbnQgPSB0ZXh0XG4gICAgfSlcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzXScpLmZvckVhY2goKHRhYnMsIGkpID0+IHtcbiAgICBjb25zdCBkYXRhID0gdGFicy5kYXRhc2V0LnRhYnMsXG4gICAgICAgICAgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYnMtY29udGVudD0ke2RhdGF9XWApXG5cbiAgICB0YWJzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0nKS5mb3JFYWNoKCh0YWIsIGspID0+IHtcbiAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGlmICh0YWIucGFyZW50Tm9kZS5kYXRhc2V0LnRhYnNDb250ZW50KSByZXR1cm5cblxuICAgICAgICBjb25zdCBpbmRleCA9IHRhYi5kYXRhc2V0LnRhYixcbiAgICAgICAgICAgICAgc2hvd2luZyA9IGNvbnRlbnQucXVlcnlTZWxlY3RvcignLnNob3dpbmcnKSxcbiAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0YWJzLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpXG5cbiAgICAgICAgaWYgKHNob3dpbmcpIHNob3dpbmcuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd2luZycpXG4gICAgICAgIGlmIChzZWxlY3RlZCkgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICBjb250ZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYj1cIiR7aW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc2hvd2luZycpXG4gICAgICB9KVxuXG4gICAgfSlcbiAgICB0YWJzLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYj1cIjBcIl1gKS5jbGljaygpXG4gIH0pXG5cbiAgLy8gc2VsZWN0XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAgIG5ldyBDdXN0b21TZWxlY3Qoe1xuICAgICAgZWxlbTogc2VsZWN0XG4gICAgfSk7XG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcF0nKS5mb3JFYWNoKChzZWxlY3QsIGkpID0+IHtcblxuICAgIHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuanMtRHJvcGRvd24tdGl0bGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKFsuLi5zZWxlY3QuY2xhc3NMaXN0XS5pbmNsdWRlcygnc2VsZWN0X29wZW4nKSkge1xuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9vcGVuJykuZm9yRWFjaCgoc2VsZWN0LCBrKSA9PiB7XG4gICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9vcGVuJylcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdF9vcGVuJylcblxuICAgICAgICAvLyBuZXcgU2ltcGxlQmFyKHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0X19kcm9wZG93bicpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gZGF0ZXBpY2tlcnNcbiAgY29uc3QgY2FsZW5kYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXInKVxuXG4gIGlmIChjYWxlbmRhcikge1xuICAgIGNvbnN0IG1vbnRocyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxlbmRhcl9faXRlbSAubW9udGgnKSxcbiAgICAgICAgICBjb250cm9scyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIG1vbnRoc0xpc3QgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1saXN0JykuY2hpbGRyZW5cblxuICAgIG1vbnRocy5mb3JFYWNoKChtb250aCwgaSkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKSxcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgbm93LmdldE1vbnRoKCkraSk7XG5cbiAgICAgIGxldCBjdXN0b21PcHRpb25zID0ge1xuICAgICAgICByYW5nZUZyb206IG51bGwsXG4gICAgICAgIHJhbmdlVG86IG51bGwsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSAkKG1vbnRoKS5kYXRlcGlja2VyKHtcbiAgICAgICAgc3RhcnREYXRlOiBkYXRlLFxuICAgICAgICBzZWxlY3RPdGhlck1vbnRoczogITEsXG4gICAgICAgIGtleWJvYXJkTmF2OiAhMSxcbiAgICAgICAgbXVsdGlwbGVEYXRlc1NlcGFyYXRvcjogJycsXG4gICAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgICAgZGF5czogJ01NJyxcbiAgICAgICAgICAgIG1vbnRoczogJ3l5eXknLFxuICAgICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uUmVuZGVyQ2VsbChkYXRlLCBjZWxsVHlwZSkge1xuICAgICAgICAgIGNvbnN0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgbSA9IGRhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBkID0gZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXkoKSxcbiAgICAgICAgICAgICAgICBmcm9tID0gY2FsZW5kYXIuZGF0YXNldC5mcm9tLFxuICAgICAgICAgICAgICAgIHRvID0gY2FsZW5kYXIuZGF0YXNldC50byxcbiAgICAgICAgICAgICAgICBmcm9tQ2VsbCA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3IoJy4tcmFuZ2UtZnJvbS0nKSxcbiAgICAgICAgICAgICAgICB0b0NlbGwgPSBtb250aC5xdWVyeVNlbGVjdG9yKCcuLXJhbmdlLXRvLScpLFxuICAgICAgICAgICAgICAgIHJhbmdlQ2VsbHMgPSBtb250aC5xdWVyeVNlbGVjdG9yQWxsKCcuLWluLXJhbmdlLScpXG5cbiAgICAgICAgICAgIGlmIChmcm9tQ2VsbCkge1xuICAgICAgICAgICAgICBmcm9tQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctcmFuZ2UtZnJvbS0nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9DZWxsKSB7XG4gICAgICAgICAgICAgIHRvQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctcmFuZ2UtdG8tJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmFuZ2VDZWxscy5mb3JFYWNoKChjZWxsLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnLWluLXJhbmdlLScpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gZnJvbSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctcmFuZ2UtZnJvbS0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gdG8pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiAnLXJhbmdlLXRvLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+IGZyb20gJiYgZGF0ZS5nZXRUaW1lKCkgPCB0bykge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctaW4tcmFuZ2UtJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBvblNlbGVjdChmb3JtYXR0ZWREYXRlLCBkYXRlLCBpbnN0KSB7XG4gICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERheSgpXG5cbiAgICAgICAgICBsZXQgZnJvbSA9IGNhbGVuZGFyLmRhdGFzZXQuZnJvbSxcbiAgICAgICAgICAgICAgdG8gPSBjYWxlbmRhci5kYXRhc2V0LnRvLFxuICAgICAgICAgICAgICB0aW1lU3RhbXAgPSBkYXRlLmdldFRpbWUoKVxuXG4gICAgICAgICAgaWYgKGZyb20gJiYgIXRvKSB7XG4gICAgICAgICAgICBpZiAoZnJvbSA+IHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LnRvID0gZnJvbVxuICAgICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LmZyb20gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQudG8gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC5mcm9tID0gdGltZVN0YW1wXG4gICAgICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG8nKVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9KS5kYXRhKCdkYXRlcGlja2VyJylcblxuICAgICAgY29udHJvbHMuZm9yRWFjaCgoYnV0dG9uLCBpKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyksXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUgPSBkYXRlcGlja2VyLmN1cnJlbnREYXRlXG4gICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRlID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKS0zKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLnByZXYoKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLm5leHQoKVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLmRhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpKzMpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICBsZXQgbW9udGhJbmRleCA9IGRhdGVwaWNrZXIuY3VycmVudERhdGUuZ2V0TW9udGgoKVxuICAgICAgICBjb25zdCBtb250aExvY2FsZSA9IGRhdGVwaWNrZXIubG9jLm1vbnRoc1Nob3J0XG5cbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMjsgaysrKSB7XG4gICAgICAgICAgaWYgKG1vbnRoTG9jYWxlW21vbnRoSW5kZXhdID09IHVuZGVmaW5lZCkgbW9udGhJbmRleCA9IDBcbiAgICAgICAgICBtb250aHNMaXN0W2tdLnRleHRDb250ZW50ID0gbW9udGhMb2NhbGVbbW9udGhJbmRleF1cbiAgICAgICAgICArK21vbnRoSW5kZXhcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBkYXRlcGlja2VyLnJhbmdlT3B0aW9ucyA9IGN1c3RvbU9wdGlvbnNcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY2xlYXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY2FsZW5kYXIucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZyb20nKVxuICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdG8nKVxuICAgICAgICBkYXRlcGlja2VyLmNsZWFyKClcbiAgICAgIH0pXG5cbiAgICAgIGNhbGVuZGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGF0ZXBpY2tlci51cGRhdGUoKVxuICAgICAgfSlcblxuICAgIH0pXG5cbiAgICBjb250cm9scy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX3Byb2dyZXNzJyksXG4gICAgICAgICAgICAgIG1vbnRoc0l0ZW1zID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyX19tb250aHMtbGlzdCcpLmNoaWxkcmVuLmxlbmd0aCAtIDMsXG4gICAgICAgICAgICAgIG1vbnRoV2lkdGggPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1pdGVtJykub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgIHByb2dyZXNzTGVmdCA9IChwcm9ncmVzcy5zdHlsZS5sZWZ0ID09ICcnKSA/IDAgOiBwYXJzZUludChwcm9ncmVzcy5zdHlsZS5sZWZ0KSxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFbmQgPSBtb250aFdpZHRoICogbW9udGhzSXRlbXNcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSBwcm9ncmVzc0VuZCArICdweCdcbiAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAxXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjJcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAzXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChwcm9ncmVzc0xlZnQgPT0gbW9udGhXaWR0aCkge1xuICAgICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChwcm9ncmVzc0xlZnQgLSBtb250aFdpZHRoKSArICdweCdcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiM1wiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgaWYgKHByb2dyZXNzTGVmdCA9PSBwcm9ncmVzc0VuZCAtIG1vbnRoV2lkdGgpIHtcbiAgICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAocHJvZ3Jlc3NMZWZ0ICsgbW9udGhXaWR0aCkgKyAncHgnXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjBcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAxXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLmxlZnQgPSAwXG4gICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMlxuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIxXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cblxuICAvLyBzZWxlY3RvclxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdG9yXScpLmZvckVhY2goKHNlbGVjdG9yLCBpKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IHNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Rvcl9fbGlzdCcpLFxuICAgICAgICAgIGlucHV0ID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19pbnB1dCcpXG5cbiAgICBsZXQgY291bnQgPSBsaXN0LmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgaW5wdXQudmFsdWUgPSBjb3VudFxuXG4gICAgc2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmFsdWVdJykuZm9yRWFjaCgoaXRlbSwgaykgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlLFxuICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG5cbiAgICAgICAgY291bnQgPSBsaXN0LmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgICAgIHNlbGVjdG9ySXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Rvcl9faXRlbScpXG4gICAgICAgIHNlbGVjdG9ySXRlbS5pbm5lckhUTUwgPSBgPHNwYW4+JHt2YWx1ZX08L3NwYW4+PGJ1dHRvbiBjbGFzcz1cInNlbGVjdG9yX19yZW1vdmVcIj48L2J1dHRvbj5gXG5cbiAgICAgICAgbGlzdC5hcHBlbmQoc2VsZWN0b3JJdGVtKVxuICAgICAgICBpbnB1dC52YWx1ZSA9ICsrY291bnRcbiAgICAgIH0pXG5cbiAgICB9KVxuXG5cbiAgfSlcblxuICAvLyB0b2dnbGVcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZ2dsZV9faGVhZGVyJykuZm9yRWFjaCgodG9nZ2xlLCBpKSA9PiB7XG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICB0b2dnbGUuY2xvc2VzdCgnLnRvZ2dsZScpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZV9vcGVuJylcbiAgICB9KVxuICB9KVxuXG4gIC8vY291bnRlclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY291bnRlcicpLmZvckVhY2goKGNvdW50ZXIsIGkpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb3VudGVyLWNvbnRyb2xdJykuZm9yRWFjaCgoYnV0dG9uLCBrKSA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBsZXQgY291bnRlclZhbHVlID0gY291bnRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyLXZhbHVlXScpLFxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gTnVtYmVyKGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSlcblxuICAgICAgICBzd2l0Y2ggKE51bWJlcihidXR0b24uZGF0YXNldC5jb3VudGVyQ29udHJvbCkpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9IDApIGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSA9IC0tY3VycmVudFZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNvdW50ZXJWYWx1ZS5kYXRhc2V0LmNvdW50ZXJWYWx1ZSA9ICsrY3VycmVudFZhbHVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcblxuICAvL3Jldmlld3NcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbGltaXRdJykuZm9yRWFjaCgoY29udGFpbmVyLCBpKSA9PiB7XG4gICAgY29uc3QgbGltaXQgPSBjb250YWluZXIuZGF0YXNldC5saW1pdCxcbiAgICAgICAgICBsaXN0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpbWl0LWxpc3RdJyksXG4gICAgICAgICAgYnV0dG9uID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpbWl0LWRpc2FibGVdJylcblxuXG4gICAgQXJyYXkuZnJvbShsaXN0LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgaWYgKGsgPj0gbGltaXQpIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9KVxuXG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgQXJyYXkuZnJvbShsaXN0LmNoaWxkcmVuKS5mb3JFYWNoKChlbCwgaykgPT4ge1xuICAgICAgICAgIGlmIChrID49IGxpbWl0KSBlbC5zdHlsZS5kaXNwbGF5ID0gJydcbiAgICAgICAgfSlcblxuICAgICAgICBidXR0b24ucmVtb3ZlKClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIC8vdG90YWwgY2xpY2tcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zZWxlY3Rfb3BlbicpLFxuICAgICAgICAgIGdhbGxlcnlJdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnLmdhbGxlcnlfX2l0ZW0nKVxuXG4gICAgaWYgKCFzZWxlY3QgJiYgIVsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rvcl9fcmVtb3ZlJykgJiYgIVsuLi5lLnRhcmdldC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdkYXRlcGlja2VyLS1jZWxsJykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3Rfb3BlbicpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdG9yX19yZW1vdmUnKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGlucHV0ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdG9yJykucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19pbnB1dCcpXG5cbiAgICAgIGlucHV0LnZhbHVlID0gLS1pbnB1dC52YWx1ZVxuXG4gICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuZHJvcF9zaG93JykpIHtcbiAgICAgIGlmICghZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZHJvcGluZ10nKSkge1xuICAgICAgICBjb25zdCBzaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRyb3Bfc2hvdycpXG4gICAgICAgIGlmKHNob3cpIHNob3cuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcF9zaG93JylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnYWxsZXJ5XG4gICAgaWYgKGdhbGxlcnlJdGVtKSB7XG4gICAgICBjb25zdCBnYWxsZXJ5ID0gZ2FsbGVyeUl0ZW0uY2xvc2VzdCgnLmdhbGxlcnknKSxcbiAgICAgICAgICAgIHZpZXcgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X192aWV3JyksXG4gICAgICAgICAgICBpbWFnZSA9IGdhbGxlcnlJdGVtLmRhdGFzZXQuaW1nLFxuICAgICAgICAgICAgc2VsZWN0ZWQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19pdGVtX3NlbGVjdGVkJyksXG4gICAgICAgICAgICBjb3VudCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2NvdW50JylcblxuICAgICAgaWYgKHNlbGVjdGVkKSBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCdnYWxsZXJ5X19pdGVtX3NlbGVjdGVkJylcbiAgICAgIGdhbGxlcnlJdGVtLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKVxuICAgICAgdmlldy5xdWVyeVNlbGVjdG9yKCdpbWcnKS5zcmMgPSBpbWFnZVxuXG4gICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgY291bnQuZGF0YXNldC5nYWxsZXJ5Q291bnRDdXJyZW50ID0gTnVtYmVyKGdhbGxlcnlJdGVtLmRhdGFzZXQuaW5kZXgpKzFcbiAgICAgIH1cbiAgICB9XG5cbiAgfSlcblxuICAvLyBnYWxsZXJ5IGNvdW50XG5cbiAgLy8gZ2FsbGVyeSB0cmlnZ2VyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5JykuZm9yRWFjaCgoZ2FsbGVyeSwgaSkgPT4ge1xuICAgIGNvbnN0IGNvdW50ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fY291bnQnKSxcbiAgICAgICAgICBnYWxsZXJ5TGlzdENvdW50ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fbGlzdCcpLmNoaWxkcmVuLmxlbmd0aFxuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBjb3VudC5kYXRhc2V0LmdhbGxlcnlDb3VudEFsbCA9IGdhbGxlcnlMaXN0Q291bnRcblxuICAgICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1nYWxsZXJ5LWNvbnRyb2xzXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gTnVtYmVyKGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWdhbGxlcnktY29udHJvbHNdJykuZGF0YXNldC5nYWxsZXJ5Q29udHJvbHMpXG4gICAgICAgIGxldCBpbmRleCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKS5kYXRhc2V0LmluZGV4XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KVxuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgaW5kZXggPSBnYWxsZXJ5TGlzdENvdW50IC0gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLS1pbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKGluZGV4ID09IGdhbGxlcnlMaXN0Q291bnQgLSAxKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gMFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgKytpbmRleFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoYC5nYWxsZXJ5X19pdGVtW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApLmNsaWNrKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbTpmaXJzdC1jaGlsZCcpLmNsaWNrKClcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1nYWxsZXJ5LWNvbnRvbHNdJykuZm9yRWFjaCgoY29udHJvbHMsIGkpID0+IHtcbiAgICBjb25zdCBnYWxsZXJ5ID0gY29udHJvbHMuY2xvc2VzdCgnLmdhbGxlcnknKSxcbiAgICAgICAgICBnYWxsZXJ5TGlzdCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2xpc3QnKVxuICAgIGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWdhbGxlcnktY29udHJvbHMtcHJldl0nKVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLW9wZW5dJykuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4ge1xuICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHQgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1tb2RhbC1vcGVuXScpLFxuICAgICAgICAgICAgZGF0YSA9IHQuZGF0YXNldC5tb2RhbE9wZW4sXG4gICAgICAgICAgICBtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1tb2RhbD1cIiR7ZGF0YX1cIl1gKVxuXG4gICAgICBsZXQgbW9kYWxDb250ZW50ID0gbW9kYWxFbGVtZW50LmlubmVySFRNTFxuXG4gICAgICBpZiAoZGF0YSA9PSAnZ2FsbGVyeScpIHtcbiAgICAgICAgbW9kYWxDb250ZW50ID0gdC5pbm5lckhUTUxcbiAgICAgIH1cblxuICAgICAgbGV0IG1vZGFsID0gbmV3IHRpbmdsZS5tb2RhbCh7XG4gICAgICAgIGNsb3NlTWV0aG9kczogWydvdmVybGF5JywgJ2VzY2FwZSddLFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3NzQ2xhc3M6IG1vZGFsRWxlbWVudC5jbGFzc0xpc3RcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zZXRDb250ZW50KG1vZGFsQ29udGVudClcbiAgICAgIG1vZGFsLm9wZW4oKVxuXG4gICAgICBjb25zdCBmb3JtcyA9IG1vZGFsLm1vZGFsQm94Q29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJylcblxuICAgICAgZm9ybXMuZm9yRWFjaCgoZm9ybSwgaSkgPT4ge1xuICAgICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuICAgICAgICAgIG5ldyBDdXN0b21TZWxlY3Qoe1xuICAgICAgICAgICAgZWxlbTogc2VsZWN0XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIHBob25lTWFzaygpXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgbW9kYWwuY2xvc2UoKVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvL2Ryb3BcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGluZ10nKS5mb3JFYWNoKChkcm9wLCBpKSA9PiB7XG4gICAgZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgaWYgKCFlLnRhcmdldC5kYXRhc2V0LmRyb3BpbmcpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0gZHJvcC5kYXRhc2V0LmRyb3BpbmcsXG4gICAgICAgICAgICBkcm9wcGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcHBlZD1cIiR7ZGF0YX1cIl1gKVxuXG4gICAgICBkcm9wcGVkLmNsYXNzTGlzdC50b2dnbGUoJ2Ryb3Bfc2hvdycpXG4gICAgfSlcbiAgfSlcblxuICAvL3JhdGluZ1xuICBjb25zdCB0cmlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhdGluZ190cmlwJylcblxuICBpZiAodHJpcCkge1xuICAgIGNvbnN0IHRyaXBWYWx1ZSA9IChOdW1iZXIodHJpcC5xdWVyeVNlbGVjdG9yKCdbZGF0YS12YWx1ZV0nKS5kYXRhc2V0LnZhbHVlKSAqIDEwKSAqIDIsXG4gICAgICAgICAgdHJpcFByb2dyZXNzID0gdHJpcC5xdWVyeVNlbGVjdG9yKCcucmF0aW5nX19wcm9ncmVzcycpXG5cbiAgICB0cmlwUHJvZ3Jlc3Muc3R5bGUud2lkdGggPSBgJHt0cmlwVmFsdWV9JWBcbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWltYWdlXScpLmZvckVhY2goKGltYWdlLCBpKSA9PiB7XG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHNyYyA9IGltYWdlLmRhdGFzZXQuaW1hZ2UsXG4gICAgICAgICAgICBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXG4gICAgICBpbWcuc3JjID0gc3JjXG5cbiAgICAgIGxldCBtb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICBjbG9zZU1ldGhvZHM6IFsnb3ZlcmxheScsICdlc2NhcGUnXSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNzc0NsYXNzOiBbJ21vZGFsJywgJ21vZGFsX2dhbGxlcnknXSxcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zZXRDb250ZW50KGltZyk7XG4gICAgICBtb2RhbC5vcGVuKClcblxuICAgIH0pXG4gIH0pXG5cbiAgLy8g0KjQsNCz0LhcblxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0ZXAtYnV0dG9uXScpLmZvckVhY2goKGJ1dHRvbiwgaSkgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgZGF0YSA9IGJ1dHRvbi5kYXRhc2V0LnN0ZXBCdXR0b24sXG4gICAgICAgICAgICBjdXJyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0ZXAtY29udGVudF9jdXJyZW50JyksXG4gICAgICAgICAgICBzdGVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3RlcF0nKVxuXG4gICAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXAtY29udGVudF9jdXJyZW50JylcbiAgICAgIGxldCBpbmRleCA9IE51bWJlcihjdXJyZW50LmRhdGFzZXQuc3RlcENvbnRlbnQpXG5cbiAgICAgIHN3aXRjaCAoZGF0YSkge1xuICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zdGVwLWNvbnRlbnQ9XCIkeysraW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc3RlcC1jb250ZW50X2N1cnJlbnQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ3ByZXYnOlxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXN0ZXAtY29udGVudD1cIiR7LS1pbmRleH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzdGVwLWNvbnRlbnRfY3VycmVudCcpXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgc3RlcC5mb3JFYWNoKChzdGVwLCBrKSA9PiB7XG4gICAgICAgIHN0ZXAuZGF0YXNldC5zdGVwID0gaW5kZXhcbiAgICAgIH0pXG5cbiAgICB9KVxuICB9KVxuXG4gIC8v0JjQvNC40YLQsNGG0LjRjyDQt9Cw0LPRgNGD0LfQutC4XG4gIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZycpO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgY29uc3QgdmFsdWVFbGVtZW50ID0gbG9hZGluZy5xdWVyeVNlbGVjdG9yKCcubG9hZGluZ19fdmFsdWUnKTtcbiAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nX3Byb2Nlc3MnKVxuXG4gICAgbGV0IHByb2Nlc3MgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB2YWx1ZSArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDUpKVxuICAgICAgdmFsdWVFbGVtZW50LmlubmVySFRNTCA9ICh2YWx1ZSA+PSAxMDApID8gMTAwIDogdmFsdWVcblxuICAgICAgaWYgKHZhbHVlID49IDEwMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHByb2Nlc3MpXG4gICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgnbG9hZGluZ19maW5pc2gnKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9hZGluZy1wcm9jZXNzJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nLXByb2Nlc3NfZmluaXNoJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCAxMDApXG4gIH1cblxufSkod2luZG93KTtcbiJdfQ==
