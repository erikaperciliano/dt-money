import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const createTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction
    })

    const { 
        control,
        register, 
        handleSubmit,
        formState: { isSubmitting },
        reset, 
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const { description, price, category, type } = data

        await createTransaction({
            description,
            price,
            category,
            type
        })

        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay/>
                <Content>
                <Dialog.Title> New Transaction</Dialog.Title>

                <CloseButton>
                    <X/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text"     
                        placeholder="Description" 
                        required
                        {...register('description')} 
                    />
                    <input 
                        type="number"   
                        placeholder="Price" 
                        required
                        {...register('price', { valueAsNumber: true })} 
                    />
   
                    <input 
                        type="text"     
                        placeholder="Category" 
                        required
                        {...register('category')} 
                    />

                    <Controller 
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return(
                                <TransactionType 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                >
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24}/>
                                        Entrance
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24}/>
                                        Exit
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />
                    <button type='submit' disabled={isSubmitting}>Register</button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}
