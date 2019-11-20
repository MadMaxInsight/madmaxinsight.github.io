var tariffsItems = $(".tariffs-list__item");
tariffsItem1 = $(".tariffs-list__item").eq(1);
tariffsItem2 = $(".tariffs-list__item").eq(2);
tariffsItem3 = $(".tariffs-list__item").eq(3);
$("input[type=range]")
  .on("input", function(e) {
    var min = e.target.min,
      max = e.target.max,
      val = e.target.value;
    if (val == max) {
      tariffsItem3.toggleClass("tariffs-list__item_selected");
      tariffsItem2.toggleClass("tariffs-list__item_selected");
    } else if (val == min) {
      tariffsItem2.toggleClass("tariffs-list__item_selected");
      tariffsItem1.toggleClass("tariffs-list__item_selected");
    } else {
      tariffsItem2.addClass("tariffs-list__item_selected");
      tariffsItem1.removeClass("tariffs-list__item_selected");
      tariffsItem3.removeClass("tariffs-list__item_selected");
    }

    $(e.target).css({
      backgroundSize: ((val - min) * 100) / (max - min) + "% 100%"
    });
  })
  .trigger("input");
