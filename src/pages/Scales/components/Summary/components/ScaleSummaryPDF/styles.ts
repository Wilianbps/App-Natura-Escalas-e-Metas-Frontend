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

  tableRow: {
    flexDirection: 'row',
  },

  tableColHeaderContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    height: 60,
    width: 100,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f0f0f',
    backgroundColor: '#f2f2f2',
    padding: 3,
    border: '1px solid #d5d5d5',
  },

  tableColBodyContainer: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    width: 100,
    height: 60,
    fontSize: 10,
    color: '#0f0f0f',
    backgroundColor: '#F8F8F8',
    padding: 3,
    border: '1px solid #d5d5d5',
  },

  tableCell: {
    width: 25,
    height: 25,
    color: '#000',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 10,
  },

  greenLight: { backgroundColor: '#e2d34c' },
  orangeDark: { backgroundColor: '#FF9E00' },
  brown: { backgroundColor: '#B77100' },
  gray: { backgroundColor: '#C8C8C8' },
})
