import { useEffect, useState } from 'react';
import './slider.css';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
// 리액트 아이콘
// npm install react-icons

// 슬라이더 컴포넌트를 function으로 만든다
// 컴포넌트는 첫글자 대문자
// 다른 곳에서 사용하기위해서 export defalt 
export default function ImageSlider(props)
{
  // useState를 2개 만든다 (이미지들, 현재 슬라이드번호)
  let [images,setImages] = useState([]);
  let [curSlide,setCurSlide] = useState(0);
  let [loading,setLoading] = useState(false);
  let [errMsg,setErrMsg] = useState(null);


  useEffect(()=>{
    if(props.url !== ''){
      fetchImages(props.url);
      console.log(images);
    }
    
    return(()=>{
      // rumont공간
    })
  },[props.url])
  async function fetchImages(getUrl){
    // get요청으로 이미지 경로를 받아온다(async 비동기 : 화면동작에 영향을 미치지 않기위해)
    setLoading(true);

    let response = await fetch(`${getUrl}?page=${props.page}&limit=10`)
    const data = await response.json();

    if(data){
      setImages(data);
      setLoading(false);
    }
  }

  console.log(images);

  function goPrev(){
    if(curSlide === 0){
      setCurSlide(images.length -1);
    }else{
      setCurSlide(curSlide -1);
    }
  }

  function goNext(){
    if(curSlide === images.length -1){
      setCurSlide(0);
    }else{
      setCurSlide(curSlide +1);
    }
    
  }


  return(
    <>
      <div className="slider-container">
        <BsArrowLeftCircleFill className='arrow arrow-left' onClick={goPrev}/>
        {
          images && images.length ?(
            images.map((image, idx)=>{
              return(
                <img key={idx} src={image.download_url} width={"300px"} className={curSlide === idx ? 'current-image' : "current-image hide-current-image"}/>
            )
          })
        )
        :<div>이미지 로딩중</div>
      }
      <BsArrowRightCircleFill className='arrow arrow-right' onClick={goNext}/>
    </div>
    </>
  )
}