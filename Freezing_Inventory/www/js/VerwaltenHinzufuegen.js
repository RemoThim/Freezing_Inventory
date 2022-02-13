$(function () {
    $('#s1').click(function (e) {
        $('main').load('Inventar.html', function () {
            $.getScript('js/Inventar.js')

        });
    });
    $('#s2').click(function (e) {
        $('main').load('Benutzung.html', function () {
            $.getScript('js/Benutzung.js')

        });
    });
    $('#s3').click(function (e) {
        $('main').load('VerwaltenHinzufuegen.html', function () {
            $.getScript('js/VerwaltenHinzufuegen.js')

        });
    });
    $('#s4').click(function (e) {
        $('main').load('VerwaltenHinzufuegen.html', function () {
            $.getScript('js/VerwaltenHinzufuegen.js')

        });
    });
    $('#s5').click(function (e) {
        $('main').load('VerwaltenBearbeiten.html', function () {
            $.getScript('js/VerwaltenBearbeiten.js')

        });
    });
    $('#s6').click(function (e) {
        $('main').load('VerwaltenLoeschen.html', function () {
            $.getScript('js/VerwaltenLoeschen.js')

        });
    });
})