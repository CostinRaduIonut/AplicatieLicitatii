import React, { SyntheticEvent } from 'react'
import './Searchbar.css'

type SearchbarType = {
  handleSubmit: (e: SyntheticEvent) => void
}

export const Searchbar = ({handleSubmit}:SearchbarType) => {

  return (
    <div className='searchbar-body'>
      <form onSubmit={handleSubmit}>
        <input className='searchbar-input' name='query' type='text' placeholder='Cauta dupa nume...' />
        <button className='searchbar-button' type='submit'>Cauta</button>
      </form>
    </div>
  )
}
