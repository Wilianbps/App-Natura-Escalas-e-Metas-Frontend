import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 10,
  },

  header: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },

  tableRow: {
    flexDirection: 'row',
  },

  tableCol: {
    flexDirection: 'column',
  },

  tableColLeftHeaderDayMonth: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontSize: 8.5,
    fontWeight: 'bold',
    width: 68,
  },

  tableColHeaderDayMonth: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    color: '#FF9E00',
    fontSize: 8.5,
    fontWeight: 'bold',
    width: 43,
  },

  tableColLeftHeader: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 8.5,
    fontWeight: 'bold',
    backgroundColor: '#FFE9C4',
    width: 68,
  },

  tableColHeaderContainer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    width: 43,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0f0f0f',
    backgroundColor: '#fff3e0',
    padding: 3,
  },

  tableColBodyContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 43,
    height: 38,
    fontSize: 6.5,
    color: '#0f0f0f',
    backgroundColor: '#fff',
    padding: 5,
  },

  tableColBodyContainerOdd: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 43,
    height: 38,
    fontSize: 6.5,
    color: '#0f0f0f',
    backgroundColor: '#faf9f8',
    padding: 5,
  },

  tableColLeftBody: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 6.5,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    width: 68,
  },

  tableColLeftBodyOdd: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 6.5,
    fontWeight: 'bold',
    backgroundColor: '#faf9f8',
    width: 68,
  },

  tableColLeftFooter: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 6.5,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    width: 68,
  },

  tableColFooterContainer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 38,
    width: 43,
    fontSize: 6.5,
    fontWeight: 'bold',
    color: '#0f0f0f',
    backgroundColor: '#fff3e0',
    padding: 3,
  },

  greenLight: { backgroundColor: '#e2d34c' },
  orangeDark: { backgroundColor: '#FF9E00' },
  brown: { backgroundColor: '#B77100' },
  gray: { backgroundColor: '#C8C8C8' },
})
