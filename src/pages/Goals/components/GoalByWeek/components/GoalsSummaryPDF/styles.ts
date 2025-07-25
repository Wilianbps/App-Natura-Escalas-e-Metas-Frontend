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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    width: '100%',
  },

  viewBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },

  logoHeader: {
    position: 'absolute',
    top: 10,
    paddingRight: 20,
    width: '100%',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
  },

  logoDG: { width: '70px' },

  logoNatura: { width: '40px' },

  textHeader: { textAlign: 'center', fontSize: '14px' },

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

  tableColHeaderWeek: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    color: '#FF9E00',
    fontSize: 10,
    fontWeight: 'bold',
    width: 100,
  },

  tableColLeftHeader: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFE9C4',
    width: 100,
    border: '1px solid #e0e0e0',
  },

  tableColHeaderContainer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    width: 100,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#fff3e0',
    padding: 5,
    border: '1px solid #e0e0e0',
  },

  tableColBodyContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 38,
    fontSize: 9,
    color: '#0f0f0f',
    backgroundColor: '#fff',
    padding: 5,
    border: '1px solid #e0e0e0',
  },

  tableColBodyContainerOdd: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 38,
    fontSize: 9,
    color: '#0f0f0f',
    backgroundColor: '#faf9f8',
    padding: 5,
    border: '1px solid #e0e0e0',
  },

  tableColLeftBody: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    width: 100,
    height: 38,
    border: '1px solid #e0e0e0',
  },

  tableColLeftBodyOdd: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    color: '#0f0f0f',
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: '#faf9f8',
    width: 100,
    height: 38,
    border: '1px solid #e0e0e0',
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
