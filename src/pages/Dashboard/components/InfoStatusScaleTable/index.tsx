import { Pagination, PaginationItem } from '@mui/material'
import { formatInTimeZone } from 'date-fns-tz'
import { ChangeEvent } from 'react'

import { ContainerTable } from './styles'

interface InfoStatusScaleTableProps {
  storesFiltered:
    | {
        scaleCode: string
        branch: string
        userLogin: string
        date: string
        status: string
      }[]
    | undefined

  page: number
  setPage: (page: number) => void
}

export function InfoStatusScaleTable(props: InfoStatusScaleTableProps) {
  const { storesFiltered, page, setPage } = props

  const itemsPerPage = 10

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  if (!storesFiltered || storesFiltered.length === 0) {
    return (
      <ContainerTable>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Não há informações no período
        </p>
      </ContainerTable>
    )
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  //const pagedStores = storesFiltered.slice(startIndex, endIndex)
  const orderedStores = [...storesFiltered].sort((a, b) => {
  // Ordenar por status
  if (a.status < b.status) return -1
  if (a.status > b.status) return 1

  const hasDateA = a.date != null && a.date !== ''
  const hasDateB = b.date != null && b.date !== ''

  if (hasDateA && hasDateB) {
    // Ambos têm data: ordenar por data DESC
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  } else if (hasDateA) {
    // Só A tem data → A vem antes
    return -1
  } else if (hasDateB) {
    // Só B tem data → B vem antes
    return 1
  } else {
    // Nenhum tem data → ordenar por scaleCode (string ou número)
    if (a.scaleCode < b.scaleCode) return -1
    if (a.scaleCode > b.scaleCode) return 1
    return 0
  }
})

const pagedStores = orderedStores.slice(startIndex, endIndex)



  return (
    <ContainerTable>
      <table>
        <thead>
          <tr>
            <th>Código Loja</th>
            <th>Filial</th>
            <th>Usuário</th>
            <th>Data Fim Escala</th>
          </tr>
        </thead>
        <tbody>
          {pagedStores.map((store, index) => (
            <tr key={store.scaleCode + index}>
              <td>{store.scaleCode}</td>
              <td>{store.branch}</td>
              <td>{store.userLogin}</td>
              <td>
                {store.date &&
                  formatInTimeZone(store.date, 'UTC', 'dd/MM/yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {storesFiltered.length > itemsPerPage && (
        <Pagination
          count={Math.ceil(storesFiltered.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem component="a" href="#" {...item} />
          )}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </ContainerTable>
  )
}
