export default function TransactionsController(transactionServices) {
    return {
        async create(req, res) {
            try {
                const transaction = await transactionServices.createTransaction(req.body);
                res.status(201).json(transaction);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async getTransactions(req, res) {
            try {
                const transactions = await transactionServices.getTransactions();
                res.status(200).json(transactions);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async getTransactionById(req, res) {
            try {
                const transaction = await transactionServices.getTransactionById(req.params.id);
                res.status(200).json(transaction);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async updateTransaction(req, res) {
            try {
                const {id} = req.params;
                const transaction = await transactionServices.updateTransaction(id,req.body);
                res.status(200).json(transaction);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async deleteTransaction(req, res) {
            try {
                const {id} = req.params;
                console.log(id);
                await transactionServices.deleteTransaction(id);
                res.status(200).json({ message: "Transaction deleted successfully" });
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },  
    };
}