import React, { useCallback } from 'react'
import {
  TableBody,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@material-ui/core'
import Link from '@material-ui/core/Link'
import api from '../services/api'
import { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
const TabelaEstudante = ({ developers, setDevelopers }) => {
  const history = useHistory()
  const handleClickEdit = (id) => {
    history.push(`/developer/${id}`)
  }

  const handleClickDelete = (id) => {
    api
      .deleteDeveloper(id)
      .then(() => {
        setDevelopers(developers.filter((dev) => dev.id !== id))
      })
      .catch((err) => alert(err.message))
  }

  if (developers.length == 0) {
    return (
      <Typography variant='subtitle1'>
        Não há developers cadastrados!
      </Typography>
    )
  } else {
    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Nome</b>
                </TableCell>
                <TableCell>
                  <b>Data Nascimento</b>
                </TableCell>
                <TableCell>
                  <b>Hobby</b>
                </TableCell>
                <TableCell>
                  <b>Sexo</b>
                </TableCell>
                <TableCell>
                  <b>Opção</b>
                </TableCell>
                <TableCell>
                  <b>Deletar</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {developers.map((developer, index) => (
                <TableRow key={index}>
                  <TableCell>{developer.nome}</TableCell>
                  <TableCell>{developer.dataNascimento}</TableCell>
                  <TableCell>{developer.hobby}</TableCell>
                  <TableCell>{developer.sexo}</TableCell>
                  <TableCell>
                    <Link
                      component='button'
                      variant='body'
                      onClick={() => {
                        handleClickEdit(developer.id)
                      }}
                    >
                      edit
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      component='button'
                      variant='body'
                      onClick={() => {
                        handleClickDelete(developer.id)
                      }}
                    >
                      delete
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
}

export default withRouter(TabelaEstudante)
