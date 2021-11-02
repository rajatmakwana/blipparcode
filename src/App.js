import React, { useEffect, useState } from 'react'

const App = () => {
  const [input, setInput] = useState('');
  const [textData, setTextData] = useState([]);
  const [sortedArr, setSortedArr] = useState([]);

  useEffect(() => {
    const fetchTexts = async val => {
      const response = await fetch('https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words')
      const Data = await response.text()
      const newData = Data.split("\n");
      setTextData(newData);
    }
    fetchTexts();
  }, [])

  const onChange = e => {
    const val = e.target.value;
    let typingTimer;
    setInput(val);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (val !== '' && val.length > 2) {
        filterData(val);
      } else {
        setSortedArr(false);
      }
    }, 1000);
  }

  const filterData = (val) => {
    const sorted = textData.filter(text => text.includes(val))
    sorted && setSortedArr(sorted);
    console.log(sorted)
  }


  const highlight = (text) => {
    var reg = new RegExp(input, 'gi');
    let data = text.replace(reg, function (str) {
      return '<mark>' + str + '</mark>'
    })
    return data;
  }

  const createMarkup = data => {
    return {
      __html: data
    };
  };

  return (
    <div style={style.box}>
      <h1>Rajat Makwana</h1>
      <input type="text" value={input} onChange={onChange} />
      {sortedArr && sortedArr.map(text =>
        <React.Fragment key={Math.random()}>
          {
            <div dangerouslySetInnerHTML={createMarkup(highlight(text))} />
          }
        </React.Fragment>)
      }
    </div>
  )
}

const style = {
  box: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25px',
    marginBottom: '10px'
  }
}

export default App
