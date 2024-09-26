import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from 'react-router-dom'

export default function ErrorPage(){
    const error = useRouteError();
    
    let title = 'An error ocurr'
    let message = 'Something went wrong'
    console.log(error)
    if(error.status === 500){
        const errorData = error.data
        message = errorData.message
    }

    if(error.status === 404){
        title = 'Not found'
        message = 'Could not find the pase'
    }

    return <>
    <MainNavigation />
    <PageContent title={title}>
        <p>{message}</p>
    </PageContent>
    </>
}