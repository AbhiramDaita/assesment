export default function UserController(UserServices) {
    return {
        async getUsers(req, res) { 
            try{
                const result = await UserServices.getAllUsers();
                res.json(result);
            } catch(error) {
                res.status(400).json({ error: error.message });
            }
        },
        async updateUserRole(req, res) {
            const { userId } = req.params;
            const { newRole } = req.body;
            try{
                const result = await UserServices.updateRole(userId, newRole);
                res.json(result);
            } catch(error) {
                res.status(400).json({ error: error.message });
            }
        },
        async updateUserStatus(req, res) {
            const { userId } = req.params;
            const { newStatus } = req.body;
            try{
                const result = await UserServices.updateStatus(userId, newStatus);
                res.json(result);
            } catch(error) {
                res.status(400).json({ error: error.message });
            }   
        }
    }
 }
