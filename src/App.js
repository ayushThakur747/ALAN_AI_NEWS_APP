import React,{ useState, useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import Particles from 'react-particles-js';

import NewsCards from './Component/NewsCards/NewsCards.js';

const alankey= '3e51a20fe72f60cb0955b473e4eab2742e956eca572e1d8b807a3e2338fdd0dc/stage';

const particlesOptions = {
  
  particles: {
    number: {
      value: 80,
      density:{
        enable:true,
        value_area:900 
      }
    }
  }

}


const App = () => {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alankey,
      onCommand: ({command, articles, number}) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          
        }else if(command === 'highlight'){
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1 )

        }else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}) : number;
          const article = articles[parsedNumber - 1] ;

          if(parsedNumber > 20){
            alanBtn().playText('please try again.')
          }else if(article){
            window.open(article.url,'blank');
            alanBtn().playText('opening...');

          }          
        }
      }
    })
  }, [])

  return (
    <div className="App">
      <Particles className='particles'   
            params={particlesOptions}
          />
      <h1>|| Alan AI News Application ||</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
