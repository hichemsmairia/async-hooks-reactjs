import React , {useState,useEffect} from "react";
import "./styles.css";

const App = () => {
  const [search,setSearch] = useState('')
  const [query,setQuery] = useState('')
  const [result,setResult] = useState([])
  function onSubmit (e) {
    e.preventDefault() ;
    console.log(search);
    setQuery(search) ;
  }
  useEffect(()=> {
    async function fetchGifs() {
    try {
      const response = await fetch (`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=s1TdAZWmOrPUWOBotdNarYBplMupp8Du`)
    const json= await response.json()
    setResult(
      json.data.map(item => {
        return item.images.preview.mp4 ;
      })
    ) ;
    } catch (error) {}
    
  }
  if (query !== '') 
  {fetchGifs() }
  
  } ,[query])

  return (
    <div>
    <form onSubmit={onSubmit} > 
    <input type="text" value={search} placeholder="gifs!" onChange={(e)=>setSearch(e.target.value)} />
    <h1> you are searching for :  {search} </h1>
    <button type="submit"> search gifs now ! </button>
     </form >
     <br />
     {result.map(item => 
       <video autoPlay loop key={item} src={item} />  )}
     </div>

  )


}
export default App
