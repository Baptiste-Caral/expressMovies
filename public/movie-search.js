const API_KEY = '123cd1822bd2360a9e8a84583b378b6e'
    const term = document.getElementById('term')
    const btnSearch = document.getElementById('btnSearch')
    btnSearch.addEventListener('click', search)
    let resultDiv = document.getElementById('results')

    function search() {
      const query = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${term.value}&language=fr-FR`
      axios.get(query)
      .then(function(response){
        
       console.log(response.data.results)
       displayResults(response.data.results)
      })
      .catch()
    }
    function displayResults(results) {
      resultDiv.innerHTML = ("")
      for (let result of results) {
        
        let movieDiv = document.createElement('div')
        movieDiv.innerHTML = (result.title)
        resultDiv.appendChild(movieDiv)

      }
      
    }
