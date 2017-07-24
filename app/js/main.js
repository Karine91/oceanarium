$(function(){

   function changeDirect(player, direct){
       return new Promise(function(resolve, reject) {
           var angle = direct;
           console.log(angle);
           setTimeout(function() {
               player.setDirection([angle, 0]);
               resolve(angle);
           }, 50);
           // setTimeout(function(direct){
           //     player.setDirection([direct, 0]);
           //     resolve();
           // },50*(Math.abs(reverse-direct)),direct);
       });
   }

    function delay(ms){
        return new Promise(function(resolve){
            setTimeout(resolve, ms);
        });
    }

function directionToRight(player,angleFrom, angleTo){
    // return new Promise(function(resolve, reject) {
        var last = Promise.resolve(angleFrom);
        for (var direct = angleFrom; direct < angleTo; direct++) {
            last=last.then(function(angle){
                var agl= ++angle;
                console.log(agl);
                console.log(player.getDirection());
                return changeDirect(player,agl);
            });
        }
        console.log(last);
        return last;

    // });
}
function directionToLeft(player,angleFrom, angleTo) {
    var last = Promise.resolve();
    return new Promise(function(resolve, reject) {
        for (var direct = angleFrom; direct > angleTo; direct--) {
            last=last.then(function(angle){
                console.log(player.getDirection());
                return changeDirect(player,direct,angleFrom)}.apply(direct));
        }
    });
}

ymaps.ready(function () {
    // Для начала проверим, поддерживает ли плеер браузер пользователя.
    if (!ymaps.panorama.isSupported()) {
        // Если нет, то просто ничего не будем делать.
        return;
    }

    // Ищем панораму в переданной точке.
    ymaps.panorama.locate([55.910319, 37.542207]).done(
        function (panoramas) {
            // Убеждаемся, что найдена хотя бы одна панорама.
            if (panoramas.length > 0) {
                // Создаем плеер с одной из полученных панорам.
                var player = new ymaps.panorama.Player(
                    'player1',
                    // Панорамы в ответе отсортированы по расстоянию
                    // от переданной в panorama.locate точки. Выбираем первую,
                    // она будет ближайшей.
                    panoramas[0],
                    // Зададим направление взгляда, отличное от значения
                    // по умолчанию.
                    { direction: [256, 16],
                        controls: [],
                        suppressMapOpenBlock: true,
                        scrollZoomBehavior: false

                    }

                );
                player.events.add('directionchange', function () {
                    console.log('Change direction');
                });
                player.events.add('panoramachange', function () {
                    console.log('Change panorama');
                    var panorama = player.getPanorama();
                });
                var graph=panoramas[0].getGraph();
                var nodes = graph.getNodes();

                // for (var direct = 0; direct < 90; direct++) {
                //     setTimeout(function (direct) {
                //         player.setDirection([direct, 0]);
                //         console.log(player.getDirection());
                //     },50*direct, direct);
                // }


                directionToRight(player,0,90);

                // var last = Promise.resolve();
                // last=last.then(function(){
                //     console.log(player.getDirection());
                //     return changeDirect(player,50);
                // }).then(function(){
                //     console.log(player.getDirection());
                //     return changeDirect(player,80);
                // });

                // for(var i=0; i<nodes.length; i++){
                //     var coord_panorama = Array.from(nodes[i]._position).reverse();
                //     last=last.then(function(){
                //         directionToRight(player,0,90);
                //     }).then(function(){
                //         directionToLeft(player,90,0);
                //     }).then(function(){
                //             return new Promise(function(resolve, reject) {
                //                 player.moveTo(coord_panorama);
                //                 resolve();
                //             });
                //         });
                //
                //
                // }



                }
                var panorama = player.getPanorama();
                //console.log(panorama.getConnectionArrows());
                //var coord_panorama = Array.from(nodes[10]._position);
                // console.log(typeof(coord_panorama), coord_panorama);
                //player.moveTo(coord_panorama.reverse());

        },
        function (error) {
            // Если что-то пошло не так, сообщим об этом пользователю.
            alert(error.message);
        }
    );

});
});

