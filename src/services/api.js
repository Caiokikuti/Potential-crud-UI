function handleErrors(resp) {
  return resp.json().then((value) => {
    if (!resp.ok) {
      throw new Error(value.message)
    }
    return value
  })
}

let token

function getToken() {
  if (!token) {
    token = localStorage.getItem('token')
  }
  return token
}

function setToken(newToken) {
  localStorage.setItem('token', newToken)
  token = newToken
}

function getDesenvolvedores(obj) {
  let termos = []
  for (const key of Object.keys(obj)) {
    termos.push(`${key}=${obj[key]}`)
  }
  const query = termos.length > 0 ? `?${termos.join('&')}` : ''
  return fetch(`http://localhost:3030/developers/${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => {
    if (!r.ok) {
      throw Error('Desenvolvedores não cadastrados')
    }
    return r.json()
  })
}

function getDesenvolvedor(idDevelopers) {
  return fetch(`http://localhost:3030/developers/${idDevelopers}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => {
    if (!r.ok) {
      throw Error('Aluno não foi encontrado')
    }
    return r.json()
  })
}

function createDesenvolvedor(developer) {
  return fetch('http://localhost:3030/developers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(developer),
  }).then((r) => r.json())
}

function updateDesenvolvedor(developer) {
  return fetch(`http://localhost:3030/developers/${developer.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(developer),
  }).then((r) => r.json())
}

function login(infoLogin) {
  infoLogin.strategy = 'local'
  return fetch('http://localhost:3030/authentication', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(infoLogin),
  })
    .then((r) => Promise.all([r.ok, r.json()]))
    .then(([ok, body]) => {
      if (!ok) {
        throw Error('Login invalido')
      }
      const token = body.accessToken
      setToken(token)
      return body
    })
}

function deleteDeveloper(idDevelopers) {
  return fetch(`http://localhost:3030/developers/${idDevelopers}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => {
    if (!r.ok) {
      throw Error('dev não foi encontrado')
    }
    return r.json()
  })
}

function cadastroUser(userInfo) {
  return fetch('http://localhost:3030/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  }).then((r) => {
    if (!r.ok) {
      throw Error('não foi possivel o cadastro')
    }
    return r.json()
  })
}

export default {
  getDesenvolvedores,
  getDesenvolvedor,
  createDesenvolvedor,
  deleteDeveloper,
  updateDesenvolvedor,
  cadastroUser,
  login,
  getToken,
}
