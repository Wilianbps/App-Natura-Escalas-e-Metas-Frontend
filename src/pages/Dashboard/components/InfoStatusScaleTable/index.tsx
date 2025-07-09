import { Pagination, PaginationItem } from '@mui/material'
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
  const pagedStores = storesFiltered.slice(startIndex, endIndex)

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
                  new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(store.date))}
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
