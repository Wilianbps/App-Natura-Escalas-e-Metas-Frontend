import { useSettings } from '@/contexts/setting/SettingContext'

import { InputDate } from '../InputDate'
import { SelectStores } from '../Select'
import { ContainerHeader } from './styles'

export function Header() {
  const { monthValue, updateMonthValue } = useSettings()

  function handleSelectDate(month: string) {
    updateMonthValue(month)
  }

  return (
    <ContainerHeader>
      <SelectStores minWidth={120} heightSelect="40px" fontSize="13px" />
      {/*  <DatePickerMUI
        selectDate={selectedDate}
        onSelectDate={handleSelectDate}
      /> */}
      <InputDate selectMonth={monthValue} onSelectMonth={handleSelectDate} />
    </ContainerHeader>
  )
}
