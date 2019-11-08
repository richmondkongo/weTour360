//autres scripts
  jQuery(document).ready(function($) {
    $('.modal').modal();
    $('.datepicker').datepicker();
    $('.sidenav').sidenav();
    $('.rigg').each(function() {
      $(this).click(function() {
        /* Act on the event */
        alert('yaah');
      });
    });
    $('.pct').each(function() {
      $(this).overlayScrollbars({ /* your options */ });
    });
  });