// Carousel Navigation
document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.carousel-track');
  var prevBtn = document.querySelector('.carousel-prev');
  var nextBtn = document.querySelector('.carousel-next');

  if (!track || !prevBtn || !nextBtn) return;

  var scrollAmount = 394; // card width (370) + gap (24)

  prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});
