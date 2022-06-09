import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.querySelector('#vimeo-player'));

if (localStorage.getItem('videoplayer-current-time')) {
  player
    .setCurrentTime(
      JSON.parse(localStorage.getItem('videoplayer-current-time'))
    )
    .catch(err => {
      switch (err.name) {
        case 'RangeError':
          console.error(
            'The time was less than 0 or greater than the video’s duration.'
          );
          player.setCurrentTime(0);
          break;

        default:
          console.log('Some error occurred');
          break;
      }
    });
}

player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem('videoplayer-current-time', e.seconds);
  }, 1000)
);
