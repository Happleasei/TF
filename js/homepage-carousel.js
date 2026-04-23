(function ($) {
  if (!$) {
    return;
  }

  $(function () {
    var $slideItems = $('#slide ul li');
    if (!$slideItems.length) {
      return;
    }

    var baseLayout = [
      {'z-index': 6, opacity: 1, width: 760, height: 330, top: 40, left: 0},
      {'z-index': 4, opacity: 0.6, width: 560, height: 243, top: 80, left: -225},
      {'z-index': 3, opacity: 0.4, width: 480, height: 203, top: -10, left: -170},
      {'z-index': 2, opacity: 0.2, width: 620, height: 269, top: -60, left: 110},
      {'z-index': 3, opacity: 0.4, width: 480, height: 203, top: -10, left: 430},
      {'z-index': 4, opacity: 0.6, width: 560, height: 243, top: 80, left: 420}
    ];
    var datas = [];

    function rebuildLayout() {
      var slideWidth = $('#slide').width() || 760;
      var scale = Math.min(1, slideWidth / 760);
      datas = $.map(baseLayout, function (item) {
        return {
          'z-index': item['z-index'],
          opacity: item.opacity,
          width: Math.round(item.width * scale),
          height: Math.round(item.height * scale),
          top: Math.round(item.top * scale),
          left: Math.round(item.left * scale)
        };
      });
    }

    function move() {
      for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        $slideItems.eq(i).css('z-index', data['z-index']);
        $slideItems.eq(i).stop().animate(data, 1200);
      }
    }

    function nextYewu() {
      var first = datas.shift();
      datas.push(first);
      move();
    }

    function prevYewu() {
      var last = datas.pop();
      datas.unshift(last);
      move();
    }

    var timer = null;

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(nextYewu, 5000);
    }

    $('.prev').on('click', prevYewu);
    $('.next').on('click', nextYewu);

    $('#slide').on({
      mouseenter: function () {
        $('.arrow').css('display', 'block');
        clearInterval(timer);
      },
      mouseleave: function () {
        $('.arrow').css('display', 'none');
        resetTimer();
      }
    });

    $(document).on('keydown', function (e) {
      if (e.keyCode === 37) {
        prevYewu();
      } else if (e.keyCode === 39) {
        nextYewu();
      }
    });

    $('.prev, .next').on('keydown', function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        $(this).trigger('click');
      }
    });

    $(window).on('resize', function () {
      rebuildLayout();
      move();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        resetTimer();
      }
    });

    rebuildLayout();
    move();
    resetTimer();
  });
})(window.jQuery);
