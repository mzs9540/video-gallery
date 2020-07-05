import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  let [videos, setVideos] = useState([]);
  let [selectedImages, appendImages] = useState([]);
  let [currPage, setPage] = useState(1);
  const posterUrlRoot = 'http://image.tmdb.org/t/p/w185/'

  useEffect(() => {
    fetchVideos(1);
  }, [])

  const fetchVideos = page => {
    const apiRoot = "https://api.themoviedb.org/";
    const accessKey = '69f4dd3638e07293eff34c8dbd94b899';

    axios
      .get(`${apiRoot}3/movie/popular?api_key=${accessKey}&language=en-US&page=${page}`)
      .then(res => {
        setVideos([...videos, ...res.data.results]);
      })
  }

  const handleClickImage = id => {
    const i = selectedImages.indexOf(id);
    if (i > -1) {
      appendImages(selectedImages.filter(function(item) {
        return item !== id
      }))
    } else {
      appendImages([...selectedImages, id])
    }
  }

  const handleLoadMore = () => {
    setPage(currPage + 1);
    fetchVideos(currPage+1);
  }

  console.log(videos)

  return (
    <div className='container'>
      <div className='row'>
        {
          videos.map(item => (
            <div key={item.id} className='position-relative col-xs-12 col-sm-12 col-md-3 mb-3'>
              <img src={posterUrlRoot + item.poster_path} alt={'image'}
                   onClick={() => handleClickImage(item.id)}/>
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16"
                   style={{left: '14px', color: 'blue'}}
                   className={`bi bi-check-square-fill position-absolute ${selectedImages.includes(item.id)? null : 'd-none'}`}
                   fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>
          ))
        }
      </div>
      <div className='text-center mb-4'>
        <button className='btn btn-primary btn-lg' onClick={handleLoadMore}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
