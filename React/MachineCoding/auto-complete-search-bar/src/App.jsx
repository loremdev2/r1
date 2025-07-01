
import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const [showResults, setShowResults] = useState(false);
  // const [cache, setCache] = useState({});
  // console.log("cache", cache);
  const cacheRef= useRef({});
  console.info(" Cache Ref:" ,cacheRef);

  const fetchData = async () => {
    // if(cache[input]){
    //   setResults(cache[input]);
    //   return;
    // }
    if(cacheRef.current[input]){
      setResults(cacheRef.current[input]);
      return;
    }

    if (!input) {
      setResults([]);
      return;
    }
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setResults(json?.recipes || []);
    // setCache((prev) => ({ ...prev, [input]: json?.recipes }))
    cacheRef.current[input]= json?.recipes || [];
  }

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer)
    };
  }, [input])

  return (
    <div className='App'>
      <h1>Auto Complete Search Bar</h1>
      <div className="search-wrapper">
        <input
          type='text'
          value={input}
          className='search-input'
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && results.length > 0 && (
          <div className='results-container'>
            {results.map((result) => (
              <span
                key={result.id}
                className="result"
                onClick={() => {
                  setInput(result.name);
                  setResults([]);
                }}
              >
                {result.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

}

export default App
