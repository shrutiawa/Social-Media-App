const {db_username , db_password} = process.env;
export const connectionStr = `mongodb+srv://${db_username}:${db_password}@cluster0.w72yq.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0`;