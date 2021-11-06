import NavBar from "../components/NavBar";
//import "../styles/index.scss";
import "../styles/globals.css";
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <DefaultSeo {...SEO} />
    <NavBar />
    <div className="container">
    
    <Component {...pageProps} />
  </div>
  </>
  )
  
}

export default MyApp