import { Helmet } from 'react-helmet-async'
export function App() {
  return (
    <>
      <Helmet titleTemplate="%s | pizza.shop" />
      <h1>Hello World</h1>
    </>
  )
}
