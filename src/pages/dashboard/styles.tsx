import styled from '@emotion/styled'

export const Container = styled.section`
  margin-top: 6.25rem;
  padding: 1.25rem 3.125rem;
  height: 100hv;
`

export const ContainerGoals = styled.section`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
`

export const Card = styled.section`
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(to right, #ff9e00, #fff173) border-box;
  border-radius: 30px;
  border: 1px solid transparent;
  padding: 1.875rem;

  footer,
  header {
    font-weight: 500;
  }
`

export const ContentInfoTextAndMonthlyGoal = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`

export const InfoText = styled.section`
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: -11;
`

export const GoalEmployeesChartContent = styled(Card)`
  section {
    margin-top: 2rem;
  }
`
