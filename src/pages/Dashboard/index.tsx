import { Box, LinearProgress } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { TextInfo } from '@/components/TextInfo'
import { useGoals } from '@/contexts/goals/GoalsContext'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'
import { formatName } from '@/libs/formatName'
import { formatNumber } from '@/libs/formatNumber'

import { AverageSalesMonthChart } from './components/AverageSalesMonthChart'
import { GoalEmployeesChart } from './components/GoalEmployeesChart'
import { InfoStatusScaleTable } from './components/InfoStatusScaleTable'
import { ScaleStatusStoresChart } from './components/ScaleStatusStores'
import SliderSizes from './components/Slider'
import { StoreCards } from './components/Store-Cards'
import {
  Container,
  ContainerChartAverageSalesMonth,
  ContainerChartGoalEmployees,
  ContainerChartScaleStatus,
  ContainerGoals,
  ContentInfoTextAndMonthlyGoal,
  InfoText,
  MonthlyGoalChart,
} from './styles'

export default function Dashboard() {
  const { cookieUserLogin, store, cookieProfile } = useProfiles()
  const { monthValue } = useSettings()
  const {
    goalsByMonth,
    isLoadingGoalEmployeeByMonth,
    isLoadingGoalsLastTwelveMonths,
    isLoadingGoalsByMonth,
  } = useGoals()

  const { storesScaleStatus } = useScales()
  const [statusScale, setStatusScale] = useState<string>('finished-stores')
  const [page, setPage] = useState(1) // <== controle da página

  const hasAccessToStoresDashboardAndInfoTable =
    store === '000001' &&
    (cookieProfile === 'Master' || cookieProfile === 'Supervisão Loja')

  // Quando mudar o filtro, resetar a página para 1
  function handleSetStatusScale(newStatus: string) {
    setStatusScale(newStatus)
    setPage(1) // reseta paginação
  }

  const storesFiltered = useMemo(() => {
    if (statusScale === 'finished-stores') {
      return storesScaleStatus.filter(
        (store) => store.status === 'ESCALA FINALIZADA',
      )
    }

    if (statusScale === 'unfinished-stores') {
      return storesScaleStatus.filter(
        (store) => store.status === 'ESCALA NÃO FINALIZADA',
      )
    }

    if (statusScale === 'non-generated-stores') {
      return storesScaleStatus.filter(
        (store) => store.status === 'ESCALA NÃO GERADA',
      )
    }
  }, [statusScale, storesScaleStatus])

  useEffect(() => {
    setStatusScale('finished-stores')
    setPage(1)
  }, [store, monthValue])

  return (
    <Container>
      {hasAccessToStoresDashboardAndInfoTable ? (
        <>
          <StoreCards onSetStatusScale={handleSetStatusScale} />
          <ContainerChartScaleStatus>
            {isLoadingGoalEmployeeByMonth && (
              <>
                <TextInfo text="Carregando gráfico status escalas das lojas..." />
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                  <LinearProgress />
                </Box>
              </>
            )}

            {!isLoadingGoalEmployeeByMonth && (
              <>
                <header>Gráfico Status de Escalas das Lojas</header>
                <section>
                  <ScaleStatusStoresChart />
                </section>
              </>
            )}
          </ContainerChartScaleStatus>
          <InfoStatusScaleTable
            storesFiltered={storesFiltered}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <>
          <ContainerGoals>
            <ContentInfoTextAndMonthlyGoal>
              <InfoText>
                <h1>Oi, {formatName(cookieUserLogin)}!</h1>
                <p>Veja as principais informações</p>
                <p>da sua loja aqui!</p>
              </InfoText>

              <MonthlyGoalChart>
                {isLoadingGoalsByMonth && (
                  <>
                    <TextInfo text="Carregando gráfico Meta mensal - loja..." />
                    <Box sx={{ width: '100%', marginTop: '10px' }}>
                      <LinearProgress />
                    </Box>
                  </>
                )}

                {!isLoadingGoalsByMonth && (
                  <>
                    <header>Meta mensal - loja</header>
                    <SliderSizes />
                    {goalsByMonth.length === 0 && <footer>R$000.000,00</footer>}
                    {goalsByMonth.length !== 0 && (
                      <footer>
                        {formatNumber(goalsByMonth[0]?.goalValue)}
                      </footer>
                    )}
                  </>
                )}
              </MonthlyGoalChart>
            </ContentInfoTextAndMonthlyGoal>
          </ContainerGoals>
          <ContainerChartGoalEmployees>
            {isLoadingGoalEmployeeByMonth && (
              <>
                <TextInfo text="Carregando gráfico Meta de Colaboladores por Mês..." />
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                  <LinearProgress />
                </Box>
              </>
            )}

            {!isLoadingGoalEmployeeByMonth && (
              <>
                <header>Meta de Colaboladores por Mês</header>
                <section>
                  <GoalEmployeesChart />
                </section>
              </>
            )}
          </ContainerChartGoalEmployees>
          <ContainerChartAverageSalesMonth>
            {isLoadingGoalsLastTwelveMonths && (
              <>
                <TextInfo text="Carregando gráfico Ranking Metas..." />
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                  <LinearProgress />
                </Box>
              </>
            )}

            {!isLoadingGoalsLastTwelveMonths && (
              <>
                <header>Ranking Metas</header>

                <section>
                  <AverageSalesMonthChart />
                </section>
              </>
            )}
          </ContainerChartAverageSalesMonth>
          {/*  <ContainerChartAverageSalesDay>
            <header>Média de Vendas por Dia</header>
            <section>
              <AverageSalesDayChart />
            </section>
          </ContainerChartAverageSalesDay> */}
        </>
      )}
    </Container>
  )
}
