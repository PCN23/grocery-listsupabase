const SUPABASE_URL = 'https://rtlscqxivjinblfrlgls.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bHNjcXhpdmppbmJsZnJsZ2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIzMDU0MTMsImV4cCI6MTk2Nzg4MTQxM30.00XIP2vqbUttvWfraYlPerWhL6U91pxWMD114J1FM8I';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('/create');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '/');
}

export async function createListItem(name, quantity) {
    const response = await client.from('grocery_list').insert({ name, quantity });
    if (response.error) {
        console.log.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function getListItems(){
    const response = await client.from('grocery-list').select('*');
    if (response.error) {
        console.log.error(response.error.message);
    } else {
        return response.data;
    }
}




// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
