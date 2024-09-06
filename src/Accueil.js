import React from 'react'

import Todo from './features/Todo'
import Layout from 'components/Layout'

function Accueil() {
  return (
    <div>
      <Layout>
        <Todo />
      </Layout>
    </div>
  )
}

export default Accueil
