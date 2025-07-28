import { CgChevronLeft, CgChevronRight } from 'react-icons/cg'

import { useScales } from '@/contexts/scale/ScalesContext'

import { Buttons, Container } from './styles'

interface PaginationPerWeekProps {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export function PaginationByFortnight(props: PaginationPerWeekProps) {
  const { dataFinishScale } = useScales()

  const finishScale = dataFinishScale[0]?.finished

  const { currentPage, totalPages, onNextPage, onPreviousPage } = props

  return (
    <Container>
      <Buttons>
        <button onClick={onPreviousPage} disabled={currentPage === 0}>
          <CgChevronLeft />
        </button>
        <span>Quinzena {currentPage + 1}</span>
        <button onClick={onNextPage} disabled={currentPage === totalPages - 1}>
          <CgChevronRight />
        </button>
      </Buttons>
      {(finishScale === false ||
        finishScale === undefined ||
        finishScale === null) && <span>Escala Não Finalizda</span>}
    </Container>
  )
}
