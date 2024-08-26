import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 6.25rem;
  padding: 1.25rem 3.125rem;
  height: 100hv;
`

export const ContainerGoals = styled.section`
  width: 100%;
  display: flex;
  gap: 2rem;
`

export const Card = styled.section`
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(to right, #ff9e00, #fff173) border-box;
  border-radius: 30px;
  border: 1px solid transparent;
  padding: 1.2rem;

  footer,
  header {
    font-weight: 500;
  }
`

export const ContentInfoTextAndMonthlyGoal = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
`

export const InfoText = styled.section`
  min-width: 450px;
  h1 {
    font-size: 28px;
    font-weight: 400;
  }
  p {
    font-size: 28px;
    font-weight: 200;
  }
`

export const MonthlyGoalChart = styled(Card)`
  width: 100%;
  height: 163px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: -11;
`

export const ContainerChartGoalEmployees = styled(Card)`
  height: 342px;
  section {
    margin-top: 2rem;
  }
`

export const ContainerChartsAverageSales = styled.section`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`

export const ContainerChartAverageSalesHour = styled(Card)`
  width: 100%;
  section {
    margin-top: 2rem;
  }
`

export const ContainerChartAverageSalesDay = styled(Card)`
  width: 100%;
  section {
    margin-top: 2rem;
  }
`

export const ContainerChartAverageSalesMonth = styled(Card)`
  width: 100%;
  height: 342px;
  section {
    margin-top: 2rem;
  }
`
