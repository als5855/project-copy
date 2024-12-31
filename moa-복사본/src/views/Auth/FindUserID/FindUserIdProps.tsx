import React from 'react'
import { User } from '../../../types'

interface FindUserIdProps {
  result: User | null
}

function FindUserIdProps({ result }:FindUserIdProps) {

  return (
    <div><p>{result?.userId}</p></div>
  )
}

export default FindUserIdProps