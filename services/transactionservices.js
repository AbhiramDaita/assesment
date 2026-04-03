import prisma from '../lib/prisma.js';

export default function TransactionServices() {
    return{
        async createTransaction(data) {
            if (!data.amount || !data.type || !data.date || !data.category|| !data.userId) {
                throw new Error("All fields are required");
            }

            const transaction = await prisma.transaction.create({
                data: {
                    amount: data.amount,
                    type:"EXPENSE",
                    notes:data.notes,
                    date: data.date,
                    category: data.category,
                    userId: data.userId,
                },
            });

            return {message:"Transaction created successfully", transaction};
        },

        async getTransactions(){
                const transactions = await prisma.transaction.findMany();
                if(!transactions){
                    throw new Error("No transactions found");
                }
                return transactions;
        },

        async getTransactionById(id){
            const transaction = await prisma.transaction.findUnique({
                where: { id: id },
            });
            if(!transaction){
                throw new Error("Transaction not found");
            }
            return transaction;
        },

        async updateTransaction(id, data){
            const transaction = await prisma.transaction.update({
                where: { id:id },
                data: {
                    id: id,
                    amount: data.amount,
                    type:data.type,
                    notes:data.notes,
                    date: data.date,
                    category: data.category,
                },
            });
            if(!transaction){
                throw new Error("Transaction not found");
            }
            return {message:"Transaction updated successfully", transaction};
        },
        
        async deleteTransaction(id){
            const transaction = await prisma.transaction.delete({
                where: { id: id },
            });
            if(!transaction){
                throw new Error("Transaction not found");
            }
            return {message:"Transaction deleted successfully"};
        }
    }
}