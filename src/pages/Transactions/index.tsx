import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles'
import { SearchForm } from '../../components/SearchForm'

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    category: string;
    price: number;
    createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions (){
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  },[])


  return (
    <div>
      <Header/>
      <Summary/>
      <TransactionsContainer>
        <SearchForm/>

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td width='50%'>{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.price}
                  </PriceHighlight>
                </td>
                <td>{transaction.type}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
      
    </div>
  )
}