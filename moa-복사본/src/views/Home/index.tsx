import React from 'react'
import ShortGroup from '../short_regularGroup/ShortGroup'
import AuthHomeGroup from '../../components/Home/HomeGroup'
import { Route, Routes } from 'react-router-dom'
import RegularGroup from '../short_regularGroup/RegularGroup'
import Search from '../../layouts/SearchBar/index'

export default function index() {
  return (
    <div>
      
      <Routes>
      <Route path='/' element={<AuthHomeGroup />}/>
      <Route path='/grouptype/shorttype' element={<ShortGroup />}/>
      <Route path='/grouptype/regulartype' element={<RegularGroup />}/>
      <Route path='/search/*' element={<Search />}/>
      </Routes>
    </div>
  )
}
