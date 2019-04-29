export const adminData = (data: any) => {
    return {
        _id: data._id || "",
        name: data.name || "",
        email: data.email || "",
        createdAt: data.createdAt || ""
    }
}