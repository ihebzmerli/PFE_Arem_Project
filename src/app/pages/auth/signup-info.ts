export class SignUpInfo {
    lastname: string;
    firstname: string;
    username: string;
    email: string;
    roles: string[];
    password: string;
    typeContrat: string;
    typeConge: string;
    authorisation: string;

    constructor(lastname: string, firstname: string, username: string, email: string, password: string, typeContrat: string, typeConge: string, authorisation: string ) {
        this.lastname = lastname;
        this.firstname = firstname
        this.username = username;
        this.email = email;
        this.password = password;
        this.typeContrat = "indefini";
        this.typeConge = "indefini";
        this.authorisation = "allow";
        this.roles= ['user'];
    }
}
