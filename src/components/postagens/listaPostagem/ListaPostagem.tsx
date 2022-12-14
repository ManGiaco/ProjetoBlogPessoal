import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from '@mui/material';
  import React, { useState, useEffect } from 'react';
  import { useSelector } from 'react-redux';
  import { Link, useNavigate } from 'react-router-dom';
  import Postagem from '../../../model/Postagem';
  import { busca } from '../../../services/Service';
  import { TokenState } from '../../../store/tokens/tokenReducer';
  
  function ListaPostagem() {
    let navigate = useNavigate();
  
    const [postagens, setPostagens] = useState<Postagem[]>([]);
  
    const token = useSelector<TokenState, TokenState['tokens']>(
      (state) => state.tokens
    );
  
    const userId = useSelector<TokenState, TokenState['id']>((state) => state.id);
  
    useEffect(() => {
      if (token === '') {
        alert('Ai não meu bom');
        navigate('/login');
      }
    }, [token]);
  
    async function getPostagem() {
      await busca('/postagens', setPostagens, {
        headers: { Authorization: token },
      });
    }
  
    useEffect(() => {
      getPostagem();
    }, [postagens.length]);
  
    return (
      <>
        {postagens.map((postagem) => (
          <Box m={2} key={postagem.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Postagens
                </Typography>
                <Typography variant="h5" component="h2">
                  {postagem.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {postagem.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {postagem.tema?.descricao}
                </Typography>
                <Typography variant="body2" component="p">
                  Postado por: {postagem.usuario?.nome}
                </Typography>
              </CardContent>
              <CardActions>
                {postagem.usuario?.id === +userId ? (
                  <Box display="flex" justifyContent="center" mb={1.5}>
                    <Link
                      to={`/editarPost/${postagem.id}`}
                      className="text-decoration-none"
                    >
                      <Box mx={1}>
                        <Button variant="contained" size="small" color="primary">
                          atualizar
                        </Button>
                      </Box>
                    </Link>
                    <Link
                      to={`/apagarPost/${postagem.id}`}
                      className="text-decoration-none"
                    >
                      <Box mx={1}>
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                        >
                          deletar
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                ) : (
                  <></>
                )}
              </CardActions>
            </Card>
          </Box>
        ))}
      </>
    );
  }
  
  export default ListaPostagem;