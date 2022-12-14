import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import { buscaId, deleteId } from '../../../services/Service';

import './DeletarPostagem.css';
import Postagem from '../../../model/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokenReducer';
import { toast } from 'react-toastify';

function DeletarPostagem() {
  let history = useNavigate();
  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>();

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  )

  const [post, setPosts] = useState<Postagem>();

  useEffect(() => {
    if(token === "")
    {
        toast.error("Você precisa estar logado!", {
            position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: false, theme: "light", progress: undefined})
        navigate ("/login")
    }
}, [token])

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/postagens/${id}`, setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function sim() {
    history('/posts');

    try {
      await deleteId(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert('Postagem deletada com sucesso');
    } catch (error) {
      alert('Erro ao deletar');
    }
  }

  function nao() {
    history('/posts');
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary">{post?.titulo}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default DeletarPostagem;