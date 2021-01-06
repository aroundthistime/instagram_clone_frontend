export const defaults = {
    isLoggedIn : Boolean(localStorage.getItem("token")) || false
}

export const resolvers = {
    Mutation : {
        login : (_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data : {
                    isLoggedIn : true
                }
            })
        },
        logout : (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }
}