

export default function AuthController(AuthServices) {

    return {
        async loginUser(req, res) {

            const { email, password } = req.body;
            try {
                const result = await AuthServices.login(email, password);
                res.status(201).json(result);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        
        async registerUser(req, res) {
            const { name, email, password } = req.body;
            try {
                const result = await AuthServices.register(name, email, password);
                res.status(201).json(result);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
}



