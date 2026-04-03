import prisma from "../lib/prisma.js";

export default function UserServices(){
    return{
        async getAllUsers(){
            return await prisma.user.findMany();
        },
        async updateRole(userId, newRole){
        
            await prisma.user.update({
                where: { id: userId },
                data: { role: newRole }
            });
            return {message:"User role updated successfully"};
        },
        async updateStatus(userId, newStatus){
            await prisma.user.update({
                where: { id: userId },
                data: { status: newStatus }
            });
            return {message:"User status updated successfully"};
        }
    }
}

