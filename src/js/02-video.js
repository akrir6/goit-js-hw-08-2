import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.querySelector('#vimeo-player'));
const PLAYERCURRTIME = 'videoplayer-current-time';
if (localStorage.getItem(PLAYERCURRTIME)) {
  player
    .setCurrentTime(JSON.parse(localStorage.getItem(PLAYERCURRTIME)))
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
    localStorage.setItem(PLAYERCURRTIME, e.seconds);
  }, 1000)
);
