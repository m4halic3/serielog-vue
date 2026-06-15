const BASE_URL = 'http://localhost:3000'

export async function getSeries() {
  const response = await fetch(`${BASE_URL}/series`)
  if (!response.ok) throw new Error('Erro ao buscar séries')
  return response.json()
}

export async function getSerieById(id) {
  const response = await fetch(`${BASE_URL}/series/${id}`)
  if (!response.ok) throw new Error('Série não encontrada')
  return response.json()
}

export async function postSerie(serie) {
  const response = await fetch(`${BASE_URL}/series`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serie),
  })
  if (!response.ok) throw new Error('Erro ao cadastrar série')
  return response.json()
}

export async function putSerie(id, serie) {
  const response = await fetch(`${BASE_URL}/series/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serie),
  })
  if (!response.ok) throw new Error('Erro ao atualizar série')
  return response.json()
}

export async function deleteSerie(id) {
  const response = await fetch(`${BASE_URL}/series/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Erro ao remover série')
}
