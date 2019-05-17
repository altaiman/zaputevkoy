(function(root) {


  // ПРимер объекта с точками
  const places = [
    {
      coords: [53.340304, 83.752213],
      title: 'ЗаПутевкой.рф, Офис “Лиговский”',
      content:
        `
          <p><strong>Адрес:</strong> Санкт-Петербург, Лиговский переулок., д. 4</p>
          <p>
            <strong>Режим работы:</strong><br>
            Пн - Пт: 10:00 - 20:00
            Сб: 11:00 - 19:00
            Вс: 11:00 - 18:00
          </p>
          <p>Возможен перерыв в работе не более 15 минут.</p>
          <p>
            <strong>Расположение:</strong><br>
            Мы находимся в 150 метрах от м. пл. Восстания (выход на Лиговский пр.)<br>
            Просим обратить внимание, офис расположен на Лиговском переулке (не Лиговский проспект)<br>
            Лиговский переулок расположен между Пушкинской площадью и Лиговским проспектом, напротив ТЦ "Галерея".<br>
            Ориентир - пункт обмена валют.<br>
            Вход в офис с Лиговского переулка.
          </p>
          <p><strong>Телефон:</strong> +7 (999) 998-74-52<br>
          <strong>E-mail:</strong> info@expert-spb.com</p>
        `
    },{
      coords: [53.331304, 83.684213],
      title: 'ЗаПутевкой.рф, Офис “Лиговский2”',
      content:
        `
          <p><strong>Адрес:</strong> Санкт-Петербург, Лиговский переулок., д. 4</p>
          <p>
            <strong>Режим работы:</strong><br>
            Пн - Пт: 10:00 - 20:00
            Сб: 11:00 - 19:00
            Вс: 11:00 - 18:00
          </p>
          <p>Возможен перерыв в работе не более 15 минут.</p>
          <p>
            <strong>Расположение:</strong><br>
            Мы находимся в 150 метрах от м. пл. Восстания (выход на Лиговский пр.)<br>
            Просим обратить внимание, офис расположен на Лиговском переулке (не Лиговский проспект)<br>
            Лиговский переулок расположен между Пушкинской площадью и Лиговским проспектом, напротив ТЦ "Галерея".<br>
            Ориентир - пункт обмена валют.<br>
            Вход в офис с Лиговского переулка.
          </p>
          <p><strong>Телефон:</strong> +7 (999) 998-74-52<br>
          <strong>E-mail:</strong> info@expert-spb.com</p>
        `
    },{
      coords: [53.350304, 83.720213],
      title: 'ЗаПутевкой.рф, Офис “Лиговский3”',
      content:
        `
          <p><strong>Адрес:</strong> Санкт-Петербург, Лиговский переулок., д. 4</p>
          <p>
            <strong>Режим работы:</strong><br>
            Пн - Пт: 10:00 - 20:00
            Сб: 11:00 - 19:00
            Вс: 11:00 - 18:00
          </p>
          <p>Возможен перерыв в работе не более 15 минут.</p>
          <p>
            <strong>Расположение:</strong><br>
            Мы находимся в 150 метрах от м. пл. Восстания (выход на Лиговский пр.)<br>
            Просим обратить внимание, офис расположен на Лиговском переулке (не Лиговский проспект)<br>
            Лиговский переулок расположен между Пушкинской площадью и Лиговским проспектом, напротив ТЦ "Галерея".<br>
            Ориентир - пункт обмена валют.<br>
            Вход в офис с Лиговского переулка.
          </p>
          <p><strong>Телефон:</strong> +7 (999) 998-74-52<br>
          <strong>E-mail:</strong> info@expert-spb.com</p>
        `
    }
  ]

  const map = document.querySelector('#map'),
        mapContacts = document.querySelector('#map-contacts')

  if (map) {
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [53.340304, 83.752213],
            zoom: 16,
            controls: []
        });
    }
  };

  if (mapContacts) {
    ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map-contacts", {
            center: [53.340304, 83.752213],
            zoom: 13,
            controls: []
        })

        for (let i = 0, len = places.length; i < len; i++) {
          const placemark = new ymaps.Placemark(places[i].coords, {
            balloonContentHeader: places[i].title,
            balloonContentBody: places[i].content,
            balloonContentFooter: '',
            hintContent: places[i].title
          }, {
            preset: "islands#icon",
            iconColor: '#FF0E19',
          })

          myMap.geoObjects.add(placemark);


        }
    }
  }

})(window);
