import Dialog from "./Dialog";

export interface GithubUseClientProps {
    username: string
}

async function GithubUseCient(props: GithubUseClientProps) {
    const response = await fetch(`https://api.github.com/users/${props.username}`);
    const user = await response.json();


    return (
        <>
        <ul className="content-github">
            <li>{JSON.stringify(user)}</li>
        </ul>
        <Dialog />
        </>
    );
}

export default GithubUseCient;