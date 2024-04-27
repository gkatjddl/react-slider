import logo from './logo.svg';
import './App.css';
import ImageSlider from './components/image-slider/slider.jsx';

function App() {
  return (
    <div className="App">
      {/*서버에서 제공하는 양식에 맞게끔props로 전달*/}

      <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} page={1}/>
    </div>
  );
}

export default App;
