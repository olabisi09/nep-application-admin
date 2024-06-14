import PageLayout from "../../../layouts/pageLayout/pageLayout"
import { ReactComponent as GraterThan } from "../../../assets/chevron_forward.svg";


const FaultySetUp = () =>{
    return(
        <PageLayout
        paragraph="Faculty Setup"
        firstText="Setup"
        secondText="Faculty Setup"
        iconBefore={<GraterThan/>}
        />
    )

}

export default FaultySetUp