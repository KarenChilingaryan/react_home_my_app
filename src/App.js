import React from 'react';
import './App.css';

function Header() {
  return (
      <header className="App-header">
        <span className="header-page">Home</span>
        <span className="header-page">Country</span>
        <span className="header-page">City</span>
        <span className="header-page">Contact</span>
        <span className="header-page">About</span>
      </header>
  )
}

function Button() {
  return (
      <button className="button">BUTTON</button>
  );
}

const Image = () => (
    <div className="image">
      <img src="https://i.ytimg.com/vi/6NVCKeiqvtY/maxresdefault.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/d143Bd0howo/maxresdefault.jpg" alt=""/>
      <img src="https://ak7.picdn.net/shutterstock/videos/22336627/thumb/1.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/x30YOmfeVTE/maxresdefault.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/q64jlLL8hIg/maxresdefault.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/6NVCKeiqvtY/maxresdefault.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/d143Bd0howo/maxresdefault.jpg" alt=""/>
      <img src="https://ak7.picdn.net/shutterstock/videos/22336627/thumb/1.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/x30YOmfeVTE/maxresdefault.jpg" alt=""/>
      <img src="https://i.ytimg.com/vi/q64jlLL8hIg/maxresdefault.jpg" alt=""/>
    </div>
)


function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Image />
        <Button />
      </div>
    </div>
  );
}

export default App;
