(function(root) {

  // svg for all
  svg4everybody();

  function phoneMask() {
    document.querySelectorAll('input[type="tel"]').forEach((input, k) => {
      input.addEventListener('input', (e) => {
        let v = input.value.replace('+7', '').trim()
        input.value = VMasker.toPattern(v, {pattern: "+7 (999) 999-99-99"})
      })
    })
  }

  phoneMask()

  // slider options
  const sliderOptions = {
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
      pageDots: false,
    }
  }

  document.querySelectorAll('[data-slider]').forEach((slider, i) => {
    const slides = slider.querySelector('[data-slider-slides]'),
          slidesCount = slides.children.length,
          slideWidth = slides.children[0].offsetWidth,
          sliderWidth = slider.offsetWidth,
          slidesCapacity = Math.round(sliderWidth/slideWidth),
          controls = slider.querySelector('[data-slider-controls]'),
          controlsPrev = controls.querySelector('[data-slider-controls-prev]'),
          controlsNext = controls.querySelector('[data-slider-controls-next]')

    if (slidesCount > slidesCapacity) {
      const flkty = new Flickity(slides, sliderOptions[slider.dataset.slider]);

      controlsPrev
        .addEventListener('click', (e) => {
          e.preventDefault()
          flkty.previous()
        })

      controlsNext
        .addEventListener('click', (e) => {
          e.preventDefault()
          flkty.next()
        })

    } else {
      controls.remove()
    }

    if (sliderOptions[slider.dataset.slider].controls === false) {
      controls.remove()
    }
  })

  document.querySelectorAll('[data-more]').forEach((el, i) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()


      const container = el.closest('[data-more-action]')
      container.classList.toggle('show-more')

    })
  })

  document.querySelectorAll('[data-toggle]').forEach((el, i) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()

      const text = el.dataset.toggle
      let t = el

      if (t.tagName == 'BUTTON') {
        const span = t.querySelector('span')
        t.dataset.toggle = t.textContent.trim()
        t = span
      }

      t.textContent = text
    })
  })

  document.querySelectorAll('[data-tabs]').forEach((tabs, i) => {
    const data = tabs.dataset.tabs,
          content = document.querySelector(`[data-tabs-content=${data}]`)

    tabs.querySelectorAll('[data-tab]').forEach((tab, k) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault()

        if (tab.parentNode.dataset.tabsContent) return

        const index = tab.dataset.tab,
              showing = content.querySelector('.showing'),
              selected = tabs.querySelector('.selected')

        if (showing) showing.classList.remove('showing')
        if (selected) selected.classList.remove('selected')
        tab.classList.add('selected')
        content.querySelector(`[data-tab="${index}"]`).classList.add('showing')
      })

    })
    tabs.querySelector(`[data-tab="0"]`).click()
  })

  // select
  document.querySelectorAll('select').forEach((select, i) => {
    new CustomSelect({
      elem: select
    });
  })

  document.querySelectorAll('[data-drop]').forEach((select, i) => {

    select.querySelector('.js-Dropdown-title').addEventListener('click', (e) => {
      e.preventDefault()

      if ([...select.classList].includes('select_open')) {
        select.classList.remove('select_open')
      } else {
        document.querySelectorAll('.select_open').forEach((select, k) => {
          select.classList.remove('select_open')
        })
        select.classList.add('select_open')

        // new SimpleBar(select.querySelector('.select__dropdown'))
      }
    })
  })

  // datepickers
  const calendar = document.querySelector('.calendar')

  if (calendar) {
    const months = calendar.querySelectorAll('.calendar__item .month'),
          controls = calendar.querySelectorAll('[data-calendar-controls]'),
          monthsList = calendar.querySelector('.calendar__months-list').children

    months.forEach((month, i) => {
      const now = new Date(),
            date = new Date(now.getFullYear(), now.getMonth()+i);

      let customOptions = {
        rangeFrom: null,
        rangeTo: null,
      }

      const datepicker = $(month).datepicker({
        startDate: date,
        selectOtherMonths: !1,
        keyboardNav: !1,
        multipleDatesSeparator: '',
        navTitles: {
            days: 'MM',
            months: 'yyyy',
            years: 'yyyy1 - yyyy2'
        },

        onRenderCell(date, cellType) {
          const y = date.getFullYear(),
                m = date.getMonth(),
                d = date.getDate(),
                day = date.getDay(),
                from = calendar.dataset.from,
                to = calendar.dataset.to,
                fromCell = month.querySelector('.-range-from-'),
                toCell = month.querySelector('.-range-to-'),
                rangeCells = month.querySelectorAll('.-in-range-')

            if (fromCell) {
              fromCell.classList.remove('-range-from-')
            }

            if (toCell) {
              toCell.classList.remove('-range-to-')
            }

            rangeCells.forEach((cell, i) => {
              cell.classList.remove('-in-range-')
            })

            if (date.getTime() == from) {
              return {
                classes: '-range-from-'
              }
            } else if (date.getTime() == to) {
              return {
                classes: '-range-to-'
              }
            } else if (date.getTime() > from && date.getTime() < to) {
              return {
                classes: '-in-range-'
              }
            }

        },

        onSelect(formattedDate, date, inst) {
          const y = date.getFullYear(),
                m = date.getMonth(),
                d = date.getDate(),
                day = date.getDay()

          let from = calendar.dataset.from,
              to = calendar.dataset.to,
              timeStamp = date.getTime()

          if (from && !to) {
            if (from > timeStamp) {
              calendar.dataset.to = from
              calendar.dataset.from = timeStamp
            } else {
              calendar.dataset.to = timeStamp
            }
          } else {
            calendar.dataset.from = timeStamp
            calendar.removeAttribute('data-to')
          }

        }
      }).data('datepicker')

      controls.forEach((button, i) => {
        button.addEventListener('click', (e) => {
          e.preventDefault()

          const direction = Number(button.closest('[data-calendar-controls]').dataset.calendarControls),
                currentDate = datepicker.currentDate
          switch (direction) {
            case 0:
              datepicker.date = new Date(currentDate.getFullYear(), currentDate.getMonth()-3)
              break
            case 1:
              datepicker.prev()
              break
            case 2:
              datepicker.next()
              break
            case 3:
              datepicker.date = new Date(currentDate.getFullYear(), currentDate.getMonth()+3)
              break
          }
        })
      })

      if (i == 0) {
        let monthIndex = datepicker.currentDate.getMonth()
        const monthLocale = datepicker.loc.monthsShort

        for (let k = 0; k < 12; k++) {
          if (monthLocale[monthIndex] == undefined) monthIndex = 0
          monthsList[k].textContent = monthLocale[monthIndex]
          ++monthIndex
        }
      }

      datepicker.rangeOptions = customOptions

      document.querySelector('[data-calendar-clear]').addEventListener('click', (e) => {
        e.preventDefault()
        calendar.removeAttribute('data-from')
        calendar.removeAttribute('data-to')
        datepicker.clear()
      })

      calendar.addEventListener('click', (e) => {
        datepicker.update()
      })

    })

    controls.forEach((button, i) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()

        const direction = Number(button.closest('[data-calendar-controls]').dataset.calendarControls),
              progress = calendar.querySelector('.calendar__progress'),
              monthsItems = calendar.querySelector('.calendar__months-list').children.length - 3,
              monthWidth = calendar.querySelector('.calendar__months-item').offsetWidth,
              progressLeft = (progress.style.left == '') ? 0 : parseInt(progress.style.left),
              progressEnd = monthWidth * monthsItems

        switch (direction) {
          case 0:
            progress.style.left = progressEnd + 'px'
            button.closest('[data-calendar-controls]').dataset.calendarControls = 1
            calendar.querySelector('[data-calendar-controls="2"]').dataset.calendarControls = 3
            break
          case 1:
            if (progressLeft == monthWidth) {
              button.closest('[data-calendar-controls]').dataset.calendarControls = 0
            }
            progress.style.left = (progressLeft - monthWidth) + 'px'
            calendar.querySelector('[data-calendar-controls="3"]').dataset.calendarControls = 2
            break
          case 2:
            if (progressLeft == progressEnd - monthWidth) {
              button.closest('[data-calendar-controls]').dataset.calendarControls = 3
            }
            progress.style.left = (progressLeft + monthWidth) + 'px'
            calendar.querySelector('[data-calendar-controls="0"]').dataset.calendarControls = 1
            break
          case 3:
            progress.style.left = 0
            button.closest('[data-calendar-controls]').dataset.calendarControls = 2
            calendar.querySelector('[data-calendar-controls="1"]').dataset.calendarControls = 0
            break
        }
      })
    })
  }


  // selector

  document.querySelectorAll('[data-selector]').forEach((selector, i) => {
    const list = selector.querySelector('.selector__list'),
          input = selector.querySelector('.selector__input')

    let count = list.children.length

    input.value = count

    selector.querySelectorAll('[data-value]').forEach((item, k) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()

        const value = item.dataset.value,
              selectorItem = document.createElement('li')

        count = list.children.length

        selectorItem.classList.add('selector__item')
        selectorItem.innerHTML = `<span>${value}</span><button class="selector__remove"></button>`

        list.append(selectorItem)
        input.value = ++count
      })

    })


  })

  // toggle
  document.querySelectorAll('.toggle__header').forEach((toggle, i) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault()

      toggle.closest('.toggle').classList.toggle('toggle_open')
    })
  })

  //counter
  document.querySelectorAll('.counter').forEach((counter, i) => {
    document.querySelectorAll('[data-counter-control]').forEach((button, k) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()

        let counterValue = counter.querySelector('[data-counter-value]'),
            currentValue = Number(counterValue.dataset.counterValue)

        switch (Number(button.dataset.counterControl)) {
          case 0:
            if (currentValue != 0) counterValue.dataset.counterValue = --currentValue
            break
          case 1:
            counterValue.dataset.counterValue = ++currentValue
            break
        }

      })
    })
  })

  //reviews
  document.querySelectorAll('[data-limit]').forEach((container, i) => {
    const limit = container.dataset.limit,
          list = container.querySelector('[data-limit-list]'),
          button = container.querySelector('[data-limit-disable]')


    Array.from(list.children).forEach((el, k) => {
      if (k >= limit) el.style.display = 'none'
    })

    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()

        Array.from(list.children).forEach((el, k) => {
          if (k >= limit) el.style.display = ''
        })

        button.remove()
      })
    }
  })

  //total click
  document.addEventListener('click', (e) => {
    const select = e.target.closest('.select_open'),
          galleryItem = e.target.closest('.gallery__item')

    if (!select && ![...e.target.classList].includes('selector__remove') && ![...e.target.classList].includes('datepicker--cell')) {
      document.querySelectorAll('.select_open').forEach((select, i) => {
        select.classList.remove('select_open')
      })
    }

    if ([...e.target.classList].includes('selector__remove')) {
      e.preventDefault()

      const input = e.target.closest('.selector').querySelector('.selector__input')

      input.value = --input.value

      e.target.parentNode.remove()
    }

    if (!e.target.closest('.drop_show')) {
      if (!e.target.closest('[data-droping]')) {
        const show = document.querySelector('.drop_show')
        if(show) show.classList.remove('drop_show')
      }
    }

    // gallery
    if (galleryItem) {
      const gallery = galleryItem.closest('.gallery'),
            view = gallery.querySelector('.gallery__view'),
            image = galleryItem.dataset.img,
            selected = gallery.querySelector('.gallery__item_selected'),
            count = gallery.querySelector('.gallery__count')

      if (selected) selected.classList.remove('gallery__item_selected')
      galleryItem.classList.add('gallery__item_selected')
      view.querySelector('img').src = image

      if (count) {
        count.dataset.galleryCountCurrent = Number(galleryItem.dataset.index)+1
      }
    }

  })

  // gallery count

  // gallery trigger
  document.querySelectorAll('.gallery').forEach((gallery, i) => {
    const count = gallery.querySelector('.gallery__count'),
          galleryListCount = gallery.querySelector('.gallery__list').children.length

    if (count) {
      count.dataset.galleryCountAll = galleryListCount

      gallery.querySelector('[data-gallery-controls]').addEventListener('click', (e) => {
        const direction = Number(e.target.closest('[data-gallery-controls]').dataset.galleryControls)
        let index = gallery.querySelector('.gallery__item_selected').dataset.index
        console.log(e.target)

        switch (direction) {
          case 0:
            if (index == 0) {
              index = galleryListCount - 1
            } else {
              --index
            }
            break;
          case 1:
            if (index == galleryListCount - 1) {
              index = 0
            } else {
              ++index
            }
            break;
        }

        gallery.querySelector(`.gallery__item[data-index="${index}"]`).click()
      })
    }

    gallery.querySelector('.gallery__item:first-child').click()
  })

  document.querySelectorAll('[data-gallery-contols]').forEach((controls, i) => {
    const gallery = controls.closest('.gallery'),
          galleryList = gallery.querySelector('.gallery__list')
    controls.querySelector('[data-gallery-controls-prev]')
  })

  document.querySelectorAll('[data-modal-open]').forEach((trigger, i) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault()

      const t = e.target.closest('[data-modal-open]'),
            data = t.dataset.modalOpen,
            modalElement = document.querySelector(`[data-modal="${data}"]`)

      let modalContent = modalElement.innerHTML

      if (data == 'gallery') {
        modalContent = t.innerHTML
      }

      let modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function() {
          try {
            this.remove()
          } catch (e) {

          }
        },
        cssClass: modalElement.classList
      });

      modal.setContent(modalContent)
      modal.open()

      const forms = modal.modalBoxContent.querySelectorAll('form')

      forms.forEach((form, i) => {
        form.querySelectorAll('select').forEach((select, i) => {
          new CustomSelect({
            elem: select
          })
        })
      })

      phoneMask()

      try {
        document.querySelector('.modal__close').addEventListener('click', (e) => {
          e.preventDefault()
          modal.close()
        })
      } catch (e) {

      }
    })
  })

  //drop
  document.querySelectorAll('[data-droping]').forEach((drop, i) => {
    drop.addEventListener('click', (e) => {
      e.preventDefault()

      if (!e.target.dataset.droping) return

      const data = drop.dataset.droping,
            dropped = document.querySelector(`[data-dropped="${data}"]`)

      dropped.classList.toggle('drop_show')
    })
  })

  //rating
  const trip = document.querySelector('.rating_trip')

  if (trip) {
    const tripValue = (Number(trip.querySelector('[data-value]').dataset.value) * 10) * 2,
          tripProgress = trip.querySelector('.rating__progress')

    tripProgress.style.width = `${tripValue}%`
  }

  document.querySelectorAll('[data-image]').forEach((image, i) => {
    image.addEventListener('click', (e) => {
      e.preventDefault()

      const src = image.dataset.image,
            img = document.createElement('img')

      img.src = src

      let modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function() {
          try {
            this.remove()
          } catch (e) {

          }
        },
        cssClass: ['modal', 'modal_gallery'],
      });

      modal.setContent(img);
      modal.open()

    })
  })

  // Шаги


  document.querySelectorAll('[data-step-button]').forEach((button, i) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()

      const data = button.dataset.stepButton,
            current = document.querySelector('.step-content_current'),
            step = document.querySelectorAll('[data-step]')

      current.classList.remove('step-content_current')
      let index = Number(current.dataset.stepContent)

      switch (data) {
        case 'next':
          document.querySelector(`[data-step-content="${++index}"]`).classList.add('step-content_current')
          break
        case 'prev':
          document.querySelector(`[data-step-content="${--index}"]`).classList.add('step-content_current')
          break
      }

      step.forEach((step, k) => {
        step.dataset.step = index
      })

    })
  })

  // Печать
  document.querySelectorAll('[data-print]').forEach((print, i) => {
    print.addEventListener('click', (e) => {
      const printHTML = e.target.closest('[data-print-content]').innerHTML,
            printContainer = document.querySelector('.printSelection')

      printContainer.innerHTML = printHTML
      document.querySelector('body').classList.add('printSelected')

      window.print();

      setTimeout(() => {
        document.querySelector('body').classList.remove('printSelected')
      }, 0)
    })
  })

  document.querySelectorAll('[data-map]').forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      document.querySelector('button[data-tab="1"]').click()
    })
  })

  //Имитация загрузки
  const loading = document.querySelector('.loading');

  if (loading) {
    const valueElement = loading.querySelector('.loading__value');
    let value = 0;

    loading.classList.add('loading_process')

    let process = setInterval(() => {
      value += Math.floor(Math.random() * Math.floor(5))
      valueElement.innerHTML = (value >= 100) ? 100 : value

      if (value >= 100) {
        clearInterval(process)
        loading.classList.add('loading_finish')
        document.querySelectorAll('.loading-process').forEach((el, i) => {
          el.classList.add('loading-process_finish')
        })
      }
    }, 100)
  }

})(window);
