import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

document.querySelector('div.gallery').insertAdjacentHTML(
  'afterbegin',
  galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}"/>
        </a>`;
    })
    .join('')
);

new SimpleLightbox('div.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
