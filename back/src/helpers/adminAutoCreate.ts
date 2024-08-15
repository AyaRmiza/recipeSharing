import { User } from "../models/user"; 
import { ROLES } from "./constants"; 
import { cryptPassword } from "./bcryptPass";

export const adminAutoCreate = async () =>  {
  try {
    // existe  admin 
    const adminExist = await User.findOne({
      where: { role: ROLES.ADMIN },
    });

    // !existe admin
    if (!adminExist) {
      const adminPassword = await cryptPassword(process.env.ADMIN_PASSWORD);

      await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: adminPassword,
        role: ROLES.ADMIN, 
        isActive: true,
      });

      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user  exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

