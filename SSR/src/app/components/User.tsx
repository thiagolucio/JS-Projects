async function User() {
    const response = await fetch('https://thiagolucio.com.br/downloads/json/users.json');
    const user = await response.json();

    return (
        <ul>
            <li style={{margin: '10px 0'}}>{JSON.stringify(user)}</li>
        </ul>
    )
}

export default User;