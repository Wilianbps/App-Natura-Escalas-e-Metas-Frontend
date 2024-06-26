import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

import { Container } from './styles'

interface PaginationPerWeekProps {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export function PaginationByFortnight(props: PaginationPerWeekProps) {
  const { currentPage, totalPages, onNextPage, onPreviousPage } = props

  return (
    <Container>
      <button onClick={onPreviousPage} disabled={currentPage === 0}>
        <CgChevronLeft />
      </button>
      <span>Quinzena {currentPage + 1}</span>
      <button onClick={onNextPage} disabled={currentPage === totalPages - 1}>
        <CgChevronRight />
      </button>
    </Container>
  )
}
