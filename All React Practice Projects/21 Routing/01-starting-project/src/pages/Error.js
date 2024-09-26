import MainNavigation from "../components/MainNavigation";

export default function Error(){
    return <>
    <MainNavigation />
    <main>
        <h1>An error ocurred!</h1>
        <p>Could not find that page</p>
    </main>
    </>
}