const playlist = data.playlists;
const featureButton = document.getElementById('feature-btn');
      const featureTitle = document.getElementById('feature-playlist-title');
      const featureCreator = document.getElementById('feature-playlist-creator');
      const featureImage = document.getElementById('feature-playlist-image');
      const featureSongList = document.getElementById('feature-song-list')
      const closefeatureButton = document.getElementsByClassName('close') [0];

      function getRandomPlaylist(playlist){
        const randomIndex = Math.floor(Math.random()*playlist.length);
        return playlist[randomIndex];
      }

      function updateFeatureContent(element){

        console.log(element.songs)
        featureTitle.textContent = `${element.playlist_name}`;
        featureCreator.textContent =`Created by  ${element.playlist_creator}`;
        featureImage.src = element.playlist_art;
        // clears the feature from previous songs' playlist
        while(featureSongList.firstChild){
            featureSongList.removeChild(featureSongList.firstChild);
        }


        element.songs.forEach(song => {

          console.log(element.songs);

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
           console.log(songItem)
           featureSongList.appendChild(songItem);
        });

     };



    function feature(){
      const randomPlaylist = getRandomPlaylist(playlist);

        console.log(randomPlaylist)

        updateFeatureContent(randomPlaylist);
     };

     feature();
     featureButton.addEventListener('click', () =>{
      feature();
     });
