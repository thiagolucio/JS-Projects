export interface GithubUserProps {
    username: string
}

async function GithubUser(props: GithubUserProps) {
    const response = await fetch(`https://api.github.com/users/${props.username}`);
    const user = await response.json();
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    return (
        <ul className="content-github">
            <li>{JSON.stringify(user)}</li>
        </ul>
    );
}

export default GithubUser;