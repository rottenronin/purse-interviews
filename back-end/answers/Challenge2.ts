
async function fetchPhotos() {
  const urls = [  
    { url: 'https://jsonplaceholder.typicode.com/photos/1'}, 
    { url: 'https://jsonplaceholder.typicode.com/photos/2'}, 
    { url: 'https://jsonplaceholder.typicode.com/photos/3'}
  ]

  return Promise.all(urls.map(
    ({ url }) => fetch(url).then(
      response => {
      if (response.ok) {
        // if response can not be resolve by json, return null
        return response.json().catch(() => null)
      }
      // if fetch fails, then return null
      return null
    }))
  )
}

export {
  fetchPhotos,
}