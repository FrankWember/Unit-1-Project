document.addEventListener("DOMContentLoaded", () => {

   const playlist = data.playlists;   // This is to load the data from the data.js
   let playlistElement = document.getElementById('playlist'); // This will select the container where the playlist will be appended
   const themeToggleButton = document.getElementById('theme');
   // This is to select various element related to the modal for later manipulations



      const modal = document.getElementById('playlistModal');
      const modalTitle = document.getElementById('modal-playlist-title');
      const modalCreator = document.getElementById('modal-playlist-creator');
      const modalImage = document.getElementById('modal-playlist-image');
      const modalSongList = document.getElementById('modal-song-list')
      const closeModalButton = document.getElementsByClassName('close') [0];
      const shuffleButton = document.getElementById('shuffle-btn');
      const featurePage = document.getElementById('feature-btn');



   //Now i want to populate my grid with playlist
   //For each playlist, i will create a div with class grid-item and append it to the main grid-container


const renderPlaylists = () => {
   playlist.forEach(playlist =>{
         const playlistItem = document.createElement('div');
         playlistItem.classList.add('grid-item');


         const image = document.createElement('img');
         image.src = playlist.playlist_art;
         image.id = "gridImage"
         const title = document.createElement('h2');
         title.textContent = playlist.playlist_name;

         const creator = document.createElement('p');
         creator.textContent = playlist.playlist_creator;

         const likeButton = document.createElement('img');
         likeButton.src = "./data/img/heart1.png"
         likeButton.id = "likesButton"

         const deleteButton = document.createElement('img');
         deleteButton.src = "./data/img/trash.jpg";
         deleteButton.id = "trashButton";

         const likesCount = document.createElement('span')
         likesCount.textContent = playlist.likeCount;
         likesCount.id = "likeCounts"

         const updatelikeButton = () =>{
            likeButton.src = playlist.likeCount === 0 ? "./data/img/heart2.png" : "./data/img/heart1.png";
         };

         likeButton.addEventListener('click',(event) =>{
            event.stopPropagation() // prevent from reaching the modal
            playlist.likeCount++;
            likesCount.textContent = playlist.likeCount;
            updatelikeButton();
         });

         deleteButton.addEventListener('click',(event) =>{
            event.stopPropagation() // prevent from reaching the modal
            deletePlaylist(playlist.playlistID);
         });

         updatelikeButton();


         playlistItem.appendChild(image);
         playlistItem.appendChild(title);
         playlistItem.appendChild(creator);
         playlistItem.appendChild(likeButton);
         playlistItem.appendChild(likesCount);
         playlistItem.appendChild(deleteButton);
         playlistElement.appendChild(playlistItem);


         playlistItem.addEventListener('click', () =>{
            updateModalContent(playlist);
            modal.style.display = 'flex';  // to open the modal
         });


         playlistElement.appendChild(playlistItem)
      });

   };


   function updateModalContent(element){

      modalTitle.textContent = `${element.playlist_name}`;
      modalCreator.textContent =`Created by  ${element.playlist_creator}`;
      modalImage.src = element.playlist_art;

      // clears the modal from previous songs' playlist
      while(modalSongList.firstChild){
         modalSongList.removeChild(modalSongList.firstChild);
      }

      shuffleButton.addEventListener('click', () => {
         shuffleArray(element.songs);
           updateModalContent(element);
        });

            //populate with songs
            element.songs.forEach(song => {


               const songItem = document.createElement('li');

               const songImage = document.createElement('img');
               songImage.src = song.cover_art;
               songImage.id = "songImage"

               const songTitle = document.createElement('span');
               songTitle.innerHTML = `${song.title}`;
               songTitle.id = "songTitle"

               const songArtist = document.createElement('span');
               songArtist.innerHTML = `${song.artist}`;
               songArtist.id = "songArtist"

               const songDuration = document.createElement('span');
               songDuration.textContent = `${song.duration}`;
               songDuration.id = "songDuration";

               const songAlbum = document.createElement('span');
               songAlbum.textContent = `${song.album}`;
               songAlbum.id = "songAlbum";

               songItem.appendChild(songImage);
               songItem.appendChild(songTitle);
               songItem.appendChild(songArtist);
               songItem.appendChild(songAlbum);
               songItem.appendChild(songDuration);
               modalSongList.appendChild(songItem);

            });

         };


      closeModalButton.addEventListener('click', () =>{
      modal.style.display = 'none';
      })
      window.addEventListener('click', (event) =>{
         if(event.target === modal){
            modal.style.display = 'none';
         }
      });



      themeToggleButton.addEventListener('click', () =>{
         document.body.classList.toggle('light-mode');
         document.body.classList.toggle('dark-mode')
      })




      function deletePlaylist(playlistID){

            const playlistIndex = playlist.findIndex(playlist => playlist.playlistID === playlistID);
            if(playlistIndex != -1){
               playlist.splice(playlistIndex, 1); //removing the playlist from the array

               renderPlaylists();
            }
         }


      function shuffleArray(array) {
         let currentIndex = array.length;

         // While there remain elements to shuffle...
         while (currentIndex != 0) {

           // Pick a remaining element...
           let randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex--;

           // And swap it with the current element.
           [array[currentIndex], array[randomIndex]] = [
             array[randomIndex], array[currentIndex]];
         }
       }



       renderPlaylists();


   })
      // shuffleButton.addEventListener('click', () => {
      //  shuffleArray(playlist[0].songs);
      //    updateModalContent(playlist);
      // });

/*span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}*/
