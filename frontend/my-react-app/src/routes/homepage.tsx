
import Carousel from '../components/carousel'
import Product  from "../components/newCollectionCompo/product";
const images: string[] = [
    'https://images.contentstack.io/v3/assets/blt8ede3f648df7664a/blt27969be58ec80e37/65b03252c3bf06b324fe0dc8/Buying-and-selling-secondhand-clothing-article-updated--image.jpg',
    'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://cdn.ca.emap.com/wp-content/uploads/sites/6/2019/09/clothes-1024x681.jpg'
  ];
  
const Homepage: React.FC = () =>{

    return (
        <>
          <Carousel  images={images}/>
          <Product />
        </>
    )
}

export default Homepage;