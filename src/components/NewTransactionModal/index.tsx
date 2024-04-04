import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
        <Overlay/>
            <Content>
            <Dialog.Title> New Transaction</Dialog.Title>

            <CloseButton>
                <X/>
            </CloseButton>

            <form action="">
                <input type="text" placeholder="Description" required />
                <input type="number" placeholder="Price" required />
                <input type="text" placeholder="Category" required />
                
                <TransactionType>
                    <TransactionTypeButton variant='income' value='income'>
                        <ArrowCircleUp size={24}/>
                        Entrance
                    </TransactionTypeButton>

                    <TransactionTypeButton variant='outcome' value='outcome'>
                        <ArrowCircleDown size={24}/>
                        Exit
                    </TransactionTypeButton>
                </TransactionType>

                <button type='submit'>Register</button>
            </form>

        </Content>
    </Dialog.Portal>
  )
}
