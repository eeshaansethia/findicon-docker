import React, { useState, useEffect } from 'react';
import './styles/app.css';
import logo from './assets/icon.png';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import PromptCard from './components/PromptCard';
import ProductCard from './components/ProductCard';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [allPrompts, setAllPrompts] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(false);

  const getAllPrompts = async () => {
    await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts`)
      .then((res) => {
        setAllPrompts(res.data);
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllPrompts();
  }, []);

  useEffect(() => {
    const search = async (e) => {
      if (e.key === 'Enter') {
        await getIcon();
      }
    }
    window.addEventListener('keydown', search);
    return () => {
      window.removeEventListener('keydown', search);
    }
  }, [prompt]);

  const deletePrompt = async (id) => {
    await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/prompts/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        getAllPrompts();
      }).catch((error) => {
        console.log(error);
      });
    setToggleMenu(false);
  }

  const getIcon = async () => {
    if (!prompt || prompt === '' || prompt === 'null') {
      toast('Enter a valid prompt!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setLoading(true);
    setIcon(null);
    await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/prompts/icon?prompt=${prompt}`)
      .then((res) => {
        if (res.status !== 200) {
          setLoading(false);
          toast(res.data.error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
        setLoading(false);
        console.log(res.data.icon);
        setIcon(res.data.icon.data[0].url);
        setProducts(res.data.products);
        getAllPrompts();
      }
      ).catch((error) => {
        setLoading(false);
        toast('Enter a valid prompt!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className={toggleMenu ? "app-left active" : "app-left"}>
        <div className="app-left-top-menu" onClick={
          () => {
            setToggleMenu(!toggleMenu);
          }}>
          <i className="fa-solid fa-times"></i>
        </div>

        <div className="app-left-new">
          <button className="app-left-new-button" onClick={() => {
            setPrompt('');
            setIcon(null);
            setProducts([]);
            setToggleMenu(false);
          }}>
            <i className="fa-regular fa-pen-to-square"></i>
            New Prompt
          </button>
        </div>

        <p className="app-left-prompts-title">{
          allPrompts.length === 0 ? 'No Prompts Available' : 'Previous Prompts'
        }</p>

        <div className="app-left-prompts">
          {allPrompts && allPrompts.map((prompt, index) => {
            return <div className="app-left-prompt" key={index} onClick={() => {
              setPrompt(prompt.name);
              setIcon(prompt.icon);
              setProducts(prompt.products);
              setToggleMenu(false);
            }}>
              <PromptCard name={prompt.name} icon={prompt.icon} deleteFunction={() => deletePrompt(prompt._id)} key={index}
              />
            </div>
          })}
        </div>
      </div>

      <div className="app-right">
        <div className='app-right-header'>
          <div className="app-right-top-menu" onClick={
            () => {
              setToggleMenu(!toggleMenu);
            }}>
            {toggleMenu ? <i className="fa-solid fa-times"></i>
              : <i className="fa-solid fa-bars"></i>}
          </div>

          <h1 className="app-right-name">
            <div className="app-right-name-image">
              <img className="app-right-name-image-icon" src={logo} />
            </div>
            Findicon
          </h1>
        </div>

        <div className="app-right-main">

          <div className="app-right-main-products">
            {(products && products.length > 0 && !loading) ? products.map((product, index) => {
              return (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                  key={index}>
                  <ProductCard name={product.name} features={product.features} key={index} />
                </div>)
            }) : loading ?
              <>
                <div className='placeholder-wave' style={{
                  width: '225px',
                  height: '225px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '10px'
                }}></div>
                <div className='placeholder-wave' style={{
                  width: '225px',
                  height: '225px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '10px'
                }}></div>
                <div className='placeholder-wave' style={{
                  width: '225px',
                  height: '225px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '10px'
                }}></div>
              </>
              : null
            }
          </div>

        </div>

        <div className="app-right-bottom">
          <div className="app-right-search">
            <input className="app-right-search-input" type="text" placeholder="Type your prompt to get an icon.." value={prompt} disabled={icon ? true : false} required onChange={(e) => {
              setPrompt(e.target.value);
            }} />

            <button className="app-right-search-button" onClick={getIcon} disabled={!loading && prompt ? false : true} style={{
              cursor: !loading && prompt ? 'pointer' : 'not-allowed'
            }}>
              {!loading ? <i className="fa-solid fa-search" style={{
                fontSize: '1rem'
              }}></i> : <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              }
            </button>
          </div>

          {icon && !loading ?
            <div className="app-right-main-icon">
              <img className="app-right-main-icon-image" src={icon} />
            </div>
            :
            loading && !icon ? <div className="app-right-main-icon">
              <div className='placeholder-wave' style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#1a1a1a',
                borderRadius: '10px'
              }}></div>
            </div> : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
