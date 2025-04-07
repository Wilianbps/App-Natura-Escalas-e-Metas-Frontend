import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { LinearProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { isAfter, setDate, startOfMonth } from 'date-fns'
import { useMemo, useState } from 'react'
import { CgCheck, CgEye, CgPen } from 'react-icons/cg'

import { Button } from '@/components/Button'
import { TextInfo } from '@/components/TextInfo'
import { useProfiles } from '@/contexts/profiles/ProfilesContext'
import { useScales } from '@/contexts/scale/ScalesContext'
import { useSettings } from '@/contexts/setting/SettingContext'

import { Approvals } from './components/Approvals'
import { InfoTextScaleDeadline } from './components/InfoTextScaleDeadline'
import { ModalConfirmLoadScale } from './components/ModalConfirmLoadScale.tsx/index.tsx'
import { Scale } from './components/ScalePage'
import { Summary } from './components/Summary'
import { Container, ContainerLoadScale } from './styles'

export function ScalePage() {
  const {
    scaleSummary,
    dataFinishScale,
    dataScaleApprovalRequest,
    isLoadingScale,
  } = useScales()
  const [value, setValue] = useState('setting')

  const { cookieProfile } = useProfiles()
  const { monthValue } = useSettings()
  const { paramGenerateScaleNextMonth, paramToAlterDayScale } = useScales()

  const [isModalOpenConfirmLoadScale, setIsModalOpenConfirmLoadScale] =
    useState<boolean>(false)

  // Memoizar currentDate para evitar recriação a cada render
  const currentDate = useMemo(() => new Date(), [])
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const currentYear = currentDate.getFullYear().toString()
  const month = monthValue.split('-')[1]
  const year = monthValue.split('-')[0]

  // Verifica se a data atual permite carregar a escala do próximo mês
  const canGenerateNextMonthScale = useMemo(() => {
    const generateDay = Number(paramGenerateScaleNextMonth?.day)
    const generateDate = setDate(startOfMonth(currentDate), generateDay)
    return (
      isAfter(currentDate, generateDate) ||
      currentDate.getDate() === generateDay
    )
  }, [paramGenerateScaleNextMonth, currentDate])

  // Verifica se o mês selecionado é anterior ao atual
  const isMonthBeforeCurrent = useMemo(() => {
    const selectedYearMonth = Number(`${year}${month}`)
    const currentYearMonth = Number(`${currentYear}${currentMonth}`)
    return selectedYearMonth < currentYearMonth
  }, [year, month, currentYear, currentMonth])

  const infoScalePeriod = useMemo(() => {
    return scaleSummary.some((item) => item.length > 0)
  }, [scaleSummary])

  const isCurrentDateAfterFifth = useMemo(() => {
    const fifthDayOfMonth = setDate(
      startOfMonth(currentDate),
      Number(paramToAlterDayScale?.day),
    )
    return isAfter(currentDate, fifthDayOfMonth)
  }, [paramToAlterDayScale, currentDate])

  async function handleOpenModalToLoadScale() {
    setIsModalOpenConfirmLoadScale(true)
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Container>
      <header>
        {isLoadingScale ? (
          <>
            <TextInfo text="Carregando escala..." />
            <Box sx={{ width: '100%', marginTop: '10px' }}>
              <LinearProgress />
            </Box>
          </>
        ) : (
          <h1>Escalas</h1>
        )}
      </header>

      {!isLoadingScale &&
      dataScaleApprovalRequest.length !== 0 &&
      dataScaleApprovalRequest[dataScaleApprovalRequest?.length - 1]?.status ===
        2 &&
      cookieProfile === 'Gerente Loja' ? (
        <InfoTextScaleDeadline text="Supervisor reprovou a solicitação!" />
      ) : !isLoadingScale &&
        isCurrentDateAfterFifth &&
        (dataScaleApprovalRequest.length === 0 ||
          dataScaleApprovalRequest[dataScaleApprovalRequest?.length - 1]
            ?.status === 0) &&
        (dataFinishScale.length === 0 ||
          dataFinishScale[0]?.finished === false) &&
        month === currentMonth &&
        year === currentYear &&
        cookieProfile === 'Gerente Loja' ? (
        <InfoTextScaleDeadline text="Prazo encerrado!" />
      ) : (
        <Box sx={{ width: '100%', marginTop: '10px' }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                padding: 0,
              }}
            >
              <TabList onChange={handleChange}>
                <Tab
                  label="Configurar"
                  icon={<CgPen />}
                  iconPosition="end"
                  value="setting"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                  }}
                />
                <Tab
                  label="Resumo"
                  icon={<CgEye />}
                  iconPosition="end"
                  value="summary"
                  sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                />
                {(cookieProfile === 'Supervisão Loja' ||
                  cookieProfile === 'Master') && (
                  <Tab
                    label="Aprovações"
                    icon={<CgCheck size={26} />}
                    iconPosition="end"
                    value="approvals"
                    sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                  />
                )}
              </TabList>
            </Box>
            <TabPanel value="setting" sx={{ padding: 0 }}>
              {!infoScalePeriod && (
                <TextInfo
                  text="Não há informações no período"
                  marginTop="2rem"
                />
              )}

              <ContainerLoadScale>
                {!infoScalePeriod &&
                  dataFinishScale.length === 0 &&
                  cookieProfile === 'Gerente Loja' &&
                  !isMonthBeforeCurrent &&
                  (month === currentMonth || canGenerateNextMonthScale) &&
                  year === currentYear && (
                    <Button
                      text="Carregar Escala do Mês"
                      color="#000"
                      bgColor="#7EC864"
                      width="250px"
                      onClick={handleOpenModalToLoadScale}
                    />
                  )}
              </ContainerLoadScale>

              {infoScalePeriod && <Scale />}
            </TabPanel>
            <TabPanel value="summary" sx={{ padding: 0 }}>
              <Summary />
            </TabPanel>
            <TabPanel value="approvals" sx={{ padding: 0 }}>
              <Approvals />
            </TabPanel>
          </TabContext>
        </Box>
      )}

      <ModalConfirmLoadScale
        open={isModalOpenConfirmLoadScale}
        onHandleClose={() => setIsModalOpenConfirmLoadScale(false)}
      />
    </Container>
  )
}
