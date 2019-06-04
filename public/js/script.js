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

  document.querySelectorAll('[data-modal-open]').forEach(function (trigger, i) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      var t = e.target.closest('[data-modal-open]'),
          data = t.dataset.modalOpen,
          modalElement = document.querySelector('[data-modal="' + data + '"]');

      if (data == 'gallery') {
        modalElement.querySelector('.modal__content').innerHTML = t.innerHTML;
      }

      var modalContent = modalElement.innerHTML;

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

      if (data == 'gallery') {
        modal.modalBoxContent.querySelectorAll('[data-gallery-controls]').forEach(function (arrow, k) {
          arrow.addEventListener('click', function (e) {
            var direction = Number(e.target.closest('[data-gallery-controls]').dataset.galleryControls),
                selected = document.querySelector('.gallery__item_selected');
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
          console.log(i);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInBob25lTWFzayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbnB1dCIsImsiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInYiLCJ2YWx1ZSIsInJlcGxhY2UiLCJ0cmltIiwiVk1hc2tlciIsInRvUGF0dGVybiIsInBhdHRlcm4iLCJzbGlkZXJPcHRpb25zIiwiZnJlZVNjcm9sbCIsImNlbGxBbGlnbiIsImNvbnRhaW4iLCJ3cmFwQXJvdW5kIiwicGFnZURvdHMiLCJwcmV2TmV4dEJ1dHRvbnMiLCJsYXp5TG9hZCIsImFkYXB0aXZlSGVpZ2h0IiwiaXRlbXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInF1ZXJ5U2VsZWN0b3IiLCJzbGlkZXNDb3VudCIsImNoaWxkcmVuIiwibGVuZ3RoIiwic2xpZGVXaWR0aCIsIm9mZnNldFdpZHRoIiwic2xpZGVyV2lkdGgiLCJzbGlkZXNDYXBhY2l0eSIsIk1hdGgiLCJyb3VuZCIsImNvbnRyb2xzUHJldiIsImNvbnRyb2xzTmV4dCIsImZsa3R5IiwiRmxpY2tpdHkiLCJkYXRhc2V0IiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91cyIsIm5leHQiLCJyZW1vdmUiLCJlbCIsImNvbnRhaW5lciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0IiwidCIsInRhZ05hbWUiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJ0YWJzIiwiZGF0YSIsImNvbnRlbnQiLCJ0YWIiLCJwYXJlbnROb2RlIiwidGFic0NvbnRlbnQiLCJpbmRleCIsInNob3dpbmciLCJzZWxlY3RlZCIsImFkZCIsImNsaWNrIiwic2VsZWN0IiwiQ3VzdG9tU2VsZWN0IiwiZWxlbSIsImluY2x1ZGVzIiwiY2FsZW5kYXIiLCJtb250aHMiLCJtb250aHNMaXN0IiwibW9udGgiLCJub3ciLCJEYXRlIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJjdXN0b21PcHRpb25zIiwicmFuZ2VGcm9tIiwicmFuZ2VUbyIsImRhdGVwaWNrZXIiLCIkIiwic3RhcnREYXRlIiwic2VsZWN0T3RoZXJNb250aHMiLCJrZXlib2FyZE5hdiIsIm11bHRpcGxlRGF0ZXNTZXBhcmF0b3IiLCJuYXZUaXRsZXMiLCJkYXlzIiwieWVhcnMiLCJvblJlbmRlckNlbGwiLCJjZWxsVHlwZSIsInkiLCJtIiwiZCIsImdldERhdGUiLCJkYXkiLCJnZXREYXkiLCJmcm9tIiwidG8iLCJmcm9tQ2VsbCIsInRvQ2VsbCIsInJhbmdlQ2VsbHMiLCJjZWxsIiwiZ2V0VGltZSIsImNsYXNzZXMiLCJvblNlbGVjdCIsImZvcm1hdHRlZERhdGUiLCJpbnN0IiwidGltZVN0YW1wIiwicmVtb3ZlQXR0cmlidXRlIiwiYnV0dG9uIiwiZGlyZWN0aW9uIiwiTnVtYmVyIiwiY2FsZW5kYXJDb250cm9scyIsImN1cnJlbnREYXRlIiwicHJldiIsIm1vbnRoSW5kZXgiLCJtb250aExvY2FsZSIsImxvYyIsIm1vbnRoc1Nob3J0IiwidW5kZWZpbmVkIiwicmFuZ2VPcHRpb25zIiwiY2xlYXIiLCJ1cGRhdGUiLCJwcm9ncmVzcyIsIm1vbnRoc0l0ZW1zIiwibW9udGhXaWR0aCIsInByb2dyZXNzTGVmdCIsInN0eWxlIiwibGVmdCIsInBhcnNlSW50IiwicHJvZ3Jlc3NFbmQiLCJzZWxlY3RvciIsImxpc3QiLCJjb3VudCIsIml0ZW0iLCJzZWxlY3Rvckl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kIiwiY291bnRlciIsImNvdW50ZXJWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsImNvdW50ZXJDb250cm9sIiwibGltaXQiLCJBcnJheSIsImRpc3BsYXkiLCJ0YXJnZXQiLCJnYWxsZXJ5SXRlbSIsInNob3ciLCJnYWxsZXJ5IiwidmlldyIsImltYWdlIiwiaW1nIiwic3JjIiwiZ2FsbGVyeUNvdW50Q3VycmVudCIsImdhbGxlcnlMaXN0Q291bnQiLCJnYWxsZXJ5Q291bnRBbGwiLCJnYWxsZXJ5Q29udHJvbHMiLCJ0cmlnZ2VyIiwibW9kYWxPcGVuIiwibW9kYWxFbGVtZW50IiwibW9kYWxDb250ZW50IiwibW9kYWwiLCJ0aW5nbGUiLCJjbG9zZU1ldGhvZHMiLCJvbkNsb3NlIiwiY3NzQ2xhc3MiLCJzZXRDb250ZW50Iiwib3BlbiIsIm1vZGFsQm94Q29udGVudCIsImFycm93IiwibmV3U2VsZWN0ZWQiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZm9ybXMiLCJmb3JtIiwiY29uc29sZSIsImxvZyIsImNsb3NlIiwiZHJvcCIsImRyb3BpbmciLCJkcm9wcGVkIiwidHJpcCIsInRyaXBWYWx1ZSIsInRyaXBQcm9ncmVzcyIsIndpZHRoIiwic3RlcEJ1dHRvbiIsImN1cnJlbnQiLCJzdGVwIiwic3RlcENvbnRlbnQiLCJwcmludCIsInByaW50SFRNTCIsInByaW50Q29udGFpbmVyIiwid2luZG93Iiwic2V0VGltZW91dCIsImJ0biIsImxvYWRpbmciLCJ2YWx1ZUVsZW1lbnQiLCJwcm9jZXNzIiwic2V0SW50ZXJ2YWwiLCJmbG9vciIsInJhbmRvbSIsImNsZWFySW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTs7QUFFZDtBQUNBQzs7QUFFQSxXQUFTQyxTQUFULEdBQXFCO0FBQ25CQyxhQUFTQyxnQkFBVCxDQUEwQixtQkFBMUIsRUFBK0NDLE9BQS9DLENBQXVELFVBQUNDLEtBQUQsRUFBUUMsQ0FBUixFQUFjO0FBQ25FRCxZQUFNRSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFDckMsWUFBSUMsSUFBSUosTUFBTUssS0FBTixDQUFZQyxPQUFaLENBQW9CLElBQXBCLEVBQTBCLEVBQTFCLEVBQThCQyxJQUE5QixFQUFSO0FBQ0FQLGNBQU1LLEtBQU4sR0FBY0csUUFBUUMsU0FBUixDQUFrQkwsQ0FBbEIsRUFBcUIsRUFBQ00sU0FBUyxvQkFBVixFQUFyQixDQUFkO0FBQ0QsT0FIRDtBQUlELEtBTEQ7QUFNRDs7QUFFRGQ7O0FBRUE7QUFDQSxNQUFNZSxnQkFBZ0I7QUFDcEIsY0FBVTtBQUNSQyxrQkFBWSxLQURKO0FBRVJDLGlCQUFXLE1BRkg7QUFHUkMsZUFBUyxJQUhEO0FBSVJDLGtCQUFZLElBSko7QUFLUkMsZ0JBQVUsSUFMRjtBQU1SQyx1QkFBaUIsS0FOVDtBQU9SQyxnQkFBVTtBQVBGLEtBRFU7QUFVcEIsWUFBUTtBQUNOTixrQkFBWSxLQUROO0FBRU5DLGlCQUFXLE1BRkw7QUFHTkMsZUFBUyxJQUhIO0FBSU5DLGtCQUFZLElBSk47QUFLTkMsZ0JBQVUsS0FMSjtBQU1OQyx1QkFBaUIsS0FOWDtBQU9ORSxzQkFBZ0I7QUFQVixLQVZZO0FBbUJwQixpQkFBYTtBQUNYQyxhQUFPLENBREk7QUFFWFIsa0JBQVksS0FGRDtBQUdYQyxpQkFBVyxNQUhBO0FBSVhDLGVBQVMsSUFKRTtBQUtYQyxrQkFBWSxJQUxEO0FBTVhDLGdCQUFVLEtBTkM7QUFPWEMsdUJBQWlCLEtBUE47QUFRWEUsc0JBQWdCO0FBUkwsS0FuQk87QUE2QnBCLGVBQVc7QUFDVEUsZ0JBQVUsSUFERDtBQUVUUCxlQUFTLElBRkE7QUFHVEMsa0JBQVksSUFISDtBQUlUTyxnQkFBVSxLQUpEO0FBS1RMLHVCQUFpQixLQUxSO0FBTVRFLHNCQUFnQjtBQU5QLEtBN0JTO0FBcUNwQixlQUFXO0FBQ1ROLGlCQUFXLE1BREY7QUFFVEksdUJBQWlCLEtBRlI7QUFHVEQsZ0JBQVU7QUFIRDtBQXJDUyxHQUF0Qjs7QUE0Q0FuQixXQUFTQyxnQkFBVCxDQUEwQixlQUExQixFQUEyQ0MsT0FBM0MsQ0FBbUQsVUFBQ3dCLE1BQUQsRUFBU0MsQ0FBVCxFQUFlO0FBQ2hFLFFBQU1DLFNBQVNGLE9BQU9HLGFBQVAsQ0FBcUIsc0JBQXJCLENBQWY7QUFBQSxRQUNNQyxjQUFjRixPQUFPRyxRQUFQLENBQWdCQyxNQURwQztBQUFBLFFBRU1DLGFBQWFMLE9BQU9HLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJHLFdBRnRDO0FBQUEsUUFHTUMsY0FBY1QsT0FBT1EsV0FIM0I7QUFBQSxRQUlNRSxpQkFBaUJDLEtBQUtDLEtBQUwsQ0FBV0gsY0FBWUYsVUFBdkIsQ0FKdkI7QUFBQSxRQUtNUixXQUFXQyxPQUFPRyxhQUFQLENBQXFCLHdCQUFyQixDQUxqQjtBQUFBLFFBTU1VLGVBQWVkLFNBQVNJLGFBQVQsQ0FBdUIsNkJBQXZCLENBTnJCO0FBQUEsUUFPTVcsZUFBZWYsU0FBU0ksYUFBVCxDQUF1Qiw2QkFBdkIsQ0FQckI7O0FBU0EsUUFBSUMsY0FBY00sY0FBbEIsRUFBa0M7QUFDaEMsVUFBTUssUUFBUSxJQUFJQyxRQUFKLENBQWFkLE1BQWIsRUFBcUJkLGNBQWNZLE9BQU9pQixPQUFQLENBQWVqQixNQUE3QixDQUFyQixDQUFkOztBQUVBYSxtQkFDR2xDLGdCQURILENBQ29CLE9BRHBCLEVBQzZCLFVBQUNDLENBQUQsRUFBTztBQUNoQ0EsVUFBRXNDLGNBQUY7QUFDQUgsY0FBTUksUUFBTjtBQUNELE9BSkg7O0FBTUFMLG1CQUNHbkMsZ0JBREgsQ0FDb0IsT0FEcEIsRUFDNkIsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2hDQSxVQUFFc0MsY0FBRjtBQUNBSCxjQUFNSyxJQUFOO0FBQ0QsT0FKSDtBQU1ELEtBZkQsTUFlTztBQUNMckIsZUFBU3NCLE1BQVQ7QUFDRDs7QUFFRCxRQUFJakMsY0FBY1ksT0FBT2lCLE9BQVAsQ0FBZWpCLE1BQTdCLEVBQXFDRCxRQUFyQyxLQUFrRCxLQUF0RCxFQUE2RDtBQUMzREEsZUFBU3NCLE1BQVQ7QUFDRDtBQUNGLEdBaENEOztBQWtDQS9DLFdBQVNDLGdCQUFULENBQTBCLGFBQTFCLEVBQXlDQyxPQUF6QyxDQUFpRCxVQUFDOEMsRUFBRCxFQUFLckIsQ0FBTCxFQUFXO0FBQzFEcUIsT0FBRzNDLGdCQUFILENBQW9CLE9BQXBCLEVBQTZCLFVBQUNDLENBQUQsRUFBTztBQUNsQ0EsUUFBRXNDLGNBQUY7O0FBR0EsVUFBTUssWUFBWUQsR0FBR0UsT0FBSCxDQUFXLG9CQUFYLENBQWxCO0FBQ0FELGdCQUFVRSxTQUFWLENBQW9CQyxNQUFwQixDQUEyQixXQUEzQjtBQUVELEtBUEQ7QUFRRCxHQVREOztBQVdBcEQsV0FBU0MsZ0JBQVQsQ0FBMEIsZUFBMUIsRUFBMkNDLE9BQTNDLENBQW1ELFVBQUM4QyxFQUFELEVBQUtyQixDQUFMLEVBQVc7QUFDNURxQixPQUFHM0MsZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2xDQSxRQUFFc0MsY0FBRjs7QUFFQSxVQUFNUyxPQUFPTCxHQUFHTCxPQUFILENBQVdTLE1BQXhCO0FBQ0EsVUFBSUUsSUFBSU4sRUFBUjs7QUFFQSxVQUFJTSxFQUFFQyxPQUFGLElBQWEsUUFBakIsRUFBMkI7QUFDekIsWUFBTUMsT0FBT0YsRUFBRXpCLGFBQUYsQ0FBZ0IsTUFBaEIsQ0FBYjtBQUNBeUIsVUFBRVgsT0FBRixDQUFVUyxNQUFWLEdBQW1CRSxFQUFFRyxXQUFGLENBQWMvQyxJQUFkLEVBQW5CO0FBQ0E0QyxZQUFJRSxJQUFKO0FBQ0Q7O0FBRURGLFFBQUVHLFdBQUYsR0FBZ0JKLElBQWhCO0FBQ0QsS0FiRDtBQWNELEdBZkQ7O0FBaUJBckQsV0FBU0MsZ0JBQVQsQ0FBMEIsYUFBMUIsRUFBeUNDLE9BQXpDLENBQWlELFVBQUN3RCxJQUFELEVBQU8vQixDQUFQLEVBQWE7QUFDNUQsUUFBTWdDLE9BQU9ELEtBQUtmLE9BQUwsQ0FBYWUsSUFBMUI7QUFBQSxRQUNNRSxVQUFVNUQsU0FBUzZCLGFBQVQseUJBQTZDOEIsSUFBN0MsT0FEaEI7O0FBR0FELFNBQUt6RCxnQkFBTCxDQUFzQixZQUF0QixFQUFvQ0MsT0FBcEMsQ0FBNEMsVUFBQzJELEdBQUQsRUFBTXpELENBQU4sRUFBWTtBQUN0RHlELFVBQUl4RCxnQkFBSixDQUFxQixPQUFyQixFQUE4QixVQUFDQyxDQUFELEVBQU87QUFDbkNBLFVBQUVzQyxjQUFGOztBQUVBLFlBQUlpQixJQUFJQyxVQUFKLENBQWVuQixPQUFmLENBQXVCb0IsV0FBM0IsRUFBd0M7O0FBRXhDLFlBQU1DLFFBQVFILElBQUlsQixPQUFKLENBQVlrQixHQUExQjtBQUFBLFlBQ01JLFVBQVVMLFFBQVEvQixhQUFSLENBQXNCLFVBQXRCLENBRGhCO0FBQUEsWUFFTXFDLFdBQVdSLEtBQUs3QixhQUFMLENBQW1CLFdBQW5CLENBRmpCOztBQUlBLFlBQUlvQyxPQUFKLEVBQWFBLFFBQVFkLFNBQVIsQ0FBa0JKLE1BQWxCLENBQXlCLFNBQXpCO0FBQ2IsWUFBSW1CLFFBQUosRUFBY0EsU0FBU2YsU0FBVCxDQUFtQkosTUFBbkIsQ0FBMEIsVUFBMUI7QUFDZGMsWUFBSVYsU0FBSixDQUFjZ0IsR0FBZCxDQUFrQixVQUFsQjtBQUNBUCxnQkFBUS9CLGFBQVIsaUJBQW9DbUMsS0FBcEMsU0FBK0NiLFNBQS9DLENBQXlEZ0IsR0FBekQsQ0FBNkQsU0FBN0Q7QUFDRCxPQWJEO0FBZUQsS0FoQkQ7QUFpQkFULFNBQUs3QixhQUFMLG1CQUFxQ3VDLEtBQXJDO0FBQ0QsR0F0QkQ7O0FBd0JBO0FBQ0FwRSxXQUFTQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQ0MsT0FBcEMsQ0FBNEMsVUFBQ21FLE1BQUQsRUFBUzFDLENBQVQsRUFBZTtBQUN6RCxRQUFJMEMsT0FBT25CLE9BQVAsQ0FBZSxRQUFmLENBQUosRUFBOEI7QUFDNUI7QUFDRDs7QUFFRCxRQUFJb0IsWUFBSixDQUFpQjtBQUNmQyxZQUFNRjtBQURTLEtBQWpCO0FBR0QsR0FSRDs7QUFVQXJFLFdBQVNDLGdCQUFULENBQTBCLGFBQTFCLEVBQXlDQyxPQUF6QyxDQUFpRCxVQUFDbUUsTUFBRCxFQUFTMUMsQ0FBVCxFQUFlOztBQUU5RDBDLFdBQU94QyxhQUFQLENBQXFCLG9CQUFyQixFQUEyQ3hCLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxVQUFDQyxDQUFELEVBQU87QUFDMUVBLFFBQUVzQyxjQUFGOztBQUVBLFVBQUksNkJBQUl5QixPQUFPbEIsU0FBWCxHQUFzQnFCLFFBQXRCLENBQStCLGFBQS9CLENBQUosRUFBbUQ7QUFDakRILGVBQU9sQixTQUFQLENBQWlCSixNQUFqQixDQUF3QixhQUF4QjtBQUNELE9BRkQsTUFFTztBQUNML0MsaUJBQVNDLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDQyxPQUExQyxDQUFrRCxVQUFDbUUsTUFBRCxFQUFTakUsQ0FBVCxFQUFlO0FBQy9EaUUsaUJBQU9sQixTQUFQLENBQWlCSixNQUFqQixDQUF3QixhQUF4QjtBQUNELFNBRkQ7QUFHQXNCLGVBQU9sQixTQUFQLENBQWlCZ0IsR0FBakIsQ0FBcUIsYUFBckI7O0FBRUE7QUFDRDtBQUNGLEtBYkQ7QUFjRCxHQWhCRDs7QUFrQkE7QUFDQSxNQUFNTSxXQUFXekUsU0FBUzZCLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBakI7O0FBRUEsTUFBSTRDLFFBQUosRUFBYztBQUNaLFFBQU1DLFNBQVNELFNBQVN4RSxnQkFBVCxDQUEwQix3QkFBMUIsQ0FBZjtBQUFBLFFBQ013QixXQUFXZ0QsU0FBU3hFLGdCQUFULENBQTBCLDBCQUExQixDQURqQjtBQUFBLFFBRU0wRSxhQUFhRixTQUFTNUMsYUFBVCxDQUF1Qix3QkFBdkIsRUFBaURFLFFBRnBFOztBQUlBMkMsV0FBT3hFLE9BQVAsQ0FBZSxVQUFDMEUsS0FBRCxFQUFRakQsQ0FBUixFQUFjO0FBQzNCLFVBQU1rRCxNQUFNLElBQUlDLElBQUosRUFBWjtBQUFBLFVBQ01DLE9BQU8sSUFBSUQsSUFBSixDQUFTRCxJQUFJRyxXQUFKLEVBQVQsRUFBNEJILElBQUlJLFFBQUosS0FBZXRELENBQTNDLENBRGI7O0FBR0EsVUFBSXVELGdCQUFnQjtBQUNsQkMsbUJBQVcsSUFETztBQUVsQkMsaUJBQVM7QUFGUyxPQUFwQjs7QUFLQSxVQUFNQyxhQUFhQyxFQUFFVixLQUFGLEVBQVNTLFVBQVQsQ0FBb0I7QUFDckNFLG1CQUFXUixJQUQwQjtBQUVyQ1MsMkJBQW1CLENBQUMsQ0FGaUI7QUFHckNDLHFCQUFhLENBQUMsQ0FIdUI7QUFJckNDLGdDQUF3QixFQUphO0FBS3JDQyxtQkFBVztBQUNQQyxnQkFBTSxJQURDO0FBRVBsQixrQkFBUSxNQUZEO0FBR1BtQixpQkFBTztBQUhBLFNBTDBCOztBQVdyQ0Msb0JBWHFDLHdCQVd4QmYsSUFYd0IsRUFXbEJnQixRQVhrQixFQVdSO0FBQzNCLGNBQU1DLElBQUlqQixLQUFLQyxXQUFMLEVBQVY7QUFBQSxjQUNNaUIsSUFBSWxCLEtBQUtFLFFBQUwsRUFEVjtBQUFBLGNBRU1pQixJQUFJbkIsS0FBS29CLE9BQUwsRUFGVjtBQUFBLGNBR01DLE1BQU1yQixLQUFLc0IsTUFBTCxFQUhaO0FBQUEsY0FJTUMsT0FBTzdCLFNBQVM5QixPQUFULENBQWlCMkQsSUFKOUI7QUFBQSxjQUtNQyxLQUFLOUIsU0FBUzlCLE9BQVQsQ0FBaUI0RCxFQUw1QjtBQUFBLGNBTU1DLFdBQVc1QixNQUFNL0MsYUFBTixDQUFvQixlQUFwQixDQU5qQjtBQUFBLGNBT000RSxTQUFTN0IsTUFBTS9DLGFBQU4sQ0FBb0IsYUFBcEIsQ0FQZjtBQUFBLGNBUU02RSxhQUFhOUIsTUFBTTNFLGdCQUFOLENBQXVCLGFBQXZCLENBUm5COztBQVVFLGNBQUl1RyxRQUFKLEVBQWM7QUFDWkEscUJBQVNyRCxTQUFULENBQW1CSixNQUFuQixDQUEwQixjQUExQjtBQUNEOztBQUVELGNBQUkwRCxNQUFKLEVBQVk7QUFDVkEsbUJBQU90RCxTQUFQLENBQWlCSixNQUFqQixDQUF3QixZQUF4QjtBQUNEOztBQUVEMkQscUJBQVd4RyxPQUFYLENBQW1CLFVBQUN5RyxJQUFELEVBQU9oRixDQUFQLEVBQWE7QUFDOUJnRixpQkFBS3hELFNBQUwsQ0FBZUosTUFBZixDQUFzQixZQUF0QjtBQUNELFdBRkQ7O0FBSUEsY0FBSWdDLEtBQUs2QixPQUFMLE1BQWtCTixJQUF0QixFQUE0QjtBQUMxQixtQkFBTztBQUNMTyx1QkFBUztBQURKLGFBQVA7QUFHRCxXQUpELE1BSU8sSUFBSTlCLEtBQUs2QixPQUFMLE1BQWtCTCxFQUF0QixFQUEwQjtBQUMvQixtQkFBTztBQUNMTSx1QkFBUztBQURKLGFBQVA7QUFHRCxXQUpNLE1BSUEsSUFBSTlCLEtBQUs2QixPQUFMLEtBQWlCTixJQUFqQixJQUF5QnZCLEtBQUs2QixPQUFMLEtBQWlCTCxFQUE5QyxFQUFrRDtBQUN2RCxtQkFBTztBQUNMTSx1QkFBUztBQURKLGFBQVA7QUFHRDtBQUVKLFNBaERvQztBQWtEckNDLGdCQWxEcUMsb0JBa0Q1QkMsYUFsRDRCLEVBa0RiaEMsSUFsRGEsRUFrRFBpQyxJQWxETyxFQWtERDtBQUNsQyxjQUFNaEIsSUFBSWpCLEtBQUtDLFdBQUwsRUFBVjtBQUFBLGNBQ01pQixJQUFJbEIsS0FBS0UsUUFBTCxFQURWO0FBQUEsY0FFTWlCLElBQUluQixLQUFLb0IsT0FBTCxFQUZWO0FBQUEsY0FHTUMsTUFBTXJCLEtBQUtzQixNQUFMLEVBSFo7O0FBS0EsY0FBSUMsT0FBTzdCLFNBQVM5QixPQUFULENBQWlCMkQsSUFBNUI7QUFBQSxjQUNJQyxLQUFLOUIsU0FBUzlCLE9BQVQsQ0FBaUI0RCxFQUQxQjtBQUFBLGNBRUlVLFlBQVlsQyxLQUFLNkIsT0FBTCxFQUZoQjs7QUFJQSxjQUFJTixRQUFRLENBQUNDLEVBQWIsRUFBaUI7QUFDZixnQkFBSUQsT0FBT1csU0FBWCxFQUFzQjtBQUNwQnhDLHVCQUFTOUIsT0FBVCxDQUFpQjRELEVBQWpCLEdBQXNCRCxJQUF0QjtBQUNBN0IsdUJBQVM5QixPQUFULENBQWlCMkQsSUFBakIsR0FBd0JXLFNBQXhCO0FBQ0QsYUFIRCxNQUdPO0FBQ0x4Qyx1QkFBUzlCLE9BQVQsQ0FBaUI0RCxFQUFqQixHQUFzQlUsU0FBdEI7QUFDRDtBQUNGLFdBUEQsTUFPTztBQUNMeEMscUJBQVM5QixPQUFULENBQWlCMkQsSUFBakIsR0FBd0JXLFNBQXhCO0FBQ0F4QyxxQkFBU3lDLGVBQVQsQ0FBeUIsU0FBekI7QUFDRDtBQUVGO0FBeEVvQyxPQUFwQixFQXlFaEJ2RCxJQXpFZ0IsQ0F5RVgsWUF6RVcsQ0FBbkI7O0FBMkVBbEMsZUFBU3ZCLE9BQVQsQ0FBaUIsVUFBQ2lILE1BQUQsRUFBU3hGLENBQVQsRUFBZTtBQUM5QndGLGVBQU85RyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDQyxDQUFELEVBQU87QUFDdENBLFlBQUVzQyxjQUFGOztBQUVBLGNBQU13RSxZQUFZQyxPQUFPRixPQUFPakUsT0FBUCxDQUFlLDBCQUFmLEVBQTJDUCxPQUEzQyxDQUFtRDJFLGdCQUExRCxDQUFsQjtBQUFBLGNBQ01DLGNBQWNsQyxXQUFXa0MsV0FEL0I7QUFFQSxrQkFBUUgsU0FBUjtBQUNFLGlCQUFLLENBQUw7QUFDRS9CLHlCQUFXTixJQUFYLEdBQWtCLElBQUlELElBQUosQ0FBU3lDLFlBQVl2QyxXQUFaLEVBQVQsRUFBb0N1QyxZQUFZdEMsUUFBWixLQUF1QixDQUEzRCxDQUFsQjtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFSSx5QkFBV21DLElBQVg7QUFDQTtBQUNGLGlCQUFLLENBQUw7QUFDRW5DLHlCQUFXdkMsSUFBWDtBQUNBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFdUMseUJBQVdOLElBQVgsR0FBa0IsSUFBSUQsSUFBSixDQUFTeUMsWUFBWXZDLFdBQVosRUFBVCxFQUFvQ3VDLFlBQVl0QyxRQUFaLEtBQXVCLENBQTNELENBQWxCO0FBQ0E7QUFaSjtBQWNELFNBbkJEO0FBb0JELE9BckJEOztBQXVCQSxVQUFJdEQsS0FBSyxDQUFULEVBQVk7QUFDVixZQUFJOEYsYUFBYXBDLFdBQVdrQyxXQUFYLENBQXVCdEMsUUFBdkIsRUFBakI7QUFDQSxZQUFNeUMsY0FBY3JDLFdBQVdzQyxHQUFYLENBQWVDLFdBQW5DOztBQUVBLGFBQUssSUFBSXhILElBQUksQ0FBYixFQUFnQkEsSUFBSSxFQUFwQixFQUF3QkEsR0FBeEIsRUFBNkI7QUFDM0IsY0FBSXNILFlBQVlELFVBQVosS0FBMkJJLFNBQS9CLEVBQTBDSixhQUFhLENBQWI7QUFDMUM5QyxxQkFBV3ZFLENBQVgsRUFBY3FELFdBQWQsR0FBNEJpRSxZQUFZRCxVQUFaLENBQTVCO0FBQ0EsWUFBRUEsVUFBRjtBQUNEO0FBQ0Y7O0FBRURwQyxpQkFBV3lDLFlBQVgsR0FBMEI1QyxhQUExQjs7QUFFQWxGLGVBQVM2QixhQUFULENBQXVCLHVCQUF2QixFQUFnRHhCLGdCQUFoRCxDQUFpRSxPQUFqRSxFQUEwRSxVQUFDQyxDQUFELEVBQU87QUFDL0VBLFVBQUVzQyxjQUFGO0FBQ0E2QixpQkFBU3lDLGVBQVQsQ0FBeUIsV0FBekI7QUFDQXpDLGlCQUFTeUMsZUFBVCxDQUF5QixTQUF6QjtBQUNBN0IsbUJBQVcwQyxLQUFYO0FBQ0QsT0FMRDs7QUFPQXRELGVBQVNwRSxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFDQyxDQUFELEVBQU87QUFDeEMrRSxtQkFBVzJDLE1BQVg7QUFDRCxPQUZEO0FBSUQsS0FuSUQ7O0FBcUlBdkcsYUFBU3ZCLE9BQVQsQ0FBaUIsVUFBQ2lILE1BQUQsRUFBU3hGLENBQVQsRUFBZTtBQUM5QndGLGFBQU85RyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDQyxDQUFELEVBQU87QUFDdENBLFVBQUVzQyxjQUFGOztBQUVBLFlBQU13RSxZQUFZQyxPQUFPRixPQUFPakUsT0FBUCxDQUFlLDBCQUFmLEVBQTJDUCxPQUEzQyxDQUFtRDJFLGdCQUExRCxDQUFsQjtBQUFBLFlBQ01XLFdBQVd4RCxTQUFTNUMsYUFBVCxDQUF1QixxQkFBdkIsQ0FEakI7QUFBQSxZQUVNcUcsY0FBY3pELFNBQVM1QyxhQUFULENBQXVCLHdCQUF2QixFQUFpREUsUUFBakQsQ0FBMERDLE1BQTFELEdBQW1FLENBRnZGO0FBQUEsWUFHTW1HLGFBQWExRCxTQUFTNUMsYUFBVCxDQUF1Qix3QkFBdkIsRUFBaURLLFdBSHBFO0FBQUEsWUFJTWtHLGVBQWdCSCxTQUFTSSxLQUFULENBQWVDLElBQWYsSUFBdUIsRUFBeEIsR0FBOEIsQ0FBOUIsR0FBa0NDLFNBQVNOLFNBQVNJLEtBQVQsQ0FBZUMsSUFBeEIsQ0FKdkQ7QUFBQSxZQUtNRSxjQUFjTCxhQUFhRCxXQUxqQzs7QUFPQSxnQkFBUWQsU0FBUjtBQUNFLGVBQUssQ0FBTDtBQUNFYSxxQkFBU0ksS0FBVCxDQUFlQyxJQUFmLEdBQXNCRSxjQUFjLElBQXBDO0FBQ0FyQixtQkFBT2pFLE9BQVAsQ0FBZSwwQkFBZixFQUEyQ1AsT0FBM0MsQ0FBbUQyRSxnQkFBbkQsR0FBc0UsQ0FBdEU7QUFDQTdDLHFCQUFTNUMsYUFBVCxDQUF1Qiw4QkFBdkIsRUFBdURjLE9BQXZELENBQStEMkUsZ0JBQS9ELEdBQWtGLENBQWxGO0FBQ0E7QUFDRixlQUFLLENBQUw7QUFDRSxnQkFBSWMsZ0JBQWdCRCxVQUFwQixFQUFnQztBQUM5QmhCLHFCQUFPakUsT0FBUCxDQUFlLDBCQUFmLEVBQTJDUCxPQUEzQyxDQUFtRDJFLGdCQUFuRCxHQUFzRSxDQUF0RTtBQUNEO0FBQ0RXLHFCQUFTSSxLQUFULENBQWVDLElBQWYsR0FBdUJGLGVBQWVELFVBQWhCLEdBQThCLElBQXBEO0FBQ0ExRCxxQkFBUzVDLGFBQVQsQ0FBdUIsOEJBQXZCLEVBQXVEYyxPQUF2RCxDQUErRDJFLGdCQUEvRCxHQUFrRixDQUFsRjtBQUNBO0FBQ0YsZUFBSyxDQUFMO0FBQ0UsZ0JBQUljLGdCQUFnQkksY0FBY0wsVUFBbEMsRUFBOEM7QUFDNUNoQixxQkFBT2pFLE9BQVAsQ0FBZSwwQkFBZixFQUEyQ1AsT0FBM0MsQ0FBbUQyRSxnQkFBbkQsR0FBc0UsQ0FBdEU7QUFDRDtBQUNEVyxxQkFBU0ksS0FBVCxDQUFlQyxJQUFmLEdBQXVCRixlQUFlRCxVQUFoQixHQUE4QixJQUFwRDtBQUNBMUQscUJBQVM1QyxhQUFULENBQXVCLDhCQUF2QixFQUF1RGMsT0FBdkQsQ0FBK0QyRSxnQkFBL0QsR0FBa0YsQ0FBbEY7QUFDQTtBQUNGLGVBQUssQ0FBTDtBQUNFVyxxQkFBU0ksS0FBVCxDQUFlQyxJQUFmLEdBQXNCLENBQXRCO0FBQ0FuQixtQkFBT2pFLE9BQVAsQ0FBZSwwQkFBZixFQUEyQ1AsT0FBM0MsQ0FBbUQyRSxnQkFBbkQsR0FBc0UsQ0FBdEU7QUFDQTdDLHFCQUFTNUMsYUFBVCxDQUF1Qiw4QkFBdkIsRUFBdURjLE9BQXZELENBQStEMkUsZ0JBQS9ELEdBQWtGLENBQWxGO0FBQ0E7QUF4Qko7QUEwQkQsT0FwQ0Q7QUFxQ0QsS0F0Q0Q7QUF1Q0Q7O0FBR0Q7O0FBRUF0SCxXQUFTQyxnQkFBVCxDQUEwQixpQkFBMUIsRUFBNkNDLE9BQTdDLENBQXFELFVBQUN1SSxRQUFELEVBQVc5RyxDQUFYLEVBQWlCO0FBQ3BFLFFBQU0rRyxPQUFPRCxTQUFTNUcsYUFBVCxDQUF1QixpQkFBdkIsQ0FBYjtBQUFBLFFBQ00xQixRQUFRc0ksU0FBUzVHLGFBQVQsQ0FBdUIsa0JBQXZCLENBRGQ7O0FBR0EsUUFBSThHLFFBQVFELEtBQUszRyxRQUFMLENBQWNDLE1BQTFCOztBQUVBN0IsVUFBTUssS0FBTixHQUFjbUksS0FBZDs7QUFFQUYsYUFBU3hJLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDQyxPQUExQyxDQUFrRCxVQUFDMEksSUFBRCxFQUFPeEksQ0FBUCxFQUFhO0FBQzdEd0ksV0FBS3ZJLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUNDLENBQUQsRUFBTztBQUNwQ0EsVUFBRXNDLGNBQUY7O0FBRUEsWUFBTXBDLFFBQVFvSSxLQUFLakcsT0FBTCxDQUFhbkMsS0FBM0I7QUFBQSxZQUNNcUksZUFBZTdJLFNBQVM4SSxhQUFULENBQXVCLElBQXZCLENBRHJCOztBQUdBSCxnQkFBUUQsS0FBSzNHLFFBQUwsQ0FBY0MsTUFBdEI7O0FBRUE2RyxxQkFBYTFGLFNBQWIsQ0FBdUJnQixHQUF2QixDQUEyQixnQkFBM0I7QUFDQTBFLHFCQUFhRSxTQUFiLGNBQWtDdkksS0FBbEM7O0FBRUFrSSxhQUFLTSxNQUFMLENBQVlILFlBQVo7QUFDQTFJLGNBQU1LLEtBQU4sR0FBYyxFQUFFbUksS0FBaEI7QUFDRCxPQWJEO0FBZUQsS0FoQkQ7QUFtQkQsR0EzQkQ7O0FBNkJBO0FBQ0EzSSxXQUFTQyxnQkFBVCxDQUEwQixpQkFBMUIsRUFBNkNDLE9BQTdDLENBQXFELFVBQUNrRCxNQUFELEVBQVN6QixDQUFULEVBQWU7QUFDbEV5QixXQUFPL0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3RDQSxRQUFFc0MsY0FBRjs7QUFFQVEsYUFBT0YsT0FBUCxDQUFlLFNBQWYsRUFBMEJDLFNBQTFCLENBQW9DQyxNQUFwQyxDQUEyQyxhQUEzQztBQUNELEtBSkQ7QUFLRCxHQU5EOztBQVFBO0FBQ0FwRCxXQUFTQyxnQkFBVCxDQUEwQixVQUExQixFQUFzQ0MsT0FBdEMsQ0FBOEMsVUFBQytJLE9BQUQsRUFBVXRILENBQVYsRUFBZ0I7QUFDNUQzQixhQUFTQyxnQkFBVCxDQUEwQix3QkFBMUIsRUFBb0RDLE9BQXBELENBQTRELFVBQUNpSCxNQUFELEVBQVMvRyxDQUFULEVBQWU7QUFDekUrRyxhQUFPOUcsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3RDQSxVQUFFc0MsY0FBRjs7QUFFQSxZQUFJc0csZUFBZUQsUUFBUXBILGFBQVIsQ0FBc0Isc0JBQXRCLENBQW5CO0FBQUEsWUFDSXNILGVBQWU5QixPQUFPNkIsYUFBYXZHLE9BQWIsQ0FBcUJ1RyxZQUE1QixDQURuQjs7QUFHQSxnQkFBUTdCLE9BQU9GLE9BQU94RSxPQUFQLENBQWV5RyxjQUF0QixDQUFSO0FBQ0UsZUFBSyxDQUFMO0FBQ0UsZ0JBQUlELGdCQUFnQixDQUFwQixFQUF1QkQsYUFBYXZHLE9BQWIsQ0FBcUJ1RyxZQUFyQixHQUFvQyxFQUFFQyxZQUF0QztBQUN2QjtBQUNGLGVBQUssQ0FBTDtBQUNFRCx5QkFBYXZHLE9BQWIsQ0FBcUJ1RyxZQUFyQixHQUFvQyxFQUFFQyxZQUF0QztBQUNBO0FBTko7QUFTRCxPQWZEO0FBZ0JELEtBakJEO0FBa0JELEdBbkJEOztBQXFCQTtBQUNBbkosV0FBU0MsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMENDLE9BQTFDLENBQWtELFVBQUMrQyxTQUFELEVBQVl0QixDQUFaLEVBQWtCO0FBQ2xFLFFBQU0wSCxRQUFRcEcsVUFBVU4sT0FBVixDQUFrQjBHLEtBQWhDO0FBQUEsUUFDTVgsT0FBT3pGLFVBQVVwQixhQUFWLENBQXdCLG1CQUF4QixDQURiO0FBQUEsUUFFTXNGLFNBQVNsRSxVQUFVcEIsYUFBVixDQUF3QixzQkFBeEIsQ0FGZjs7QUFLQXlILFVBQU1oRCxJQUFOLENBQVdvQyxLQUFLM0csUUFBaEIsRUFBMEI3QixPQUExQixDQUFrQyxVQUFDOEMsRUFBRCxFQUFLNUMsQ0FBTCxFQUFXO0FBQzNDLFVBQUlBLEtBQUtpSixLQUFULEVBQWdCckcsR0FBR3FGLEtBQUgsQ0FBU2tCLE9BQVQsR0FBbUIsTUFBbkI7QUFDakIsS0FGRDs7QUFJQSxRQUFJcEMsTUFBSixFQUFZO0FBQ1ZBLGFBQU85RyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDQyxDQUFELEVBQU87QUFDdENBLFVBQUVzQyxjQUFGOztBQUVBMEcsY0FBTWhELElBQU4sQ0FBV29DLEtBQUszRyxRQUFoQixFQUEwQjdCLE9BQTFCLENBQWtDLFVBQUM4QyxFQUFELEVBQUs1QyxDQUFMLEVBQVc7QUFDM0MsY0FBSUEsS0FBS2lKLEtBQVQsRUFBZ0JyRyxHQUFHcUYsS0FBSCxDQUFTa0IsT0FBVCxHQUFtQixFQUFuQjtBQUNqQixTQUZEOztBQUlBcEMsZUFBT3BFLE1BQVA7QUFDRCxPQVJEO0FBU0Q7QUFDRixHQXJCRDs7QUF1QkE7QUFDQS9DLFdBQVNLLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQUNDLENBQUQsRUFBTztBQUN4QyxRQUFNK0QsU0FBUy9ELEVBQUVrSixNQUFGLENBQVN0RyxPQUFULENBQWlCLGNBQWpCLENBQWY7QUFBQSxRQUNNdUcsY0FBY25KLEVBQUVrSixNQUFGLENBQVN0RyxPQUFULENBQWlCLGdCQUFqQixDQURwQjs7QUFHQSxRQUFJLENBQUNtQixNQUFELElBQVcsQ0FBQyw2QkFBSS9ELEVBQUVrSixNQUFGLENBQVNyRyxTQUFiLEdBQXdCcUIsUUFBeEIsQ0FBaUMsa0JBQWpDLENBQVosSUFBb0UsQ0FBQyw2QkFBSWxFLEVBQUVrSixNQUFGLENBQVNyRyxTQUFiLEdBQXdCcUIsUUFBeEIsQ0FBaUMsa0JBQWpDLENBQXpFLEVBQStIO0FBQzdIeEUsZUFBU0MsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMENDLE9BQTFDLENBQWtELFVBQUNtRSxNQUFELEVBQVMxQyxDQUFULEVBQWU7QUFDL0QwQyxlQUFPbEIsU0FBUCxDQUFpQkosTUFBakIsQ0FBd0IsYUFBeEI7QUFDRCxPQUZEO0FBR0Q7O0FBRUQsUUFBSSw2QkFBSXpDLEVBQUVrSixNQUFGLENBQVNyRyxTQUFiLEdBQXdCcUIsUUFBeEIsQ0FBaUMsa0JBQWpDLENBQUosRUFBMEQ7QUFDeERsRSxRQUFFc0MsY0FBRjs7QUFFQSxVQUFNekMsUUFBUUcsRUFBRWtKLE1BQUYsQ0FBU3RHLE9BQVQsQ0FBaUIsV0FBakIsRUFBOEJyQixhQUE5QixDQUE0QyxrQkFBNUMsQ0FBZDs7QUFFQTFCLFlBQU1LLEtBQU4sR0FBYyxFQUFFTCxNQUFNSyxLQUF0Qjs7QUFFQUYsUUFBRWtKLE1BQUYsQ0FBUzFGLFVBQVQsQ0FBb0JmLE1BQXBCO0FBQ0Q7O0FBRUQsUUFBSSxDQUFDekMsRUFBRWtKLE1BQUYsQ0FBU3RHLE9BQVQsQ0FBaUIsWUFBakIsQ0FBTCxFQUFxQztBQUNuQyxVQUFJLENBQUM1QyxFQUFFa0osTUFBRixDQUFTdEcsT0FBVCxDQUFpQixnQkFBakIsQ0FBTCxFQUF5QztBQUN2QyxZQUFNd0csT0FBTzFKLFNBQVM2QixhQUFULENBQXVCLFlBQXZCLENBQWI7QUFDQSxZQUFHNkgsSUFBSCxFQUFTQSxLQUFLdkcsU0FBTCxDQUFlSixNQUFmLENBQXNCLFdBQXRCO0FBQ1Y7QUFDRjs7QUFFRDtBQUNBLFFBQUkwRyxXQUFKLEVBQWlCO0FBQ2YsVUFBTUUsVUFBVUYsWUFBWXZHLE9BQVosQ0FBb0IsVUFBcEIsQ0FBaEI7QUFBQSxVQUNNMEcsT0FBT0QsUUFBUTlILGFBQVIsQ0FBc0IsZ0JBQXRCLENBRGI7QUFBQSxVQUVNZ0ksUUFBUUosWUFBWTlHLE9BQVosQ0FBb0JtSCxHQUZsQztBQUFBLFVBR001RixXQUFXeUYsUUFBUTlILGFBQVIsQ0FBc0IseUJBQXRCLENBSGpCO0FBQUEsVUFJTThHLFFBQVFnQixRQUFROUgsYUFBUixDQUFzQixpQkFBdEIsQ0FKZDs7QUFNQSxVQUFJcUMsUUFBSixFQUFjQSxTQUFTZixTQUFULENBQW1CSixNQUFuQixDQUEwQix3QkFBMUI7QUFDZDBHLGtCQUFZdEcsU0FBWixDQUFzQmdCLEdBQXRCLENBQTBCLHdCQUExQjtBQUNBeUYsV0FBSy9ILGFBQUwsQ0FBbUIsS0FBbkIsRUFBMEJrSSxHQUExQixHQUFnQ0YsS0FBaEM7O0FBRUEsVUFBSWxCLEtBQUosRUFBVztBQUNUQSxjQUFNaEcsT0FBTixDQUFjcUgsbUJBQWQsR0FBb0MzQyxPQUFPb0MsWUFBWTlHLE9BQVosQ0FBb0JxQixLQUEzQixJQUFrQyxDQUF0RTtBQUNEO0FBQ0Y7QUFFRixHQTVDRDs7QUE4Q0E7O0FBRUE7QUFDQWhFLFdBQVNDLGdCQUFULENBQTBCLFVBQTFCLEVBQXNDQyxPQUF0QyxDQUE4QyxVQUFDeUosT0FBRCxFQUFVaEksQ0FBVixFQUFnQjtBQUM1RCxRQUFNZ0gsUUFBUWdCLFFBQVE5SCxhQUFSLENBQXNCLGlCQUF0QixDQUFkO0FBQUEsUUFDTW9JLG1CQUFtQk4sUUFBUTlILGFBQVIsQ0FBc0IsZ0JBQXRCLEVBQXdDRSxRQUF4QyxDQUFpREMsTUFEMUU7O0FBR0EsUUFBSTJHLEtBQUosRUFBVztBQUNUQSxZQUFNaEcsT0FBTixDQUFjdUgsZUFBZCxHQUFnQ0QsZ0JBQWhDOztBQUVBTixjQUFROUgsYUFBUixDQUFzQix5QkFBdEIsRUFBaUR4QixnQkFBakQsQ0FBa0UsT0FBbEUsRUFBMkUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2hGLFlBQU04RyxZQUFZQyxPQUFPL0csRUFBRWtKLE1BQUYsQ0FBU3RHLE9BQVQsQ0FBaUIseUJBQWpCLEVBQTRDUCxPQUE1QyxDQUFvRHdILGVBQTNELENBQWxCO0FBQ0EsWUFBSW5HLFFBQVEyRixRQUFROUgsYUFBUixDQUFzQix5QkFBdEIsRUFBaURjLE9BQWpELENBQXlEcUIsS0FBckU7O0FBRUEsZ0JBQVFvRCxTQUFSO0FBQ0UsZUFBSyxDQUFMO0FBQ0UsZ0JBQUlwRCxTQUFTLENBQWIsRUFBZ0I7QUFDZEEsc0JBQVFpRyxtQkFBbUIsQ0FBM0I7QUFDRCxhQUZELE1BRU87QUFDTCxnQkFBRWpHLEtBQUY7QUFDRDtBQUNEO0FBQ0YsZUFBSyxDQUFMO0FBQ0UsZ0JBQUlBLFNBQVNpRyxtQkFBbUIsQ0FBaEMsRUFBbUM7QUFDakNqRyxzQkFBUSxDQUFSO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsZ0JBQUVBLEtBQUY7QUFDRDtBQUNEO0FBZEo7O0FBaUJBMkYsZ0JBQVE5SCxhQUFSLGlDQUFvRG1DLEtBQXBELFNBQStESSxLQUEvRDtBQUNELE9BdEJEO0FBdUJEOztBQUVEdUYsWUFBUTlILGFBQVIsQ0FBc0IsNEJBQXRCLEVBQW9EdUMsS0FBcEQ7QUFDRCxHQWpDRDs7QUFtQ0FwRSxXQUFTQyxnQkFBVCxDQUEwQixtQkFBMUIsRUFBK0NDLE9BQS9DLENBQXVELFVBQUNrSyxPQUFELEVBQVV6SSxDQUFWLEVBQWdCO0FBQ3JFeUksWUFBUS9KLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFVBQUNDLENBQUQsRUFBTztBQUN2Q0EsUUFBRXNDLGNBQUY7O0FBRUEsVUFBTVUsSUFBSWhELEVBQUVrSixNQUFGLENBQVN0RyxPQUFULENBQWlCLG1CQUFqQixDQUFWO0FBQUEsVUFDTVMsT0FBT0wsRUFBRVgsT0FBRixDQUFVMEgsU0FEdkI7QUFBQSxVQUVNQyxlQUFldEssU0FBUzZCLGFBQVQsbUJBQXVDOEIsSUFBdkMsUUFGckI7O0FBSUEsVUFBSUEsUUFBUSxTQUFaLEVBQXVCO0FBQ3JCMkcscUJBQWF6SSxhQUFiLENBQTJCLGlCQUEzQixFQUE4Q2tILFNBQTlDLEdBQTBEekYsRUFBRXlGLFNBQTVEO0FBQ0Q7O0FBRUQsVUFBSXdCLGVBQWVELGFBQWF2QixTQUFoQzs7QUFFQSxVQUFJeUIsUUFBUSxJQUFJQyxPQUFPRCxLQUFYLENBQWlCO0FBQzNCRSxzQkFBYyxDQUFDLFNBQUQsRUFBWSxRQUFaLENBRGE7QUFFM0JDLGlCQUFTLG1CQUFXO0FBQ2xCLGNBQUk7QUFDRixpQkFBSzVILE1BQUw7QUFDRCxXQUZELENBRUUsT0FBT3pDLENBQVAsRUFBVSxDQUVYO0FBQ0YsU0FSMEI7QUFTM0JzSyxrQkFBVU4sYUFBYW5IO0FBVEksT0FBakIsQ0FBWjs7QUFZQXFILFlBQU1LLFVBQU4sQ0FBaUJOLFlBQWpCO0FBQ0FDLFlBQU1NLElBQU47O0FBRUEsVUFBSW5ILFFBQVEsU0FBWixFQUF1QjtBQUNyQjZHLGNBQU1PLGVBQU4sQ0FBc0I5SyxnQkFBdEIsQ0FBdUMseUJBQXZDLEVBQWtFQyxPQUFsRSxDQUEwRSxVQUFDOEssS0FBRCxFQUFRNUssQ0FBUixFQUFjO0FBQ3RGNEssZ0JBQU0zSyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFDckMsZ0JBQU04RyxZQUFZQyxPQUFPL0csRUFBRWtKLE1BQUYsQ0FBU3RHLE9BQVQsQ0FBaUIseUJBQWpCLEVBQTRDUCxPQUE1QyxDQUFvRHdILGVBQTNELENBQWxCO0FBQUEsZ0JBQ01qRyxXQUFXbEUsU0FBUzZCLGFBQVQsQ0FBdUIseUJBQXZCLENBRGpCO0FBRUEsZ0JBQUlvSixvQkFBSjs7QUFFQSxvQkFBUTdELFNBQVI7QUFDRSxtQkFBSyxDQUFMO0FBQ0U2RCw4QkFBYy9HLFNBQVNnSCxzQkFBdkI7O0FBRUEsb0JBQUksQ0FBQ0QsV0FBTCxFQUFrQjtBQUNoQkEsZ0NBQWMvRyxTQUFTSixVQUFULENBQW9CL0IsUUFBcEIsQ0FBNkJtQyxTQUFTSixVQUFULENBQW9CL0IsUUFBcEIsQ0FBNkJDLE1BQTdCLEdBQW9DLENBQWpFLENBQWQ7QUFDRDtBQUNEOztBQUVGLG1CQUFLLENBQUw7QUFDRWlKLDhCQUFjL0csU0FBU2lILGtCQUF2Qjs7QUFFQSxvQkFBSSxDQUFDRixXQUFMLEVBQWtCO0FBQ2hCQSxnQ0FBYy9HLFNBQVNKLFVBQVQsQ0FBb0IvQixRQUFwQixDQUE2QixDQUE3QixDQUFkO0FBQ0Q7QUFDRDtBQWZKOztBQWtCQSxnQkFBTStILE1BQU1tQixZQUFZdEksT0FBWixDQUFvQm1ILEdBQWhDO0FBQ0FVLGtCQUFNTyxlQUFOLENBQXNCbEosYUFBdEIsQ0FBb0MsS0FBcEMsRUFBMkNrSSxHQUEzQyxHQUFpREQsR0FBakQ7QUFDQTVGLHFCQUFTZixTQUFULENBQW1CSixNQUFuQixDQUEwQix3QkFBMUI7QUFDQWtJLHdCQUFZOUgsU0FBWixDQUFzQmdCLEdBQXRCLENBQTBCLHdCQUExQjtBQUVELFdBNUJEO0FBNkJELFNBOUJEO0FBK0JEOztBQUVELFVBQU1pSCxRQUFRWixNQUFNTyxlQUFOLENBQXNCOUssZ0JBQXRCLENBQXVDLE1BQXZDLENBQWQ7O0FBRUFtTCxZQUFNbEwsT0FBTixDQUFjLFVBQUNtTCxJQUFELEVBQU8xSixDQUFQLEVBQWE7QUFDekIwSixhQUFLcEwsZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBZ0NDLE9BQWhDLENBQXdDLFVBQUNtRSxNQUFELEVBQVMxQyxDQUFULEVBQWU7QUFDckQySixrQkFBUUMsR0FBUixDQUFZNUosQ0FBWjs7QUFFQSxjQUFJMkMsWUFBSixDQUFpQjtBQUNmQyxrQkFBTUY7QUFEUyxXQUFqQjs7QUFJQWdILGVBQUt4SixhQUFMLENBQW1CLGdCQUFuQixFQUFxQ3hCLGdCQUFyQyxDQUFzRCxPQUF0RCxFQUErRCxVQUFDQyxDQUFELEVBQU87QUFDcEVBLGNBQUVzQyxjQUFGO0FBQ0QsV0FGRDtBQUlELFNBWEQ7QUFZRCxPQWJEOztBQWVBN0M7O0FBRUEsVUFBSTtBQUNGQyxpQkFBUzZCLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0N4QixnQkFBeEMsQ0FBeUQsT0FBekQsRUFBa0UsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZFQSxZQUFFc0MsY0FBRjtBQUNBNEgsZ0JBQU1nQixLQUFOO0FBQ0QsU0FIRDtBQUlELE9BTEQsQ0FLRSxPQUFPbEwsQ0FBUCxFQUFVLENBRVg7QUFDRixLQXpGRDtBQTBGRCxHQTNGRDs7QUE2RkE7QUFDQU4sV0FBU0MsZ0JBQVQsQ0FBMEIsZ0JBQTFCLEVBQTRDQyxPQUE1QyxDQUFvRCxVQUFDdUwsSUFBRCxFQUFPOUosQ0FBUCxFQUFhO0FBQy9EOEosU0FBS3BMLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUNDLENBQUQsRUFBTztBQUNwQ0EsUUFBRXNDLGNBQUY7O0FBRUEsVUFBSSxDQUFDdEMsRUFBRWtKLE1BQUYsQ0FBUzdHLE9BQVQsQ0FBaUIrSSxPQUF0QixFQUErQjs7QUFFL0IsVUFBTS9ILE9BQU84SCxLQUFLOUksT0FBTCxDQUFhK0ksT0FBMUI7QUFBQSxVQUNNQyxVQUFVM0wsU0FBUzZCLGFBQVQscUJBQXlDOEIsSUFBekMsUUFEaEI7O0FBR0FnSSxjQUFReEksU0FBUixDQUFrQkMsTUFBbEIsQ0FBeUIsV0FBekI7QUFDRCxLQVREO0FBVUQsR0FYRDs7QUFhQTtBQUNBLE1BQU13SSxPQUFPNUwsU0FBUzZCLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBYjs7QUFFQSxNQUFJK0osSUFBSixFQUFVO0FBQ1IsUUFBTUMsWUFBYXhFLE9BQU91RSxLQUFLL0osYUFBTCxDQUFtQixjQUFuQixFQUFtQ2MsT0FBbkMsQ0FBMkNuQyxLQUFsRCxJQUEyRCxFQUE1RCxHQUFrRSxDQUFwRjtBQUFBLFFBQ01zTCxlQUFlRixLQUFLL0osYUFBTCxDQUFtQixtQkFBbkIsQ0FEckI7O0FBR0FpSyxpQkFBYXpELEtBQWIsQ0FBbUIwRCxLQUFuQixHQUE4QkYsU0FBOUI7QUFDRDs7QUFFRDdMLFdBQVNDLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDQyxPQUExQyxDQUFrRCxVQUFDMkosS0FBRCxFQUFRbEksQ0FBUixFQUFjO0FBQzlEa0ksVUFBTXhKLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUNDLENBQUQsRUFBTztBQUNyQ0EsUUFBRXNDLGNBQUY7O0FBRUEsVUFBTW1ILE1BQU1GLE1BQU1sSCxPQUFOLENBQWNrSCxLQUExQjtBQUFBLFVBQ01DLE1BQU05SixTQUFTOEksYUFBVCxDQUF1QixLQUF2QixDQURaOztBQUdBZ0IsVUFBSUMsR0FBSixHQUFVQSxHQUFWOztBQUVBLFVBQUlTLFFBQVEsSUFBSUMsT0FBT0QsS0FBWCxDQUFpQjtBQUMzQkUsc0JBQWMsQ0FBQyxTQUFELEVBQVksUUFBWixDQURhO0FBRTNCQyxpQkFBUyxtQkFBVztBQUNsQixjQUFJO0FBQ0YsaUJBQUs1SCxNQUFMO0FBQ0QsV0FGRCxDQUVFLE9BQU96QyxDQUFQLEVBQVUsQ0FFWDtBQUNGLFNBUjBCO0FBUzNCc0ssa0JBQVUsQ0FBQyxPQUFELEVBQVUsZUFBVjtBQVRpQixPQUFqQixDQUFaOztBQVlBSixZQUFNSyxVQUFOLENBQWlCZixHQUFqQjtBQUNBVSxZQUFNTSxJQUFOO0FBRUQsS0F2QkQ7QUF3QkQsR0F6QkQ7O0FBMkJBOzs7QUFHQTlLLFdBQVNDLGdCQUFULENBQTBCLG9CQUExQixFQUFnREMsT0FBaEQsQ0FBd0QsVUFBQ2lILE1BQUQsRUFBU3hGLENBQVQsRUFBZTtBQUNyRXdGLFdBQU85RyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxVQUFDQyxDQUFELEVBQU87QUFDdENBLFFBQUVzQyxjQUFGOztBQUVBLFVBQU1lLE9BQU93RCxPQUFPeEUsT0FBUCxDQUFlcUosVUFBNUI7QUFBQSxVQUNNQyxVQUFVak0sU0FBUzZCLGFBQVQsQ0FBdUIsdUJBQXZCLENBRGhCO0FBQUEsVUFFTXFLLE9BQU9sTSxTQUFTQyxnQkFBVCxDQUEwQixhQUExQixDQUZiOztBQUlBZ00sY0FBUTlJLFNBQVIsQ0FBa0JKLE1BQWxCLENBQXlCLHNCQUF6QjtBQUNBLFVBQUlpQixRQUFRcUQsT0FBTzRFLFFBQVF0SixPQUFSLENBQWdCd0osV0FBdkIsQ0FBWjs7QUFFQSxjQUFReEksSUFBUjtBQUNFLGFBQUssTUFBTDtBQUNFM0QsbUJBQVM2QixhQUFULDBCQUE4QyxFQUFFbUMsS0FBaEQsU0FBMkRiLFNBQTNELENBQXFFZ0IsR0FBckUsQ0FBeUUsc0JBQXpFO0FBQ0E7QUFDRixhQUFLLE1BQUw7QUFDRW5FLG1CQUFTNkIsYUFBVCwwQkFBOEMsRUFBRW1DLEtBQWhELFNBQTJEYixTQUEzRCxDQUFxRWdCLEdBQXJFLENBQXlFLHNCQUF6RTtBQUNBO0FBTko7O0FBU0ErSCxXQUFLaE0sT0FBTCxDQUFhLFVBQUNnTSxJQUFELEVBQU85TCxDQUFQLEVBQWE7QUFDeEI4TCxhQUFLdkosT0FBTCxDQUFhdUosSUFBYixHQUFvQmxJLEtBQXBCO0FBQ0QsT0FGRDtBQUlELEtBdkJEO0FBd0JELEdBekJEOztBQTJCQTtBQUNBaEUsV0FBU0MsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMENDLE9BQTFDLENBQWtELFVBQUNrTSxLQUFELEVBQVF6SyxDQUFSLEVBQWM7QUFDOUR5SyxVQUFNL0wsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3JDLFVBQU0rTCxZQUFZL0wsRUFBRWtKLE1BQUYsQ0FBU3RHLE9BQVQsQ0FBaUIsc0JBQWpCLEVBQXlDNkYsU0FBM0Q7QUFBQSxVQUNNdUQsaUJBQWlCdE0sU0FBUzZCLGFBQVQsQ0FBdUIsaUJBQXZCLENBRHZCOztBQUdBeUsscUJBQWV2RCxTQUFmLEdBQTJCc0QsU0FBM0I7QUFDQXJNLGVBQVM2QixhQUFULENBQXVCLE1BQXZCLEVBQStCc0IsU0FBL0IsQ0FBeUNnQixHQUF6QyxDQUE2QyxlQUE3Qzs7QUFFQW9JLGFBQU9ILEtBQVA7O0FBRUFJLGlCQUFXLFlBQU07QUFDZnhNLGlCQUFTNkIsYUFBVCxDQUF1QixNQUF2QixFQUErQnNCLFNBQS9CLENBQXlDSixNQUF6QyxDQUFnRCxlQUFoRDtBQUNELE9BRkQsRUFFRyxDQUZIO0FBR0QsS0FaRDtBQWFELEdBZEQ7O0FBZ0JBL0MsV0FBU0MsZ0JBQVQsQ0FBMEIsWUFBMUIsRUFBd0NDLE9BQXhDLENBQWdELFVBQUN1TSxHQUFELEVBQU05SyxDQUFOLEVBQVk7QUFDMUQ4SyxRQUFJcE0sZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsVUFBQ0MsQ0FBRCxFQUFPO0FBQ25DTixlQUFTNkIsYUFBVCxDQUF1QixzQkFBdkIsRUFBK0N1QyxLQUEvQztBQUNELEtBRkQ7QUFHRCxHQUpEOztBQU1BO0FBQ0EsTUFBTXNJLFVBQVUxTSxTQUFTNkIsYUFBVCxDQUF1QixVQUF2QixDQUFoQjs7QUFFQSxNQUFJNkssT0FBSixFQUFhO0FBQ1gsUUFBTUMsZUFBZUQsUUFBUTdLLGFBQVIsQ0FBc0IsaUJBQXRCLENBQXJCO0FBQ0EsUUFBSXJCLFFBQVEsQ0FBWjs7QUFFQWtNLFlBQVF2SixTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0IsaUJBQXRCOztBQUVBLFFBQUl5SSxVQUFVQyxZQUFZLFlBQU07QUFDOUJyTSxlQUFTNkIsS0FBS3lLLEtBQUwsQ0FBV3pLLEtBQUswSyxNQUFMLEtBQWdCMUssS0FBS3lLLEtBQUwsQ0FBVyxDQUFYLENBQTNCLENBQVQ7QUFDQUgsbUJBQWE1RCxTQUFiLEdBQTBCdkksU0FBUyxHQUFWLEdBQWlCLEdBQWpCLEdBQXVCQSxLQUFoRDs7QUFFQSxVQUFJQSxTQUFTLEdBQWIsRUFBa0I7QUFDaEJ3TSxzQkFBY0osT0FBZDtBQUNBRixnQkFBUXZKLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQixnQkFBdEI7QUFDQW5FLGlCQUFTQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOENDLE9BQTlDLENBQXNELFVBQUM4QyxFQUFELEVBQUtyQixDQUFMLEVBQVc7QUFDL0RxQixhQUFHRyxTQUFILENBQWFnQixHQUFiLENBQWlCLHdCQUFqQjtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBWGEsRUFXWCxHQVhXLENBQWQ7QUFZRDtBQUVGLENBOXVCRCxFQTh1QkdvSSxNQTl1QkgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KCk7XG5cbiAgZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKS5mb3JFYWNoKChpbnB1dCwgaykgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBsZXQgdiA9IGlucHV0LnZhbHVlLnJlcGxhY2UoJys3JywgJycpLnRyaW0oKVxuICAgICAgICBpbnB1dC52YWx1ZSA9IFZNYXNrZXIudG9QYXR0ZXJuKHYsIHtwYXR0ZXJuOiBcIis3ICg5OTkpIDk5OS05OS05OVwifSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHBob25lTWFzaygpXG5cbiAgLy8gc2xpZGVyIG9wdGlvbnNcbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnYmFubmVyJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IHRydWUsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgbGF6eUxvYWQ6IHRydWVcbiAgICB9LFxuICAgICdmdWxsJzoge1xuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSxcbiAgICAnc2l4LWl0ZW1zJzoge1xuICAgICAgaXRlbXM6IDYsXG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWVcbiAgICB9LFxuICAgICdyZXZpZXdzJzoge1xuICAgICAgYXV0b1BsYXk6IDMwMDAsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIGNvbnRyb2xzOiBmYWxzZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgJ2dhbGxlcnknOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJylcblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIHNsaWRlck9wdGlvbnNbc2xpZGVyLmRhdGFzZXQuc2xpZGVyXSk7XG5cbiAgICAgIGNvbnRyb2xzUHJldlxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIGZsa3R5LnByZXZpb3VzKClcbiAgICAgICAgfSlcblxuICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoc2xpZGVyT3B0aW9uc1tzbGlkZXIuZGF0YXNldC5zbGlkZXJdLmNvbnRyb2xzID09PSBmYWxzZSkge1xuICAgICAgY29udHJvbHMucmVtb3ZlKClcbiAgICB9XG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9yZV0nKS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLW1vcmUtYWN0aW9uXScpXG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb3JlJylcblxuICAgIH0pXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlXScpLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LnRvZ2dsZVxuICAgICAgbGV0IHQgPSBlbFxuXG4gICAgICBpZiAodC50YWdOYW1lID09ICdCVVRUT04nKSB7XG4gICAgICAgIGNvbnN0IHNwYW4gPSB0LnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICAgICAgICB0LmRhdGFzZXQudG9nZ2xlID0gdC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgdCA9IHNwYW5cbiAgICAgIH1cblxuICAgICAgdC50ZXh0Q29udGVudCA9IHRleHRcbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnNdJykuZm9yRWFjaCgodGFicywgaSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB0YWJzLmRhdGFzZXQudGFicyxcbiAgICAgICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFicy1jb250ZW50PSR7ZGF0YX1dYClcblxuICAgIHRhYnMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiXScpLmZvckVhY2goKHRhYiwgaykgPT4ge1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgaWYgKHRhYi5wYXJlbnROb2RlLmRhdGFzZXQudGFic0NvbnRlbnQpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFiLmRhdGFzZXQudGFiLFxuICAgICAgICAgICAgICBzaG93aW5nID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCcuc2hvd2luZycpLFxuICAgICAgICAgICAgICBzZWxlY3RlZCA9IHRhYnMucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJylcblxuICAgICAgICBpZiAoc2hvd2luZykgc2hvd2luZy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93aW5nJylcbiAgICAgICAgaWYgKHNlbGVjdGVkKSBzZWxlY3RlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG4gICAgICAgIGNvbnRlbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPVwiJHtpbmRleH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdzaG93aW5nJylcbiAgICAgIH0pXG5cbiAgICB9KVxuICAgIHRhYnMucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPVwiMFwiXWApLmNsaWNrKClcbiAgfSlcblxuICAvLyBzZWxlY3RcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgaWYgKHNlbGVjdC5jbG9zZXN0KCcubW9kYWwnKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbmV3IEN1c3RvbVNlbGVjdCh7XG4gICAgICBlbGVtOiBzZWxlY3RcbiAgICB9KTtcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wXScpLmZvckVhY2goKHNlbGVjdCwgaSkgPT4ge1xuXG4gICAgc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5qcy1Ecm9wZG93bi10aXRsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBpZiAoWy4uLnNlbGVjdC5jbGFzc0xpc3RdLmluY2x1ZGVzKCdzZWxlY3Rfb3BlbicpKSB7XG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X29wZW4nKS5mb3JFYWNoKChzZWxlY3QsIGspID0+IHtcbiAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X29wZW4nKVxuICAgICAgICB9KVxuICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LmFkZCgnc2VsZWN0X29wZW4nKVxuXG4gICAgICAgIC8vIG5ldyBTaW1wbGVCYXIoc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfX2Ryb3Bkb3duJykpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcblxuICAvLyBkYXRlcGlja2Vyc1xuICBjb25zdCBjYWxlbmRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcicpXG5cbiAgaWYgKGNhbGVuZGFyKSB7XG4gICAgY29uc3QgbW9udGhzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyX19pdGVtIC5tb250aCcpLFxuICAgICAgICAgIGNvbnRyb2xzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJyksXG4gICAgICAgICAgbW9udGhzTGlzdCA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWxpc3QnKS5jaGlsZHJlblxuXG4gICAgbW9udGhzLmZvckVhY2goKG1vbnRoLCBpKSA9PiB7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKStpKTtcblxuICAgICAgbGV0IGN1c3RvbU9wdGlvbnMgPSB7XG4gICAgICAgIHJhbmdlRnJvbTogbnVsbCxcbiAgICAgICAgcmFuZ2VUbzogbnVsbCxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZXBpY2tlciA9ICQobW9udGgpLmRhdGVwaWNrZXIoe1xuICAgICAgICBzdGFydERhdGU6IGRhdGUsXG4gICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiAhMSxcbiAgICAgICAga2V5Ym9hcmROYXY6ICExLFxuICAgICAgICBtdWx0aXBsZURhdGVzU2VwYXJhdG9yOiAnJyxcbiAgICAgICAgbmF2VGl0bGVzOiB7XG4gICAgICAgICAgICBkYXlzOiAnTU0nLFxuICAgICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgICB5ZWFyczogJ3l5eXkxIC0geXl5eTInXG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZW5kZXJDZWxsKGRhdGUsIGNlbGxUeXBlKSB7XG4gICAgICAgICAgY29uc3QgeSA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBtID0gZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGQgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERheSgpLFxuICAgICAgICAgICAgICAgIGZyb20gPSBjYWxlbmRhci5kYXRhc2V0LmZyb20sXG4gICAgICAgICAgICAgICAgdG8gPSBjYWxlbmRhci5kYXRhc2V0LnRvLFxuICAgICAgICAgICAgICAgIGZyb21DZWxsID0gbW9udGgucXVlcnlTZWxlY3RvcignLi1yYW5nZS1mcm9tLScpLFxuICAgICAgICAgICAgICAgIHRvQ2VsbCA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3IoJy4tcmFuZ2UtdG8tJyksXG4gICAgICAgICAgICAgICAgcmFuZ2VDZWxscyA9IG1vbnRoLnF1ZXJ5U2VsZWN0b3JBbGwoJy4taW4tcmFuZ2UtJylcblxuICAgICAgICAgICAgaWYgKGZyb21DZWxsKSB7XG4gICAgICAgICAgICAgIGZyb21DZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1yYW5nZS1mcm9tLScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b0NlbGwpIHtcbiAgICAgICAgICAgICAgdG9DZWxsLmNsYXNzTGlzdC5yZW1vdmUoJy1yYW5nZS10by0nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYW5nZUNlbGxzLmZvckVhY2goKGNlbGwsIGkpID0+IHtcbiAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCctaW4tcmFuZ2UtJylcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChkYXRlLmdldFRpbWUoKSA9PSBmcm9tKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1yYW5nZS1mcm9tLSdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA9PSB0bykge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6ICctcmFuZ2UtdG8tJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGUuZ2V0VGltZSgpID4gZnJvbSAmJiBkYXRlLmdldFRpbWUoKSA8IHRvKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogJy1pbi1yYW5nZS0nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG9uU2VsZWN0KGZvcm1hdHRlZERhdGUsIGRhdGUsIGluc3QpIHtcbiAgICAgICAgICBjb25zdCB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIG0gPSBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgZCA9IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgIGRheSA9IGRhdGUuZ2V0RGF5KClcblxuICAgICAgICAgIGxldCBmcm9tID0gY2FsZW5kYXIuZGF0YXNldC5mcm9tLFxuICAgICAgICAgICAgICB0byA9IGNhbGVuZGFyLmRhdGFzZXQudG8sXG4gICAgICAgICAgICAgIHRpbWVTdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG5cbiAgICAgICAgICBpZiAoZnJvbSAmJiAhdG8pIHtcbiAgICAgICAgICAgIGlmIChmcm9tID4gdGltZVN0YW1wKSB7XG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQudG8gPSBmcm9tXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmRhdGFzZXQuZnJvbSA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsZW5kYXIuZGF0YXNldC50byA9IHRpbWVTdGFtcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxlbmRhci5kYXRhc2V0LmZyb20gPSB0aW1lU3RhbXBcbiAgICAgICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10bycpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH0pLmRhdGEoJ2RhdGVwaWNrZXInKVxuXG4gICAgICBjb250cm9scy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE51bWJlcihidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZSA9IGRhdGVwaWNrZXIuY3VycmVudERhdGVcbiAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBkYXRlcGlja2VyLmRhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLTMpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIucHJldigpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIubmV4dCgpXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGRhdGVwaWNrZXIuZGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCkrMylcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgIGxldCBtb250aEluZGV4ID0gZGF0ZXBpY2tlci5jdXJyZW50RGF0ZS5nZXRNb250aCgpXG4gICAgICAgIGNvbnN0IG1vbnRoTG9jYWxlID0gZGF0ZXBpY2tlci5sb2MubW9udGhzU2hvcnRcblxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDEyOyBrKyspIHtcbiAgICAgICAgICBpZiAobW9udGhMb2NhbGVbbW9udGhJbmRleF0gPT0gdW5kZWZpbmVkKSBtb250aEluZGV4ID0gMFxuICAgICAgICAgIG1vbnRoc0xpc3Rba10udGV4dENvbnRlbnQgPSBtb250aExvY2FsZVttb250aEluZGV4XVxuICAgICAgICAgICsrbW9udGhJbmRleFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRhdGVwaWNrZXIucmFuZ2VPcHRpb25zID0gY3VzdG9tT3B0aW9uc1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jbGVhcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjYWxlbmRhci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZnJvbScpXG4gICAgICAgIGNhbGVuZGFyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10bycpXG4gICAgICAgIGRhdGVwaWNrZXIuY2xlYXIoKVxuICAgICAgfSlcblxuICAgICAgY2FsZW5kYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkYXRlcGlja2VyLnVwZGF0ZSgpXG4gICAgICB9KVxuXG4gICAgfSlcblxuICAgIGNvbnRyb2xzLmZvckVhY2goKGJ1dHRvbiwgaSkgPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gTnVtYmVyKGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMpLFxuICAgICAgICAgICAgICBwcm9ncmVzcyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fcHJvZ3Jlc3MnKSxcbiAgICAgICAgICAgICAgbW9udGhzSXRlbXMgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXJfX21vbnRocy1saXN0JykuY2hpbGRyZW4ubGVuZ3RoIC0gMyxcbiAgICAgICAgICAgICAgbW9udGhXaWR0aCA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhcl9fbW9udGhzLWl0ZW0nKS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NMZWZ0ID0gKHByb2dyZXNzLnN0eWxlLmxlZnQgPT0gJycpID8gMCA6IHBhcnNlSW50KHByb2dyZXNzLnN0eWxlLmxlZnQpLFxuICAgICAgICAgICAgICBwcm9ncmVzc0VuZCA9IG1vbnRoV2lkdGggKiBtb250aHNJdGVtc1xuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IHByb2dyZXNzRW5kICsgJ3B4J1xuICAgICAgICAgICAgYnV0dG9uLmNsb3Nlc3QoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDFcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMlwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDNcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaWYgKHByb2dyZXNzTGVmdCA9PSBtb250aFdpZHRoKSB7XG4gICAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzcy5zdHlsZS5sZWZ0ID0gKHByb2dyZXNzTGVmdCAtIG1vbnRoV2lkdGgpICsgJ3B4J1xuICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2FsZW5kYXItY29udHJvbHM9XCIzXCJdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gMlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3NMZWZ0ID09IHByb2dyZXNzRW5kIC0gbW9udGhXaWR0aCkge1xuICAgICAgICAgICAgICBidXR0b24uY2xvc2VzdCgnW2RhdGEtY2FsZW5kYXItY29udHJvbHNdJykuZGF0YXNldC5jYWxlbmRhckNvbnRyb2xzID0gM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IChwcm9ncmVzc0xlZnQgKyBtb250aFdpZHRoKSArICdweCdcbiAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNhbGVuZGFyLWNvbnRyb2xzPVwiMFwiXScpLmRhdGFzZXQuY2FsZW5kYXJDb250cm9scyA9IDFcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcHJvZ3Jlc3Muc3R5bGUubGVmdCA9IDBcbiAgICAgICAgICAgIGJ1dHRvbi5jbG9zZXN0KCdbZGF0YS1jYWxlbmRhci1jb250cm9sc10nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAyXG4gICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jYWxlbmRhci1jb250cm9scz1cIjFcIl0nKS5kYXRhc2V0LmNhbGVuZGFyQ29udHJvbHMgPSAwXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuXG4gIC8vIHNlbGVjdG9yXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VsZWN0b3JdJykuZm9yRWFjaCgoc2VsZWN0b3IsIGkpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gc2VsZWN0b3IucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yX19saXN0JyksXG4gICAgICAgICAgaW5wdXQgPSBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2lucHV0JylcblxuICAgIGxldCBjb3VudCA9IGxpc3QuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICBpbnB1dC52YWx1ZSA9IGNvdW50XG5cbiAgICBzZWxlY3Rvci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12YWx1ZV0nKS5mb3JFYWNoKChpdGVtLCBrKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWUsXG4gICAgICAgICAgICAgIHNlbGVjdG9ySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcblxuICAgICAgICBjb3VudCA9IGxpc3QuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICAgICAgc2VsZWN0b3JJdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdG9yX19pdGVtJylcbiAgICAgICAgc2VsZWN0b3JJdGVtLmlubmVySFRNTCA9IGA8c3Bhbj4ke3ZhbHVlfTwvc3Bhbj48YnV0dG9uIGNsYXNzPVwic2VsZWN0b3JfX3JlbW92ZVwiPjwvYnV0dG9uPmBcblxuICAgICAgICBsaXN0LmFwcGVuZChzZWxlY3Rvckl0ZW0pXG4gICAgICAgIGlucHV0LnZhbHVlID0gKytjb3VudFxuICAgICAgfSlcblxuICAgIH0pXG5cblxuICB9KVxuXG4gIC8vIHRvZ2dsZVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9nZ2xlX19oZWFkZXInKS5mb3JFYWNoKCh0b2dnbGUsIGkpID0+IHtcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIHRvZ2dsZS5jbG9zZXN0KCcudG9nZ2xlJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlX29wZW4nKVxuICAgIH0pXG4gIH0pXG5cbiAgLy9jb3VudGVyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3VudGVyJykuZm9yRWFjaCgoY291bnRlciwgaSkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvdW50ZXItY29udHJvbF0nKS5mb3JFYWNoKChidXR0b24sIGspID0+IHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGxldCBjb3VudGVyVmFsdWUgPSBjb3VudGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXItdmFsdWVdJyksXG4gICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBOdW1iZXIoY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlKVxuXG4gICAgICAgIHN3aXRjaCAoTnVtYmVyKGJ1dHRvbi5kYXRhc2V0LmNvdW50ZXJDb250cm9sKSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT0gMCkgY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlID0gLS1jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY291bnRlclZhbHVlLmRhdGFzZXQuY291bnRlclZhbHVlID0gKytjdXJyZW50VmFsdWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICB9KVxuICB9KVxuXG4gIC8vcmV2aWV3c1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1saW1pdF0nKS5mb3JFYWNoKChjb250YWluZXIsIGkpID0+IHtcbiAgICBjb25zdCBsaW1pdCA9IGNvbnRhaW5lci5kYXRhc2V0LmxpbWl0LFxuICAgICAgICAgIGxpc3QgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGltaXQtbGlzdF0nKSxcbiAgICAgICAgICBidXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGltaXQtZGlzYWJsZV0nKVxuXG5cbiAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICBpZiAoayA+PSBsaW1pdCkgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0pXG5cbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBBcnJheS5mcm9tKGxpc3QuY2hpbGRyZW4pLmZvckVhY2goKGVsLCBrKSA9PiB7XG4gICAgICAgICAgaWYgKGsgPj0gbGltaXQpIGVsLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGJ1dHRvbi5yZW1vdmUoKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgLy90b3RhbCBjbGlja1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZS50YXJnZXQuY2xvc2VzdCgnLnNlbGVjdF9vcGVuJyksXG4gICAgICAgICAgZ2FsbGVyeUl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KCcuZ2FsbGVyeV9faXRlbScpXG5cbiAgICBpZiAoIXNlbGVjdCAmJiAhWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ3NlbGVjdG9yX19yZW1vdmUnKSAmJiAhWy4uLmUudGFyZ2V0LmNsYXNzTGlzdF0uaW5jbHVkZXMoJ2RhdGVwaWNrZXItLWNlbGwnKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdF9vcGVuJykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Rfb3BlbicpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChbLi4uZS50YXJnZXQuY2xhc3NMaXN0XS5pbmNsdWRlcygnc2VsZWN0b3JfX3JlbW92ZScpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgaW5wdXQgPSBlLnRhcmdldC5jbG9zZXN0KCcuc2VsZWN0b3InKS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3JfX2lucHV0JylcblxuICAgICAgaW5wdXQudmFsdWUgPSAtLWlucHV0LnZhbHVlXG5cbiAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKClcbiAgICB9XG5cbiAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5kcm9wX3Nob3cnKSkge1xuICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1kcm9waW5nXScpKSB7XG4gICAgICAgIGNvbnN0IHNob3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcF9zaG93JylcbiAgICAgICAgaWYoc2hvdykgc2hvdy5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wX3Nob3cnKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdhbGxlcnlcbiAgICBpZiAoZ2FsbGVyeUl0ZW0pIHtcbiAgICAgIGNvbnN0IGdhbGxlcnkgPSBnYWxsZXJ5SXRlbS5jbG9zZXN0KCcuZ2FsbGVyeScpLFxuICAgICAgICAgICAgdmlldyA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX3ZpZXcnKSxcbiAgICAgICAgICAgIGltYWdlID0gZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbWcsXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgIGNvdW50ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fY291bnQnKVxuXG4gICAgICBpZiAoc2VsZWN0ZWQpIHNlbGVjdGVkLmNsYXNzTGlzdC5yZW1vdmUoJ2dhbGxlcnlfX2l0ZW1fc2VsZWN0ZWQnKVxuICAgICAgZ2FsbGVyeUl0ZW0uY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICB2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IGltYWdlXG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBjb3VudC5kYXRhc2V0LmdhbGxlcnlDb3VudEN1cnJlbnQgPSBOdW1iZXIoZ2FsbGVyeUl0ZW0uZGF0YXNldC5pbmRleCkrMVxuICAgICAgfVxuICAgIH1cblxuICB9KVxuXG4gIC8vIGdhbGxlcnkgY291bnRcblxuICAvLyBnYWxsZXJ5IHRyaWdnZXJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKS5mb3JFYWNoKChnYWxsZXJ5LCBpKSA9PiB7XG4gICAgY29uc3QgY291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19jb3VudCcpLFxuICAgICAgICAgIGdhbGxlcnlMaXN0Q291bnQgPSBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19saXN0JykuY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGNvdW50LmRhdGFzZXQuZ2FsbGVyeUNvdW50QWxsID0gZ2FsbGVyeUxpc3RDb3VudFxuXG4gICAgICBnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWdhbGxlcnktY29udHJvbHNdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5kYXRhc2V0LmdhbGxlcnlDb250cm9scylcbiAgICAgICAgbGV0IGluZGV4ID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpLmRhdGFzZXQuaW5kZXhcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gZ2FsbGVyeUxpc3RDb3VudCAtIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC0taW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBnYWxsZXJ5TGlzdENvdW50IC0gMSkge1xuICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICsraW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKGAuZ2FsbGVyeV9faXRlbVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKS5jbGljaygpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGdhbGxlcnkucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2l0ZW06Zmlyc3QtY2hpbGQnKS5jbGljaygpXG4gIH0pXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtb3Blbl0nKS5mb3JFYWNoKCh0cmlnZ2VyLCBpKSA9PiB7XG4gICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgY29uc3QgdCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLW1vZGFsLW9wZW5dJyksXG4gICAgICAgICAgICBkYXRhID0gdC5kYXRhc2V0Lm1vZGFsT3BlbixcbiAgICAgICAgICAgIG1vZGFsRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW1vZGFsPVwiJHtkYXRhfVwiXWApXG5cbiAgICAgIGlmIChkYXRhID09ICdnYWxsZXJ5Jykge1xuICAgICAgICBtb2RhbEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX19jb250ZW50JykuaW5uZXJIVE1MID0gdC5pbm5lckhUTUxcbiAgICAgIH1cblxuICAgICAgbGV0IG1vZGFsQ29udGVudCA9IG1vZGFsRWxlbWVudC5pbm5lckhUTUxcblxuICAgICAgbGV0IG1vZGFsID0gbmV3IHRpbmdsZS5tb2RhbCh7XG4gICAgICAgIGNsb3NlTWV0aG9kczogWydvdmVybGF5JywgJ2VzY2FwZSddLFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3NzQ2xhc3M6IG1vZGFsRWxlbWVudC5jbGFzc0xpc3RcbiAgICAgIH0pO1xuXG4gICAgICBtb2RhbC5zZXRDb250ZW50KG1vZGFsQ29udGVudClcbiAgICAgIG1vZGFsLm9wZW4oKVxuXG4gICAgICBpZiAoZGF0YSA9PSAnZ2FsbGVyeScpIHtcbiAgICAgICAgbW9kYWwubW9kYWxCb3hDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWdhbGxlcnktY29udHJvbHNdJykuZm9yRWFjaCgoYXJyb3csIGspID0+IHtcbiAgICAgICAgICBhcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBOdW1iZXIoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtZ2FsbGVyeS1jb250cm9sc10nKS5kYXRhc2V0LmdhbGxlcnlDb250cm9scyksXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19pdGVtX3NlbGVjdGVkJylcbiAgICAgICAgICAgIGxldCBuZXdTZWxlY3RlZFxuXG4gICAgICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWQgPSBzZWxlY3RlZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG5cbiAgICAgICAgICAgICAgICBpZiAoIW5ld1NlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICBuZXdTZWxlY3RlZCA9IHNlbGVjdGVkLnBhcmVudE5vZGUuY2hpbGRyZW5bc2VsZWN0ZWQucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGgtMV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWQgPSBzZWxlY3RlZC5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgICAgICAgICAgICAgIGlmICghbmV3U2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIG5ld1NlbGVjdGVkID0gc2VsZWN0ZWQucGFyZW50Tm9kZS5jaGlsZHJlblswXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBuZXdTZWxlY3RlZC5kYXRhc2V0LmltZ1xuICAgICAgICAgICAgbW9kYWwubW9kYWxCb3hDb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IGltZ1xuICAgICAgICAgICAgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZSgnZ2FsbGVyeV9faXRlbV9zZWxlY3RlZCcpXG4gICAgICAgICAgICBuZXdTZWxlY3RlZC5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtX3NlbGVjdGVkJylcblxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZvcm1zID0gbW9kYWwubW9kYWxCb3hDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKVxuXG4gICAgICBmb3Jtcy5mb3JFYWNoKChmb3JtLCBpKSA9PiB7XG4gICAgICAgIGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykuZm9yRWFjaCgoc2VsZWN0LCBpKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coaSlcblxuICAgICAgICAgIG5ldyBDdXN0b21TZWxlY3Qoe1xuICAgICAgICAgICAgZWxlbTogc2VsZWN0XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZvcm0ucXVlcnlTZWxlY3RvcignLnNlbGVjdCBidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBwaG9uZU1hc2soKVxuXG4gICAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgICAgICAgfSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy9kcm9wXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3BpbmddJykuZm9yRWFjaCgoZHJvcCwgaSkgPT4ge1xuICAgIGRyb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGlmICghZS50YXJnZXQuZGF0YXNldC5kcm9waW5nKSByZXR1cm5cblxuICAgICAgY29uc3QgZGF0YSA9IGRyb3AuZGF0YXNldC5kcm9waW5nLFxuICAgICAgICAgICAgZHJvcHBlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3BwZWQ9XCIke2RhdGF9XCJdYClcblxuICAgICAgZHJvcHBlZC5jbGFzc0xpc3QudG9nZ2xlKCdkcm9wX3Nob3cnKVxuICAgIH0pXG4gIH0pXG5cbiAgLy9yYXRpbmdcbiAgY29uc3QgdHJpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRpbmdfdHJpcCcpXG5cbiAgaWYgKHRyaXApIHtcbiAgICBjb25zdCB0cmlwVmFsdWUgPSAoTnVtYmVyKHRyaXAucXVlcnlTZWxlY3RvcignW2RhdGEtdmFsdWVdJykuZGF0YXNldC52YWx1ZSkgKiAxMCkgKiAyLFxuICAgICAgICAgIHRyaXBQcm9ncmVzcyA9IHRyaXAucXVlcnlTZWxlY3RvcignLnJhdGluZ19fcHJvZ3Jlc3MnKVxuXG4gICAgdHJpcFByb2dyZXNzLnN0eWxlLndpZHRoID0gYCR7dHJpcFZhbHVlfSVgXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pbWFnZV0nKS5mb3JFYWNoKChpbWFnZSwgaSkgPT4ge1xuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBzcmMgPSBpbWFnZS5kYXRhc2V0LmltYWdlLFxuICAgICAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblxuICAgICAgaW1nLnNyYyA9IHNyY1xuXG4gICAgICBsZXQgbW9kYWwgPSBuZXcgdGluZ2xlLm1vZGFsKHtcbiAgICAgICAgY2xvc2VNZXRob2RzOiBbJ292ZXJsYXknLCAnZXNjYXBlJ10sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjc3NDbGFzczogWydtb2RhbCcsICdtb2RhbF9nYWxsZXJ5J10sXG4gICAgICB9KTtcblxuICAgICAgbW9kYWwuc2V0Q29udGVudChpbWcpO1xuICAgICAgbW9kYWwub3BlbigpXG5cbiAgICB9KVxuICB9KVxuXG4gIC8vINCo0LDQs9C4XG5cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zdGVwLWJ1dHRvbl0nKS5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIGNvbnN0IGRhdGEgPSBidXR0b24uZGF0YXNldC5zdGVwQnV0dG9uLFxuICAgICAgICAgICAgY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGVwLWNvbnRlbnRfY3VycmVudCcpLFxuICAgICAgICAgICAgc3RlcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXN0ZXBdJylcblxuICAgICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzdGVwLWNvbnRlbnRfY3VycmVudCcpXG4gICAgICBsZXQgaW5kZXggPSBOdW1iZXIoY3VycmVudC5kYXRhc2V0LnN0ZXBDb250ZW50KVxuXG4gICAgICBzd2l0Y2ggKGRhdGEpIHtcbiAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc3RlcC1jb250ZW50PVwiJHsrK2luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ3N0ZXAtY29udGVudF9jdXJyZW50JylcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdwcmV2JzpcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zdGVwLWNvbnRlbnQ9XCIkey0taW5kZXh9XCJdYCkuY2xhc3NMaXN0LmFkZCgnc3RlcC1jb250ZW50X2N1cnJlbnQnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIHN0ZXAuZm9yRWFjaCgoc3RlcCwgaykgPT4ge1xuICAgICAgICBzdGVwLmRhdGFzZXQuc3RlcCA9IGluZGV4XG4gICAgICB9KVxuXG4gICAgfSlcbiAgfSlcblxuICAvLyDQn9C10YfQsNGC0YxcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJpbnRdJykuZm9yRWFjaCgocHJpbnQsIGkpID0+IHtcbiAgICBwcmludC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBwcmludEhUTUwgPSBlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wcmludC1jb250ZW50XScpLmlubmVySFRNTCxcbiAgICAgICAgICAgIHByaW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByaW50U2VsZWN0aW9uJylcblxuICAgICAgcHJpbnRDb250YWluZXIuaW5uZXJIVE1MID0gcHJpbnRIVE1MXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgncHJpbnRTZWxlY3RlZCcpXG5cbiAgICAgIHdpbmRvdy5wcmludCgpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW50U2VsZWN0ZWQnKVxuICAgICAgfSwgMClcbiAgICB9KVxuICB9KVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1hcF0nKS5mb3JFYWNoKChidG4sIGkpID0+IHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW2RhdGEtdGFiPVwiMVwiXScpLmNsaWNrKClcbiAgICB9KVxuICB9KVxuXG4gIC8v0JjQvNC40YLQsNGG0LjRjyDQt9Cw0LPRgNGD0LfQutC4XG4gIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZycpO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgY29uc3QgdmFsdWVFbGVtZW50ID0gbG9hZGluZy5xdWVyeVNlbGVjdG9yKCcubG9hZGluZ19fdmFsdWUnKTtcbiAgICBsZXQgdmFsdWUgPSAwO1xuXG4gICAgbG9hZGluZy5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nX3Byb2Nlc3MnKVxuXG4gICAgbGV0IHByb2Nlc3MgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB2YWx1ZSArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDUpKVxuICAgICAgdmFsdWVFbGVtZW50LmlubmVySFRNTCA9ICh2YWx1ZSA+PSAxMDApID8gMTAwIDogdmFsdWVcblxuICAgICAgaWYgKHZhbHVlID49IDEwMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHByb2Nlc3MpXG4gICAgICAgIGxvYWRpbmcuY2xhc3NMaXN0LmFkZCgnbG9hZGluZ19maW5pc2gnKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9hZGluZy1wcm9jZXNzJykuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nLXByb2Nlc3NfZmluaXNoJylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCAxMDApXG4gIH1cblxufSkod2luZG93KTtcbiJdfQ==
