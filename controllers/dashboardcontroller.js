export default function DashboardController(dashboardServices) {
    return{
        async getRecent(req,res){
            try{
                const userId = req.user.id;
                const limit = parseInt(req.query.limit) || 5;
                const recentTransactions = await dashboardServices.getRecentTransactions(userId, limit);
                res.status(200).json(recentTransactions);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
        async getSummary(req,res){
            const userId = req.user.id;
            try{
                const summmary = await dashboardServices.getSummary(userId);
                res.status(200).json(summmary);
            } catch(error){
                res.status(500).json({ error: error.message });
            }
        },
        async getMonthlyTrends(req,res){
            const userId = req.user.id;
            try{
                const trends = await dashboardServices.getMonthlyTrends(userId);
                res.status(200).json(trends);
            } catch(error){
                res.status(500).json({ error: error.message });
            }
        }
    }
}