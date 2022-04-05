type AppUser = {
    email: string,
    password: string,
    username: string,
    department: {
        department_id: number,
        department_name: string
    }
}

export default AppUser