import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/estaticos/footer/Footer';
import Navbar from './components/estaticos/navbar/Navbar';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastro/CadastroUsuario';
import Perfil from './components/perfil/Perfil';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';

import { ListaBrasil } from './components/postagens/listaBrasil/ListaBrasil';
import { Sobre } from "./paginas/sobre/Sobre";

import store from './store/store';

function App() {
  
  return (
    <Provider store={store}>
    <ToastContainer />
    <BrowserRouter> 
      
      <Navbar />
        
        <div style={{minHeight: '80vh'}}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />      
            <Route path="/cadastro" element={<CadastroUsuario />} />

            <Route path="/cadastroTema" element={<CadastroTema />} />
            <Route path="/atualizarTema/:id" element={<CadastroTema />} />
            <Route path="/apagarTema/:id" element={<DeletarTema />} />
            <Route path="/temas" element={<ListaTemas />} />

            <Route path="/criarPost" element={<CadastroPostagem />} />
            <Route path="/editarPost/:id" element={<CadastroPostagem />} />
            <Route path="/apagarPost/:id" element={<DeletarPostagem />} />
            <Route path="/posts" element={<ListaPostagem />} />

            <Route path="/posts/brasil" element={<ListaBrasil /* setInputText={setInputText} inputText={inputText}*/ /> } />
            <Route path="/sobremim" element={<Sobre />} />

            <Route path="/perfil" element={<Perfil />} />

          </Routes>
        </div>
      
      <Footer />
    
    </BrowserRouter>
    </Provider>
  );
}

export default App;