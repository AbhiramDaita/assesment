import prisma from "../lib/prisma.js";

export default function DashboardServices() {
    return{
        async getRecentTransactions(userId, limit = 5) {
            const recentTransactions = await prisma.transaction.findMany({
                where:{userId: userId},
                orderBy: { date: 'desc' },
                take: limit,
            });
            if(!recentTransactions) {
                throw new Error("No transactions found for the user.");
            }
            return recentTransactions;
        },
        async getSummary(userId){
            // Total Income
            const totalIncome = await prisma.transaction.aggregate({
                where: {
                    userId: userId,
                    type: 'INCOME',
                },
                _sum: {
                    amount: true,
                },
            });

            // Total Expenses
            const totalExpenses = await prisma.transaction.aggregate({
                where: {
                    userId: userId,
                    type: 'EXPENSE',
                },
                _sum: {
                    amount: true,
                },
            });

            const categoryTotals = await prisma.transaction.groupBy({
                by:['category'],
                where: {
                    userId: userId,
                },
                _sum: {
                    amount: true,
                },
            })
            
            return {
                totalIncome:totalIncome._sum.amount || 0,
                totalExpenses:totalExpenses._sum.amount || 0,
                netBalance:(totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0),
                categoryTotals: categoryTotals.map(ct => ({
                    category: ct.category,
                    totalAmount: ct._sum.amount || 0,
                }))
            }
        },
        async getMonthlyTrends(userId){
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                },
                orderBy: { date: 'asc' },
            });

            const monthlyTrends = {};

            transactions.forEach(transaction => {
                const month = transaction.date.toISOString().slice(0, 7);
                if (!monthlyTrends[month]) {
                    monthlyTrends[month] = {
                        income: 0,
                        expenses: 0,
                    };
                }
                if (transaction.type === 'INCOME') {
                    monthlyTrends[month].income += transaction.amount;
                } else if (transaction.type === 'EXPENSE') {
                    monthlyTrends[month].expenses += transaction.amount;
                }
            });

            return monthlyTrends;
        }
    }
}